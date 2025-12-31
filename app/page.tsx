"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Snowfall from "react-snowfall";
import {
    Play,
    CheckCircle,
    Heart,
    Activity,
    Cpu,
    Trophy,
    ChevronRight,
    Snowflake,
    Globe,
    AtSign,
    Users,
    Github,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

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

export default function HomePage() {
    const scrollRef = useScrollAnimation();
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [snowEnabled, setSnowEnabled] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const demoImages = ["/assets/demo1.png", "/assets/demo2.png", "/assets/demo3.png"];
    const demoVideos = ["/assets/demovid.mp4", "/assets/demovid2.mp4"];

    // Cycle through hero images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % demoImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [demoImages.length]);

    // Handle video end - switch to next video
    const handleVideoEnd = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % demoVideos.length);
    };

    // When video source changes, play the new video
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {
                // Autoplay may be blocked by browser, ignore error
            });
        }
    }, [currentVideoIndex]);

    return (
        <div ref={scrollRef} className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased transition-colors duration-300">
            {/* Snowfall Effect */}
            {snowEnabled && (
                <Snowfall
                    snowflakeCount={150}
                    radius={[0.5, 3.0]}
                    speed={[0.5, 2]}
                    color={theme === 'dark' ? "#dacfeaff" : "#7a8a9a"}
                    style={{
                        position: 'fixed',
                        width: '100vw',
                        height: '100vh',
                        zIndex: 9999,
                        pointerEvents: 'none',
                    }}
                />
            )}
            {/* Navigation - Fixed Header (always visible) */}
            <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo - Clickable, scrolls to top */}
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <Image
                            src="/assets/pttracker3.png"
                            alt="PTTracker Logo"
                            width={280}
                            height={70}
                            className="h-16 w-auto dark:brightness-0 dark:invert"
                        />
                    </button>

                    {/* Nav Links */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#our-team">{t.ourTeam.navButton}</a>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSnowEnabled(prev => !prev)}
                            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${snowEnabled ? 'bg-primary text-[#11221f]' : 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700'}`}
                            aria-label="Toggle snow"
                        >
                            <Snowflake className="w-5 h-5" />
                        </button>
                        <LanguageToggle />
                        <ThemeToggle />
                        <Link
                            href="/leaderboard"
                            className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-primary/10 text-primary px-4 text-sm font-bold hover:bg-primary/20 transition-colors"
                        >
                            <Trophy className="w-4 h-4 mr-2" />
                            {t.leaderboard.viewLeaderboard}
                        </Link>
                        <Link
                            href="/login"
                            className="hidden sm:flex h-10 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 px-4 text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                        >
                            {t.login.signIn}
                        </Link>

                    </div>
                </div>
            </header>

            {/* Brand Hero - First Thing Users See (pt-20 accounts for fixed header) */}
            <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-gradient-to-b from-background-light via-background-light to-slate-50 dark:from-background-dark dark:via-background-dark dark:to-[#0d1a18]">
                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 rounded-full blur-3xl opacity-40"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    {/* Large Logo */}
                    <div className="mb-8">
                        <Image
                            src="/assets/pttracker3.png"
                            alt="PTTracker"
                            width={800}
                            height={200}
                            className="h-32 sm:h-44 lg:h-56 w-auto mx-auto dark:brightness-0 dark:invert"
                            priority
                        />
                    </div>

                    {/* Powerful Slogan */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">
                            Recovery, Reimagined.
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 font-body">
                        AI-powered physical therapy from the comfort of your home.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button className="h-14 px-10 rounded-xl bg-primary text-[#11221f] font-bold text-lg hover:brightness-110 transition-all flex items-center gap-2 glow-primary">
                            <Heart className="w-5 h-5" />
                            {t.home.requestDemo}
                        </button>
                        <Link
                            href="/login"
                            className="h-14 px-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                        >
                            {t.home.alreadyPartner}
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Hero Section */}
            <section className="relative pt-12 pb-20 lg:pt-20 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col gap-6 max-w-2xl">
                            {/* Badge */}
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1">
                                <span className="flex size-2 rounded-full bg-primary animate-pulse"></span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{t.home.badge}</span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-5xl sm:text-6xl font-black leading-[1.1] tracking-tight">
                                {t.home.heroTitle1} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">
                                    {t.home.heroTitle2}
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-body">
                                {t.home.heroDescription}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="h-12 px-8 rounded-xl bg-primary text-[#11221f] font-bold text-base hover:brightness-110 transition-all flex items-center gap-2">
                                    <Heart className="w-5 h-5" />
                                    {t.home.requestDemo}
                                </button>
                                <Link
                                    href="/login"
                                    className="h-12 px-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-base hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2"
                                >
                                    <Activity className="w-5 h-5" />
                                    {t.home.alreadyPartner}
                                </Link>
                            </div>

                            {/* User Avatars */}
                            <div className="flex items-center gap-4 pt-4 text-sm text-slate-500 dark:text-slate-400 font-body">
                                <div className="flex -space-x-2">
                                    <div className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gradient-to-br from-primary/40 to-emerald-500/40"></div>
                                    <div className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gradient-to-br from-blue-400/40 to-purple-500/40"></div>
                                    <div className="size-8 rounded-full border-2 border-background-light dark:border-background-dark bg-gradient-to-br from-orange-400/40 to-red-500/40"></div>
                                </div>
                                <p>{t.home.clinicsRelying}</p>
                            </div>
                        </div>

                        {/* Hero Image Carousel */}
                        <div className="relative lg:h-auto scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full opacity-50"></div>
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
                                {demoImages.map((src, index) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt={`PTTracker Demo ${index + 1} - AI-powered motion tracking`}
                                        fill
                                        className={`object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                        priority={index === 0}
                                    />
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#11221f] via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 text-primary border border-primary/30">
                                        <CheckCircle className="w-5 h-5 animate-bounce" />
                                        <span className="font-bold">{t.home.aiFormCorrection}: 98%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-10 border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-black/20">
                <div className="mx-auto max-w-7xl px-4 text-center">
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-6 uppercase tracking-wider">
                        {t.home.trustedBy} {t.home.leadingClinics}
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                            <Heart className="w-5 h-5" /> CardioHealth
                        </span>
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                            <Activity className="w-5 h-5" /> OrthoPlus
                        </span>
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                            <Cpu className="w-5 h-5" /> VitalMove
                        </span>
                        <span className="text-xl font-bold text-slate-800 dark:text-slate-300 flex items-center gap-2">
                            <Trophy className="w-5 h-5" /> SafeRecover
                        </span>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white dark:bg-[#11221f]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 max-w-3xl scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t.home.builtFor} {t.home.healthcareProviders}</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-body">{t.home.reduceCostsSubtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1: AI Form Correction */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100 group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-[#11221f] transition-colors">
                                <Activity className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.home.aiFormCorrection}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed">
                                {t.home.liabilityDescription}
                            </p>
                        </div>

                        {/* Feature 2: IoT Sensors */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200 group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-[#11221f] transition-colors">
                                <Cpu className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.home.onDeviceAI}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed">
                                {t.home.costDescription}
                            </p>
                        </div>

                        {/* Feature 3: Gamified Milestones */}
                        <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-300 group p-8 rounded-2xl bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg hover:-translate-y-1">
                            <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-[#11221f] transition-colors">
                                <Trophy className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t.home.progressMilestones}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-body leading-relaxed">
                                {t.home.adherenceDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-black/20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-8 scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                            <h2 className="text-3xl md:text-4xl font-bold">{t.home.seeInAction} {t.home.inAction}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="flex-none mt-1">
                                        <div className="size-8 rounded-full bg-primary flex items-center justify-center font-bold text-[#11221f]">1</div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{t.home.realTimeMonitoring}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-body">{t.home.watchAIGuides}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none mt-1">
                                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold">2</div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{t.home.dailyStreak}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-body">{t.home.performanceAnalytics}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-none mt-1">
                                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold">3</div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{t.home.automatedFeedback}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 font-body">{t.home.therapistOptimization}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Demo Video - Autoplay Carousel */}
                        <div className="flex-1 w-full scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
                            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-4 border-white dark:border-slate-700 aspect-video bg-slate-900">
                                {demoVideos.map((src, index) => (
                                    <video
                                        key={src}
                                        ref={index === currentVideoIndex ? videoRef : null}
                                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${index === currentVideoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                        autoPlay={index === currentVideoIndex}
                                        muted
                                        playsInline
                                        onEnded={index === currentVideoIndex ? handleVideoEnd : undefined}
                                        src={src}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section id="our-team" className="py-24 bg-white dark:bg-[#11221f]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="mb-12 text-center scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.ourTeam.title}</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-body">{t.ourTeam.subtitle}</p>
                    </div>

                    {/* GitHub Repos */}
                    <div className="mb-12 scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Github className="w-6 h-6" />
                            {t.ourTeam.githubRepos}
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://github.com/COMP491-PTTracker/PTTracker_Website"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg"
                            >
                                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-[#11221f] transition-colors">
                                    <Github className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.ourTeam.mainRepo}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.ourTeam.mainRepoDesc}</p>
                                </div>
                            </a>
                            <a
                                href="https://github.com/COMP491-PTTracker/comp491_Physical-Therapy-Tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl bg-background-light dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg"
                            >
                                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-[#11221f] transition-colors">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.ourTeam.aiRepo}</h4>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{t.ourTeam.aiRepoDesc}</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Team Members - Horizontal Scroll */}
                    <div className="scroll-animate opacity-0 translate-y-8 transition-all duration-700 delay-200">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Users className="w-6 h-6" />
                            {t.ourTeam.title}
                        </h3>
                        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
                            {/* Team Member 1 */}
                            <div className="flex-none w-72 snap-start group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg">
                                <div className="size-20 rounded-full bg-gradient-to-br from-primary/40 to-emerald-500/40 mb-4 mx-auto flex items-center justify-center">
                                    <Users className="w-10 h-10 text-primary" />
                                </div>
                                <h4 className="text-lg font-bold text-center mb-1">{t.ourTeam.member1Name}</h4>
                                <p className="text-sm text-primary font-medium text-center mb-3">{t.ourTeam.member1Role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-body">{t.ourTeam.member1Desc}</p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="flex-none w-72 snap-start group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg">
                                <div className="size-20 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-500/40 mb-4 mx-auto flex items-center justify-center">
                                    <Users className="w-10 h-10 text-blue-400" />
                                </div>
                                <h4 className="text-lg font-bold text-center mb-1">{t.ourTeam.member2Name}</h4>
                                <p className="text-sm text-primary font-medium text-center mb-3">{t.ourTeam.member2Role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-body">{t.ourTeam.member2Desc}</p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="flex-none w-72 snap-start group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg">
                                <div className="size-20 rounded-full bg-gradient-to-br from-orange-400/40 to-red-500/40 mb-4 mx-auto flex items-center justify-center">
                                    <Users className="w-10 h-10 text-orange-400" />
                                </div>
                                <h4 className="text-lg font-bold text-center mb-1">{t.ourTeam.member3Name}</h4>
                                <p className="text-sm text-primary font-medium text-center mb-3">{t.ourTeam.member3Role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-body">{t.ourTeam.member3Desc}</p>
                            </div>

                            {/* Team Member 4 */}
                            <div className="flex-none w-72 snap-start group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg">
                                <div className="size-20 rounded-full bg-gradient-to-br from-pink-400/40 to-rose-500/40 mb-4 mx-auto flex items-center justify-center">
                                    <Users className="w-10 h-10 text-pink-400" />
                                </div>
                                <h4 className="text-lg font-bold text-center mb-1">{t.ourTeam.member4Name}</h4>
                                <p className="text-sm text-primary font-medium text-center mb-3">{t.ourTeam.member4Role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-body">{t.ourTeam.member4Desc}</p>
                            </div>

                            {/* Team Member 5 */}
                            <div className="flex-none w-72 snap-start group p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-white/5 dark:to-white/[0.02] border border-slate-200 dark:border-white/10 hover:border-primary/50 transition-all hover:shadow-lg">
                                <div className="size-20 rounded-full bg-gradient-to-br from-cyan-400/40 to-teal-500/40 mb-4 mx-auto flex items-center justify-center">
                                    <Users className="w-10 h-10 text-cyan-400" />
                                </div>
                                <h4 className="text-lg font-bold text-center mb-1">{t.ourTeam.member5Name}</h4>
                                <p className="text-sm text-primary font-medium text-center mb-3">{t.ourTeam.member5Role}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-body">{t.ourTeam.member5Desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl bg-[#11221f] px-6 py-16 sm:px-12 sm:py-20 text-center shadow-2xl scroll-animate opacity-0 translate-y-8 transition-all duration-700">
                        <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-[#11221f] to-[#11221f]"></div>
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl">
                                {t.home.readyToModernize} {t.home.physiotherapyDepartment}
                            </h2>
                            <p className="text-slate-300 text-lg max-w-2xl font-body">{t.home.contactDescription}</p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                                <button className="flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-[#11221f] text-base font-bold hover:brightness-110 transition-all min-w-[180px]">
                                    {t.home.requestDemo}
                                </button>
                                <Link
                                    href="/login"
                                    className="flex items-center justify-center h-12 px-8 rounded-xl bg-white/10 text-white border border-white/20 text-base font-bold hover:bg-white/20 transition-all min-w-[180px]"
                                >
                                    {t.home.partnerLogin}
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-[#0d1a18] border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <Image
                                    src="/assets/pttracker3.png"
                                    alt="PTTracker Logo"
                                    width={120}
                                    height={30}
                                    className="h-8 w-auto"
                                />
                            </div>
                            <p className="text-sm text-slate-500 font-body">
                                {t.home.heroDescription.slice(0, 80)}...
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">{t.home.seeInAction}</h4>
                            <ul className="space-y-2 text-sm text-slate-500 font-body">
                                <li><a className="hover:text-primary" href="#features">{t.home.aiFormCorrection}</a></li>
                                <li><a className="hover:text-primary" href="#features">{t.home.onDeviceAI}</a></li>
                                <li><a className="hover:text-primary" href="#features">{t.home.progressMilestones}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">{t.home.trustedBy}</h4>
                            <ul className="space-y-2 text-sm text-slate-500 font-body">
                                <li><a className="hover:text-primary" href="#">{t.home.testimonial1Name}</a></li>
                                <li><a className="hover:text-primary" href="#">{t.home.testimonial2Name}</a></li>
                                <li><a className="hover:text-primary" href="#">{t.home.testimonial3Name}</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">{t.home.emailUs}</h4>
                            <ul className="space-y-2 text-sm text-slate-500 font-body">
                                <li><a className="hover:text-primary" href="mailto:partners@pttracker.com">partners@pttracker.com</a></li>
                                <li><a className="hover:text-primary" href="#">{t.home.callUs}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-400 font-body">© 2024 {t.home.copyright}</p>
                        <div className="flex gap-4">
                            <a className="text-slate-400 hover:text-primary" href="#"><Globe className="w-5 h-5" /></a>
                            <a className="text-slate-400 hover:text-primary" href="#"><AtSign className="w-5 h-5" /></a>
                        </div>
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
