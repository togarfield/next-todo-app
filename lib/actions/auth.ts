'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "../supabase/server"
import { signInSchema, signUpSchema } from "../validations/auth"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const validatedFields = signInSchema.safeParse({ email, password })

    if (!validatedFields.success) {
        return {error: 'Invalid input'}
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return {error: error.message}
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signUp(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    const validatedFields = signUpSchema.safeParse({
        email,
        password,
        confirmPassword
    })

    if (!validatedFields.success) {
        return {error: 'Invalid input'}
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return {error: error.message}
    }

    return {success: 'Please check your email to confirm your account'}
}

export async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/' , 'layout')
    redirect('/auth/signin')
}