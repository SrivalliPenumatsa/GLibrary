import './globals.css';
import { UserProvider } from '@/services/contexts/UserContext';
import AuthWrapper from '@/components/auth/AuthWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
         {children}
        </UserProvider>
      </body>
    </html>
  );
}
  
