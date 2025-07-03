import { NextResponse } from "next/server";
import { apiRequest } from "@/services/apiRequest";
import { endpoints } from "@/lib/endpoints";
import { cookies } from "next/headers";

interface FetchResponse<T = any> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Login user req in post ", body);

    const response: FetchResponse = await apiRequest(endpoints.authLogin, {
      method: "POST",
      body,
    });
    console.log("response in login  post ", response.data);
    if (response.data?.jwtToken) {
      console.error("After request...............................");
      console.log(response.data.jwtToken);
      if (response.data?.jwtToken) {
        (await cookies()).set("authToken", response.data.jwtToken.toString(), {
          // httpOnly: true,
          // sameSite: 'lax',
          path: "/",
          maxAge: 60 * 60,
        });
      }
    }
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        // Set any cookies or headers here if needed
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: error.status || 500 }
    );
  }
}

// Optionally add other methods if needed
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
