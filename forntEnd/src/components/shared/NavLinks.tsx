'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
type Props = {
  token?: string;
};
export default function NavLinks( { token }: Props) {
  const pathname = usePathname();
return (
<nav className="space-y-2">
<Link
  href="/books"
  className={`block p-3 rounded-lg transition-colors duration-200 font-medium
    ${pathname === '/books' 
      ? 'bg-[#C45E4C] text-white shadow-md' 
      : 'bg-[#DAD7CE] text-[#29221F] hover:bg-[#C8C2B8]'}`}
>
  Books
</Link>
<Link
  href="/myAnnouncements"
  className={`block p-3 rounded-lg transition-colors duration-200 font-medium
    ${pathname === '/myAnnouncements' 
      ? 'bg-[#C45E4C] text-white shadow-md' 
      : 'bg-[#DAD7CE] text-[#29221F] hover:bg-[#C8C2B8]'}`}
>
     My Announcements
</Link>
<Link
  href="/upload"
  className={`block p-3 rounded-lg transition-colors duration-200 font-medium
    ${pathname === '/upload'  
      ? 'bg-[#C45E4C] text-white shadow-md' 
      : 'bg-[#DAD7CE] text-[#29221F] hover:bg-[#C8C2B8]'}`}
>
Publish
</Link>
</nav>);
}
