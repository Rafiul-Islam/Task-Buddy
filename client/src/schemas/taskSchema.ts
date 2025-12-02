import {z} from "zod";

export const taskSchema = z.object({
  title: z
  .string()
  .trim()
  .min(1, {message: "Title is required"})
  .min(3, {message: "Title must be at least 3 characters"})
  .max(100, {message: "Title must be at most 100 characters"}),

  description: z
  .string()
  .trim()
  .min(1, {message: "Description is required"})
  .min(10, {message: "Description must be at least 10 characters"})
  .max(500, {message: "Description must be at most 500 characters"}),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {message: "Priority is required"})
  .describe("Priority is required"),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"], {message: "Status is required"})
  .describe("Status is required")
});

export type TaskAddFormData = z.infer<typeof taskSchema>;