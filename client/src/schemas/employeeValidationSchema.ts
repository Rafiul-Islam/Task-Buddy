import { z } from "zod";
import { UserFormData, Role } from "@/types/userType";
import { ROLE } from "@/constants/role";

export const employeeFormSchema = z.object({
  name: z
    .string()
    .min(1, "Employee name is required")
    .min(2, "Employee name must be at least 2 characters")
    .max(100, "Employee name must be less than 100 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be between 6 and 12 characters long")
    .max(12, "Password must be between 6 and 12 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),

  role: z
    .enum([ROLE.SHOP_OWNER, ROLE.SHOP_MANAGER, ROLE.SHOP_STAFF] as [ Role, Role, Role])
    .refine((val) => val !== undefined, {
      message: "Role is required",
    }),

  verified: z.boolean(),
}) satisfies z.ZodType<UserFormData>;
