'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/types/database'

export async function getAllPatients() {
    const supabase = await createClient()

    const { data: patients, error } = await supabase
        .from('users')
        .select('*')
        .eq('role', 'patient')
        .order('first_name', { ascending: true })

    if (error) {
        console.error('Error fetching patients:', error)
        return []
    }

    return patients
}

export async function createPatient(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const firstName = formData.get('first_name') as string
    const lastName = formData.get('last_name') as string
    const nationalId = formData.get('national_id') as string
    const pinCode = formData.get('pin_code') as string
    const birthDate = formData.get('birth_date') as string
    const phone = formData.get('phone') as string
    const deviceId = formData.get('device_id') as string

    // Use admin client to create user without logging out current user
    const adminSupabase = createAdminClient()
    const supabase = await createClient()

    // Get current doctor's user_id to set as created_by
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
        return { error: 'Not authenticated' }
    }

    // Try to get doctor's id from doctors table (optional)
    const { data: doctorData } = await supabase
        .from('doctors')
        .select('id, hospital_id')
        .eq('user_id', currentUser.id)
        .single()

    // If no doctor profile exists, we'll use null for created_by and hospital_id
    const createdBy = doctorData?.id || null
    const hospitalId = doctorData?.hospital_id || null

    // Create auth user
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email
        user_metadata: {
            first_name: firstName,
            last_name: lastName,
            role: 'patient',
        },
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authData.user) {
        return { error: 'Failed to create user' }
    }

    // Update the user record with additional fields
    // The auth.users record is automatically created by createUser above
    const { error: userError } = await adminSupabase
        .from('users')
        .update({
            role: 'patient',
            first_name: firstName,
            last_name: lastName,
        } as any)
        .eq('id', authData.user.id)

    if (userError) {
        // If user update fails, delete the auth user
        await adminSupabase.auth.admin.deleteUser(authData.user.id)
        return { error: userError.message }
    }

    // Insert into patients table
    const { error: patientError } = await adminSupabase.from('patients').insert({
        first_name: firstName,
        last_name: lastName,
        national_id: nationalId,
        pin_code: pinCode,
        birth_date: birthDate || null,
        email: email,
        phone: phone || null,
        device_id: parseInt(deviceId),
        hospital_id: hospitalId,
        created_by: createdBy,
    } as any)

    if (patientError) {
        // If patient insert fails, delete the user and auth user
        await adminSupabase.from('users').delete().eq('id', authData.user.id)
        await adminSupabase.auth.admin.deleteUser(authData.user.id)
        return { error: patientError.message }
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
