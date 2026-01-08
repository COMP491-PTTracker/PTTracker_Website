'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    // DEBUG: Check environment variables
    console.log('=== DEBUG: Login Attempt ===')
    console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...')
    console.log('ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    console.log('SERVICE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    console.log('Attempting sign in for:', data.email)

    const { data: signInData, error } = await supabase.auth.signInWithPassword(data)

    console.log('Sign in result - error:', error?.message || 'none')
    console.log('Sign in result - user id:', signInData?.user?.id || 'no user')

    if (error) {
        return { error: error.message }
    }

    const user = signInData.user

    if (user) {
        console.log('Fetching profile for user id:', user.id)

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        console.log('Profile query result:', { profile, error: profileError?.message })

        if (profile) {
            // Redirect doctors/admins to doctor dashboard, patients to patient dashboard
            const isStaff = profile.role === 'admin' || profile.role === 'doctor'
            const redirectPath = isStaff ? '/dashboard/doctor' : '/dashboard/patient'
            console.log('Redirecting to:', redirectPath)
            revalidatePath('/', 'layout')
            redirect(redirectPath)
        }
    }

    console.log('=== DEBUG: Login failed - no profile found ===')
    return { error: 'Failed to get user profile' }
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}

export async function getCurrentUser() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return null
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

    return profile
}

export async function changePassword(formData: FormData) {
    const supabase = await createClient()

    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    // Validate passwords match
    if (newPassword !== confirmPassword) {
        return { error: 'New passwords do not match' }
    }

    // Get current user
    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user || !user.email) {
        return { error: 'You must be logged in to change your password' }
    }

    // Step A: Verify identity by signing in with current password
    const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
    })

    if (verifyError) {
        return { error: 'Current password is incorrect' }
    }

    // Step B: Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    })

    if (updateError) {
        return { error: updateError.message }
    }

    return { success: true }
}
