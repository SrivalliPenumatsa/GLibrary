"use client";

interface BookContentProps {
  bookName: string;
}

export default function BookContent({ bookName }: BookContentProps) {
  const pdfUrl = `/uploads/${bookName}.pdf`;

  const sendAliveRequest = async () => {
    // await apiRequest();
  }

  return (
    <div className="max-h-[80vh] p-6">
      <h1 className="text-2xl font-bold mb-4">{bookName}</h1>
      <iframe
        src={pdfUrl}
        width="100%"
        height="600px"
        style={{ border: "none" }}
        title={bookName}
      />
    </div>
  );
}
