import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
     
      if (!account) {
        console.error("No account data available");
        return true; 
      }
      console.log("access token in sighIn ", account.access_token);
      try {
        const response = await fetch(`http://localhost:3001/auth/googleLogin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${account.access_token}`
          },
          body: JSON.stringify({
            googleId: account.providerAccountId,
            email: user.email,
            name: user.name,
          })
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate with backend');
        }

        const data = await response.json();
        
        if (data?.jwtToken) {
          (await cookies()).set('authToken', data.jwtToken, {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding user to backend:", error);
        return false; 
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = account.providerAccountId; 
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});