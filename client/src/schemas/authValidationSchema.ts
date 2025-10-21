import { z } from "zod";

const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: "Password is required" })
.min(6, {message: 'Password must be at least 8 characters'})
.max(12, {message: 'Password must be at most 12 characters'})
.regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
.regex(/[a-z]/, {message: 'Password must contain at least one lowercase letter'})
.regex(/[0-9]/, {message: 'Password must contain at least one number'})
.regex(/[^A-Za-z0-9]/, {message: 'Password must contain at least one special character'});

const emailSchema = z
  .string()
  .trim()
  .max(50, { message: "Email must be at most 50 characters" })
  .email({ message: "Invalid email address" })
  .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "Invalid email format",
  });

export const signinSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be at most 100 characters" }),
  email: emailSchema,
  password: passwordSchema,
});
