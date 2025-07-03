"use client";

import { displayGenres } from "@/lib/genreMap";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
type Props = {
  token?: string;
};
export default function UploadForm({ token }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
  });
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const router = useRouter();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type !== "application/pdf") {
      setUploadStatus("Only PDF files are allowed for the book.");
      setBookFile(null);
    } else {
      setBookFile(file);
      setUploadStatus("");
    }
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !file.type.startsWith("image/")) {
      setUploadStatus("Only image files are allowed for the cover.");
      setImageFile(null);
    } else {
      setImageFile(file);
      setUploadStatus("");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookFile) {
      setUploadStatus("Please upload a PDF file.");
      return;
    }

    if (!imageFile) {
      setUploadStatus("Please upload a book cover image.");
      return;
    }

    const isFormComplete = Object.values(formData).every(Boolean);
    if (!isFormComplete) {
      setUploadStatus("Please fill out all fields.");
      return;
    }

    setUploadStatus("Uploading...");
    const bookData = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/books", {
        method: "POST",
        body: bookData,
        credentials: "include",
        headers: {
          JwtToken: `${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed.");
      }

      const result = await response.json();
      console.log("Upload success:", result);
      setUploadStatus("Upload successful!");
      router.push("/");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed.";
      console.error("Upload error:", err);
      setUploadStatus(`Upload failed: ${message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#DAD7CE] rounded-xl shadow-lg border border-[#A38579]">
      <h2 className="text-xl font-bold mb-6 text-[#29221F]">
        Upload your story
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          className="w-full p-3 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] bg-[#F5F1ED] text-[#29221F]"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
          className="w-full p-3 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] bg-[#F5F1ED] text-[#29221F]"
          required
        />
        <select
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className="w-full p-3 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] bg-[#F5F1ED] text-[#29221F]"
          required
        >
          <option value="">Select a genre</option>
          {displayGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full p-3 border border-[#A38579] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C45E4C] overflow-auto max-h-[200px] bg-[#F5F1ED] text-[#29221F]"
          required
        />
        <label className="block">
          <span className="block font-semibold mb-2 text-[#29221F]">
            Book PDF
          </span>
          <input
            name="file"
            type="file"
            accept="application/pdf"
            onChange={handleBookFileChange}
            className="w-full p-2 border border-[#A38579] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C45E4C] file:text-white hover:file:bg-[#B05444] bg-[#DAD7CE]"
            required
          />
        </label>
        <label className="block">
          <span className="block font-semibold mb-2 text-[#29221F]">
            Book Cover Image
          </span>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="w-full p-2 border border-[#A38579] rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C45E4C] file:text-white hover:file:bg-[#B05444] bg-[#DAD7CE]"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full p-3 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] focus:outline-none focus:ring-2 focus:ring-[#81322A] font-medium transition-colors"
        >
          Upload Book
        </button>
        {uploadStatus && (
          <p
            className={`text-sm mt-4 ${
              uploadStatus.includes("success")
                ? "text-[#81322A]"
                : "text-[#C45E4C]"
            }`}
          >
            {uploadStatus}
          </p>
        )}
      </form>
    </div>
  );
}
