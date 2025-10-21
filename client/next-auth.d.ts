import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    userId?: number;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: {
      userId?: number;
      accessToken?: string;
      refreshToken?: string;
      accessTokenExpires?: number | null;
    } & DefaultSession["user"];
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId?: number;
    name?: string;
    email?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number | null;
    error?: string;
  }
}
