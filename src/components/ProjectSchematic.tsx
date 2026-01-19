// FILE: components/ProjectSchematic.tsx
// ============================================
// Project Blueprint Cards
// Schematic/wireframe style with hover reveal
// ============================================

'use client';

import { useRef, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Code2, Layers } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { projects, ui, getText } from '@/lib/content';

// Tech tag component styled as microchip
interface TechTagProps {
    name: string;
    index: number;
}

const TechTag = memo(function TechTag({ name, index }: TechTagProps) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="inline-flex items-center gap-1 px-2 py-1 bg-carbon-lighter border border-white/10 rounded text-xs font-mono text-neon-blue"
        >
            <span className="w-1 h-1 bg-neon-green rounded-full" />
            {name}
        </motion.span>
    );
});

// Project blueprint card
interface ProjectCardProps {
    project: typeof projects[0];
    index: number;
}

const ProjectCard = memo(function ProjectCard({ project, index }: ProjectCardProps) {
    const { language, isRTL } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, y: 40, rotateY: isRTL ? 5 : -5 }}
            animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
            transition={{ delay: index * 0.2, type: 'spring', stiffness: 50 }}
            className="group relative"
        >
            {/* Blueprint card */}
            <div className="relative bg-carbon-light border border-white/10 rounded-2xl overflow-hidden hover:border-neon-blue/30 transition-all duration-500">
                {/* Grid overlay for blueprint effect */}
                <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity pointer-events-none"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Preview area */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                    {project.image ? (
                        <>
                            {/* Project image */}
                            <img
                                src={project.image}
                                alt={getText(project.title, language)}
                                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        </>
                    ) : (
                        <>
                            {/* Wireframe mockup for projects without image */}
                            <div className="absolute inset-4 border-2 border-dashed border-white/10 rounded-lg group-hover:border-neon-blue/20 transition-colors">
                                <div className="absolute top-4 left-4 right-4 h-3 bg-white/5 rounded group-hover:bg-neon-blue/10 transition-colors" />
                                <div className="absolute top-10 left-4 w-1/3 h-2 bg-white/5 rounded" />
                                <div className="absolute top-14 left-4 right-4 h-16 bg-white/5 rounded" />
                                <div className="absolute bottom-4 left-4 flex gap-2">
                                    <div className="w-16 h-6 bg-white/5 rounded" />
                                    <div className="w-16 h-6 bg-white/5 rounded" />
                                </div>
                            </div>

                            {/* Project icon for no-image projects */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0.5 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="p-6 bg-surface/50 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-neon-blue/30 group-hover:scale-110 transition-all duration-500">
                                    <Layers className="w-10 h-10 text-white/50 group-hover:text-neon-blue transition-colors" />
                                </div>
                            </motion.div>
                        </>
                    )}

                    {/* Gradient overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className={clsx(
                            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                            project.gradient
                        )}
                        style={{ mixBlendMode: 'soft-light' }}
                    />

                    {/* Blueprint label */}
                    <div className="absolute top-4 right-4 font-mono text-xs text-white/50 bg-carbon/50 px-2 py-1 rounded backdrop-blur-sm">
                        PROJ.{String(index + 1).padStart(2, '0')}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 group-hover:text-neon-blue transition-colors">
                        {getText(project.title, language)}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                        {getText(project.description, language)}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                            <TechTag key={tech} name={tech} index={i} />
                        ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-elevated border border-white/10 hover:border-white/20 rounded-lg text-sm transition-all group/btn"
                            >
                                <Github className="w-4 h-4 group-hover/btn:text-neon-blue transition-colors" />
                                <span>{getText(ui.labels.viewRepo, language)}</span>
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-neon-blue/10 hover:bg-neon-blue/20 border border-neon-blue/30 hover:border-neon-blue/50 rounded-lg text-sm text-neon-blue transition-all group/btn"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>{getText(ui.labels.liveDemo, language)}</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Corner accents */}
                <svg className="absolute top-0 left-0 w-6 h-6 text-white/10 pointer-events-none" viewBox="0 0 24 24">
                    <path d="M0 0 L24 0 L0 24" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-6 h-6 text-white/10 rotate-180 pointer-events-none" viewBox="0 0 24 24">
                    <path d="M0 0 L24 0 L0 24" fill="currentColor" />
                </svg>
            </div>
        </motion.article>
    );
});

function ProjectSchematic() {
    const { language } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    return (
        <section
            id="deployments"
            ref={sectionRef}
            className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-16"
            >
                <span className="font-mono text-neon-green text-sm mb-4 block">
                    {'<'} {language === 'ar' ? 'المشاريع' : 'Deployments'} {'/>'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {language === 'ar' ? 'المشاريع المنفذة' : 'Live Deployments'}
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    {language === 'ar'
                        ? 'مشاريع ويب تم تصميمها وتطويرها لتلبية احتياجات حقيقية'
                        : 'Web projects designed and developed to meet real-world needs'
                    }
                </p>
            </motion.div>

            {/* Schematic header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto mb-8"
            >
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                    <Code2 className="w-5 h-5 text-neon-blue" />
                    <span className="font-mono text-sm text-text-muted">
                        {language === 'ar' ? 'مخططات المشاريع' : 'PROJECT_SCHEMATICS'}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-neon-blue/50 to-transparent" />
                    <span className="font-mono text-xs text-text-muted">
                        {projects.length} {language === 'ar' ? 'مشاريع' : 'projects'}
                    </span>
                </div>
            </motion.div>

            {/* Projects grid */}
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Bottom decoration */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="max-w-5xl mx-auto mt-12"
            >
                <div className="h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
            </motion.div>
        </section>
    );
}

export default ProjectSchematic;
