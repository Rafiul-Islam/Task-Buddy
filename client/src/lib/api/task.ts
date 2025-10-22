const ROOT = "/tasks";

export const TASK = {
  GET: {
    ALL: `${ROOT}`,
    DETAIL: `${ROOT}/:id`,
  },
  CREATE: `${ROOT}`,
  UPDATE: `${ROOT}/:id`,
  DELETE: `${ROOT}/:id`,
} as const;