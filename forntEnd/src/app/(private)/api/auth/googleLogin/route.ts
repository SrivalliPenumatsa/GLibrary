// import { NextResponse } from "next/server";
// import { apiRequest } from "@/services/apiRequest";
// import { endpoints } from "@/lib/endpoints";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();

//     const response = await apiRequest(endpoints.authGoogleLogin, {
//       method: "POST",
//       body,
//     });

//     return NextResponse.json(response.data, {
//       status: response.status,
//     });
//   } catch (error: any) {
//     console.error("Google login error:", error);
//     return NextResponse.json(
//       { error: error.message || "Google login failed" },
//       { status: error.status || 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
// }


import { NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(endpoints.authGoogleLogin, {
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