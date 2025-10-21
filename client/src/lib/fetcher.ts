import { getSession } from "next-auth/react";

interface ApiError extends Error {
  status: number;
  response: {
    status: number;
    statusText: string;
    data: unknown;
  };
}

export const fetcher = async <T>(
  path: string,
  options?: RequestInit
): Promise<T> => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_API_URL}${path}`);

  const session = await getSession(); // works in client components

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options?.headers as Record<string, string>) || {}),
  };

  if (session?.user?.accessToken) {
    headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  try {
    const res = await fetch(url.toString(), {
      ...options,
      headers,
    });

    if (!res.ok) {
      const error = new Error(
        `API error: ${res.status} - ${res.statusText}`
      ) as ApiError;
      error.status = res.status;
      error.response = {
        status: res.status,
        statusText: res.statusText,
        data: await res.json().catch(() => null),
      };
      console.error(error);
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error("Fetcher error:", err);
    throw err;
  }
};
