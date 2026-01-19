// FILE: components/HeroTerminal.tsx
// ============================================
// Hero Terminal - Boot sequence with typewriter effect
// Headline with subtle glitch, CTA buttons, system summary
// ============================================

'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight, ArrowDown, Sparkles } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { common, ui, getText } from '@/lib/content';

// Typewriter line component
interface TypewriterLineProps {
    text: string;
    delay: number;
    onComplete?: () => void;
    status?: 'pending' | 'loading' | 'ok';
}

const TypewriterLine = memo(function TypewriterLine({
    text,
    delay,
    onComplete,
    status = 'pending'
}: TypewriterLineProps) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        if (prefersReducedMotion) {
            setDisplayText(text);
            setShowStatus(true);
            onComplete?.();
            return;
        }

        const startTimeout = setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const typeInterval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    setIsTyping(false);
                    setShowStatus(true);
                    setTimeout(() => onComplete?.(), 200);
                }
            }, 30);

            return () => clearInterval(typeInterval);
        }, delay);

        return () => clearTimeout(startTimeout);
    }, [text, delay, onComplete, prefersReducedMotion]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay / 1000 }}
            className="flex items-center gap-2 font-mono text-sm md:text-base"
        >
            <ChevronRight className="w-4 h-4 text-neon-green flex-shrink-0" />
            <span className="text-text-secondary">
                {displayText}
                {isTyping && <span className="text-neon-blue animate-pulse">▌</span>}
            </span>
            {showStatus && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={clsx(
                        'text-xs px-2 py-0.5 rounded',
                        status === 'ok' && 'bg-neon-green/20 text-neon-green'
                    )}
                >
                    [OK]
                </motion.span>
            )}
        </motion.div>
    );
});

// Stats badge component
interface StatBadgeProps {
    label: string;
    value: string;
    delay: number;
}

const StatBadge = memo(function StatBadge({ label, value, delay }: StatBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, type: 'spring', stiffness: 100 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-surface/50 border border-white/5 rounded-full font-mono text-xs"
        >
            <span className="text-text-muted">{label}:</span>
            <span className="text-neon-blue">{value}</span>
        </motion.div>
    );
});

function HeroTerminal() {
    const { language, isRTL } = useLanguage();
    const [bootPhase, setBootPhase] = useState(0);
    const [bootComplete, setBootComplete] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const containerRef = useRef<HTMLDivElement>(null);

    const bootLines = ui.bootSequence.map(line => getText(line, language));

    // Skip animation if reduced motion preferred
    useEffect(() => {
        if (prefersReducedMotion) {
            setBootPhase(bootLines.length);
            setBootComplete(true);
            setShowContent(true);
        }
    }, [prefersReducedMotion, bootLines.length]);

    const handleLineComplete = () => {
        if (bootPhase < bootLines.length - 1) {
            setBootPhase(prev => prev + 1);
        } else {
            setBootComplete(true);
            setTimeout(() => setShowContent(true), 500);
        }
    };

    const scrollToProjects = () => {
        document.getElementById('deployments')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            id="system-status"
            ref={containerRef}
            className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-16 pt-20 md:pt-0"
        >
            {/* Terminal boot sequence */}
            <div className="mb-8 md:mb-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-carbon-light/50 backdrop-blur-sm border border-white/5 rounded-lg p-4 md:p-6 max-w-2xl"
                >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="font-mono text-xs text-text-muted ml-2">impact_lab.terminal</span>
                    </div>

                    {/* Boot lines */}
                    <div className="space-y-2">
                        {bootLines.slice(0, bootPhase + 1).map((line, index) => (
                            <TypewriterLine
                                key={index}
                                text={line}
                                delay={prefersReducedMotion ? 0 : index * 800}
                                status="ok"
                                onComplete={index === bootPhase ? handleLineComplete : undefined}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Main content - appears after boot */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
                        className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16"
                    >
                        {/* Profile Photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                            className="order-first lg:order-last flex-shrink-0"
                        >
                            <div className="relative group">
                                {/* Outer glow effect */}
                                <div className="absolute -inset-6 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700" />

                                {/* Animated rotating border */}
                                <motion.div
                                    className="absolute -inset-2 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                    style={{ padding: '3px' }}
                                />

                                {/* Inner dark ring */}
                                <div className="absolute -inset-1 bg-carbon rounded-full" />

                                {/* Secondary gradient ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/30 via-transparent to-neon-purple/30 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-carbon" />
                                </div>

                                {/* Image container */}
                                <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-white/10">
                                    <Image
                                        src="/profile.jpg"
                                        alt={language === 'ar' ? 'عبدالرحمن أبوزيد' : 'Abdelrahman Abuzaid'}
                                        fill
                                        className="object-cover object-[center_20%] scale-[1.15]"
                                        priority
                                    />

                                    {/* Inner shadow overlay */}
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]" />
                                </div>

                                {/* Corner accents */}
                                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-neon-blue rounded-tl-full" />
                                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-neon-purple rounded-tr-full" />
                                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-neon-green rounded-bl-full" />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-neon-blue rounded-br-full" />

                                {/* Status indicator */}
                                <motion.div
                                    className="absolute bottom-4 right-4 w-5 h-5 bg-neon-green rounded-full border-3 border-carbon shadow-lg shadow-neon-green/50"
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                />
                            </div>
                        </motion.div>

                        {/* Text Content */}
                        <div>
                            {/* Role tag */}
                            <motion.div
                                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-neon-blue/10 border border-neon-blue/20 rounded-full mb-6"
                            >
                                <Sparkles className="w-4 h-4 text-neon-blue" />
                                <span className="text-sm text-neon-blue font-medium">
                                    {getText(common.field, language)}
                                </span>
                            </motion.div>

                            {/* Main headline */}
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 glitch-subtle"
                            >
                                <span className="gradient-text">
                                    {getText(common.name, language)}
                                </span>
                            </motion.h1>

                            {/* Role subtitle */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl md:text-2xl lg:text-3xl text-text-secondary mb-4"
                            >
                                {getText(common.roleShort, language)}
                            </motion.p>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg md:text-xl text-neon-green/80 font-medium mb-8"
                            >
                                {getText(common.tagline, language)}
                            </motion.p>

                            {/* Stats badges */}
                            <motion.div
                                className="flex flex-wrap gap-3 mb-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <StatBadge
                                    label={language === 'ar' ? 'المعدل' : 'GPA'}
                                    value={`${common.gpa} (${getText(common.gpaLabel, language)})`}
                                    delay={0.6}
                                />
                                <StatBadge
                                    label={language === 'ar' ? 'الساعات' : 'Credits'}
                                    value={`${common.completedCredits}`}
                                    delay={0.7}
                                />
                                <StatBadge
                                    label={language === 'ar' ? 'تطوع' : 'Volunteer'}
                                    value={`${common.volunteerHours}+ hrs`}
                                    delay={0.8}
                                />
                                <StatBadge
                                    label={language === 'ar' ? 'منذ' : 'Since'}
                                    value={`${common.volunteeringStart}`}
                                    delay={0.9}
                                />
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                className="flex flex-wrap gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <button
                                    onClick={scrollToProjects}
                                    className="group relative px-6 py-3 bg-neon-blue text-carbon font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {getText(ui.cta.viewDeployments, language)}
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button
                                    onClick={scrollToContact}
                                    className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-neon-blue transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-carbon"
                                >
                                    {getText(ui.cta.initiateContact, language)}
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scroll indicator */}

        </section>
    );
}

export default HeroTerminal;
