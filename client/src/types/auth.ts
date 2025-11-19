export interface CredentialsType {
  email: string;
  password: string;
}

export interface CustomUserType {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  accessToken: string;
  refreshToken: string;
  image?: string | null;
}

export interface ApiResponseType<T> {
  success: boolean;
  message: string;
  payload: T;
}

export const ERROR_TYPE_TO_FORCE_LOGOUT = "RefreshAccessTokenError";
