import { z } from 'zod';

export const todoSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title too long'),
    description: z.string().max(500, 'Description too long').optional(),
})

export const todoUpdateSchema = todoSchema.partial().extend({
    completed: z.boolean().optional(),
})

export type TodoInput = z.infer<typeof todoSchema>
export type TodoUpdateInput = z.infer<typeof todoUpdateSchema>