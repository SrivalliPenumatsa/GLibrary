import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  console.log("pathname from frontend middleware", pathname);
  
    if (pathname === '/login' || pathname.startsWith('/api') || pathname.startsWith('/staticFiles')) {
      console.log("(pathname === '/login' || pathname.startsWith('/api/auth') || pathname.startsWith('/staticFiles')", pathname);
      return NextResponse.next();
    }
    if(!((await cookies()).get('authToken')?.value))
    {
      console.log("cookies", (await cookies()).get('authToken')?.value);
      
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon.ico|api/auth).*)']
};