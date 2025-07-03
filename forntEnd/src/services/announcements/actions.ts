"use server";

import path from "path";
import fs from "fs/promises";
import { revalidateTag } from "next/cache";

const BASE_URL = "http://localhost:3000";

export async function CreateAnnouncement(
  name: string,
  description: string,
  imageFile: File,
  token: string
) {
  const fileExt = imageFile.name.split(".").pop();
  const title = name.concat(`.${fileExt}`);

  const response = await fetch(`${BASE_URL}/api/announcements`, {
    method: "POST",
    headers: {
      JwtToken: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create announcement");
  }

  const announcement = await response.json();
  const fileName = `${announcement.announcementId}.${fileExt}`;
  const imagePath = path.join(
    process.cwd(),
    "public",
    "AnnouncementImages",
    fileName
  );
  const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
  await fs.writeFile(imagePath, imageBuffer);

  revalidateTag("userAnnouncements");
  return announcement;
}

export async function submitUpdatedAnnouncement(
  formData: FormData,
  token: string
) {
  const file2 = formData.get("imageFile") as File;
  if (file2.size > 0) {
    const announcementTitle = formData.get("title")?.toString();
    const fileExtention = announcementTitle?.slice(
      announcementTitle.lastIndexOf(".")
    );
    const oldImagePath = path.join(
      process.cwd(),
      "public",
      "AnnouncementImages",
      `${formData.get("announcementId")}${fileExtention}`
    );

    try {
      await fs.unlink(oldImagePath);
    } catch (err) {
      console.warn("Could not delete old image (may not exist):", err);
    }
  }

  const announcementId = formData.get("announcementId")?.toString();
  console.log("Announcement ID is ", announcementId);

  const response = await fetch(
    `${BASE_URL}/api/announcements/${announcementId}`,
    {
      method: "PATCH",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        announcementId: formData.get("announcementId"),
        title: formData.get("title"),
        description: formData.get("description"),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update announcement");
  }
}

export async function deleteAnnouncement(
  announcementId: string,
  token: string
) {
  const response = await fetch(
    `${BASE_URL}/api/announcements/${announcementId}`,
    {
      method: "DELETE",
      headers: {
        JwtToken: `${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete announcement");
  }
}

export async function getAllAnnouncements(
  page: number = 1,
  token: string
): Promise<any> {
  const response = await fetch(`${BASE_URL}/api/announcements?page=${page}&type=all`, {
    headers: {
      JwtToken: `${token}`,
    },
    next: { tags: ["announcements"] },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch announcements");
  }
  const data = await response.json();

  console.log("response in action ...................................... ",data);
  return data;
}

export async function getUserAnnouncements(
  page: number = 1,
  token: string
): Promise<any> {
  const response = await fetch(`${BASE_URL}/api/announcements?page=${page}&type=user`, {
    method: "GET",
    next: { tags: ["userAnnouncements"] },
    headers: {
      JwtToken: `${token}`,
    },
  });
  // console.log("response from backend ",response.body);
  
  if (!response.ok) {
    throw new Error("Failed to fetch user announcements");
  }
  const data = await response.json();
    console.log(" route.js data in action........................", data);
  
  return data;
}
