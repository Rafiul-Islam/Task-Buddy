import { signIn, signOut } from "next-auth/react";
import { z } from "zod";
import { signinSchema } from "@/schemas/authValidationSchema";
import { AUTH_MESSAGES, AUTH_PROVIDERS, AUTH_ROUTES } from "@/constants/auth";
import { toast } from "react-toastify";

type SigninData = z.infer<typeof signinSchema>;

type LoginResult = {
  success: boolean;
  error?: string;
  result?: {
    ok?: boolean;
    url?: string | null;
    status?: number;
  };
};

export const doCredentialLogin = async ({data}: { data: SigninData}): Promise<LoginResult> => {
  const { email, password } = data;
  const result = await signIn(AUTH_PROVIDERS.CREDENTIALS.TYPE, {
    email,
    password,
    redirect: false,
    callbackUrl: AUTH_ROUTES.SIGN_IN,
  });

  if (result?.error) {
    console.log("Authentication failed:", result.error, AUTH_MESSAGES.SIGN_IN.FAILURE);
    return { success: false, error: AUTH_MESSAGES.SIGN_IN.FAILURE };
  }

  if (result?.ok) {
    toast.success(AUTH_MESSAGES.SIGN_IN.SUCCESS);
    window.location.href = AUTH_ROUTES.SIGN_IN;
    return { success: true, result };
  }

  console.log("Unexpected authentication result:", result);
  return { success: false, error: AUTH_MESSAGES.SIGN_IN.ERROR };
};

export const doLogout = async () => {
  try {
    await signOut({
      redirect: true,
      callbackUrl: AUTH_ROUTES.SIGN_IN,
    });
  } catch (error) {
    console.debug(AUTH_MESSAGES.SIGN_OUT.ERROR, error);
  }
};
