import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

const API_BASE_URL = process.env.NEST_API_BASE_URL

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get("accessToken");
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/announcements/update`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${token}`,
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
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get("accessToken");

  try {
    const response = await fetch(`${API_BASE_URL}/announcements/${params.id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
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
