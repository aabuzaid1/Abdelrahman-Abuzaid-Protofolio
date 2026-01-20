// FILE: components/ContactModule.tsx
// ============================================
// Contact Section - Form and Links
// Styled as a lab interface module
// ============================================

'use client';

import { useState, useRef, memo, FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Calendar, Languages, Github, Linkedin, Instagram, Facebook, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import { useLanguage } from '@/context/LanguageContext';
import { common, languages as languagesData, ui, getText, formatDate } from '@/lib/content';

// Input field component
interface InputFieldProps {
    label: string;
    name: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    isTextarea?: boolean;
}

const InputField = memo(function InputField({
    label,
    name,
    type = 'text',
    required = false,
    placeholder,
    value,
    onChange,
    isTextarea = false
}: InputFieldProps) {
    const inputClasses = clsx(
        'w-full bg-surface border border-border-color rounded-lg px-4 py-3 text-text-primary placeholder-text-muted',
        'focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/50',
        'transition-all duration-200'
    );

    return (
        <div className="space-y-2">
            <label htmlFor={name} className="block text-sm font-medium text-text-secondary">
                {label}
                {required && <span className="text-signal-amber ml-1">*</span>}
            </label>
            {isTextarea ? (
                <textarea
                    id={name}
                    name={name}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    rows={4}
                    className={inputClasses}
                />
            ) : (
                <input
                    id={name}
                    name={name}
                    type={type}
                    required={required}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={inputClasses}
                />
            )}
        </div>
    );
});

// Info card component
interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    delay: number;
}

const InfoCard = memo(function InfoCard({ icon, label, value, delay }: InfoCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay, type: 'spring' }}
            className="flex items-start gap-3 p-4 bg-surface/30 border border-border-color rounded-xl hover:border-neon-blue/20 transition-colors min-w-0"
        >
            <div className="p-2 bg-neon-blue/10 rounded-lg text-neon-blue flex-shrink-0">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <div className="text-xs text-text-muted mb-1">{label}</div>
                <div className="text-sm font-medium truncate">{value}</div>
            </div>
        </motion.div>
    );
});

// Social link component
interface SocialLinkProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    delay: number;
}

const SocialLink = memo(function SocialLink({ icon, label, href, delay }: SocialLinkProps) {
    return (
        <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, type: 'spring' }}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 bg-surface border border-border-color rounded-xl hover:border-neon-blue hover:bg-neon-blue/10 transition-all"
            aria-label={label}
        >
            <div className="text-text-secondary group-hover:text-neon-blue transition-colors">
                {icon}
            </div>
        </motion.a>
    );
});

