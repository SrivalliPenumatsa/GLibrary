import AnnouncementsList from "@/components/Announcements/UserAnnouncements";
import CreateAnnouncementForm from "@/components/Announcements/CreateAnnouncementForm";
import { getUserAnnouncements } from "@/services/announcements/actions";
import { cookies } from "next/headers";

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsObj = await searchParams;

  const token = (await cookies()).get("authToken")?.value;
  const currentPage = Number(searchParamsObj.page) || 1;

  const { announcementDtos, total } = await getUserAnnouncements(
    currentPage,
    token!
  );

  return (
    <div className="min-h-screen bg-[#DAD7CE] p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnnouncementsList
          announcements={announcementDtos}
          total={total}
          currentPage={currentPage}
          token={token}
        />
        <CreateAnnouncementForm token={token} />
      </div>
    </div>
  );
}
