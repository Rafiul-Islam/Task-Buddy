export interface Credential {
  email: string;
  password: string;
  token?: string;
}

export interface CustomUser {
  id: number;
  fullname: string;
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
