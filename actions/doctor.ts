'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/types/database'
import { sendWelcomeEmail } from '@/app/actions/register'

export async function getAllPatients() {
    const supabase = await createClient()

    // Get current user
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
        console.error('Not authenticated')
        return []
    }

    // Get doctor's id from doctors table
    const { data: doctorData } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', currentUser.id)
        .single()

    if (!doctorData) {
        console.error('Doctor record not found for user:', currentUser.id)
        return []
    }

    // Get patients created by this doctor by joining with patients table
    const { data: patients, error } = await supabase
        .from('patients')
        .select(`
            user_id,
            users!inner (
                id,
                first_name,
                last_name,
                email,
                role
            )
        `)
        .eq('created_by', doctorData.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching patients:', error)
        return []
    }

    // Transform the data to match the expected format
    const transformedPatients = patients?.map(patient => ({
        id: (patient.users as any).id,
        first_name: (patient.users as any).first_name,
        last_name: (patient.users as any).last_name,
        email: (patient.users as any).email,
    })) || []

    return transformedPatients
}

export async function getExercises() {
    const supabase = await createClient()

    const { data: exercises, error } = await supabase
        .from('exercises')
        .select('id, name')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching exercises:', error)
        return []
    }

    return exercises
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
    const exercisesJson = formData.get('exercises') as string

    // Parse exercises array
    let exercises: { exerciseId: number; weeklyTarget: number }[] = []
    if (exercisesJson) {
        try {
            exercises = JSON.parse(exercisesJson)
        } catch (e) {
            console.error('Error parsing exercises:', e)
        }
    }

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

    // Get doctor's id and hospital_id from doctors table
    const { data: doctorData } = await supabase
        .from('doctors')
        .select('id, hospital_id')
        .eq('user_id', currentUser.id)
        .single()

    // If no doctor profile exists, we'll use null for created_by and hospital_id
    const createdBy = doctorData?.id || null
    const hospitalId = doctorData?.hospital_id || null
    const doctorId = doctorData?.id || null

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
        // @ts-expect-error - Supabase type inference issue with auth.users table
        .update({
            role: 'patient',
            first_name: firstName,
            last_name: lastName,
            hospital_id: hospitalId,
        })
        .eq('id', authData.user.id)

    if (userError) {
        // If user update fails, delete the auth user
        await adminSupabase.auth.admin.deleteUser(authData.user.id)
        return { error: userError.message }
    }

    // Insert into patients table (links to auth user via user_id) and get the patient ID
    const { data: patientData, error: patientError } = await adminSupabase
        .from('patients')
        .insert({
            user_id: authData.user.id,
            national_id: nationalId,
            pin_code: pinCode,
            birth_date: birthDate || null,
            phone: phone || null,
            device_id: parseInt(deviceId),
            hospital_id: hospitalId,
            created_by: createdBy,
        } as any)
        .select('id')
        .single()

    if (patientError) {
        // If patient insert fails, delete the user and auth user
        await adminSupabase.from('users').delete().eq('id', authData.user.id)
        await adminSupabase.auth.admin.deleteUser(authData.user.id)
        return { error: patientError.message }
    }

    // Insert exercise programs if any exercises were selected
    const patientId = (patientData as { id: number } | null)?.id
    if (exercises.length > 0 && patientId) {
        const programEntries = exercises.map((ex) => ({
            patient_id: patientId,
            doctor_id: doctorId,
            exercise_id: ex.exerciseId,
            weekly_target: ex.weeklyTarget,
        }))

        const { error: programError } = await adminSupabase
            .from('programs')
            .insert(programEntries as any)

        if (programError) {
            console.error('Error creating programs:', programError)
            // Note: We don't roll back the patient creation here since the patient was created successfully
            // The doctor can add exercises later if needed
        }
    }

    // Send welcome email with login credentials
    const emailResult = await sendWelcomeEmail({
        email,
        temporaryPassword: password,
    })

    if (!emailResult.success) {
        console.error('Failed to send welcome email:', emailResult.error)
        // Note: We don't fail the patient creation if email fails
        // The doctor can manually share credentials if needed
    }

    revalidatePath('/dashboard/doctor')
    return { success: true }
}

