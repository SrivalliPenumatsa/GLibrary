import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BACKEND_BASE_URL = process.env.NEST_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("accessToken");
    const url = `${BACKEND_BASE_URL}${endpoints.currentUser}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        JwtToken: `${token}`,
        'Authorization': `Bearer ${token}`,
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
  const token = request.headers.get("accessToken");
  try {
    const response = await fetch(`${BACKEND_BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
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
