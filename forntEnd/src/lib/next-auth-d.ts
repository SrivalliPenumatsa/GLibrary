import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      name?: string;
      email?: string;
      image?: string;
      id?: string;
    };
  }

  interface User {
    id?: string;
  }

  interface JWT {
    accessToken?: string;
    id?: string;
  }
}