export async function deletePatient(patientUserId: string) {
    const adminSupabase = createAdminClient()
    const supabase = await createClient()

    // Verify the current user is authenticated
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
        return { error: 'Not authenticated' }
    }

    // Verify the user to delete exists and is a patient
    const { data: patientUser, error: fetchError } = await adminSupabase
        .from('users')
        .select('id, role')
        .eq('id', patientUserId)
        .single()

    if (fetchError || !patientUser) {
        return { error: 'Patient not found' }
    }

    // @ts-expect-error - Supabase type inference issue
    if (patientUser.role !== 'patient') {
        return { error: 'Cannot delete non-patient users' }
    }

    // Delete from patients table
    const { error: patientError } = await adminSupabase
        .from('patients')
        .delete()
        .eq('user_id', patientUserId)

    if (patientError) {
        console.error('Error deleting from patients table:', patientError)
        return { error: 'Failed to delete patient record: ' + patientError.message }
    }

    // Delete from auth.users (this allows email to be reused)
    const { error: authError } = await adminSupabase.auth.admin.deleteUser(patientUserId)

    if (authError) {
        console.error('Error deleting auth user:', authError)
        return { error: 'Failed to delete authentication record: ' + authError.message }
    }

    // Delete from users table (may already be deleted by auth cascade)
    await adminSupabase
        .from('users')
        .delete()
        .eq('id', patientUserId)

    revalidatePath('/dashboard/doctor')
    return { success: true }
}

export async function getPatientExerciseLogs(patientUserId: string) {
    const supabase = await createClient()

    // First get the patient record for this user
    const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', patientUserId)
        .single()

    if (!patient) {
        console.error('Patient not found for user:', patientUserId)
        return []
    }

    // Get sessions with exercise results for this patient
    const { data: sessions, error } = await supabase
        .from('sessions')
        .select(`
            id,
            start_time,
            end_time,
            completed,
            exercise_results (
                id,
                total_reps,
                correct_reps,
                errors,
                accuracy,
                duration_sec,
                created_at,
                exercises (
                    id,
                    name
                )
            )
        `)
        .eq('patient_id', patient.id)
        .order('start_time', { ascending: false })

    if (error) {
        console.error('Error fetching exercise results:', error)
        return []
    }

    // Flatten results for display
    const results = sessions?.flatMap(session =>
        (session.exercise_results as any[])?.map(result => ({
            id: result.id,
            session_id: session.id,
            exercise_name: (result.exercises as any)?.name || 'Unknown Exercise',
            total_reps: result.total_reps,
            correct_reps: result.correct_reps,
            errors: result.errors,
            accuracy: result.accuracy,
            duration_sec: result.duration_sec,
            created_at: result.created_at || session.start_time,
            session_completed: session.completed
        })) || []
    ) || []

    return results
}

export async function getPatientAssignedExercises(patientUserId: string) {
    const supabase = await createClient()

    // First get the patient record for this user
    const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', patientUserId)
        .single()

    if (!patient) {
        console.error('Patient not found for user:', patientUserId)
        return []
    }

    // Get assigned exercises from programs table with exercise details
    const { data: programs, error } = await supabase
        .from('programs')
        .select(`
            id,
            exercise_id,
            weekly_target,
            created_at,
            exercises (
                id,
                name
            )
        `)
        .eq('patient_id', patient.id)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching assigned exercises:', error)
        return []
    }

    // Transform the data for the frontend
    const assignedExercises = programs?.map(program => ({
        id: program.id,
        exercise_id: program.exercise_id,
        exercise_name: (program.exercises as any)?.name || 'Unknown Exercise',
        repetitions: program.weekly_target,
        created_at: program.created_at
    })) || []

    return assignedExercises
}

export async function assignExerciseToPatient(
    patientUserId: string,
    exerciseId: number,
    repetitions: number
) {
    const supabase = await createClient()

    // Verify the current user is authenticated
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
        return { error: 'Not authenticated' }
    }

    // Get doctor's id from doctors table
    const { data: doctorData } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', currentUser.id)
        .single()

    const doctorId = doctorData?.id || null

    // Get the patient record for this user
    const { data: patient } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', patientUserId)
        .single()

    if (!patient) {
        return { error: 'Patient not found' }
    }

    // Insert new program (allow duplicate exercises)
    const { error: insertError } = await supabase
        .from('programs')
        .insert({
            patient_id: patient.id,
            doctor_id: doctorId,
            exercise_id: exerciseId,
            weekly_target: repetitions,
        } as any)

    if (insertError) {
        console.error('Error assigning exercise:', insertError)
        return { error: insertError.message }
    }

    revalidatePath(`/dashboard/doctor/patient/${patientUserId}`)
    return { success: true }
}

export async function updatePatientProgram(
    programId: number,
    exerciseId: number,
    newRepetitions: number
) {
    const supabase = await createClient()

    // Verify the current user is authenticated
    const {
        data: { user: currentUser },
    } = await supabase.auth.getUser()

    if (!currentUser) {
        return { error: 'Not authenticated' }
    }

    // Update both exercise_id and weekly_target (repetitions) in the programs table
    const { error: updateError } = await supabase
        .from('programs')
        .update({
            exercise_id: exerciseId,
            weekly_target: newRepetitions
        } as any)
        .eq('id', programId)

    if (updateError) {
        console.error('Error updating program:', updateError)
        return { error: updateError.message }
    }

    revalidatePath('/dashboard/doctor')
    return { success: true }
}

