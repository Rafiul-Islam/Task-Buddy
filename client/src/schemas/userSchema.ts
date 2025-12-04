import {z} from "zod";
import {confirmPasswordSchema, emailSchema, fullnameSchema, passwordSchema} from "@/schemas/authValidationSchema";

export const userSchema = z.object({
  email: emailSchema,
  fullname: fullnameSchema,
});
export type userFormData = z.infer<typeof userSchema>;


export const updateUserSchema = z.object({
  fullname: fullnameSchema,
});
export type updateUserFormData = z.infer<typeof updateUserSchema>;

export const changeUserPasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: confirmPasswordSchema
})
.refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["newPassword", "confirmPassword"],
});
export type changeUserPasswordFormData = z.infer<typeof changeUserPasswordSchema>;