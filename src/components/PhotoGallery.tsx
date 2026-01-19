// FILE: components/PhotoGallery.tsx
// ============================================
// Stunning Photo Gallery - Community Impact & Leadership
// Masonry layout with hover effects and lightbox
// ============================================

'use client';

import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, Users, Award, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

// Photo data with categories
const photos = [
    // Professional/Portrait photos
    { id: 1, src: '/gallery3.jpg', category: 'portrait', ar: 'صورة رسمية', en: 'Professional Portrait' },
    { id: 2, src: '/gallery6.jpg', category: 'portrait', ar: 'لحظة الإنجاز', en: 'Achievement Moment' },

    // Volunteer with Children
    { id: 3, src: '/gallery1.jpg', category: 'community', ar: 'مع الأطفال - العمل التطوعي', en: 'With Children - Volunteering' },
    { id: 4, src: '/gallery2.jpg', category: 'community', ar: 'نشاط مجتمعي', en: 'Community Activity' },

    // Graduation/Ceremony
    { id: 5, src: '/gallery4.jpg', category: 'ceremony', ar: 'حفل التخريج', en: 'Graduation Ceremony' },
    { id: 6, src: '/gallery18.jpg', category: 'ceremony', ar: 'حفل التكريم', en: 'Award Ceremony' },

    // Team/Group photos
    { id: 7, src: '/gallery8.jpg', category: 'team', ar: 'فريق المتطوعين', en: 'Volunteer Team' },
    { id: 8, src: '/gallery10.jpg', category: 'team', ar: 'فريق العمل الميداني', en: 'Field Work Team' },
    { id: 9, src: '/gallery11.jpg', category: 'team', ar: 'الفريق التطوعي', en: 'Volunteer Squad' },
    { id: 10, src: '/gallery17.jpg', category: 'team', ar: 'جلسة عمل جماعية', en: 'Team Session' },

    // Sports/Activity
    { id: 11, src: '/gallery5.jpg', category: 'sports', ar: 'نشاط رياضي مع الشباب', en: 'Sports Activity with Youth' },

    // Cultural/Event
    { id: 12, src: '/gallery12.jpg', category: 'event', ar: 'حدث ثقافي', en: 'Cultural Event' },
];

// Category filter buttons
const categories = [
    { id: 'all', ar: 'الكل', en: 'All', icon: Camera },
    { id: 'portrait', ar: 'شخصية', en: 'Portrait', icon: Award },
    { id: 'community', ar: 'مجتمعي', en: 'Community', icon: Heart },
    { id: 'team', ar: 'الفريق', en: 'Team', icon: Users },
];

// Single photo card
interface PhotoCardProps {
    photo: typeof photos[0];
    index: number;
    onClick: () => void;
}

const PhotoCard = memo(function PhotoCard({ photo, index, onClick }: PhotoCardProps) {
    const { language } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    // Determine card size based on position for masonry effect
    const isLarge = index === 0 || index === 5;
    const isMedium = index === 2 || index === 7;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl ${isLarge ? 'col-span-2 row-span-2' : isMedium ? 'col-span-2' : ''
                }`}
            onClick={onClick}
        >
            {/* Image container */}
            <div className={`relative w-full ${isLarge ? 'h-80 md:h-96' : isMedium ? 'h-48 md:h-64' : 'h-48 md:h-64'} overflow-hidden`}>
                <Image
                    src={photo.src}
                    alt={language === 'ar' ? photo.ar : photo.en}
                    fill
                    className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow border on hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue/50 rounded-2xl transition-all duration-300" />

                {/* Corner glow effects */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-blue/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-neon-purple/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Caption overlay */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
                <p className="text-text-primary font-medium text-sm md:text-base">
                    {language === 'ar' ? photo.ar : photo.en}
                </p>
            </motion.div>

            {/* View indicator */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-neon-blue/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-300">
                <Camera className="w-5 h-5 text-carbon" />
            </div>
        </motion.div>
    );
});

// Lightbox component
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/95 backdrop-blur-xl"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-surface/50 hover:bg-surface rounded-full transition-colors z-50"
            >
                <X className="w-6 h-6 text-text-primary" />
            </button>

            {/* Navigation buttons */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 p-3 bg-surface/50 hover:bg-neon-blue/50 rounded-full transition-colors z-50"
            >
                <ChevronLeft className="w-6 h-6 text-text-primary" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 p-3 bg-surface/50 hover:bg-neon-blue/50 rounded-full transition-colors z-50"
            >
                <ChevronRight className="w-6 h-6 text-text-primary" />
            </button>

            {/* Image */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative w-[90vw] h-[80vh] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={photo.src}
                    alt={language === 'ar' ? photo.ar : photo.en}
                    fill
                    className="object-contain rounded-2xl"
                    priority
                />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-carbon to-transparent rounded-b-2xl">
                    <p className="text-text-primary text-lg md:text-xl font-medium text-center">
                        {language === 'ar' ? photo.ar : photo.en}
                    </p>
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
        <section id="gallery" className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16 overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-neon-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl" />
            </div>

            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <span className="font-mono text-neon-blue text-sm mb-4 block">
                    {'<'} {language === 'ar' ? 'معرض_الصور' : 'photo_gallery'} {'/>'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    <span className="gradient-text">
                        {language === 'ar' ? 'لحظات من الرحلة' : 'Moments from the Journey'}
                    </span>
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    {language === 'ar'
                        ? 'صور توثق مسيرة العمل التطوعي والمشاركة المجتمعية والإنجازات'
                        : 'Photos documenting volunteer work, community engagement, and achievements'
                    }
                </p>
            </motion.div>

            {/* Category filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-3 mb-12"
            >
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${activeCategory === cat.id
                                ? 'bg-neon-blue text-carbon'
                                : 'bg-surface/50 text-text-secondary hover:bg-surface hover:text-text-primary border border-border-color'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{language === 'ar' ? cat.ar : cat.en}</span>
                        </button>
                    );
                })}
            </motion.div>

            {/* Photo grid */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto auto-rows-auto"
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
