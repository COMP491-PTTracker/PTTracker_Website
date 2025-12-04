'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/types/database'

export async function getAllPatients() {
    const supabase = await createClient()

    const { data: patients, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'patient')
        .order('full_name', { ascending: true })

    if (error) {
        console.error('Error fetching patients:', error)
        return []
    }

    return patients
}

export async function createPatient(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('full_name') as string

    // Use admin client to create user without logging out current user
    const adminSupabase = createAdminClient()

    // Create auth user
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authData.user) {
        return { error: 'Failed to create user' }
    }

    // Update profile (trigger already created it with default values)
    // The database trigger handle_new_user automatically creates a profile row
    // when a new user is created, so we just need to update it with the full_name
    const updateData: Database['public']['Tables']['profiles']['Update'] = {
        full_name: fullName,
    }

    const { error: profileError } = await adminSupabase
        .from('profiles')
        // @ts-expect-error - Supabase admin client has type inference issues with Database generic
        .update(updateData)
        .eq('id', authData.user.id)

    if (profileError) {
        // If profile update fails, delete the auth user
        await adminSupabase.auth.admin.deleteUser(authData.user.id)
        return { error: profileError.message }
    }

    revalidatePath('/dashboard/doctor')
    return { success: true }
}

export async function getPatientExerciseLogs(patientId: string) {
    const supabase = await createClient()

    const { data: logs, error } = await supabase
        .from('exercise_logs')
        .select('*')
        .eq('user_id', patientId)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching exercise logs:', error)
        return []
    }

    return logs
}
