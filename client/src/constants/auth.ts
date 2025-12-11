export const AUTH_PROVIDERS = {
  CREDENTIALS: {
    TYPE: "credentials",
    ID: "credentials",
    NAME: "Credentials",
  },
};

export const AUTH_ROUTES = {
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
};

export const AUTH_API_ENDPOINTS = {
  SIGN_IN: {
    CREDENTIALS: "/auth/login",
    CREDENTIALS_WITH_TOKEN: "/auth/login-with-email-verification-token",
  },
  REFRESH: "/auth/refresh",
};

export const AUTH_MESSAGES = {
  GENERIC: "Something went wrong",
  SIGN_IN: {
    SUCCESS: "You have successfully signed in.",
    FAILURE: "Invalid credentials. Please try again.",
    ERROR: "An error occurred while signing in.",
  },
  SIGN_OUT: {
    SUCCESS: "You have successfully signed out.",
    ERROR: "An error occurred while signing out.",
  },
};
