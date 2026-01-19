// FILE: app/page.tsx
// ============================================
// Main Page - Composes all sections
// Digital Impact Lab Portfolio
// ============================================

import dynamic from 'next/dynamic';
import BackgroundGrid from '@/components/BackgroundGrid';
import SystemHUD from '@/components/SystemHUD';
import HeroTerminal from '@/components/HeroTerminal';

// Dynamic imports for code splitting
const ImpactVisualizer = dynamic(() => import('@/components/ImpactVisualizer'), {
  loading: () => <SectionLoader />,
});

const ProjectSchematic = dynamic(() => import('@/components/ProjectSchematic'), {
  loading: () => <SectionLoader />,
});

const ProtocolsMethodology = dynamic(() => import('@/components/ProtocolsMethodology'), {
  loading: () => <SectionLoader />,
});

const ContactModule = dynamic(() => import('@/components/ContactModule'), {
  loading: () => <SectionLoader />,
});

const PhotoGallery = dynamic(() => import('@/components/PhotoGallery'), {
  loading: () => <SectionLoader />,
});

// Simple loading component
function SectionLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-100" />
        <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse delay-200" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Background layer */}
      <BackgroundGrid />

      {/* Navigation HUD */}
      <SystemHUD />

      {/* Main content */}
      <main className="relative z-10 main-content">
        {/* Hero Section */}
        <HeroTerminal />

        {/* Impact Metrics Section */}
        <ImpactVisualizer />

        {/* Photo Gallery Section */}
        <PhotoGallery />

        {/* Projects Section */}
        <ProjectSchematic />

        {/* Methodology Section */}
        <ProtocolsMethodology />

        {/* Contact Section */}
        <ContactModule />
      </main>
    </>
  );
}