function ContactModule() {
    const { language, isRTL } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true });

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send form data via Formspree
            const response = await fetch('https://formspree.io/f/mbddykpv', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `Portfolio Contact from ${formData.name}`
                })
            });

            if (response.ok) {
                setFormData({ name: '', email: '', message: '' });
                setSubmitStatus('success');
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        }

        setIsSubmitting(false);

        // Reset status after 3 seconds
        setTimeout(() => setSubmitStatus('idle'), 3000);
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative py-20 md:py-32 px-6 md:px-12 lg:px-16"
        >
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                className="text-center mb-16"
            >
                <span className="font-mono text-signal-amber text-sm mb-4 block">
                    {'<'} {language === 'ar' ? 'تواصل' : 'Contact'} {'/>'}
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {language === 'ar' ? 'بدء التواصل' : 'Initiate Contact'}
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                    {language === 'ar'
                        ? 'متحمس للفرص الجديدة والتعاون في مشاريع ذات أثر'
                        : 'Excited about new opportunities and impactful collaborations'
                    }
                </p>
            </motion.div>

            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
                {/* Contact form */}
                <motion.div
                    initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="bg-surface/80 backdrop-blur-sm border border-border-color rounded-2xl p-6 md:p-8">
                        {/* Terminal header */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border-color">
                            <div className="w-3 h-3 rounded-full bg-neon-green" />
                            <span className="font-mono text-xs text-text-muted">
                                transmission_module.active
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <InputField
                                label={getText(ui.labels.name, language)}
                                name="name"
                                required
                                placeholder={language === 'ar' ? 'اسمك الكريم' : 'Your name'}
                                value={formData.name}
                                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                            />

                            <InputField
                                label={getText(ui.labels.email, language)}
                                name="email"
                                type="email"
                                required
                                placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                                value={formData.email}
                                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                            />

                            <InputField
                                label={getText(ui.labels.message, language)}
                                name="message"
                                required
                                placeholder={language === 'ar' ? 'رسالتك...' : 'Your message...'}
                                value={formData.message}
                                onChange={(value) => setFormData(prev => ({ ...prev, message: value }))}
                                isTextarea
                            />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={clsx(
                                    'w-full flex items-center justify-center gap-2 px-6 py-3 bg-neon-blue text-carbon font-semibold rounded-lg',
                                    'hover:bg-neon-blue/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-carbon',
                                    'disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                                )}
                            >
                                {isSubmitting ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                        className="w-5 h-5 border-2 border-carbon border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        {getText(ui.labels.sendMessage, language)}
                                    </>
                                )}
                            </button>

                            {/* Status messages */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-neon-green text-sm"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    {language === 'ar' ? 'تم الإرسال بنجاح!' : 'Message sent successfully!'}
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-400 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {language === 'ar' ? 'حدث خطأ، حاول مجددًا' : 'An error occurred. Please try again.'}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </motion.div>

                {/* Contact info */}
                <motion.div
                    initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    {/* Info cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoCard
                            icon={<MapPin className="w-4 h-4" />}
                            label={language === 'ar' ? 'الموقع' : 'Location'}
                            value={getText(common.location, language)}
                            delay={0.1}
                        />
                        <InfoCard
                            icon={<Calendar className="w-4 h-4" />}
                            label={language === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
                            value={formatDate(common.dob, language)}
                            delay={0.2}
                        />
                        <InfoCard
                            icon={<Mail className="w-4 h-4" />}
                            label={language === 'ar' ? 'البريد' : 'Email'}
                            value={common.email}
                            delay={0.3}
                        />
                        <InfoCard
                            icon={<Languages className="w-4 h-4" />}
                            label={language === 'ar' ? 'اللغات' : 'Languages'}
                            value={languagesData.map(l => getText(l.language, language)).join(', ')}
                            delay={0.4}
                        />
                    </div>

                    {/* University */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="p-5 bg-gradient-to-br from-neon-purple/10 to-transparent border border-neon-purple/20 rounded-xl"
                    >
                        <div className="text-xs text-neon-purple mb-2 font-mono">
                            {getText(common.level, language)}
                        </div>
                        <div className="font-medium">
                            {getText(common.university, language)}
                        </div>
                    </motion.div>

                    {/* Social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="text-sm text-text-muted mb-4">
                            {language === 'ar' ? 'تواصل معي' : 'Connect with me'}
                        </div>

                        {/* Contact buttons */}
                        <div className="space-y-3">
                            <a
                                href="mailto:abdelrahmanabuzaid311@gmail.com"
                                className="flex items-center gap-3 p-3 bg-surface/50 border border-border-color rounded-xl hover:border-neon-blue hover:bg-neon-blue/10 transition-all group w-full"
                            >
                                <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0">
                                    <Mail className="w-4 h-4 text-red-400" />
                                </div>
                                <div className="text-sm min-w-0 flex-1">
                                    <div className="text-text-muted text-xs">{language === 'ar' ? 'البريد' : 'Email'}</div>
                                    <div className="text-text-primary group-hover:text-neon-blue transition-colors truncate text-xs">abdelrahmanabuzaid311@gmail.com</div>
                                </div>
                            </a>

                            <a
                                href="tel:+962790796457"
                                className="flex items-center gap-3 p-3 bg-surface/50 border border-border-color rounded-xl hover:border-neon-green hover:bg-neon-green/10 transition-all group w-full"
                            >
                                <div className="p-2 bg-neon-green/20 rounded-lg flex-shrink-0">
                                    <Phone className="w-4 h-4 text-neon-green" />
                                </div>
                                <div className="text-sm min-w-0 flex-1">
                                    <div className="text-text-muted text-xs">{language === 'ar' ? 'الهاتف' : 'Phone'}</div>
                                    <div className="text-text-primary group-hover:text-neon-green transition-colors" dir="ltr">+962 790796457</div>
                                </div>
                            </a>
                        </div>

                        {/* Social media icons */}
                        <div className="flex gap-3 pt-2">
                            <SocialLink
                                icon={<Instagram className="w-5 h-5" />}
                                label="Instagram"
                                href="https://www.instagram.com/a.abuzaid06"
                                delay={0.7}
                            />
                            <SocialLink
                                icon={<Facebook className="w-5 h-5" />}
                                label="Facebook"
                                href="https://www.facebook.com/share/17zBpKDhmW/"
                                delay={0.8}
                            />
                            <SocialLink
                                icon={<Linkedin className="w-5 h-5" />}
                                label="LinkedIn"
                                href="https://www.linkedin.com/in/%D8%B9%D8%A8%D8%AF%D8%A7%D9%84%D8%B1%D8%AD%D9%85%D9%86-%D8%A7%D8%A8%D9%88%D8%B2%D9%8A%D8%AF-9a93a33a1"
                                delay={0.9}
                            />
                            <SocialLink
                                icon={<Mail className="w-5 h-5" />}
                                label="Email"
                                href="mailto:abdelrahmanabuzaid311@gmail.com"
                                delay={1.0}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-20 pt-8 border-t border-border-color text-center"
            >
                <p className="font-mono text-sm text-text-muted">
                    © {new Date().getFullYear()} {getText(common.name, language)}.
                    <span className="text-neon-blue"> Abdelrahman Abuzaid</span>
                </p>
                <p className="text-xs text-text-muted mt-2">
                    {getText(common.tagline, language)}
                </p>
            </motion.footer>
        </section>
    );
}

export default ContactModule;
