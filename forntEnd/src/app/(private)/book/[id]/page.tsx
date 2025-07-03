import { Suspense } from "react";
import Link from "next/link";
import SkeletonLoader from "@/components/shared/SkeletonLoader";
import DiscussionList from "@/components/Discussions/DiscussionList";
import { Book } from "@/lib/types";
import { cookies } from "next/headers";

export default async function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;
  let book: Book | null = null;
  let error: string | null = null;
  let path;
  const token = (await cookies()).get("authToken")?.value;
  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: "GET",
      headers: {
        JwtToken: `${token}`,
        "Content-Type": "application/json",
      },
      next: { tags: ["book"] },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch book");
    }

    const data = await response.json();
    book = data;
    console.log("Book fetched:");

    if (!book) throw new Error("Book not found");
    path = `/CoverPages/${book.title}_${book.author}`;
  } catch (err) {
    console.error("BookPage error:", err);
    error = "Failed to load book. Please try again later.";
  }

  if (error) {
    return (
      <Suspense fallback={<SkeletonLoader />}>
        <div className="p-6">
          <p className="text-[#C45E4C] p-3 bg-[#F5F1ED] rounded-lg border border-[#A38579]">
            {error}
          </p>
        </div>
      </Suspense>
    );
  }

  if (!book) {
    return (
      <Suspense fallback={<SkeletonLoader />}>
        <div className="p-6">
          <p className="text-[#81322A]">Book not found.</p>
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="flex flex-col lg:flex-row gap-8 p-6 bg-[#DAD7CE] min-h-screen">
        <div className="w-full lg:w-1/2 bg-[#F5F1ED] p-6 rounded-lg shadow-sm border border-[#A38579]">
          <h1 className="text-2xl font-bold text-[#29221F] mb-4">
            {book.title}
          </h1>
          <div className="space-y-3 mb-6">
            <p className="text-[#29221F]">
              <span className="font-semibold">Author:</span> {book.author}
            </p>
            <p className="text-[#29221F]">
              <span className="font-semibold">Genre:</span> {book.genre}
            </p>
            <p className="text-[#29221F]">
              <span className="font-semibold">Description:</span>{" "}
              {book.description}
            </p>
          </div>
          <img
            src={`${path}.jpg`}
            alt={book.title}
            className="w-80 h-120 object-cover rounded-lg my-4 border border-[#A38579]"
          />
          <Link
            href={`/book/${book.bookId}/content?file=${book.title}_${book.author}`}
            className="inline-block px-6 py-2 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] transition-colors font-medium"
          >
            Read Book
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <DiscussionList bookId={book.bookId} />
        </div>
      </div>
    </Suspense>
  );
}
