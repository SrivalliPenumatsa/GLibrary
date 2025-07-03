import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function LoginLayout({ children }: RootLayoutProps) {
  return (
            <div className="flex-1 h-full overflow-y-auto">{children}</div>
  );
}
