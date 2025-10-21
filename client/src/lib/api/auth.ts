const ROOT = "/auth"

export const AUTH = {
  LOGIN: `${ROOT}/login`,
  REGISTER: `${ROOT}/registration`,
  REFRESH: `${ROOT}/refresh`,
  ME: `${ROOT}/me`,
} as const;


