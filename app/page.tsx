import Link from "next/link";

export default function HomePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <div className="max-w-4xl mx-auto px-6 py-12 text-center">
                {/* Hero Section */}
                <div className="space-y-8">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
                        Physical Therapy Tracking Portal
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                        Welcome to your personalized physical therapy tracking system.
                        Monitor your progress, track exercises, and stay connected with your healthcare team.
                    </p>

                    <div className="pt-6">
                        <Link href="/login" className="btn-primary inline-block text-xl">
                            Sign In to Continue
                        </Link>
                    </div>
                </div>

                {/* Features Overview */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="card">
                        <div className="text-5xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
                        <p className="text-gray-600">Monitor your exercise logs and recovery journey</p>
                    </div>

                    <div className="card">
                        <div className="text-5xl mb-4">💪</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Active</h3>
                        <p className="text-gray-600">View your exercises and performance scores</p>
                    </div>

                    <div className="card">
                        <div className="text-5xl mb-4">👨‍⚕️</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Care</h3>
                        <p className="text-gray-600">Connect with your physical therapy team</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
