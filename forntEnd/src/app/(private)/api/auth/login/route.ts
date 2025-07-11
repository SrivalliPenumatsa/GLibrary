import { NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";
import { cookies } from "next/headers";

const BACKEND_BASE_URL = process.env.NEST_API_BASE_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Login user req in post ", body);

    const response = await fetch(`${BACKEND_BASE_URL}${endpoints.authLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data?.token) {
      (await cookies()).set("accessToken", data.token.toString(), {
        path: "/",
        maxAge: 60 * 60,
      });
    }

    return NextResponse.json(data, {
      status: response.status,
      headers: {},
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: error.status || 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}