// FILE: components/ProtocolsMethodology.tsx
// ============================================
// Methodology Pipeline Visualization
// Lab protocol steps with animated connectors
// ============================================

'use client';

import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Boxes, Code, RefreshCw, Lightbulb, Cpu, Rocket, Settings } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { methodology, courses, softSkills, ui, getText } from '@/lib/content';

// Icon mapping for methodology steps
const methodologyIcons: Record<string, React.ReactNode> = {
    discover: <Search className="w-6 h-6" />,
    architect: <Boxes className="w-6 h-6" />,
    develop: <Code className="w-6 h-6" />,
    iterate: <RefreshCw className="w-6 h-6" />
};

// Icon mapping for soft skills
const skillIcons: Record<string, React.ReactNode> = {
    puzzle: <Lightbulb className="w-5 h-5" />,
    crown: <Rocket className="w-5 h-5" />,
    users: <Boxes className="w-5 h-5" />,
    'message-circle': <Cpu className="w-5 h-5" />,
    clock: <Settings className="w-5 h-5" />
};

// Methodology step component
interface StepProps {
    step: typeof methodology[0];
    index: number;
    total: number;
    isRTL: boolean;
}

const MethodologyStep = memo(function MethodologyStep({ step, index, total, isRTL }: StepProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const isLast = index === total - 1;

    return (
        <div ref={ref} className="relative flex flex-col items-center">
            {/* Step node */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
                className="relative z-10"
            >
                <div className="relative group">
                    {/* Outer ring */}
                    <motion.div
                        animate={isInView ? { rotate: 360 } : {}}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute -inset-2 rounded-full border border-dashed border-neon-blue/30"
                    />

                    {/* Main icon container */}
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-carbon-light border-2 border-neon-blue/50 rounded-full flex items-center justify-center group-hover:border-neon-blue group-hover:glow-blue transition-all duration-300">
                        <div className="text-neon-blue group-hover:scale-110 transition-transform">
                            {methodologyIcons[step.id]}
                        </div>
                    </div>

                    {/* Pulse effect */}
                    <motion.div
                        animate={isInView ? { scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] } : {}}
                        transition={{ delay: index * 0.15 + 0.5, duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-neon-blue/30"
                    />
                </div>
            </motion.div>

            {/* Connector line */}
            {!isLast && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    style={{ transformOrigin: isRTL ? 'right' : 'left' }}
                    className={clsx(
                        'absolute top-8 md:top-10 h-0.5 bg-gradient-to-r hidden lg:block',
                        isRTL
                            ? 'right-full mr-2 w-full from-neon-blue/50 to-transparent'
                            : 'left-full ml-2 w-full from-neon-blue/50 to-transparent'
                    )}
                />
            )}

            {/* Label */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="mt-4 text-center"
            >
                <h4 className="font-mono text-neon-blue font-semibold mb-1">
                    {getText(step.label, language)}
                </h4>
                <p className="text-xs text-text-muted max-w-[120px] md:max-w-[150px]">
                    {getText(step.description, language)}
                </p>
            </motion.div>
        </div>
    );
});

// Course tag component
interface CourseTagProps {
    course: typeof courses[0];
    index: number;
}

const CourseTag = memo(function CourseTag({ course, index }: CourseTagProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.span
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.05, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-white/10 rounded-lg font-mono text-sm hover:border-neon-purple/50 hover:text-neon-purple transition-colors"
        >
            <Cpu className="w-4 h-4 text-neon-purple/70" />
            {getText(course.name, language)}
        </motion.span>
    );
});

// Skill card component
interface SkillCardProps {
    skill: typeof softSkills[0];
    index: number;
}

const SkillCard = memo(function SkillCard({ skill, index }: SkillCardProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="group bg-surface/30 border border-white/5 rounded-xl p-4 hover:border-signal-amber/30 transition-all"
        >
            <div className="flex items-center gap-3">
                <div className="p-2 bg-signal-amber/10 rounded-lg text-signal-amber group-hover:scale-110 transition-transform">
                    {skillIcons[skill.icon] || <Lightbulb className="w-5 h-5" />}
                </div>
                <span className="text-sm font-medium">{getText(skill.name, language)}</span>
            </div>
        </motion.div>
    );
});

function ProtocolsMethodology() {
    const { language, isRTL } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section
            id="protocols"
            ref={sectionRef}
            className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16 bg-carbon-light/30"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-16"
            >
                <span className="font-mono text-neon-purple text-sm mb-4 block">
                    {'<'} {language === 'ar' ? 'المنهجية' : 'Protocols'} {'/>'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {language === 'ar' ? 'منهجية العمل' : 'Work Methodology'}
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    {language === 'ar'
                        ? 'نهج منظم للتعامل مع المشكلات وتقديم حلول فعالة'
                        : 'A structured approach to problem-solving and delivering effective solutions'
                    }
                </p>
            </motion.div>

            {/* Methodology pipeline */}
            <div className="max-w-5xl mx-auto mb-20">
                <div className={clsx(
                    'grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4',
                    isRTL && 'lg:flex-row-reverse'
                )}>
                    {methodology.map((step, index) => (
                        <MethodologyStep
                            key={step.id}
                            step={step}
                            index={index}
                            total={methodology.length}
                            isRTL={isRTL}
                        />
                    ))}
                </div>
            </div>

            {/* Two column layout for courses and skills */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Technical protocols (courses) */}
                <motion.div
                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-neon-purple/10 rounded-lg">
                            <Code className="w-5 h-5 text-neon-purple" />
                        </div>
                        <h3 className="text-xl font-semibold">
                            {getText(ui.labels.courses, language)}
                        </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {courses.map((course, index) => (
                            <CourseTag key={index} course={course} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* Core capabilities (soft skills) */}
                <motion.div
                    initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-signal-amber/10 rounded-lg">
                            <Lightbulb className="w-5 h-5 text-signal-amber" />
                        </div>
                        <h3 className="text-xl font-semibold">
                            {getText(ui.labels.capabilities, language)}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {softSkills.map((skill, index) => (
                            <SkillCard key={index} skill={skill} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ProtocolsMethodology;
