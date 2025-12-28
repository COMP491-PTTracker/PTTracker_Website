import { getCurrentUser } from '@/actions/auth'
import { getPatientExerciseLogs } from '@/actions/doctor'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import PatientDetailClient from './PatientDetailClient'

export default async function PatientDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const user = await getCurrentUser()

    if (!user || (user.role !== 'admin' && user.role !== 'doctor')) {
        redirect('/login')
    }

    const supabase = await createClient()

    // Get patient info from users table
    const { data: patient } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

    if (!patient) {
        redirect('/dashboard/doctor')
    }

    // Get patient record to find patient_id for streak lookup
    const { data: patientRecord } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', id)
        .single()

    // Get patient's current streak
    let currentStreak = 0
    if (patientRecord) {
        const { data: streakData } = await supabase
            .from('streaks')
            .select('current_streak')
            .eq('patient_id', patientRecord.id)
            .single()

        currentStreak = streakData?.current_streak || 0
    }

    // Get patient's exercise results
    const logs = await getPatientExerciseLogs(id)

    return (
        <PatientDetailClient
            patient={{
                first_name: patient.first_name,
                last_name: patient.last_name,
                email: patient.email
            }}
            currentStreak={currentStreak}
            logs={logs}
        />
    )
}
