import AnnouncementsList from "@/components/Announcements/UserAnnouncements";
import CreateAnnouncementForm from "@/components/Announcements/CreateAnnouncementForm";
import { getUserAnnouncements } from "@/services/announcements/actions";

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParamsObj = await searchParams;

  const currentPage = Number(searchParamsObj.page) || 1;

  const { announcementDtos, total } = await getUserAnnouncements(
    currentPage,
  );

  return (
    <div className="max-h-220 bg-[#DAD7CE] p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnnouncementsList
          announcements={announcementDtos}
          total={total}
          currentPage={currentPage}
        />
        <CreateAnnouncementForm/>
      </div>
    </div>
  );
}
