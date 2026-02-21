// FILE: lib/content.ts
// ============================================
// THE KERNEL - Single Source of Truth
// Bilingual Content Dictionary for Digital Impact Lab
// ============================================

export type Language = 'en' | 'ar';

export interface BilingualText {
  en: string;
  ar: string;
}

export interface LanguageInfo {
  language: BilingualText;
  level: BilingualText;
}

export interface Course {
  name: BilingualText;
}

export interface Project {
  id: string;
  title: BilingualText;
  description: BilingualText;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  gradient: string;
  image?: string;
}

export interface VolunteerRole {
  organization: BilingualText;
  role: BilingualText;
  period: string;
  activities: BilingualText[];
}

export interface SoftSkill {
  name: BilingualText;
  icon: string;
}

export interface MethodologyStep {
  id: string;
  label: BilingualText;
  description: BilingualText;
}

export interface NavSection {
  id: string;
  label: BilingualText;
}

// ============================================
// COMMON DATA
// ============================================

export const common = {
  name: {
    en: 'Abdelrahman Abuzaid',
    ar: 'عبد الرحمن أبو زيد'
  } as BilingualText,

  field: {
    en: 'Software Engineering',
    ar: 'هندسة البرمجيات'
  } as BilingualText,

  roleShort: {
    en: 'Front-End Developer & Community Leader',
    ar: 'مطور واجهات أمامية وقائد مجتمعي'
  } as BilingualText,

  university: {
    en: 'Applied Science Private University – Jordan',
    ar: 'جامعة العلوم التطبيقية الخاصة – الأردن'
  } as BilingualText,

  level: {
    en: 'Second-year student',
    ar: 'طالب سنة ثانية'
  } as BilingualText,

  tagline: {
    en: 'Engineering solutions for human problems.',
    ar: 'هندسة الحلول لخدمة الإنسان.'
  } as BilingualText,

  gpa: 84,
  gpaLabel: {
    en: 'Excellent',
    ar: 'امتياز'
  } as BilingualText,

  completedCredits: 42,
  volunteerHours: 200,
  volunteeringStart: 2024,

  award: {
    en: 'Outstanding Volunteer of the Year – 2025',
    ar: 'متطوع متميز لعام 2025'
  } as BilingualText,

  scholarship: {
    en: 'Musab Khorma Work-for-Education Scholarship (Ruwwad for Development)',
    ar: 'منحة مصعب خورما للعمل مقابل التعليم (رواد للتنمية)'
  } as BilingualText,

  dob: '2006-02-19',

  email: 'abdelrahmanabuzaid311@gmail.com',
  phone: '+962 790796457',
  location: {
    en: 'Amman, Jordan',
    ar: 'عمّان، الأردن'
  } as BilingualText,
};

// ============================================
// LANGUAGES
// ============================================

export const languages: LanguageInfo[] = [
  {
    language: { en: 'Arabic', ar: 'العربية' },
    level: { en: 'Native', ar: 'لغة أم' }
  },
  {
    language: { en: 'English', ar: 'الإنجليزية' },
    level: { en: 'Intermediate', ar: 'متوسط' }
  }
];

// ============================================
// UNIVERSITY COURSES
// ============================================

export const courses: Course[] = [
  { name: { en: 'HTML', ar: 'HTML' } },
  { name: { en: 'CSS', ar: 'CSS' } },
  { name: { en: 'JavaScript', ar: 'JavaScript' } },
  { name: { en: 'C++', ar: 'C++' } },
  { name: { en: 'Java', ar: 'Java' } },
  { name: { en: 'Object-Oriented Programming', ar: 'البرمجة الكائنية' } },
  { name: { en: 'Data Structures', ar: 'هياكل البيانات' } },
  { name: { en: 'Technical Writing', ar: 'الكتابة التقنية' } },
  { name: { en: 'Practical Communication Skills', ar: 'مهارات الاتصال العملية' } }
];

// ============================================
// PROJECTS
// ============================================

