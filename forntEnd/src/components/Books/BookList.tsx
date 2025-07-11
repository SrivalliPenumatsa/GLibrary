import { Suspense } from "react";
import Link from "next/link";
import SkeletonLoader from "../shared/SkeletonLoader";
import { Book } from "@/lib/types";
import { cookies } from "next/headers";

interface BookListProps {
  search?: string;
  genre?: string;
}

export default async function BookList({ search, genre }: BookListProps) {
  let books: Book[] = [];
  let error: string | null = null;

  const token = (await cookies()).get("accessToken")?.value;
  try {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (genre) params.set("genre", genre);
    const queryString = params.toString();
    const url = queryString ? `/api/books?${queryString}` : "/api/books";
    console.log(`Fetching books: ${url}`);

    const response = await fetch(`http://localhost:3000${url}`, {
      method: "GET",
      headers: {
        accessToken: `${token}`,
        "Content-Type": "application/json",
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();
    books = data;
    console.log("Books fetched:", { count: books.length });
  } catch (err) {
    console.error("BookList error:", err);
    error = "Failed to load books. Please try again later.";
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <div className="space-y-4 max-h-[80vh] overflow-auto pr-2">
        {error && (
          <div className="p-3 bg-[#F5F1ED] text-[#C45E4C] rounded-lg border border-[#A38579]">
            {error}
          </div>
        )}
        {books.length === 0 && !error ? (
          <p className="text-[#81322A] p-4 bg-[#F5F1ED] rounded-lg">
            No books found.
          </p>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-[#29221F] mb-6">
              Popular Books
            </h2>
            <div className="flex flex-col gap-3">
              {books.map((book) => (
                <Link
                  key={book.bookId}
                  href={`/book/${book.bookId}`}
                  className="block border border-[#A38579] p-4 rounded-lg hover:bg-[#E8E3DC] bg-[#F5F1ED] transition-colors min-w-[250px] flex-1"
                >
                  <h3 className="font-bold text-[#29221F]">{book.title}</h3>
                  <p className="text-[#29221F]">{book.author}</p>
                  <p className="text-sm text-[#81322A]">{book.genre}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Suspense>
  );
}
