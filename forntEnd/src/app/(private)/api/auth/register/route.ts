import { NextResponse } from "next/server";
import { apiRequest } from "@/services/apiRequest";
import { endpoints } from "@/lib/endpoints";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("register user req in post ", body);

    const response = await apiRequest(endpoints.authRegister, {
      method: "POST",
      body,
    });

    return NextResponse.json(response.data, {
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
