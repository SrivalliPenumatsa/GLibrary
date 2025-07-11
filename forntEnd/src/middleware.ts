import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = new URL(request.url);
  console.log("path fe mdl", pathname);
  
    if (pathname === '/login' || pathname.startsWith('/api') || pathname.startsWith('/staticFiles')) {
      // console.log("(pathname === '/login' || pathname.startsWith('/api/auth') || pathname.startsWith('/staticFiles')", pathname);
      return NextResponse.next();
    }
    const token = (await cookies()).get('accessToken')?.value;
    if(!(token))
    {
      // console.log("cookies", (await cookies()).get('authToken')?.value);
      console.log(" no token.............................");
      
      return NextResponse.redirect(new URL("/login", request.url));
    }

    
  try {
    console.log(" Token ", token);
    
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jose.jwtVerify(token, secret);
    console.log(" Payload  ", payload);
    

    if (!payload.sub || !payload.exp) {
      throw new Error('Invalid token payload');
    }

    const sessionTimeout = 3600;
    const issuedAt = payload.iat ? payload.iat : 0;
    if (Date.now() / 1000 - issuedAt > sessionTimeout) {
      throw new Error('Session expired');
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', payload.sub);
    
    // return NextResponse.next({
    //   request: {
    //     headers: requestHeaders,
    //   },
    // });
    return NextResponse.next();


  } catch (error) {
    console.error('Token validation failed:', error);
    
    // const response = NextResponse.redirect(new URL("/login", request.url));
    // response.cookies.delete('authToken');
    
    // return response;
  }
    return NextResponse.next();
}
export const config = {
    matcher: ['/((?!_next|favicon.ico|api/auth).*)']
};