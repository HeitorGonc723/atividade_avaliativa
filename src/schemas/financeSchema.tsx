import { z } from "zod"

export const financeSchema = z.object({
    description: z.string().min(3, "Preencha a descrição"),

    amount: z
        .string()
        .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
            message: "O valor não deve ser nulo ou negativo",
        }),

    type: z.enum(["income", "expense"], {
        message: "Selecione o tipo",
    }),

    date: z.string().min(1, "Preencha a data"),
})

export type financeFormData = z.infer<typeof financeSchema>