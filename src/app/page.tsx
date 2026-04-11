'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Code2,
  AlertTriangle,
  Zap,
  ChevronUp,
  Sparkles,
  Monitor,
  Palette,
  Type,
  Layers,
  ArrowUp,
  Paintbrush,
  Droplets,
  Menu,
  X,
} from 'lucide-react';
import { TerminalSection } from '@/components/terminal-section';
import { DevexSection } from '@/components/devex-section';
import BrutalismSection from '@/components/brutalism-section';
import GlitchSection from '@/components/glitch-section';
import { CodeComparisonSection } from '@/components/code-comparison-section';
import { CodePlaygroundSection } from '@/components/code-playground-section';
import { GradientGeneratorSection } from '@/components/gradient-generator-section';
import { ColorPaletteSection } from '@/components/color-palette-section';
import { ThemeToggle } from '@/components/theme-toggle';

/* ──────────────────────────────────────────────
   NAVIGATION ITEMS
   ────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: '#00ff41', bg: 'from-[#050505] to-[#0a0a0a]' },
  { id: 'devex', label: 'DevEx', icon: Code2, color: '#10b981', bg: 'from-[#0f0f0f] to-[#1a1a2e]' },
  { id: 'brutalism', label: 'Brutalism', icon: Palette, color: '#000000', bg: 'from-[#ffffff] to-[#f5f5f5]' },
  { id: 'glitch', label: 'Glitch', icon: Zap, color: '#00ffff', bg: 'from-[#0a0014] to-[#0d001a]' },
  { id: 'codeart', label: 'Code Art', icon: Sparkles, color: '#a855f7', bg: 'from-[#0d0d0d] to-[#141428]' },
  { id: 'playground', label: 'Playground', icon: Code2, color: '#f59e0b', bg: 'from-[#0a0a0a] to-[#141420]' },
  { id: 'gradient', label: 'Gradient', icon: Paintbrush, color: '#ec4899', bg: 'from-[#0a0a0a] to-[#0a1a15]' },
  { id: 'palette', label: 'Palette', icon: Droplets, color: '#06b6d4', bg: 'from-[#0a0a0a] to-[#0a141a]' },
] as const;

/* ──────────────────────────────────────────────
   SCROLL PROGRESS BAR
   ────────────────────────────────────────────── */

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="scroll-progress-bar"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const words = ['TERMINAL', 'DEVEX', 'BRUTALISM', 'GLITCH', 'CODE ART', 'GRADIENTS', 'PALETTES'];
  const fullSubtitle = 'Explore eight iconic code-inspired design styles: from retro terminals to cyberpunk glitch effects and interactive tools. Each section is fully interactive.';
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for subtitle
  useEffect(() => {
    let charIndex = 0;
    setTypedText('');
    setIsTypingDone(false);
    const timeout = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex < fullSubtitle.length) {
          setTypedText(fullSubtitle.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTypingDone(true);
          clearInterval(typeInterval);
        }
      }, 25);
      return () => clearInterval(typeInterval);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  // ─── Particle canvas animation ───
  const animateParticles = useCallback(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement!.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const isMobile = w < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60;
    const CONNECTION_DIST = 120;
    const COLORS = ['#10b981', '#06b6d4']; // emerald, cyan

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 1 + Math.random(),
        opacity: 0.1 + Math.random() * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animationId: number;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Update positions and draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      // Draw connecting lines between nearby particles
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 1;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const cleanup = animateParticles();
    return cleanup;
  }, [animateParticles]);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Particle canvas background */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas
          ref={particleCanvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />
      </div>

      {/* Floating code snippets background - more visible */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { text: 'const art = "code";', x: 8, y: 12, rot: -5, delay: 0 },
          { text: '{ design: true }', x: 65, y: 20, rot: 3, delay: 0.8 },
          { text: 'export default Aesthetic;', x: 15, y: 65, rot: -2, delay: 1.6 },
          { text: '<Tech />', x: 72, y: 55, rot: 4, delay: 2.4 },
          { text: 'async function create() {}', x: 35, y: 80, rot: -3, delay: 3.2 },
          { text: 'import { Style } from "art";', x: 50, y: 8, rot: 2, delay: 1.0 },
          { text: 'render(<Glitch />)', x: 80, y: 75, rot: -4, delay: 2.0 },
        ].map(
          (item, i) => (
            <motion.div
              key={`hero-float-${i}`}
              className="absolute font-mono text-xs whitespace-nowrap select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `rotate(${item.rot}deg)`,
                color: 'rgba(16, 185, 129, 0.12)',
              }}
              animate={{ y: [0, -12, 0], opacity: [0.08, 0.18, 0.08] }}
              transition={{ duration: 6 + i * 0.8, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
            >
              {item.text}
            </motion.div>
          )
        )}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/60 font-mono">Code Aesthetic Showcase</span>
          </div>
        </motion.div>

        {/* Main heading with animated gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hero-gradient-border rounded-3xl inline-block"
        >
          <div className="rounded-3xl px-8 py-4 bg-[#0a0a0a]">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
              <span className="text-white">The Art of</span>
              <br />
              <div className="relative h-[1.2em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWord}
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%]"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      textShadow: 'none',
                    }}
                  >
                    {words[currentWord]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
          </div>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.p
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed h-[3.5rem] sm:h-[3rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>{typedText}</span>
          {!isTypingDone && <span className="typing-cursor" />}
        </motion.p>

        {/* Section previews */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {SECTIONS.map((section, i) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
              whileHover={{ y: -4, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: `${section.color}15`,
                  border: `1px solid ${section.color}30`,
                }}
              >
                <section.icon
                  className="w-5 h-5 transition-all duration-300"
                  style={{ color: section.color }}
                />
              </div>
              <span className="text-xs font-mono text-white/50 group-hover:text-white/80 transition-colors">
                {section.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs font-mono text-white/20">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronUp className="w-5 h-5 text-white/20 rotate-180" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FLOATING NAVIGATION (Desktop)
   ────────────────────────────────────────────── */

function DesktopNav({
  activeSection,
  onClickSection,
}: {
  activeSection: string;
  onClickSection: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden sm:flex items-center gap-1 p-1.5 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => onClickSection(section.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.08]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <section.icon className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">{section.label}</span>
                {isActive && (
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full relative z-10"
                    style={{ backgroundColor: section.color }}
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────
   MOBILE HAMBURGER NAVIGATION
   ────────────────────────────────────────────── */

function MobileNav({
  activeSection,
  onClickSection,
}: {
  activeSection: string;
  onClickSection: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSectionClick = (id: string) => {
    setIsOpen(false);
    onClickSection(id);
  };

  return (
    <>
      {/* Hamburger Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed top-4 right-4 z-50 sm:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/50 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ borderColor: 'rgba(16, 185, 129, 0.3)', boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-white/70" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Full-Screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel - slides from right */}
            <motion.div
              className="fixed inset-y-0 right-0 z-[70] w-[85vw] max-w-sm flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Glassmorphism panel */}
              <div className="flex-1 flex flex-col bg-gradient-to-br from-black/90 via-[#0a0f0d]/95 to-black/90 border-l border-white/[0.08] backdrop-blur-2xl">
                {/* Header with close button */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm font-mono text-white/50">Navigation</span>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] cursor-pointer"
                    whileHover={{ borderColor: 'rgba(239, 68, 68, 0.4)', backgroundColor: 'rgba(239, 68, 68, 0.08)' }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close navigation menu"
                  >
                    <X className="w-4 h-4 text-white/60" />
                  </motion.button>
                </div>

                {/* Section list */}
                <nav className="flex-1 overflow-y-auto px-4 py-4">
                  <motion.div
                    className="flex flex-col gap-1.5"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                      },
                    }}
                  >
                    {SECTIONS.map((section) => {
                      const isActive = activeSection === section.id;
                      return (
                        <motion.button
                          key={section.id}
                          onClick={() => handleSectionClick(section.id)}
                          className={`relative flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-colors duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-white/[0.08]'
                              : 'hover:bg-white/[0.04]'
                          }`}
                          variants={{
                            hidden: { opacity: 0, x: 24 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {/* Active indicator bar */}
                          <motion.div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full"
                            style={{ backgroundColor: section.color }}
                            initial={false}
                            animate={{
                              height: isActive ? 24 : 0,
                              opacity: isActive ? 1 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          />

                          {/* Icon container */}
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                              isActive ? 'ring-1 ring-white/20' : ''
                            }`}
                            style={{
                              backgroundColor: `${section.color}${isActive ? '20' : '10'}`,
                              borderColor: `${section.color}30`,
                            }}
                          >
                            <section.icon
                              className="w-5 h-5 transition-all duration-300"
                              style={{ color: isActive ? section.color : `${section.color}99` }}
                            />
                          </div>

                          {/* Label + section number */}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm font-mono transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-white/50'
                            }`}>
                              {section.label}
                            </div>
                            <div className="text-[10px] font-mono text-white/20 mt-0.5">
                              Section {String(SECTIONS.indexOf(section) + 1).padStart(2, '0')}
                            </div>
                          </div>

                          {/* Active check mark */}
                          {isActive && (
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: section.color }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            />
                          )}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                </nav>

                {/* Footer with gradient accent */}
                <div className="px-6 py-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-center gap-1.5">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-emerald-500/30" />
                    <span className="text-[10px] font-mono text-white/20">8 sections</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/30" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ──────────────────────────────────────────────
   FLOATING NAVIGATION (Combined)
   ────────────────────────────────────────────── */

function FloatingNav({
  activeSection,
  onClickSection,
}: {
  activeSection: string;
  onClickSection: (id: string) => void;
}) {
  return (
    <>
      <DesktopNav activeSection={activeSection} onClickSection={onClickSection} />
      <MobileNav activeSection={activeSection} onClickSection={onClickSection} />
    </>
  );
}

/* ──────────────────────────────────────────────
   SECTION DIVIDER
   ────────────────────────────────────────────── */

function SectionDivider({ label, sectionId, description, icon: Icon }: { label: string; sectionId: string; description: string; icon: React.ElementType }) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const isBrutalism = sectionId === 'brutalism';
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === topRef.current) setTopVisible(true);
            if (entry.target === bottomRef.current) setBottomVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-20px' }
    );
    if (topRef.current) observer.observe(topRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="py-16 md:py-20 text-center px-4"
      style={{
        background: isBrutalism ? '#ffffff' : 'linear-gradient(180deg, #0a0a0a 0%, ' + (sectionId === 'devex' ? '#0f0f0f' : sectionId === 'glitch' ? '#0a0014' : sectionId === 'codeart' ? '#0d0d0d' : '#0a0a0a') + ' 100%)',
      }}
    >
      {/* Animated gradient line with pulsing center dot */}
      {!isBrutalism && (
        <div ref={topRef} className={`divider-fadein max-w-2xl mx-auto mb-12 ${topVisible ? 'visible' : ''}`}>
          <div className="divider-glow">
            <div className="divider-dot" />
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4"
          style={{
            borderColor: isBrutalism ? '#000000' : `${section.color}30`,
            backgroundColor: isBrutalism ? '#f0f0f0' : `${section.color}08`,
          }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: isBrutalism ? '#000000' : section.color }} />
          <span
            className="text-xs font-mono uppercase tracking-widest"
            style={{ color: isBrutalism ? '#666666' : `${section.color}99` }}
          >
            {label}
          </span>
        </div>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3"
          style={{
            color: isBrutalism ? '#000000' : '#ffffff',
            fontFamily: isBrutalism ? 'Times New Roman, Georgia, serif' : 'var(--font-geist-sans), sans-serif',
          }}
        >
          {section.label} Style
        </h2>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: isBrutalism ? '#666666' : 'rgba(255,255,255,0.4)' }}
        >
          {description}
        </p>
      </motion.div>
      {/* Bottom animated gradient line with pulsing center dot */}
      {!isBrutalism && (
        <div ref={bottomRef} className={`divider-fadein max-w-2xl mx-auto mt-12 ${bottomVisible ? 'visible' : ''}`}>
          <div className="divider-glow">
            <div className="divider-dot" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */

function Footer() {
  const scrollToTop = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      scrollToTop(e);
    }
  };

  return (
    <footer className="w-full py-12 px-4 bg-[#050505] footer-gradient-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/80">Code Aesthetic Gallery</div>
              <div className="text-xs text-white/30 font-mono">8 sections, 1 showcase</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/30 font-mono">
            <span className="flex items-center gap-1.5 footer-link-glow">
              <Monitor className="w-3.5 h-3.5" />
              Next.js 16
            </span>
            <span className="flex items-center gap-1.5 footer-link-glow">
              <Type className="w-3.5 h-3.5" />
              TypeScript
            </span>
            <span className="flex items-center gap-1.5 footer-link-glow">
              <Layers className="w-3.5 h-3.5" />
              Tailwind CSS
            </span>
            <span className="flex items-center gap-1.5 footer-link-glow">
              <Zap className="w-3.5 h-3.5" />
              Framer Motion
            </span>
          </div>

          <div className="text-xs text-white/20 font-mono text-center md:text-right">
            <div>Built with Z.ai Code</div>
            <div className="mt-1 flex items-center gap-2 justify-center md:justify-end">
              <span className="inline-block w-2 h-2 rounded-full status-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="mt-3">
              <a
                href="#top"
                onClick={scrollToTop}
                onKeyDown={handleKeyDown}
                className="footer-link-glow inline-flex items-center gap-1 text-white/25 hover:text-white/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-sm px-1"
                tabIndex={0}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-3 h-3" />
                <span>Back to top</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────
   BACK TO TOP BUTTON
   ────────────────────────────────────────────── */

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-shadow duration-300"
          style={{
            background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
          }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            scale: 1.1,
            boxShadow: '0 6px 30px rgba(16, 185, 129, 0.5), 0 0 40px rgba(6, 182, 212, 0.25)',
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('terminal');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Intersection observer for active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -60% 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <ScrollProgressBar />
      <FloatingNav activeSection={activeSection} onClickSection={scrollToSection} />

      {/* Hero */}
      <HeroSection />

      {/* Section 1: Terminal */}
      <div id="terminal" ref={(el) => { sectionRefs.current['terminal'] = el; }}>
        <SectionDivider
          label="Section 01"
          sectionId="terminal"
          description="A fully interactive CLI experience with boot sequences, command history, and theme switching. The retro terminal that never gets old."
          icon={Terminal}
        />
        <TerminalSection />
      </div>

      {/* Section 2: DevEx */}
      <div id="devex" ref={(el) => { sectionRefs.current['devex'] = el; }}>
        <SectionDivider
          label="Section 02"
          sectionId="devex"
          description="Modern developer documentation style inspired by Vercel and Stripe. VS Code editors, glassmorphism cards, and live code previews."
          icon={Code2}
        />
        <DevexSection />
      </div>

      {/* Section 3: Brutalism */}
      <div id="brutalism" ref={(el) => { sectionRefs.current['brutalism'] = el; }}>
        <SectionDivider
          label="Section 03"
          sectionId="brutalism"
          description="Raw, unpolished design that celebrates the ugly. No rounded corners, no gradients — just pure HTML chaos as nature intended."
          icon={AlertTriangle}
        />
        <BrutalismSection />
      </div>

      {/* Section 4: Glitch */}
      <div id="glitch" ref={(el) => { sectionRefs.current['glitch'] = el; }}>
        <SectionDivider
          label="Section 04"
          sectionId="glitch"
          description="Digital distortion, neon glows, and cyberpunk aesthetics. Hack the system, watch the matrix rain, and generate glitch text."
          icon={Zap}
        />
        <GlitchSection />
      </div>

      {/* Section 5: Code Art */}
      <div id="codeart" ref={(el) => { sectionRefs.current['codeart'] = el; }}>
        <SectionDivider
          label="Section 05"
          sectionId="codeart"
          description="When code becomes the canvas. Compare how the same component looks across four different aesthetic styles — from polished SaaS to glitchy cyberpunk."
          icon={Sparkles}
        />
        <CodeComparisonSection />
      </div>

      {/* Section 6: Code Playground */}
      <div id="playground" ref={(el) => { sectionRefs.current['playground'] = el; }}>
        <SectionDivider
          label="Section 06"
          sectionId="playground"
          description="Write HTML, CSS, and JavaScript code with live preview. Experiment with animations, layouts, and interactive effects in real-time."
          icon={Code2}
        />
        <CodePlaygroundSection />
      </div>

      {/* Section 7: Gradient Lab */}
      <div id="gradient" ref={(el) => { sectionRefs.current['gradient'] = el; }}>
        <SectionDivider
          label="Section 07"
          sectionId="gradient"
          description="Design beautiful gradients with an interactive builder. Pick colors, choose types, and export production-ready CSS, Tailwind, or SVG code."
          icon={Paintbrush}
        />
        <GradientGeneratorSection />
      </div>

      {/* Section 8: Palette Studio */}
      <div id="palette" ref={(el) => { sectionRefs.current['palette'] = el; }}>
        <SectionDivider
          label="Section 08"
          sectionId="palette"
          description="Generate harmonious color palettes using 7 color theory algorithms. Export to CSS, Tailwind, or JSON with WCAG contrast checking."
          icon={Droplets}
        />
        <ColorPaletteSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Back to Top */}
      <BackToTopButton />

      {/* Theme Toggle */}
      <ThemeToggle />
    </main>
  );
}
