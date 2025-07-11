import { notFound } from 'next/navigation';

interface BookContentPageProps {
  searchParams: Promise<{ file?: string }>;
}

export default async function BookContentPage({ searchParams }: BookContentPageProps) {
  const params = await searchParams;
  if (!params.file) {
    notFound();
  }

  const pdfUrl = `/uploads/${params.file}.pdf`;

  return (
    <div className="h-220 p-6 bg-[#DAD7CE]">
      <div className="w-full h-210 bg-[#F5F1ED] p-2 rounded-lg border border-[#A38579]">
        <iframe 
          className="w-full h-full border-0 rounded-md"
          src={pdfUrl}
          title={params.file}
        />
      </div>
    </div>
  );
}