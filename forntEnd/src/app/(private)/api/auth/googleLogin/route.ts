import { NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BASE_URL = process.env.NEST_API_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/${endpoints.authGoogleLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": request.headers.get("Authorization") || "",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Google login failed");
    }

    

    return NextResponse.json(data, {
      status: response.status,
    });
   

  } catch (error: any) {
    console.error("Google login error:", error);
    return NextResponse.json(
      { error: error.message || "Google login failed" },
      { status: error.status || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}