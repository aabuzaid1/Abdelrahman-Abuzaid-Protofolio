// FILE: components/PhotoGallery.tsx
// ============================================
// Premium Photo Gallery - Community Impact & Leadership
// Elegant masonry layout with 3D effects, glassmorphism, and lightbox
// ============================================

'use client';

import { useState, useRef, memo, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, Users, Award, Camera, Sparkles, Star, Zap, Trophy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Enhanced photo data with all available images
const photos = [
    // Professional/Portrait photos
    { id: 1, src: '/gallery3.jpg', category: 'portrait', ar: 'صورة رسمية', en: 'Professional Portrait', featured: false },
    { id: 2, src: '/gallery6.jpg', category: 'portrait', ar: 'لحظة الإنجاز', en: 'Achievement Moment', featured: false },
    { id: 3, src: '/gallery7.jpg', category: 'portrait', ar: 'لقطة شخصية', en: 'Personal Shot', featured: false },

    // Volunteer with Children
    { id: 4, src: '/gallery1.jpg', category: 'community', ar: 'مع الأطفال - العمل التطوعي', en: 'With Children - Volunteering', featured: false },
    { id: 5, src: '/gallery2.jpg', category: 'community', ar: 'نشاط مجتمعي', en: 'Community Activity', featured: false },
    { id: 6, src: '/gallery9.jpg', category: 'community', ar: 'خدمة المجتمع', en: 'Community Service', featured: false },

    // Graduation/Ceremony
    { id: 7, src: '/gallery4.jpg', category: 'ceremony', ar: 'حفل التخريج', en: 'Graduation Ceremony', featured: true },
    { id: 8, src: '/gallery18.jpg', category: 'ceremony', ar: 'حفل التكريم', en: 'Award Ceremony', featured: false },
    { id: 9, src: '/gallery13.jpg', category: 'ceremony', ar: 'لحظة التتويج', en: 'Crowning Moment', featured: false },

    // Team/Group photos
    { id: 10, src: '/gallery8.jpg', category: 'team', ar: 'فريق المتطوعين', en: 'Volunteer Team', featured: false },
    { id: 11, src: '/gallery10.jpg', category: 'team', ar: 'فريق العمل الميداني', en: 'Field Work Team', featured: false },
    { id: 12, src: '/gallery11.jpg', category: 'team', ar: 'الفريق التطوعي', en: 'Volunteer Squad', featured: false },
    { id: 13, src: '/gallery17.jpg', category: 'team', ar: 'جلسة عمل جماعية', en: 'Team Session', featured: false },
    { id: 14, src: '/gallery14.jpg', category: 'team', ar: 'روح الفريق', en: 'Team Spirit', featured: false },

    // Sports/Activity
    { id: 15, src: '/gallery5.jpg', category: 'sports', ar: 'نشاط رياضي مع الشباب', en: 'Sports Activity with Youth', featured: false },
    { id: 16, src: '/gallery15.jpg', category: 'sports', ar: 'الحماس والنشاط', en: 'Energy & Activity', featured: false },

    // Cultural/Event
    { id: 17, src: '/gallery12.jpg', category: 'event', ar: 'حدث ثقافي', en: 'Cultural Event', featured: false },
    { id: 18, src: '/gallery16.jpg', category: 'event', ar: 'مناسبة خاصة', en: 'Special Occasion', featured: false },
];

// Category filter buttons with premium styling
const categories = [
    { id: 'all', ar: 'الكل', en: 'All', icon: Sparkles },
    { id: 'portrait', ar: 'شخصية', en: 'Portrait', icon: Star },
    { id: 'community', ar: 'مجتمعي', en: 'Community', icon: Heart },
    { id: 'team', ar: 'الفريق', en: 'Team', icon: Users },
    { id: 'ceremony', ar: 'حفلات', en: 'Ceremony', icon: Trophy },
    { id: 'sports', ar: 'رياضة', en: 'Sports', icon: Zap },
];

// Premium Photo Card with 3D effects and glassmorphism
interface PhotoCardProps {
    photo: typeof photos[0];
    index: number;
    onClick: () => void;
}

const PhotoCard = memo(function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    // Dynamic sizing for visual interest
    const isLarge = photo.featured || index === 0 || index === 4;
    const isMedium = index % 5 === 2 || index % 7 === 3;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 15 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 80, damping: 15 }}
            whileHover={{
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3 }
            }}
            className={`relative group cursor-pointer overflow-hidden rounded-3xl 
                ${isLarge ? 'col-span-2 row-span-2' : isMedium ? 'col-span-2' : ''}
                perspective-1000`}
            onClick={onClick}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Animated gradient border */}
            <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

            {/* Image container with glassmorphism */}
            <div className={`relative w-full ${isLarge ? 'h-80 md:h-[420px]' : isMedium ? 'h-56 md:h-72' : 'h-52 md:h-64'} 
                overflow-hidden rounded-3xl bg-surface/50 backdrop-blur-sm`}
            >
                <Image
                    src={photo.src}
                    alt={language === 'ar' ? photo.ar : photo.en}
                    fill
                    className="object-cover object-[center_20%] transition-all duration-700 
                        group-hover:scale-110 group-hover:brightness-110"
                    sizes={isLarge ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                />

                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/20 to-transparent 
                    opacity-40 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />

                {/* Glowing corners */}
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-neon-blue/40 rounded-full blur-3xl 
                    opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-neon-purple/40 rounded-full blur-3xl 
                    opacity-0 group-hover:opacity-100 transition-all duration-700" />

                {/* Inner glow border */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 
                    rounded-3xl transition-all duration-500 pointer-events-none" />
            </div>

            {/* Featured badge */}
            {photo.featured && (
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ delay: index * 0.08 + 0.3, type: 'spring' }}
                    className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-neon-blue to-neon-purple 
                        rounded-full flex items-center gap-1.5 shadow-lg shadow-neon-blue/30 z-10"
                >
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                    <span className="text-xs font-bold text-white">
                        {language === 'ar' ? 'مميز' : 'Featured'}
                    </span>
                </motion.div>
            )}

            {/* Caption overlay with glassmorphism */}
            <motion.div
                initial={{ y: 30, opacity: 0 }}
                className="absolute bottom-0 left-0 right-0 p-5 
                    bg-gradient-to-t from-carbon/95 via-carbon/70 to-transparent
                    backdrop-blur-md
                    transform translate-y-4 group-hover:translate-y-0 
                    opacity-0 group-hover:opacity-100 transition-all duration-400"
            >
                <p className="text-white font-semibold text-sm md:text-base tracking-wide">
                    {language === 'ar' ? photo.ar : photo.en}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="w-8 h-0.5 bg-gradient-to-r from-neon-blue to-transparent rounded-full" />
                    <span className="text-xs text-text-secondary capitalize">
                        {language === 'ar'
                            ? categories.find(c => c.id === photo.category)?.ar
                            : photo.category
                        }
                    </span>
                </div>
            </motion.div>

            {/* Floating view button */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-4 right-4 w-11 h-11 
                    bg-gradient-to-br from-neon-blue to-neon-purple 
                    backdrop-blur-md rounded-2xl 
                    flex items-center justify-center 
                    opacity-0 group-hover:opacity-100 
                    scale-0 group-hover:scale-100 
                    shadow-xl shadow-neon-blue/40
                    transition-all duration-400 z-10"
            >
                <Camera className="w-5 h-5 text-white" />
            </motion.div>

            {/* Subtle inner shadow for depth */}
            <div className="absolute inset-0 rounded-3xl shadow-inner pointer-events-none" />
        </motion.div>
    );
});

