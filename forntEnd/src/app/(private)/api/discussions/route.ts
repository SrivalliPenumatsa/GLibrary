import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";
import { revalidateTag } from "next/cache";

const BACKEND_BASE_URL = process.env.NEST_API_BASE_URL;

export async function GET(request: NextRequest) {
  const token = request.headers.get("accessToken");

  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get("bookId") || "";

  if (!bookId) {
    return NextResponse.json({ error: "bookId is required" }, { status: 400 });
  }

  try {
    const url = `${BACKEND_BASE_URL}${endpoints.discussions}?bookId=${bookId}`;
    console.log("Fetching discussions from backend:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { tags: ["discussions"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch discussions for bookId=${bookId}`);
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

  try {
    const body = await request.json();
    const { bookId, content } = body;

    if (!bookId || !content) {
      return NextResponse.json(
        { error: "bookId and content are required" },
        { status: 400 }
      );
    }

    const url = `${BACKEND_BASE_URL}${endpoints.discussions}`;
    console.log("Creating discussion at backend:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        JwtToken: `${token}`,
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ bookId, content }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create discussion");
    }

    const data = await response.json();
    revalidateTag("discussions");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