export const projects: Project[] = [
  {
    id: 'mutatawi',
    title: {
      en: 'Mutatawi Volunteering Platform',
      ar: 'منصة متطوع'
    },
    description: {
      en: 'The premier volunteering platform in the region empowering individuals to make a real difference in their community.',
      ar: 'منصة التطوع الأولى في المنطقة، لتمكين الأفراد من صنع فرق حقيقي في مجتمعهم.'
    },
    tech: ['Next.js', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'from-blue-600 to-indigo-700',
    repoUrl: 'https://github.com/aabuzaid1/Mutatawi',
    liveUrl: 'https://mutatawi.vercel.app/',
    image: '/mutatawi.jpg.png'
  },
  {
    id: 'shabab-alkhair',
    title: {
      en: 'Shabab Al-Khair Volunteer Team Website',
      ar: 'موقع فريق شباب الخير التطوعي'
    },
    description: {
      en: 'Full website presenting initiatives, activities, and community impact.',
      ar: 'موقع كامل يعرض المبادرات والأنشطة وأثر الفريق على المجتمع.'
    },
    tech: ['HTML', 'CSS', 'JavaScript'],
    gradient: 'from-emerald-500 to-teal-600',
    repoUrl: '#',
    liveUrl: 'https://shabab-alkhair-bpt2.vercel.app/',
    image: '/shabab-alkhair.jpg'
  },
  {
    id: 'abuzaid-store',
    title: {
      en: 'AbuZaid Fruits & Vegetables Website',
      ar: 'موقع خضار وفواكه أبو زيد'
    },
    description: {
      en: 'Full e-commerce website for fresh produce with online ordering and delivery.',
      ar: 'موقع تجارة إلكترونية متكامل للخضار والفواكه الطازجة مع خدمة الطلب والتوصيل.'
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-green-500 to-emerald-600',
    repoUrl: 'https://github.com/aabuzaid1/Abuzaid-f-v',
    liveUrl: 'https://abuzaidstore.com/',
    image: '/abuzaid-store.jpg'
  }
];

// ============================================
// VOLUNTEERING / IMPACT
// ============================================

export const volunteerRoles: VolunteerRole[] = [
  {
    organization: {
      en: 'Ruwwad for Development',
      ar: 'رواد للتنمية'
    },
    role: {
      en: 'Child Program Volunteer',
      ar: 'متطوع في برنامج الأطفال'
    },
    period: '2024–Present',
    activities: [
      { en: 'Library support: reading & writing assistance', ar: 'دعم المكتبة: المساعدة في القراءة والكتابة' },
      { en: 'Academic support for children', ar: 'الدعم الأكاديمي للأطفال' },
      { en: 'Football coach: ages 8–14 (weekly training)', ar: 'مدرب كرة قدم: أعمار 8–14 (تدريب أسبوعي)' },
      { en: 'Chess trainer (logic & strategy)', ar: 'مدرب شطرنج (المنطق والاستراتيجية)' }
    ]
  },
  {
    organization: {
      en: 'Shabab Al-Khair Volunteer Team',
      ar: 'فريق شباب الخير التطوعي'
    },
    role: {
      en: 'Responsible Member & Volunteer',
      ar: 'عضو مسؤول ومتطوع'
    },
    period: '2024–Present',
    activities: [
      { en: 'Executed most charitable initiatives', ar: 'تنفيذ معظم المبادرات الخيرية' },
      { en: 'Community campaigns & orphans events', ar: 'حملات مجتمعية وفعاليات للأيتام' },
      { en: 'Ramadan iftar organization', ar: 'تنظيم إفطارات رمضان' },
      { en: 'Content & photo contribution', ar: 'المساهمة في المحتوى والتصوير' }
    ]
  }
];

// ============================================
// SOFT SKILLS (CAPABILITIES)
// ============================================

export const softSkills: SoftSkill[] = [
  { name: { en: 'Problem Solving', ar: 'حل المشكلات' }, icon: 'puzzle' },
  { name: { en: 'Leadership', ar: 'القيادة' }, icon: 'crown' },
  { name: { en: 'Teamwork', ar: 'العمل الجماعي' }, icon: 'users' },
  { name: { en: 'Communication', ar: 'التواصل' }, icon: 'message-circle' },
  { name: { en: 'Time Management', ar: 'إدارة الوقت' }, icon: 'clock' }
];

// ============================================
// METHODOLOGY
// ============================================

export const methodology: MethodologyStep[] = [
  {
    id: 'discover',
    label: { en: 'Discover', ar: 'استكشاف' },
    description: { en: 'Research problems, understand users, define goals', ar: 'البحث في المشكلات، فهم المستخدمين، تحديد الأهداف' }
  },
  {
    id: 'architect',
    label: { en: 'Architect', ar: 'هندسة' },
    description: { en: 'Design solutions, plan structure, map systems', ar: 'تصميم الحلول، تخطيط الهيكل، رسم الأنظمة' }
  },
  {
    id: 'develop',
    label: { en: 'Develop', ar: 'تطوير' },
    description: { en: 'Write clean code, build components, iterate fast', ar: 'كتابة كود نظيف، بناء المكونات، التكرار السريع' }
  },
  {
    id: 'iterate',
    label: { en: 'Iterate', ar: 'تحسين' },
    description: { en: 'Test, refine, optimize for impact', ar: 'الاختبار، التحسين، التهيئة للأثر' }
  }
];

// ============================================
// NAVIGATION SECTIONS
// ============================================

export const navSections: NavSection[] = [
  { id: 'system-status', label: { en: 'System Status', ar: 'حالة النظام' } },
  { id: 'impact-metrics', label: { en: 'Impact Metrics', ar: 'مؤشرات الأثر' } },
  { id: 'gallery', label: { en: 'Gallery', ar: 'معرض الصور' } },
  { id: 'deployments', label: { en: 'Deployments', ar: 'المشاريع' } },
  { id: 'protocols', label: { en: 'Protocols', ar: 'المنهجية' } },
  { id: 'contact', label: { en: 'Contact', ar: 'تواصل' } }
];

// ============================================
// UI TEXT
// ============================================

export const ui = {
  bootSequence: [
    { en: 'Initializing Abdelrahman_Profile...', ar: 'جارٍ تهيئة ملف_عبدالرحمن...' },
    { en: 'Loading ImpactLab Modules...', ar: 'جارٍ تحميل وحدات مختبر_الأثر...' },
    { en: 'Connecting to Impact Network...', ar: 'جارٍ الاتصال بشبكة الأثر...' },
    { en: 'System Ready.', ar: 'النظام جاهز.' }
  ],
  cta: {
    viewDeployments: { en: 'View Deployments', ar: 'عرض المشاريع' },
    initiateContact: { en: 'Initiate Contact', ar: 'بدء التواصل' }
  },
  metrics: {
    volunteerHours: { en: 'Volunteer Hours', ar: 'ساعات التطوع' },
    websites: { en: 'Websites', ar: 'مواقع' },
    impactStart: { en: 'Impact Start', ar: 'بداية الأثر' },
    gpa: { en: 'GPA', ar: 'المعدل' }
  },
  labels: {
    viewRepo: { en: 'View Repo', ar: 'عرض المستودع' },
    liveDemo: { en: 'Live Demo', ar: 'عرض مباشر' },
    capabilities: { en: 'Core Capabilities', ar: 'القدرات الأساسية' },
    courses: { en: 'Technical Protocols', ar: 'البروتوكولات التقنية' },
    sendMessage: { en: 'Send Transmission', ar: 'إرسال الرسالة' },
    name: { en: 'Name', ar: 'الاسم' },
    email: { en: 'Email', ar: 'البريد الإلكتروني' },
    message: { en: 'Message', ar: 'الرسالة' }
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getText(bilingual: BilingualText, lang: Language): string {
  return bilingual[lang];
}

export function formatDate(dateStr: string, lang: Language): string {
  const date = new Date(dateStr);
  const locale = lang === 'ar' ? 'ar-JO' : 'en-US';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatTime(lang: Language): string {
  const now = new Date();
  const locale = lang === 'ar' ? 'ar-JO' : 'en-US';
  return now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: lang === 'en',
    timeZone: 'Asia/Amman'
  });
}
