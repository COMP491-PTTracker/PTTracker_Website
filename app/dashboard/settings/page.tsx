import { getCurrentUser } from '@/actions/auth'
import { redirect } from 'next/navigation'
import SettingsPageClient from './SettingsPageClient'

export default async function SettingsPage() {
    const user = await getCurrentUser()

    if (!user) {
        redirect('/login')
    }

    return <SettingsPageClient userRole={user.role} />
}
