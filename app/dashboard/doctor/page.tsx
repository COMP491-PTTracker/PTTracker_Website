import { getCurrentUser } from '@/actions/auth'
import { getAllPatients } from '@/actions/doctor'
import { redirect } from 'next/navigation'
import DoctorDashboardClient from './DoctorDashboardClient'

export default async function DoctorDashboard() {
    const user = await getCurrentUser()

    if (!user || (user.role !== 'admin' && user.role !== 'doctor')) {
        redirect('/login')
    }

    const patients = await getAllPatients()

    return (
        <DoctorDashboardClient
            user={{
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }}
            patients={patients}
        />
    )
}
