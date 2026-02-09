// FILE: components/DesignPortfolio.tsx
// ============================================
// Design Portfolio - Graphic Design Showcase
// Premium gallery for Canva & AI design work
// ============================================

'use client';

import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Palette, Sparkles, Wand2, Layers } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Design work data
const designs = [
    {
        id: 1,
        src: '/صورة 1.jpeg',
        title: { ar: 'قسم الخضار - أبو زيد', en: 'Vegetable Section - Abu Zaid' },
        category: 'social-media',
        tools: ['Canva', 'AI'],
        description: { ar: 'تصميم لافتة قسم الخضار', en: 'Vegetable section signage design' }
    },
    {
        id: 2,
        src: '/صورة 2.jpeg',
        title: { ar: 'قسم الفواكه - أبو زيد', en: 'Fruits Section - Abu Zaid' },
        category: 'social-media',
        tools: ['Canva', 'AI'],
        description: { ar: 'تصميم لافتة قسم الفواكه', en: 'Fruits section signage design' }
    },
    {
        id: 3,
        src: '/صورة 3.jpeg',
        title: { ar: 'عروض الأسعار - أبو زيد', en: 'Price Offers - Abu Zaid' },
        category: 'marketing',
        tools: ['Canva', 'AI'],
        description: { ar: 'تصميم عروض الأسعار', en: 'Price offers design' }
    },
];

const categories = [
    { id: 'all', ar: 'الكل', en: 'All', icon: Layers },
    { id: 'social-media', ar: 'سوشيال ميديا', en: 'Social Media', icon: Sparkles },
    { id: 'marketing', ar: 'تسويق', en: 'Marketing', icon: Wand2 },
];

// Design Card Component
interface DesignCardProps {
    design: typeof designs[0];
    index: number;
    onClick: () => void;
}

