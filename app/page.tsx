"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import {
    Shield,
    TrendingUp,
    Play,
    Trophy,
    Target,
    Activity,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Cpu,
    DollarSign,
    Users,
    Mail,
    Phone,
} from "lucide-react";

// Hook for scroll animations
function useScrollAnimation() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const elements = ref.current?.querySelectorAll(".scroll-animate");
        elements?.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return ref;
}

// Smooth scroll function
function smoothScrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
}

export default function HomePage() {
    const scrollRef = useScrollAnimation();

    return (
        <div ref={scrollRef} className="min-h-screen bg-gray-950 text-white overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-primary-950" />

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        Edge AI-Powered Remote Patient Monitoring
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            Automate Remote Patient
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent">
                            Monitoring with Edge AI
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Scale your clinic's reach and reduce costs. Free up physical therapists for complex cases
                        by automating routine feedback with AI-powered motion tracking.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={() => smoothScrollTo('contact')}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white font-semibold rounded-full text-lg shadow-2xl shadow-primary-500/25 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/40"
                        >
                            Request a Demo
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-full text-lg transition-all duration-300"
                        >
                            Already a Partner? Log In
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Video Placeholder - Skeleton Overlay Visual */}
                    <div className="mt-16 relative max-w-4xl mx-auto">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10">
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                {/* Simulated skeleton tracking overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg className="w-48 h-64 text-primary-500/30" viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="2">
                                        {/* Head */}
                                        <circle cx="50" cy="15" r="10" />
                                        {/* Body */}
                                        <line x1="50" y1="25" x2="50" y2="70" />
                                        {/* Arms */}
                                        <line x1="50" y1="35" x2="20" y2="55" />
                                        <line x1="50" y1="35" x2="80" y2="55" />
                                        {/* Legs */}
                                        <line x1="50" y1="70" x2="30" y2="110" />
                                        <line x1="50" y1="70" x2="70" y2="110" />
                                        {/* Joints */}
                                        <circle cx="50" cy="35" r="3" className="fill-primary-400" />
                                        <circle cx="20" cy="55" r="3" className="fill-primary-400" />
                                        <circle cx="80" cy="55" r="3" className="fill-primary-400" />
                                        <circle cx="50" cy="70" r="3" className="fill-primary-400" />
                                        <circle cx="30" cy="110" r="3" className="fill-primary-400" />
                                        <circle cx="70" cy="110" r="3" className="fill-primary-400" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                                <button className="relative z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110">
                                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                                </button>
                            </div>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 via-transparent to-secondary-500/20 rounded-3xl blur-2xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Value Proposition Feature Blocks */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Built for{" "}
                            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                Healthcare Providers
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Reduce costs, scale your clinic, and improve patient outcomes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Block 1: Liability & Compliance */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 group">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-white">
                                    Mitigate Liability
                                </h3>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    AI-enforced form correction ensures patients exercise safely at home.
                                    Document compliance with real-time monitoring and automated alerts for incorrect movements.
                                </p>

                                <ul className="space-y-3">
                                    {["Real-time form monitoring", "Compliance documentation", "Risk reduction protocols"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Block 2: Patient Adherence */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
                            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-secondary-500/30 transition-all duration-500 group">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center mb-6 shadow-lg shadow-secondary-500/25 group-hover:scale-110 transition-transform">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-white">
                                    Increase Adherence Rates
                                </h3>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Gamification keeps patients engaged between clinic visits. Track streaks,
                                    scores, and milestones to boost compliance by up to 40%.
                                </p>

                                <ul className="space-y-3">
                                    {["Daily streak tracking", "Performance analytics", "Progress milestones"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-secondary-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Visual: Stats */}
                                <div className="mt-8 p-6 rounded-2xl bg-gray-900/50 border border-gray-700/30">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <div className="text-2xl font-bold text-white mb-1">+40%</div>
                                            <span className="text-xs text-gray-500">Adherence</span>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white mb-1">87%</div>
                                            <span className="text-xs text-gray-500">Satisfaction</span>
                                        </div>
                                        <div>
                                            <div className="text-2xl font-bold text-white mb-1">-30%</div>
                                            <span className="text-xs text-gray-500">Re-visits</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Block 3: Edge AI Cost Reduction */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300">
                            <div className="h-full p-8 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-primary-500/30 transition-all duration-500 group">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25 group-hover:scale-110 transition-transform">
                                    <Cpu className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold mb-4 text-white">
                                    Reduce Cost-Per-Recovery
                                </h3>

                                <p className="text-gray-400 mb-6 leading-relaxed">
                                    Our Jetson Nano edge device handles repetitive instruction and form correction.
                                    Free up your physical therapists to focus on complex cases.
                                </p>

                                <ul className="space-y-3">
                                    {["On-device AI processing", "Automated routine feedback", "Therapist time optimization"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-gray-300">
                                            <CheckCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                {/* Visual: Cost Savings */}
                                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20">
                                    <div className="flex items-center gap-3 mb-2">
                                        <DollarSign className="w-6 h-6 text-primary-400" />
                                        <span className="text-3xl font-bold text-white">-50%</span>
                                    </div>
                                    <p className="text-sm text-gray-400">Average cost reduction per patient recovery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Demo Section */}
            <section id="demo" className="py-24 px-6 bg-gray-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            See the Platform{" "}
                            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                In Action
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Watch how our AI guides patient movement and tracks progress
                        </p>
                    </div>

                    {/* Main Video */}
                    <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-700/50 mb-8">
                            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                                <button className="relative z-10 w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center hover:from-primary-400 hover:to-primary-500 transition-all hover:scale-110 shadow-2xl shadow-primary-500/30">
                                    <Play className="w-10 h-10 text-white ml-1" fill="white" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-sm text-gray-400">
                                    <span>Complete Platform Overview</span>
                                    <span>3:45</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Thumbnails */}
                    <div className="grid md:grid-cols-3 gap-6 scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
                        {[
                            { title: "AI Form Correction", duration: "1:20", icon: Activity },
                            { title: "Patient Dashboard Demo", duration: "2:15", icon: Target },
                            { title: "Analytics & Reporting", duration: "1:45", icon: TrendingUp },
                        ].map((video, i) => (
                            <div
                                key={i}
                                className="group relative rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary-500/30 transition-all cursor-pointer"
                            >
                                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                                    <video.icon className="w-12 h-12 text-gray-600 group-hover:text-primary-400 transition-colors" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                        <div className="w-14 h-14 bg-white/0 group-hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                            <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-800/50">
                                    <h4 className="font-medium text-white mb-1">{video.title}</h4>
                                    <span className="text-sm text-gray-500">{video.duration}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted by Experts Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            Trusted by{" "}
                            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                                Leading Clinics
                            </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Physical therapy departments worldwide rely on our platform
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        {[
                            {
                                quote: "This platform has transformed how we manage remote patients. Our therapists now focus on complex cases while the AI handles routine monitoring.",
                                name: "Dr. Sarah Mitchell",
                                title: "Director of Physical Therapy, Regional Medical Center",
                            },
                            {
                                quote: "We've seen a 40% increase in patient adherence and significantly reduced our cost-per-recovery. The ROI was immediate.",
                                name: "Dr. James Chen",
                                title: "Chief of Rehabilitation Services",
                            },
                            {
                                quote: "The edge AI processing means we don't worry about data privacy or cloud costs. It's a complete game-changer for our department.",
                                name: "Dr. Emily Roberts",
                                title: "Head of Orthopedic Rehabilitation",
                            },
                        ].map((testimonial, i) => (
                            <div
                                key={i}
                                className="p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/30 hover:border-primary-500/20 transition-all"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center text-2xl font-bold text-primary-400">
                                        {testimonial.name.split(" ")[1][0]}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.title}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 leading-relaxed italic">
                                    &ldquo;{testimonial.quote}&rdquo;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 bg-gray-950 relative overflow-hidden">
                {/* Background gradient accent */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-secondary-500/5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

                <div className="max-w-4xl mx-auto text-center relative z-10 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Ready to Modernize Your{" "}
                        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                            Physiotherapy Department?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Schedule a demo to see how our Edge AI platform can reduce costs and improve patient outcomes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                        <a
                            href="mailto:partners@physioai.com"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-primary-500/30 rounded-2xl text-white transition-all"
                        >
                            <Mail className="w-6 h-6 text-primary-400" />
                            <div className="text-left">
                                <div className="text-sm text-gray-500">Email us</div>
                                <div className="font-semibold">partners@physioai.com</div>
                            </div>
                        </a>
                        <a
                            href="tel:+15551234567"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-primary-500/30 rounded-2xl text-white transition-all"
                        >
                            <Phone className="w-6 h-6 text-primary-400" />
                            <div className="text-left">
                                <div className="text-sm text-gray-500">Call us</div>
                                <div className="font-semibold">+1 (555) 123-4567</div>
                            </div>
                        </a>
                    </div>

                    <button
                        onClick={() => smoothScrollTo('demo')}
                        className="text-primary-400 hover:text-primary-300 font-medium transition-colors"
                    >
                        ← Watch Demo Videos
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-gray-800">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary-400" />
                        <span className="font-semibold text-white">PhysioAI Platform</span>
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2024 Physical Therapy Tracking Portal. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/login" className="hover:text-primary-400 transition-colors">Partner Login</Link>
                    </div>
                </div>
            </footer>

            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(2rem);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.7s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
