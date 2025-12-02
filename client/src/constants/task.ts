export const TASK_PRIORITIES = {
  LOW: {
    label: "Low",
    value: "LOW"
  },
  MEDIUM: {
    label: "Medium",
    value: "MEDIUM"
  },
  HIGH: {
    label: "High",
    value: "HIGH"
  }
};

export const TASK_STATUSES = {
  TODO: {
    label: "To Do",
    value: "TODO"
  },
  IN_PROGRESS: {
    label: "In Progress",
    value: "IN_PROGRESS"
  },
  COMPLETED: {
    label: "Completed",
    value: "COMPLETED"
  }
};

export type PriorityType = "LOW" | "MEDIUM" | "HIGH";
export type StatusType = "TODO" | "IN_PROGRESS" | "COMPLETED";