const DesignCard = memo(function DesignCard({ design, index, onClick }: DesignCardProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 80, damping: 15 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
            onClick={onClick}
            className="relative group cursor-pointer overflow-hidden rounded-3xl perspective-1000"
        >
            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Image container */}
            <div className="relative w-full h-80 md:h-96 overflow-hidden rounded-3xl bg-surface/50 backdrop-blur-sm">
                <Image
                    src={design.src}
                    alt={language === 'ar' ? design.title.ar : design.title.en}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

                {/* Glowing corners */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-blue/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-purple/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>

            {/* Tools badge */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
                {design.tools.map((tool, i) => (
                    <motion.div
                        key={tool}
                        initial={{ scale: 0, rotate: -45 }}
                        animate={isInView ? { scale: 1, rotate: 0 } : {}}
                        transition={{ delay: index * 0.1 + 0.2 + i * 0.1, type: 'spring' }}
                        className="px-3 py-1.5 bg-gradient-to-r from-neon-blue/90 to-neon-purple/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-lg"
                    >
                        {tool}
                    </motion.div>
                ))}
            </div>

            {/* Caption overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-carbon/95 via-carbon/70 to-transparent backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white font-semibold text-base md:text-lg tracking-wide">
                    {language === 'ar' ? design.title.ar : design.title.en}
                </p>
                <p className="text-text-secondary text-sm mt-1">
                    {language === 'ar' ? design.description.ar : design.description.en}
                </p>
            </div>

            {/* View icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-neon-blue to-neon-purple backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 shadow-xl shadow-neon-blue/40 transition-all duration-400 z-10">
                <Palette className="w-8 h-8 text-white" />
            </div>
        </motion.div>
    );
});

// Lightbox Component
interface LightboxProps {
    design: typeof designs[0] | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox = memo(function Lightbox({ design, onClose, onPrev, onNext }: LightboxProps) {
    const { language } = useLanguage();

    if (!design) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/98 backdrop-blur-2xl"
            onClick={onClose}
        >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Close button */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50 shadow-lg"
            >
                <X className="w-6 h-6 text-text-primary" />
            </motion.button>

            {/* Navigation buttons */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 p-4 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50 shadow-lg group"
            >
                <ChevronLeft className="w-7 h-7 text-text-primary group-hover:text-neon-blue transition-colors" />
            </motion.button>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 p-4 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50 shadow-lg group"
            >
                <ChevronRight className="w-7 h-7 text-text-primary group-hover:text-neon-blue transition-colors" />
            </motion.button>

            {/* Image container */}
            <motion.div
                initial={{ scale: 0.7, opacity: 0, rotateY: -15 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.7, opacity: 0, rotateY: 15 }}
                transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                className="relative w-[92vw] h-[85vh] max-w-6xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Glowing frame */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-3xl opacity-30 blur-sm" />
                <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green rounded-3xl opacity-50" />

                {/* Image */}
                <div className="relative w-full h-full bg-carbon rounded-3xl overflow-hidden">
                    <Image
                        src={design.src}
                        alt={language === 'ar' ? design.title.ar : design.title.en}
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* Caption */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-carbon via-carbon/90 to-transparent rounded-b-3xl"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="w-10 h-0.5 bg-gradient-to-r from-transparent to-neon-blue rounded-full" />
                            <Palette className="w-4 h-4 text-neon-purple" />
                            <span className="w-10 h-0.5 bg-gradient-to-l from-transparent to-neon-purple rounded-full" />
                        </div>
                        <p className="text-white text-xl md:text-2xl font-semibold text-center tracking-wide">
                            {language === 'ar' ? design.title.ar : design.title.en}
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-3">
                            {design.tools.map((tool) => (
                                <span key={tool} className="px-3 py-1 bg-neon-blue/20 border border-neon-blue/30 rounded-full text-xs text-neon-blue font-medium">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
});

// Main Component
export default function DesignPortfolio() {
    const { language } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDesign, setSelectedDesign] = useState<typeof designs[0] | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const isHeaderInView = useInView(headerRef, { once: true });

    const filteredDesigns = selectedCategory === 'all'
        ? designs
        : designs.filter(d => d.category === selectedCategory);

    const handlePrev = () => {
        const currentIndex = filteredDesigns.findIndex(d => d.id === selectedDesign?.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredDesigns.length - 1;
        setSelectedDesign(filteredDesigns[prevIndex]);
    };

    const handleNext = () => {
        const currentIndex = filteredDesigns.findIndex(d => d.id === selectedDesign?.id);
        const nextIndex = currentIndex < filteredDesigns.length - 1 ? currentIndex + 1 : 0;
        setSelectedDesign(filteredDesigns[nextIndex]);
    };

    return (
        <section id="design-portfolio" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-[100px]" />
            </div>

            {/* Header */}
            <div ref={headerRef} className="max-w-7xl mx-auto mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-purple/10 border border-neon-purple/20 rounded-full mb-6">
                        <Palette className="w-5 h-5 text-neon-purple" />
                        <span className="text-sm text-neon-purple font-medium">
                            {language === 'ar' ? 'معرض التصاميم' : 'Design Portfolio'}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="gradient-text">
                            {language === 'ar' ? 'أعمال التصميم الجرافيكي' : 'Graphic Design Work'}
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto">
                        {language === 'ar'
                            ? 'تصاميم احترافية باستخدام Canva وأدوات الذكاء الاصطناعي'
                            : 'Professional designs using Canva & AI tools'
                        }
                    </p>
                </motion.div>

                {/* Category filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-3 mt-12"
                >
                    {categories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isHeaderInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                                    ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                                        : 'bg-surface/50 border border-border-color text-text-secondary hover:border-neon-blue/50 hover:text-text-primary'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {language === 'ar' ? cat.ar : cat.en}
                            </motion.button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Design grid */}
            <div className="max-w-7xl mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredDesigns.map((design, index) => (
                            <DesignCard
                                key={design.id}
                                design={design}
                                index={index}
                                onClick={() => setSelectedDesign(design)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedDesign && (
                    <Lightbox
                        design={selectedDesign}
                        onClose={() => setSelectedDesign(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>

            {/* Stats banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="max-w-4xl mx-auto mt-20 p-8 bg-gradient-to-r from-surface/50 to-surface-elevated/50 backdrop-blur-sm border border-border-color rounded-3xl"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                    <div>
                        <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">20+</div>
                        <div className="text-sm text-text-secondary">
                            {language === 'ar' ? 'تصميم منجز' : 'Designs Created'}
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">2</div>
                        <div className="text-sm text-text-secondary">
                            {language === 'ar' ? 'أدوات رئيسية' : 'Main Tools'}
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</div>
                        <div className="text-sm text-text-secondary">
                            {language === 'ar' ? 'رضا العملاء' : 'Client Satisfaction'}
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
