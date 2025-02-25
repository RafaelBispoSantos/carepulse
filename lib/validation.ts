import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must not be longer than 50 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => /^[0-9]{10}$/.test(phone), "Invalid phone number"),
});
