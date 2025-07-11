import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BACKEND_BASE_URL = process.env.NEST_API_BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  const token = request.headers.get("accessToken");
  const {bookId} = params;
  try {
    const url = `${BACKEND_BASE_URL}${endpoints.books}/${bookId}`;
    console.log("Fetching book from backend:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
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
