import { z } from "zod"

export const contactSchema = z.object({
    name: z
        .string()
        .min(3, "Preencha com o nome completo")
        .refine((value) => value.trim().split(" ").length >= 2, {
            message: "Preencha com o nome completo",
        }),

    email: z.string().email("Email inválido"),

    phone: z
        .string()
        .regex(/^\d{10,11}$/, "Telefone deve ter DDD e número"),
})

export type ContactFormData = z.infer<typeof contactSchema>