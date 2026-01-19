// FILE: components/BackgroundGrid.tsx
// ============================================
// Interactive Background Grid
// Subtle mouse-reactive parallax with inverse-square feel
// ============================================

'use client';

import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GridCell {
    x: number;
    y: number;
    opacity: number;
}

const BackgroundGrid = memo(function BackgroundGrid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (prefersReducedMotion) return;
        setMousePos({ x: e.clientX, y: e.clientY });
    }, [prefersReducedMotion]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove, prefersReducedMotion]);

    // Generate grid lines
    const gridSize = 60;
    const horizontalLines = isClient && typeof window !== 'undefined'
        ? Math.ceil(window.innerHeight / gridSize) + 1
        : 20;
    const verticalLines = isClient && typeof window !== 'undefined'
        ? Math.ceil(window.innerWidth / gridSize) + 1
        : 30;

    // Calculate line brightness based on distance from mouse (inverse square law)
    const getLineOpacity = (linePos: number, mouseCoord: number, maxDistance: number = 300): number => {
        if (prefersReducedMotion) return 0.03;
        const distance = Math.abs(linePos - mouseCoord);
        if (distance > maxDistance) return 0.03;
        // Inverse square law with clamping
        const normalizedDistance = distance / maxDistance;
        const opacity = 0.03 + (0.1 * (1 - normalizedDistance * normalizedDistance));
        return Math.min(opacity, 0.15);
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
            aria-hidden="true"
        >
            {/* Base grid pattern */}
            <div className="absolute inset-0 bg-grid opacity-50" />

            {/* Interactive vertical lines */}
            <svg
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
            >
                {/* Vertical lines */}
                {Array.from({ length: verticalLines }).map((_, i) => {
                    const x = i * gridSize;
                    const opacity = isClient ? getLineOpacity(x, mousePos.x) : 0.03;
                    return (
                        <motion.line
                            key={`v-${i}`}
                            x1={x}
                            y1="0"
                            x2={x}
                            y2="100%"
                            stroke="rgba(0, 212, 255, 1)"
                            strokeWidth="1"
                            initial={{ opacity: 0.03 }}
                            animate={{ opacity }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        />
                    );
                })}

                {/* Horizontal lines */}
                {Array.from({ length: horizontalLines }).map((_, i) => {
                    const y = i * gridSize;
                    const opacity = isClient ? getLineOpacity(y, mousePos.y) : 0.03;
                    return (
                        <motion.line
                            key={`h-${i}`}
                            x1="0"
                            y1={y}
                            x2="100%"
                            y2={y}
                            stroke="rgba(0, 212, 255, 1)"
                            strokeWidth="1"
                            initial={{ opacity: 0.03 }}
                            animate={{ opacity }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                        />
                    );
                })}
            </svg>

            {/* Radial glow following mouse */}
            {isClient && !prefersReducedMotion && (
                <motion.div
                    className="absolute w-96 h-96 rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)',
                        left: mousePos.x - 192,
                        top: mousePos.y - 192,
                    }}
                    animate={{
                        left: mousePos.x - 192,
                        top: mousePos.y - 192,
                    }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                />
            )}

            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 128 128">
                    <line x1="0" y1="24" x2="24" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.2" />
                    <line x1="0" y1="48" x2="48" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.15" />
                    <line x1="0" y1="72" x2="72" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.1" />
                </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
                <svg className="w-full h-full" viewBox="0 0 128 128">
                    <line x1="0" y1="24" x2="24" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.2" />
                    <line x1="0" y1="48" x2="48" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.15" />
                    <line x1="0" y1="72" x2="72" y2="0" stroke="var(--neon-blue)" strokeWidth="1" opacity="0.1" />
                </svg>
            </div>

            {/* Floating gradient orbs */}
            {isClient && !prefersReducedMotion && (
                <>
                    <motion.div
                        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 60%)',
                            top: '10%',
                            left: '-10%',
                        }}
                        animate={{
                            y: [0, 50, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 60%)',
                            bottom: '5%',
                            right: '-5%',
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, -20, 0],
                            scale: [1, 1.15, 1],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    />
                    <motion.div
                        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 60%)',
                            top: '50%',
                            left: '60%',
                        }}
                        animate={{
                            y: [0, 60, 0],
                            x: [0, -40, 0],
                            scale: [1, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 4,
                        }}
                    />
                </>
            )}
        </div>
    );
});

export default BackgroundGrid;
