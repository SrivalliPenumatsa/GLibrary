import { NextRequest, NextResponse } from "next/server";
import { endpoints } from "@/lib/endpoints";
import { cookies } from "next/headers";


const BASE_URL = process.env.NEST_API_BASE_URL


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const type = searchParams.get('type');
const cookieAuthToken = (await cookies()).get("accessToken")?.value;
const headerAuthToken = await request.headers.get('accessToken');

const tokenToUse = cookieAuthToken ?? headerAuthToken; 


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
        'Authorization': `Bearer ${ tokenToUse}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      next: { tags: ["announcements"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch announcements");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}





export async function POST(request: NextRequest) {  
  const token = request.headers.get("accessToken");
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/announcements`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log(" response in route  ",response.body);
    

    if (!response.ok) {
      throw new Error("Failed to create announcement");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

