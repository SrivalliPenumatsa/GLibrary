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
    <div className="h-screen p-6 bg-[#DAD7CE]">
      <h1 className="text-2xl font-bold mb-4 text-[#29221F]">{params.file.replace('_', ' by ')}</h1>
      <div className="w-full h-[calc(100vh-120px)] bg-[#F5F1ED] p-2 rounded-lg border border-[#A38579]">
        <iframe 
          className="w-full h-full border-0 rounded-md"
          src={pdfUrl}
          title={params.file}
        />
      </div>
    </div>
  );
}