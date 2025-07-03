import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BACKEND_BASE_URL = "http://localhost:3001";

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("JwtToken");

    const url = `${BACKEND_BASE_URL}${endpoints.currentUser}`;
    console.log("Fetching user from backend:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user");
    }

    const data = await response.json();
    return NextResponse.json({ name: data.name });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch user");
    }

    const data = await response.json();
    return NextResponse.json({ name: data.name });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
