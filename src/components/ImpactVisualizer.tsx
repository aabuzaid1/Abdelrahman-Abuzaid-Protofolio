// FILE: components/ImpactVisualizer.tsx
// ============================================
// Impact Metrics Data Visualization
// Circular progress meter, metric strip, verified badges
// ============================================

'use client';

import { useEffect, useState, useRef, memo } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { Award, GraduationCap, Heart, Clock, Globe2, Trophy } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { common, volunteerRoles, ui, getText } from '@/lib/content';

// Animated counter component
interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

const AnimatedCounter = memo(function AnimatedCounter({
    value,
    suffix = '',
    duration = 2
}: AnimatedCounterProps) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.floor(eased * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref}>
            {displayValue}{suffix}
        </span>
    );
});

// Circular progress meter
interface CircularMeterProps {
    value: number;
    max: number;
    label: string;
    sublabel: string;
}

const CircularMeter = memo(function CircularMeter({
    value,
    max,
    label,
    sublabel
}: CircularMeterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const progress = useSpring(0, { stiffness: 30, damping: 15 });
    const percentage = (value / max) * 100;

    useEffect(() => {
        if (isInView) {
            progress.set(percentage);
        }
    }, [isInView, percentage, progress]);

    const circumference = 2 * Math.PI * 90; // radius = 90
    const strokeDashoffset = useTransform(progress, (p) => circumference - (p / 100) * circumference);

    return (
        <div ref={ref} className="relative w-64 h-64 md:w-72 md:h-72">
            {/* Background circle */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--neon-blue)" />
                        <stop offset="100%" stopColor="var(--neon-purple)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="text-center"
                >
                    <div className="text-4xl md:text-5xl font-bold text-neon-blue mb-1">
                        <AnimatedCounter value={value} suffix="+" />
                    </div>
                    <div className="text-sm text-text-secondary">{label}</div>
                    <div className="text-xs text-text-muted mt-1">{sublabel}</div>
                </motion.div>
            </div>

            {/* Pulse ring */}
            <motion.div
                className="absolute inset-2 rounded-full border-2 border-neon-blue/20"
                animate={isInView ? { scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] } : {}}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            />
        </div>
    );
});

// Verified badge floating around the meter
interface FloatingBadgeProps {
    icon: React.ReactNode;
    label: string;
    delay: number;
    position: { x: string; y: string };
}

const FloatingBadge = memo(function FloatingBadge({
    icon,
    label,
    delay,
    position
}: FloatingBadgeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay, type: 'spring', stiffness: 100 }}
            className="absolute"
            style={{ left: position.x, top: position.y }}
        >
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay }}
                className="flex items-center gap-2 px-3 py-2 bg-surface/80 backdrop-blur-sm border border-signal-amber/30 rounded-full"
            >
                <div className="text-signal-amber">{icon}</div>
                <span className="text-xs font-medium whitespace-nowrap">{label}</span>
            </motion.div>
        </motion.div>
    );
});

// Metric card
interface MetricCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    suffix?: string;
    delay: number;
}

const MetricCard = memo(function MetricCard({
    icon,
    label,
    value,
    suffix = '',
    delay
}: MetricCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, type: 'spring' }}
            className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-xl p-4 md:p-6 hover:border-neon-blue/30 transition-colors"
        >
            <div className="flex items-start gap-3">
                <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue">
                    {icon}
                </div>
                <div>
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                        {typeof value === 'number' ? <AnimatedCounter value={value} suffix={suffix} /> : value}
                    </div>
                    <div className="text-sm text-text-muted">{label}</div>
                </div>
            </div>
        </motion.div>
    );
});

// Volunteer role card
interface RoleCardProps {
    role: typeof volunteerRoles[0];
    index: number;
}

const RoleCard = memo(function RoleCard({ role, index }: RoleCardProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.2, type: 'spring' }}
            className="bg-surface/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-neon-green/30 transition-all group"
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors">
                        {getText(role.organization, language)}
                    </h3>
                    <p className="text-sm text-neon-blue">{getText(role.role, language)}</p>
                </div>
                <span className="text-xs font-mono text-text-muted bg-carbon-lighter px-2 py-1 rounded">
                    {role.period}
                </span>
            </div>

            <ul className="space-y-2">
                {role.activities.map((activity, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-neon-green mt-1">▸</span>
                        {getText(activity, language)}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
});

function ImpactVisualizer() {
    const { language } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <section
            id="impact-metrics"
            ref={sectionRef}
            className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <span className="font-mono text-neon-blue text-sm mb-4 block">
                    {'<'} {getText(ui.metrics.impactStart, language)} {'/>'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {language === 'ar' ? 'مؤشرات الأثر' : 'Impact Metrics'}
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    {language === 'ar'
                        ? 'قياس الأثر المجتمعي من خلال العمل التطوعي المستمر'
                        : 'Measuring community impact through continuous volunteer work'
                    }
                </p>
            </motion.div>

            {/* Main visualization area */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 mb-16">
                {/* Circular meter with floating badges */}
                <div className="relative">
                    <CircularMeter
                        value={common.volunteerHours}
                        max={300}
                        label={getText(ui.metrics.volunteerHours, language)}
                        sublabel={`${common.volunteeringStart}–${language === 'ar' ? 'الآن' : 'Present'}`}
                    />

                    {/* Floating badges */}
                    <FloatingBadge
                        icon={<Trophy className="w-4 h-4" />}
                        label={language === 'ar' ? 'جائزة 2025' : 'Award 2025'}
                        delay={1.5}
                        position={{ x: '-20%', y: '10%' }}
                    />
                    <FloatingBadge
                        icon={<GraduationCap className="w-4 h-4" />}
                        label={language === 'ar' ? 'منحة' : 'Scholarship'}
                        delay={1.8}
                        position={{ x: '85%', y: '20%' }}
                    />
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 gap-4 max-w-md">
                    <MetricCard
                        icon={<Clock className="w-5 h-5" />}
                        label={getText(ui.metrics.volunteerHours, language)}
                        value={common.volunteerHours}
                        suffix="+"
                        delay={0.2}
                    />
                    <MetricCard
                        icon={<Globe2 className="w-5 h-5" />}
                        label={getText(ui.metrics.websites, language)}
                        value={2}
                        delay={0.3}
                    />
                    <MetricCard
                        icon={<Award className="w-5 h-5" />}
                        label={getText(ui.metrics.gpa, language)}
                        value={`${common.gpa}`}
                        delay={0.4}
                    />
                    <MetricCard
                        icon={<Heart className="w-5 h-5" />}
                        label={language === 'ar' ? 'ساعات معتمدة' : 'Credits'}
                        value={common.completedCredits}
                        delay={0.5}
                    />
                </div>
            </div>

            {/* Award spotlight */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto mb-16"
            >
                <div className="bg-gradient-to-r from-signal-amber/10 to-neon-purple/10 border border-signal-amber/20 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="p-4 bg-signal-amber/20 rounded-xl">
                            <Trophy className="w-10 h-10 text-signal-amber" />
                        </div>
                        <div className="text-center md:text-start">
                            <h3 className="text-xl md:text-2xl font-bold text-signal-amber mb-2">
                                {getText(common.award, language)}
                            </h3>
                            <p className="text-text-secondary">
                                {getText(common.scholarship, language)}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Volunteer roles */}
            <div className="max-w-4xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xl md:text-2xl font-semibold text-center mb-8"
                >
                    {language === 'ar' ? 'مسار التطوع' : 'Volunteer Journey'}
                </motion.h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {volunteerRoles.map((role, index) => (
                        <RoleCard key={index} role={role} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ImpactVisualizer;
