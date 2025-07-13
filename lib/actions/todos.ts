'use server'

import { redirect } from "next/navigation"
import { createClient } from "../supabase/server"
import { todoSchema, todoUpdateSchema } from "../validations/todo"
import { prisma } from "../prisma"
import { revalidatePath } from "next/cache"

export async function createTodo(formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const validatedFields = todoSchema.safeParse({title, description})

    if (!validatedFields.success) {
        return {error: 'Invalid input'}
    }

    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    try {
        await prisma.todo.create({
            data: {
                title: validatedFields.data.title,
                description: validatedFields.data.description,
                userId: user.id,
            },
        })

        revalidatePath('/')
        return {success: 'Todo created successfully'}
    } catch (error) {
        return { error: 'Failed to create todo' }
    }
}

export async function updateTodo(id: string, formData: FormData) {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const completed = formData.get('completed') === 'true'

    const validatedFields = todoUpdateSchema.safeParse({
        title,
        description,
        completed
    })

    if (!validatedFields.success) {
        return { error: 'Invalid input'}
    }

    const supabase = createClient()
    const { data: {user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    try {
        await prisma.todo.update({
            where: {
                id,
                userId: user.id
            },
            data: validatedFields.data
        })

        revalidatePath('/')
        return { success: 'Todo updated successfully' }
    } catch (error) {
        return { error: 'Failed to update todo'}
    }
}

export async function deleteTodo(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    try {
        await prisma.todo.delete({
            where: {
                id,
                userId: user.id
            },
        })

        revalidatePath('/')
        return { success: 'Todo deleted successfully' }
    } catch (error) {
        return { error: 'Failed to delete todo'}
    }
}

export async function toggleTodo(id: string) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/auth/signin')
    }

    try {
        const todo = await prisma.todo.findUnique({
            where: { id, userId: user.id }
        })

        if (!todo) {
            return { error: 'Todo not found' }
        }

        await prisma.todo.update({
            where: {id},
            data: { completed: !todo.completed}
        })

        revalidatePath('/')
        return { success: 'Todo updated successfully' }
    } catch (error) {
        return { error: 'Failed to update todo'}
    }
}