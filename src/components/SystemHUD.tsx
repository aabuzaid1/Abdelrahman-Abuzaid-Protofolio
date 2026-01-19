// FILE: components/SystemHUD.tsx
// ============================================
// System Status HUD - Fixed Sidebar Navigation
// Shows time, section spy, heartbeat, and language toggle
// ============================================

'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { navSections, formatTime, getText } from '@/lib/content';

// Heartbeat visualization component
const HeartbeatGraph = memo(function HeartbeatGraph() {
    return (
        <div
            className="flex items-end justify-center gap-0.5 h-5 mt-2"
            role="img"
            aria-label="Volunteer spirit indicator"
        >
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="w-1 bg-neon-green rounded-full heartbeat-bar origin-bottom"
                    style={{
                        height: '100%',
                        animationDelay: `${i * 0.1}s`
                    }}
                />
            ))}
        </div>
    );
});

// Time display component
const TimeDisplay = memo(function TimeDisplay() {
    const { language } = useLanguage();
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => setTime(formatTime(language));
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [language]);

    if (!mounted) return <div className="h-4" />;

    return (
        <div className="text-center">
            <div className="text-[10px] text-text-muted uppercase tracking-wider mb-1">
                {language === 'ar' ? 'عمّان' : 'Amman'}
            </div>
            <div className="font-mono text-xs text-neon-blue" dir="ltr">
                {time}
            </div>
        </div>
    );
});

// Section navigation dot
interface NavDotProps {
    section: typeof navSections[0];
    isActive: boolean;
    onClick: () => void;
}

const NavDot = memo(function NavDot({ section, isActive, onClick }: NavDotProps) {
    const { language } = useLanguage();

    return (
        <button
            onClick={onClick}
            className={clsx(
                'group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300',
                isActive
                    ? 'bg-neon-blue/20'
                    : 'hover:bg-white/5'
            )}
            aria-label={getText(section.label, language)}
            aria-current={isActive ? 'location' : undefined}
        >
            <motion.div
                className={clsx(
                    'w-2 h-2 rounded-full transition-colors',
                    isActive ? 'bg-neon-blue glow-blue' : 'bg-white/30 group-hover:bg-white/50'
                )}
                layoutId={`nav-indicator-${section.id}`}
            />

            {/* Tooltip */}
            <div className={clsx(
                'absolute whitespace-nowrap px-2 py-1 bg-surface-elevated rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50',
                language === 'ar' ? 'right-full mr-2' : 'left-full ml-2'
            )}>
                {getText(section.label, language)}
            </div>
        </button>
    );
});

// Mobile menu overlay
interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    activeSection: string;
    onNavigate: (sectionId: string) => void;
}

const MobileMenu = memo(function MobileMenu({ isOpen, onClose, activeSection, onNavigate }: MobileMenuProps) {
    const { language, toggleLanguage, isRTL } = useLanguage();

    const handleNavigate = (sectionId: string) => {
        onNavigate(sectionId);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-carbon/90 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu panel */}
                    <motion.nav
                        initial={{ x: isRTL ? '100%' : '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: isRTL ? '100%' : '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={clsx(
                            'fixed top-0 bottom-0 w-72 bg-carbon-light border-surface z-50',
                            isRTL ? 'right-0 border-l' : 'left-0 border-r'
                        )}
                    >
                        <div className="flex flex-col h-full p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-8">
                                <span className="font-mono text-neon-blue text-sm">Impact.Lab</span>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Navigation */}
                            <div className="flex-1 space-y-2">
                                {navSections.map(section => (
                                    <button
                                        key={section.id}
                                        onClick={() => handleNavigate(section.id)}
                                        className={clsx(
                                            'w-full text-start p-3 rounded-lg transition-all duration-300',
                                            activeSection === section.id
                                                ? 'bg-neon-blue/20 text-neon-blue'
                                                : 'hover:bg-white/5'
                                        )}
                                    >
                                        {getText(section.label, language)}
                                    </button>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <TimeDisplay />
                                <HeartbeatGraph />

                                <button
                                    onClick={toggleLanguage}
                                    className="w-full flex items-center justify-center gap-2 p-3 bg-surface rounded-lg hover:bg-surface-elevated transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm">{language === 'ar' ? 'English' : 'العربية'}</span>
                                </button>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
});

// Main SystemHUD component
function SystemHUD() {
    const { language, toggleLanguage, isRTL } = useLanguage();
    const [activeSection, setActiveSection] = useState('system-status');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Scroll spy to detect active section
    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            const sections = navSections.map(s => document.getElementById(s.id)).filter(Boolean);
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(navSections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mounted]);

    const scrollToSection = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Desktop HUD */}
            <motion.aside
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={clsx(
                    'fixed top-0 bottom-0 w-[72px] bg-carbon-light/80 backdrop-blur-md border-surface z-40 hidden md:flex flex-col items-center py-6',
                    isRTL ? 'right-0 border-l' : 'left-0 border-r'
                )}
                role="navigation"
                aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Main navigation'}
            >
                {/* Logo/Brand */}
                <div className="mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                        <span className="font-mono font-bold text-lg text-carbon">A</span>
                    </div>
                </div>

                {/* Time Display */}
                <TimeDisplay />

                {/* Navigation Dots */}
                <nav className="flex-1 flex flex-col items-center justify-center gap-1 my-6">
                    {navSections.map(section => (
                        <NavDot
                            key={section.id}
                            section={section}
                            isActive={activeSection === section.id}
                            onClick={() => scrollToSection(section.id)}
                        />
                    ))}
                </nav>

                {/* Heartbeat */}
                <div className="mb-4">
                    <div className="text-[8px] text-text-muted uppercase tracking-wider text-center mb-1">
                        {language === 'ar' ? 'الروح' : 'Spirit'}
                    </div>
                    <HeartbeatGraph />
                </div>

                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="w-10 h-10 rounded-lg bg-surface hover:bg-surface-elevated transition-colors flex items-center justify-center group"
                    aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                >
                    <Globe className="w-4 h-4 group-hover:text-neon-blue transition-colors" />
                </button>
            </motion.aside>

            {/* Mobile Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-0 left-0 right-0 h-16 bg-carbon-light/90 backdrop-blur-md border-b border-surface z-40 flex md:hidden items-center justify-between px-4"
            >
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={language === 'ar' ? 'فتح القائمة' : 'Open menu'}
                    aria-expanded={isMobileMenuOpen}
                >
                    <Menu className="w-6 h-6" />
                </button>

                <div className="font-mono text-neon-blue text-sm">Impact.Lab</div>

                <button
                    onClick={toggleLanguage}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
                >
                    <Globe className="w-5 h-5" />
                </button>
            </motion.header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                activeSection={activeSection}
                onNavigate={scrollToSection}
            />
        </>
    );
}

export default SystemHUD;
