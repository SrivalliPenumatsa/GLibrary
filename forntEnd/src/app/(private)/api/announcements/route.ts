import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";

const BASE_URL =
  typeof window === "undefined"
    ? process.env.NEST_API_BASE_URL
    : process.env.NEXT_PUBLIC_NEST_API_BASE_URL;
// const BASE_URL = "http://localhost:3001"

export async function POST(request: Request) {
  const jwtTokenHeader = request.headers.get("JwtToken");
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/announcements`, {
      method: "POST",
      headers: {
        JwtToken: `${jwtTokenHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create announcement");
    }

    const data = await response.json();
    //   revalidateTag('userAnnouncements');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log(" GET in  announcements route.ts.................");
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const type = searchParams.get('type');

  console.log(new URL(request.url), " ", page);
  const jwtTokenHeader = request.headers.get("JwtToken");

  try {
    let url;
    if(type === "user")
    {
      url = `${BASE_URL}${endpoints.userAnnouncements}${
        page === "1" ? "" : `?page=${page}`
      }`;
    }
    else{
      url = `${BASE_URL}${endpoints.allAnnouncements}${
        page === "1" ? "" : `?page=${page}`
      }`;
    }
    
    console.log("url ", url);
    const response = await fetch(url, {
      headers: {
        JwtToken: `${jwtTokenHeader}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { tags: ["announcements"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data = await response.json();
    // console.log(" route.js data........................", data);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
