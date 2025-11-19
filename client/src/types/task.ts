export type TASK_PRIORITY = "LOW" | "MEDIUM" | "HIGH";
export type TASK_STATUS = "TODO" | "IN_PROGRESS" | "COMPLETED";

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TASK_PRIORITY;
  status: TASK_STATUS;
}