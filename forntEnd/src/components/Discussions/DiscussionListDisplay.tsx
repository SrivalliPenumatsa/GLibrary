import { Suspense } from "react";
import SkeletonLoader from "../shared/SkeletonLoader";
import { getDiscussions } from "@/services/discussions/actions";
import { Discussion } from "@/lib/types";

interface DiscussionListDisplayProps {
  bookId: string;
}

export default async function DiscussionListDisplay({
  bookId,
}: DiscussionListDisplayProps) {
  let discussions: Discussion[] = [];
  let error: string | null = null;


  try {
    discussions = await getDiscussions(bookId);
    console.log("Discussions fetched:", { count: discussions.length });
  } catch (err) {
    console.error(`Error fetching discussions for bookId=${bookId}:`, err);
    error = "Failed to load discussions. Please try again later.";
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="space-y-4 max-h-170 overflow-auto scrollbar-custom">
        {error && (
          <p className="text-[#C45E4C] p-4 bg-[#F5F1ED] rounded-lg border border-[#A38579]">
            {error}
          </p>
        )}
        {discussions.length === 0 && !error ? (
          <p className="text-gray-500 p-4 bg-gray-50 rounded-lg">
            No discussions yet. Start the conversation!
          </p>
        ) : (
          discussions.map((discussion) => (
            <div
              key={discussion.discussionId}
              className="p-2 flex flex-row gap-x-2 border border-gray-200 rounded-l-lg bg-white shadow-sm"
            >
              <span className="min-w-50  p-2 px-4">
              <p className="font-semibold text-gray-800">
                {discussion.userName}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(discussion.createdAt).toLocaleString()}
              </p>
              </span>
              <span className=" p-2 ">
              <p className="text-gray-700 my-2">{discussion.content}</p>
              </span>
              {/* <p className="font-semibold text-gray-800">
                {discussion.userName}
              </p>
              <p className="text-gray-700 my-2">{discussion.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(discussion.createdAt).toLocaleString()}
              </p> */}
            </div>
          ))
        )}
      </div>
    </Suspense>
  );
}
