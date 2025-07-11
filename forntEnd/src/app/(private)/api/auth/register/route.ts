import { NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";
const BACKEND_BASE_URL = process.env.NEST_API_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("register user req in post ", body);

    const response = await fetch( `${BACKEND_BASE_URL}${endpoints.authRegister}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Signup failed" },
      { status: error.status || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}