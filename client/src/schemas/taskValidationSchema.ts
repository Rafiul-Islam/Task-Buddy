import {z} from "zod";

export const taskValidationSchema = z.object({
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
  priority: z.enum(["LOW", "MEDIUM", "HIGH"])
  .default("LOW")
  .describe("Priority is required"),
  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"])
  .default("TODO")
  .describe("Priority is required")
});

export type TaskFormData = z.infer<typeof taskValidationSchema>;
