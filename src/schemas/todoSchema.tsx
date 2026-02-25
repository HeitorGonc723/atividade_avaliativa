import { z } from "zod"

export const taskSchema = z.object({
    title: z.string().min(5, "Título deve ter no mínimo 5 caracteres"),
    category: z.string().min(1, "Selecione um tipo de tarefa"),
})

export type TaskFormData = z.infer<typeof taskSchema>