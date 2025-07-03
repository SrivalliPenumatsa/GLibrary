import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const API_BASE_URL =
  typeof window === "undefined"
    ? process.env.NEST_API_BASE_URL
    : process.env.NEXT_PUBLIC_NEST_API_BASE_URL;

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jwtTokenHeader = request.headers.get("JwtToken");
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/announcements/update`, {
      method: "PATCH",
      headers: {
        JwtToken: `${jwtTokenHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update announcement");
    }

    revalidateTag("userAnnouncements");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const jwtTokenHeader = request.headers.get("JwtToken");

  try {
    const response = await fetch(`${API_BASE_URL}/announcements/${params.id}`, {
      method: "DELETE",
      headers: {
        JwtToken: `${jwtTokenHeader}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete announcement");
    }

    revalidateTag("userAnnouncements");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
