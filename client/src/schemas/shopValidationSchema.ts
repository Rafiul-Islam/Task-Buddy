import { z } from "zod";
import { ShopFormData } from "@/types/shop";

export const shopFormSchema = z.object({
  name: z
    .string()
    .min(1, "Shop name is required")
    .min(2, "Shop name must be at least 2 characters")
    .max(100, "Shop name must be less than 100 characters"),

  area: z
    .string()
    .min(1, "Area is required")
    .min(2, "Area must be at least 2 characters")
    .max(50, "Area must be less than 50 characters"),

  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be less than 50 characters"),

  district: z
    .string()
    .min(1, "District is required")
    .min(2, "District must be at least 2 characters")
    .max(50, "District must be less than 50 characters"),

  address: z
    .string()
    .min(1, "Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
}) satisfies z.ZodType<ShopFormData>;