// Premium Lightbox component with glassmorphism
interface LightboxProps {
    photo: typeof photos[0] | null;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox = memo(function Lightbox({ photo, onClose, onPrev, onNext }: LightboxProps) {
    const { language } = useLanguage();

    if (!photo) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/98 backdrop-blur-2xl"
            onClick={onClose}
        >
            {/* Background glow effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-neon-blue/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Close button - Premium */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 
                    rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50
                    shadow-lg shadow-carbon/50"
            >
                <X className="w-6 h-6 text-text-primary" />
            </motion.button>

            {/* Navigation buttons - Premium */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 p-4 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 
                    rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50
                    shadow-lg shadow-carbon/50 group"
            >
                <ChevronLeft className="w-7 h-7 text-text-primary group-hover:text-neon-blue transition-colors" />
            </motion.button>

            <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 p-4 bg-surface/60 backdrop-blur-md hover:bg-neon-blue/30 
                    rounded-2xl transition-all duration-300 z-50 border border-border-color hover:border-neon-blue/50
                    shadow-lg shadow-carbon/50 group"
            >
                <ChevronRight className="w-7 h-7 text-text-primary group-hover:text-neon-blue transition-colors" />
            </motion.button>

            {/* Image container - Premium */}
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
                        src={photo.src}
                        alt={language === 'ar' ? photo.ar : photo.en}
                        fill
                        className="object-contain"
                        priority
                    />

                    {/* Featured badge in lightbox */}
                    {photo.featured && (
                        <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-neon-blue to-neon-purple 
                            rounded-full flex items-center gap-2 shadow-lg shadow-neon-blue/40">
                            <Star className="w-4 h-4 text-white fill-white" />
                            <span className="text-sm font-bold text-white">
                                {language === 'ar' ? 'مميز' : 'Featured'}
                            </span>
                        </div>
                    )}

                    {/* Caption - Premium glassmorphism */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-0 left-0 right-0 p-8 
                            bg-gradient-to-t from-carbon via-carbon/90 to-transparent rounded-b-3xl"
                    >
                        <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="w-10 h-0.5 bg-gradient-to-r from-transparent to-neon-blue rounded-full" />
                            <Camera className="w-4 h-4 text-neon-purple" />
                            <span className="w-10 h-0.5 bg-gradient-to-l from-transparent to-neon-purple rounded-full" />
                        </div>
                        <p className="text-white text-xl md:text-2xl font-semibold text-center tracking-wide">
                            {language === 'ar' ? photo.ar : photo.en}
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
});

function PhotoGallery() {
    const { language } = useLanguage();
    const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredPhotos = activeCategory === 'all'
        ? photos
        : photos.filter(p => p.category === activeCategory);

    const handlePrev = () => {
        if (!selectedPhoto) return;
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredPhotos.length - 1;
        setSelectedPhoto(filteredPhotos[prevIndex]);
    };

    const handleNext = () => {
        if (!selectedPhoto) return;
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        const nextIndex = currentIndex < filteredPhotos.length - 1 ? currentIndex + 1 : 0;
        setSelectedPhoto(filteredPhotos[nextIndex]);
    };

    return (
        <section id="gallery" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Premium background effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Animated gradient orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-blue/8 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/8 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-green/5 rounded-full blur-[120px]" />

                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), 
                                     linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />

                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-2 h-2 bg-neon-blue rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-neon-purple rounded-full animate-ping" style={{ animationDuration: '3s' }} />
            </div>

            {/* Premium section header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                {/* Code-style tag */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="inline-block mb-6"
                >
                    <span className="font-mono text-neon-blue text-sm px-4 py-2 bg-neon-blue/10 rounded-full border border-neon-blue/20">
                        {'<'} {language === 'ar' ? 'معرض_الصور' : 'photo_gallery'} {'/>'}
                    </span>
                </motion.div>

                {/* Main title with gradient */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-white via-neon-blue to-neon-purple bg-clip-text text-transparent">
                        {language === 'ar' ? 'لحظات من الرحلة' : 'Moments from the Journey'}
                    </span>
                </h2>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="w-12 h-0.5 bg-gradient-to-r from-transparent to-neon-blue rounded-full" />
                    <Sparkles className="w-5 h-5 text-neon-purple" />
                    <span className="w-12 h-0.5 bg-gradient-to-l from-transparent to-neon-purple rounded-full" />
                </div>

                <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed">
                    {language === 'ar'
                        ? 'صور توثق مسيرة العمل التطوعي والمشاركة المجتمعية والإنجازات'
                        : 'Photos documenting volunteer work, community engagement, and achievements'
                    }
                </p>
            </motion.div>

            {/* Premium category filters with glassmorphism */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap justify-center gap-3 mb-14"
            >
                {categories.map((cat, idx) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-medium transition-all duration-300 
                                ${isActive
                                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                                    : 'bg-surface/60 backdrop-blur-md text-text-secondary hover:text-text-primary border border-border-color hover:border-neon-blue/40'
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                            <span>{language === 'ar' ? cat.ar : cat.en}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple -z-10"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* Photo grid with improved layout */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7 max-w-7xl mx-auto auto-rows-auto"
            >
                <AnimatePresence mode="popLayout">
                    {filteredPhotos.map((photo, index) => (
                        <PhotoCard
                            key={photo.id}
                            photo={photo}
                            index={index}
                            onClick={() => setSelectedPhoto(photo)}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Stats banner */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 max-w-4xl mx-auto"
            >
                <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-green/10 border border-border-color rounded-2xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-2">200+</div>
                            <div className="text-sm text-text-secondary">
                                {language === 'ar' ? 'ساعة تطوعية' : 'Volunteer Hours'}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-2">5+</div>
                            <div className="text-sm text-text-secondary">
                                {language === 'ar' ? 'منظمات' : 'Organizations'}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">2021</div>
                            <div className="text-sm text-text-secondary">
                                {language === 'ar' ? 'بداية الرحلة' : 'Journey Started'}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <Lightbox
                        photo={selectedPhoto}
                        onClose={() => setSelectedPhoto(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}

export default PhotoGallery;
