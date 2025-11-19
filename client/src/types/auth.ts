export interface Credential {
  email: string;
  password: string;
}

export interface CustomUser {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  accessToken: string;
  refreshToken: string;
  image?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  payload: T;
}

export const ERROR_TYPE_TO_FORCE_LOGOUT = "RefreshAccessTokenError";
