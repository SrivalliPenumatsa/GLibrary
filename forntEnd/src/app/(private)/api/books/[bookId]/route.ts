import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BACKEND_BASE_URL = "http://localhost:3001";

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  console.log("GET in books/[bookId] route.ts...");
  console.log("Cookie header:", request.headers.get("cookie"));
  const token = request.headers.get("JwtToken");
  try {
    console.log("Token:", token);

    const url = `${BACKEND_BASE_URL}${endpoints.books}/${params.bookId}`;
    console.log("Fetching book from backend:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { tags: ["book"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book");
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
