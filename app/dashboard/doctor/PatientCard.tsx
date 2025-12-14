'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Trash2, Loader2 } from 'lucide-react'
import { deletePatient } from '@/actions/doctor'

interface PatientCardProps {
    patient: {
        id: string
        first_name: string | null
        last_name: string | null
        email: string | null
    }
}

export default function PatientCard({ patient }: PatientCardProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!showConfirm) {
            setShowConfirm(true)
            return
        }

        setIsDeleting(true)
        const result = await deletePatient(patient.id)

        if (result.error) {
            alert(result.error)
            setIsDeleting(false)
            setShowConfirm(false)
        }
        // If successful, the page will automatically refresh due to revalidatePath
    }

    const handleCancel = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowConfirm(false)
    }

    return (
        <div className="group dark-card hover:shadow-2xl hover:shadow-primary-500/10 relative">
            <Link href={`/dashboard/doctor/patient/${patient.id}`} className="block">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full flex items-center justify-center text-2xl font-bold text-primary-400 border border-primary-500/20">
                                {patient.first_name?.charAt(0) || '?'}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                                    {patient.first_name && patient.last_name
                                        ? `${patient.first_name} ${patient.last_name}`
                                        : 'Unnamed Patient'}
                                </h3>
                                <p className="text-gray-500 text-sm truncate">{patient.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="text-primary-400 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                        <ArrowRight className="w-6 h-6" />
                    </div>
                </div>
            </Link>

            {/* Delete Button */}
            <div className="absolute top-3 left-3">
                {showConfirm ? (
                    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
                        <span className="text-sm text-gray-300">Delete?</span>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <span className="text-xs font-medium px-1">Yes</span>
                            )}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={isDeleting}
                            className="p-1.5 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors disabled:opacity-50"
                        >
                            <span className="text-xs font-medium px-1">No</span>
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleDelete}
                        className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        title="Delete patient"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    )
}
