import UploadForm from "@/components/Books/UploadForm";
import { cookies } from "next/headers";

export default async function UploadBook() {
  const token = (await cookies()).get("authToken")?.value;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-[#DAD7CE] rounded-xl shadow-lg border border-[#A38579] flex flex-col md:flex-row gap-6">
      {/* Static Content*/}
      <div className="md:w-2/5 bg-[#F5F1ED] p-4 rounded-lg shadow-inner border border-[#A38579] m-4">
        <h3 className="text-lg font-semibold mb-4">
          Write and Share More Books!
        </h3>
        <ul className="list-disc list-inside space-y-2 text-[#29221F]">
          <li>Be creative — let your imagination run wild!</li>
          <li>Write in different genres to reach more readers.</li>
          <li>Share your stories to inspire others.</li>
          <li>Use images and PDFs to make your books more engaging.</li>
          <li>Keep writing — the more you share, the better you get!</li>
        </ul>
        <p className="mt-4 text-sm text-[#81322A] font-medium">
          Need inspiration? Explore popular books or browse our community
          stories!
        </p>
        <p className="mt-2 text-sm text-[#29221F]">
          Remember, every writer starts somewhere. Keep writing and sharing your
          stories with the world!
        </p>
      </div>

      {/* Upload Form */}
      <div className="md:w-2/3 m-4">
        <div>
          <UploadForm token={token} />
        </div>
      </div>
    </div>
  );
}
