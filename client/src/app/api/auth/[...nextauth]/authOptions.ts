import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {httpClient} from "@/lib/http-client";
import {
  Credential,
  CustomUser,
  ERROR_TYPE_TO_FORCE_LOGOUT,
  ApiResponse,
} from "@/types/auth";
import { JWT } from "next-auth/jwt";
import {
  AUTH_API_ENDPOINTS,
  AUTH_MESSAGES,
  AUTH_PROVIDERS,
  AUTH_ROUTES,
} from "@/constants/auth";
import axios from "axios";

function getJwtExpiry(token: string): number | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));
    if (!payload.exp) return null;
    return payload.exp * 1000;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await httpClient.post<ApiResponse<{ accessToken: string }>>(AUTH_API_ENDPOINTS.REFRESH, {refreshToken: token.refreshToken});
    const newAccessToken = data?.payload?.accessToken;
    return {
      ...token,
      accessToken: newAccessToken,
      accessTokenExpires: newAccessToken
        ? getJwtExpiry(newAccessToken)
        : token.accessTokenExpires,
    };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      console.warn("Refresh token invalid/expired (401). Forcing sign-out.");
      return {
        ...token,
        accessToken: undefined,
        refreshToken: undefined,
        accessTokenExpires: undefined,
        error: ERROR_TYPE_TO_FORCE_LOGOUT,
      };
    }

    console.error("Error refreshing access token:", err);
    return {
      ...token,
      error: ERROR_TYPE_TO_FORCE_LOGOUT,
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: AUTH_PROVIDERS.CREDENTIALS.ID,
      name: AUTH_PROVIDERS.CREDENTIALS.NAME,
      credentials: {},
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials as Credential;
          if (!email || !password)
            throw new Error(AUTH_MESSAGES.SIGN_IN.FAILURE);

          const { data } = await httpClient.post<
            ApiResponse<CustomUser>
          >(AUTH_API_ENDPOINTS.SIGN_IN.CREDENTIALS, {
            email,
            password,
          });
          const user = data?.payload;
          if (!user) return null;
          return { ...user, id: String(user.id), userId: user.id };
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            const message = (
              err.response?.data as { message?: string } | undefined
            )?.message;
            throw new Error(message || AUTH_MESSAGES.SIGN_IN.FAILURE);
          }
          if (err instanceof Error) {
            throw new Error(err.message || AUTH_MESSAGES.SIGN_IN.FAILURE);
          }
          throw new Error(AUTH_MESSAGES.SIGN_IN.FAILURE);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }): Promise<JWT> {
      // --- Handle session update trigger ---
      if (trigger === "update" && session?.user) {
        return {
          ...token,
          userId: token.userId,
          name: session.user.fullname ?? token.name,
          email: session.user.email ?? token.email,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          accessTokenExpires: token.accessTokenExpires,
        };
      }

      // --- First-time login with credentials ---
      if (user) {
        const u = user as unknown as Partial<CustomUser>;
        const accessToken = u.accessToken ?? token.accessToken;
        return {
          ...token,
          userId: (u.id as number | undefined) ?? (token as JWT).userId,
          name: u.fullname ?? token.fullname,
          email: u.email ?? token.email,
          accessToken,
          refreshToken: u.refreshToken ?? token.refreshToken,
          accessTokenExpires: accessToken
            ? getJwtExpiry(accessToken)
            : token.accessTokenExpires,
        };
      }

      // --- Returning user: still valid? ---
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }

      // --- Expired: try refresh ---
      try {
        return await refreshAccessToken(token);
      } catch (err) {
        console.error("JWT refresh failed:", err);
        return {
          ...token,
          error: ERROR_TYPE_TO_FORCE_LOGOUT,
        };
      }
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        userId: token.userId,
        name: token.name ?? "",
        email: token.email ?? "",
        accessToken: token.accessToken ?? "",
        refreshToken: token.refreshToken ?? "",
        accessTokenExpires: token.accessTokenExpires,
      };

      if (token.error) {
        session.error = token.error;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allow callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: AUTH_ROUTES.SIGN_IN,
    // Remove error page to prevent automatic redirects on credential errors
    // error: AUTH_ROUTES.ERROR,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
