// FILE: context/LanguageContext.tsx
// ============================================
// Language Context - React Context API for Bilingual Support
// ============================================

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/content';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
    dir: 'ltr' | 'rtl';
    locale: string;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
    defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(defaultLanguage);
    const [mounted, setMounted] = useState(false);

    // Derived values
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    const locale = language === 'ar' ? 'ar-JO' : 'en-US';
    const isRTL = language === 'ar';

    // Update document attributes when language changes
    useEffect(() => {
        setMounted(true);
        // Only access localStorage on client
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('impactlab-lang') as Language | null;
            if (saved && (saved === 'en' || saved === 'ar')) {
                setLanguageState(saved);
            }
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        document.documentElement.lang = language;
        document.documentElement.dir = dir;

        // Save preference
        localStorage.setItem('impactlab-lang', language);
    }, [language, dir, mounted]);

    const toggleLanguage = useCallback(() => {
        setLanguageState(prev => prev === 'en' ? 'ar' : 'en');
    }, []);

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const value: LanguageContextType = {
        language,
        toggleLanguage,
        setLanguage,
        dir,
        locale,
        isRTL
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Helper hook for easy text access
export function useText<T extends { en: string; ar: string }>(bilingual: T): string {
    const { language } = useLanguage();
    return bilingual[language];
}
