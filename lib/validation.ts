import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must not be longer than 50 characters."),
  email: z.string().email("Invalid email address."),
  phone: z
    .string()
    .refine((phone) => {
      // Verifica se começa com +55 e tem o comprimento correto
      if (!phone?.startsWith("+55")) return false;
      
      // Remove o código do país (+55) para validação
      const number = phone.slice(3);
      
      // Valida números fixos (10 dígitos) e móveis (11 dígitos)
      return /^([1-9]{2})?([2-9]\d{7}|9\d{8})$/.test(number);
    }, {
      message: "Invalid Brazilian number. Use format: +55 (XX) XXXX-XXXX or +55 (XX) 9XXXX-XXXX"
    })
});