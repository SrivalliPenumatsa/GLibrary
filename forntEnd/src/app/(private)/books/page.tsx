import BookSearch from "@/components/Books/BookSearch";
import BookList from "@/components/Books/BookList";

export default async function BooksPage({
  searchParams,
}: {
  searchParams: { search?: string; genre?: string };
}) {
  const { search, genre } = await searchParams;

  return (
    <div className="bg-[#F5F1ED] min-h-220 rounded-sm relative">
      <div className="fixed top-9 right-21 z-50">
        <BookSearch />
      </div>

      <div className="p-8 pt-12">
        <BookList search={search} genre={genre} />
      </div>
    </div>
  );
}
