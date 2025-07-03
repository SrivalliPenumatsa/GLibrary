"use client";

import { Announcement } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditAnnouncementModal } from "./EditAnnouncementModel";

export default function AnnouncementsList({
  announcements,
  total,
  currentPage,
  token,
}: {
  announcements: Announcement[];
  total: number;
  currentPage: number;
  token?: string;
}) {
  const router = useRouter();
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/announcements?page=${newPage}`);
  };

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedAnnouncement(null);
    router.refresh();
  };

  return (
    <div className="bg-[#F5F1ED] p-6 rounded-xl shadow-md border border-[#A38579]">
      <h2 className="text-2xl font-bold text-[#29221F] mb-6">
        My Announcements
      </h2>

      {error && (
        <div className="p-3 mb-4 bg-[#C45E4C] text-white rounded-lg">
          {error}
        </div>
      )}

      {announcements.length === 0 ? (
        <p className="text-[#81322A] py-8 text-center">
          No announcements found.
        </p>
      ) : (
        <div className="flex flex-col h-full">
          <div
            className="flex flex-wrap gap-6 overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 300px)" }}
          >
            {announcements.map((announcement) => (
              <div
                key={announcement.announcementId}
                className="bg-[#F5F1ED] rounded-lg shadow-md border border-[#A38579] hover:shadow-2xl transition-shadow cursor-pointer min-w-[300px] flex-1"
              >
                <div
                  className="bg-[#DAD7CE] p-4 flex justify-center overflow-auto"
                  style={{ maxHeight: "200px" }}
                >
                  <img
                    src={`/AnnouncementImages/${
                      announcement.announcementId
                    }.${announcement.title.slice(
                      announcement.title.lastIndexOf(".") + 1
                    )}`}
                    alt={announcement.title}
                    className="w-full h-40 object-cover rounded"
                    onClick={() => handleAnnouncementClick(announcement)}
                  />
                </div>
                <div
                  className="p-4 overflow-auto"
                  style={{ maxHeight: "200px" }}
                >
                  <h3 className="text-lg font-semibold text-[#29221F] mb-2 line-clamp-2">
                    {announcement.title.slice(
                      0,
                      announcement.title.lastIndexOf(".")
                    )}
                  </h3>
                  <p className="text-[#29221F] text-sm mb-3 line-clamp-3">
                    {announcement.description}
                  </p>
                  <p className="text-xs text-[#81322A]">
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#A38579]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#A38579] text-white rounded-lg hover:bg-[#92786D] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-[#29221F]">
              Page {currentPage} of {Math.ceil(total / 10)}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(total / 10)}
              className="px-4 py-2 bg-[#A38579] text-white rounded-lg hover:bg-[#92786D] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <EditAnnouncementModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAnnouncement(null);
        }}
        announcement={selectedAnnouncement}
        setError={setError}
        onSuccess={handleEditSuccess}
        token={token!}
      />
    </div>
  );
}
