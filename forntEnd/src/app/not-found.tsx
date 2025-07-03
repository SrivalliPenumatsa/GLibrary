import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#DAD7CE] flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center bg-[#F5F1ED] p-8 rounded-xl shadow-lg ">
        <h2 className="text-2xl font-bold text-[#29221F] mb-4">Page Not Found</h2>
        <p className="text-[#29221F] mb-6 font-medium">
          Oops! The page you're looking for doesn't exist. Let's get back to explore stories!
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#C45E4C] text-white rounded-lg hover:bg-[#B05444] transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}