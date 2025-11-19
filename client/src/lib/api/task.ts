const ROOT = "/tasks";

export const TASK = {
  GET: {
    ALL: `${ROOT}`,
    DETAILS: (id: number) => `${ROOT}/${id}`,
  },
  CREATE: `${ROOT}`,
  UPDATE: (id: number) => `${ROOT}/${id}`,
  DELETE: (id: number) => `${ROOT}/${id}`,
} as const;