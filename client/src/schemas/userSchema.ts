import {z} from "zod";

export const userSchema = z.object({
  email: z.string().trim()
  .email({message: "Invalid email address"})
  .min(1, {message: "Name is required"})
  .max(100, {message: "Name must be at most 100 characters"}),

  fullname: z.string().trim()
  .min(1, {message: "Name is required"})
  .min(3, {message: "Name must be at least 3 characters"})
  .max(100, {message: "Name must be at most 100 characters"}),
});

export type userFormData = z.infer<typeof userSchema>;


export const updateUserSchema = z.object({
  fullname: z.string().trim()
  .min(1, {message: "Name is required"})
  .min(3, {message: "Name must be at least 3 characters"})
  .max(100, {message: "Name must be at most 100 characters"}),
});

export type updateUserFormData = z.infer<typeof updateUserSchema>;