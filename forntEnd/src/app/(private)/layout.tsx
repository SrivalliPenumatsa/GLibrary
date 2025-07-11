import ClientProvider from "../client";
import Sidebar from "../../components/shared/Sidebar";
import { ReactNode } from "react";


interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-screen max-h-screen bg-[#A38579]">
      <ClientProvider>
        <div className="flex h-full">
          <div className="w-45 h-full border-r border-[#DAD7CE] md:w-64">
            <Sidebar />
          </div>
          <div className="flex-1 h-screen p-6">{children}</div>
        </div>
      </ClientProvider>
    </div>
  );
}
