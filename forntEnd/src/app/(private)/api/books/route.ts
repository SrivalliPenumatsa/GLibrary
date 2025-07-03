import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";
import { writeFile } from "fs/promises";
import path from "path";
import { CreateBook } from "@/lib/types";

const BACKEND_BASE_URL = "http://localhost:3001";

export async function GET(request: NextRequest) {
  console.log("GET in books route.ts...");

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const genre = searchParams.get("genre") || "";

  try {
    const token = request.headers.get("JwtToken");

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (genre) params.set("genre", genre);
    const queryString = params.toString();
    const url = queryString
      ? `${BACKEND_BASE_URL}${endpoints.books}?${queryString}`
      : `${BACKEND_BASE_URL}${endpoints.books}`;
    console.log("Fetching books from backend:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { tags: ["books"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books from backend");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("JwtToken");
  const form = await request.formData();

  const bookFile = form.get("file") as File | null;
  const coverFile = form.get("image") as File | null;

  const title =
    form.get("title")?.toString().trim().replace(/\s+/g, "_") || "Untitled";
  const author =
    form.get("author")?.toString().trim().replace(/\s+/g, "_") || "Unknown";

  if (!bookFile || !coverFile) {
    return NextResponse.json(
      { error: "Both PDF and image are required." },
      { status: 400 }
    );
  }
  const fileName = `${title}_${author}`;

  const pdfBytes = await bookFile.arrayBuffer();
  const pdfBuffer = Buffer.from(pdfBytes);
  const pdfExt = bookFile.name.split(".").pop();
  const pdfPath = path.join("public/uploads", `${fileName}.${pdfExt}`);

  const imageBytes = await coverFile.arrayBuffer();
  const imageBuffer = Buffer.from(imageBytes);
  const coverPageExt = coverFile.name.split(".").pop();
  const imagePath = path.join(
    "public/CoverPages",
    `${fileName}.${coverPageExt}`
  );

  const genre = form.get("genre")?.toString() || "";
  const description = form.get("description")?.toString() || "";
  const bookData: CreateBook = {
    title,
    author,
    genre,
    description,
  };

  try {
    await writeFile(pdfPath, pdfBuffer);
    await writeFile(imagePath, imageBuffer);

    const url = `${BACKEND_BASE_URL}${endpoints.books}`;
    console.log("Creating book at backend:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(bookData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create book");
    }

    const responseData = await response.json();
    console.log("Book created:", responseData);

    return NextResponse.json({
      success: true,
      files: {
        pdf: `/uploads/${fileName}.${pdfExt}`,
        cover: `/CoverPages/${fileName}.${coverPageExt}`,
      },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Error saving files or creating book",
      },
      { status: 500 }
    );
  }
}
