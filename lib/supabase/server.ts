import  { createServerClient } from '@supabase/ssr';
import {cookies } from 'next/headers';

export const createClient = () => {
    const cookieStore = cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                async getAll() {
                    return (await cookieStore).getAll()
                },
                setAll(cookiesToSet) {
                    // Cookie setting is disabled for Server Components
                    // Supabase SSR handles authentication cookies via middleware
                }
            }
        }
    )
}