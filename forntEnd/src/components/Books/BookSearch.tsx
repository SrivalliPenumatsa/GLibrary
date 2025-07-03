"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { displayGenres } from "@/lib/genreMap";

export default function BookSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [genre, setGenre] = useState(searchParams.get("genre") || "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (genre) params.set("genre", genre);
    router.push(`/books?${params.toString()}`);
  };

  return (
    <div className="flex flex-row w-110 space-y-2 space-x-4 p-2 pb-1 bg-[#F5F1ED] rounded-lg border border-[#A38579] ">
      <span className="flex flex-col space-y-2 ">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or author"
          className="w-80 h-6 pl-2 pt-0 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] bg-[#DAD7CE] text-[#29221F] text-sm"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-80 h-6 pl-2 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] bg-[#DAD7CE] text-[#29221F] text-sm"
        >
          <option value="">All Genres</option>
          {displayGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </span>
      <span>
        <button
          onClick={handleSearch}
          className="w-20 h-14 p-3 bg-[#A38579] text-white rounded-lg hover:bg-[#92786D]  font-medium"
        >
          Search
        </button>
      </span>
    </div>
  );
}
