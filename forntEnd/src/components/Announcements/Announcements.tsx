"use client";

import { useEffect, useState } from "react";
import { getAllAnnouncements } from "@/services/announcements/actions";
import { Announcement } from "@/lib/types";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useSession } from "next-auth/react";
import SkeletonLoader from "@/components/shared/SkeletonLoader";

type Props = {
  token?: string;
};

export default function Announcements({ token }: Props) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const session = useSession();

  const fetchAnnouncements = async (page: number) => {
    setLoading(true); 
    try {
      const { announcementDtos, total } =
        await getAllAnnouncements(page, token!);

      setAnnouncements(announcementDtos);
      setTotal(total);
    } catch (err) {
      console.error("Announcements component error:", err);
      setError("Failed to load announcements. Please try again later.");
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const eventSource = new EventSourcePolyfill(
      "http://localhost:3001/announcements/stream",
      {
        headers: {
          Authorization: `Bearer ${session.data?.accessToken}`,
          JwtToken: `${token}`,
        },
        heartbeatTimeout: 95000,
        withCredentials: true,
      }
    );

    eventSource.onmessage = (e) => {
      try {
        const event = JSON.parse(e.data);
        const { type, data } = event;
        switch (type) {
          case "CREATE":
            setAnnouncements((prev) => [data, ...prev]);
            setTotal((prev) => prev + 1);
            break;
          case "UPDATE":
            setAnnouncements((prev) =>
              prev.map((ann) =>
                ann.announcementId === data.announcementId ? data : ann
              )
            );
            break;
          case "DELETE":
            setAnnouncements((prev) =>
              prev.filter((ann) => ann.announcementId !== data._id)
            );
            setTotal((prev) => prev - 1);
            break;
          case "HEARTBEAT":
            break;
          default:
            console.warn("Unhandled event type:", type);
        }
      } catch (err) {
        console.error("Error parsing SSE message:", err);
      }
    };

    eventSource.onerror = (e) => {
      console.log("SSE Connection error:", e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [session.data?.accessToken]);

  // useEffect(() => {
  //   console.log("Total changed:", total);
  // }, [total]);

  return (
    <div className="min-h-screen bg-[#A38579] p-6">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="p-4 mb-6 bg-[#C45E4C] text-white rounded-lg font-medium">
            {error}
          </div>
        )}

        {loading ? (
          <SkeletonLoader />
        ) : announcements.length === 0 && !error ? (
          <p className="text-[#29221F] text-center py-8 font-medium">
            No announcements found.
          </p>
        ) : (
          <>
            {/* announcements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <div
                  key={announcement.announcementId}
                  className="bg-[#DAD7CE] rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] border border-[#F5F1ED]"
                >
                  <div className="bg-[#F5F1ED] p-4 flex justify-center">
                    <img
                      src={`/AnnouncementImages/${
                        announcement.announcementId
                      }.${announcement.title.slice(
                        announcement.title.lastIndexOf(".") + 1
                      )}`}
                      alt={announcement.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#29221F] mb-2">
                      {announcement.title.slice(
                        0,
                        announcement.title.lastIndexOf(".")
                      )}
                    </h3>
                    <p className="text-[#29221F] mb-4">
                      {announcement.description}
                    </p>
                    <p className="text-sm text-[#81322A] font-medium">
                      {new Date(announcement.createdAt).toLocaleString()}
                    </p>
                    <p className="text-sm text-[#81322A] font-medium">
                      {announcement.userName}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setCurrentPage((prev) => prev - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>
              <span className="text-[#29221F] font-medium">
                Page {currentPage} of {Math.ceil(total / 10)}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === Math.ceil(total / 10)}
                className="px-4 py-2 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
