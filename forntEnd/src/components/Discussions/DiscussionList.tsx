import DiscussionListDisplay from "./DiscussionListDisplay";
import DiscussionForm from "./DiscussionForm";
import { cookies } from "next/headers";

interface DiscussionListProps {
  bookId: string;
}

export default async function DiscussionList({ bookId }: DiscussionListProps) {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Discussion</h2>
      <DiscussionListDisplay bookId={bookId} />
      <DiscussionForm bookId={bookId} token={token!} />
    </div>
  );
}
