'use client';

import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { TerminalSection } from '@/components/terminal-section';
import { DevexSection } from '@/components/devex-section';
import BrutalismSection from '@/components/brutalism-section';
import GlitchSection from '@/components/glitch-section';

/* ──────────────────────────────────────────────
   NAVIGATION ITEMS
   ────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: '#00ff41', bg: 'from-[#050505] to-[#0a0a0a]' },
  { id: 'devex', label: 'DevEx', icon: Code2, color: '#10b981', bg: 'from-[#0f0f0f] to-[#1a1a2e]' },
  { id: 'brutalism', label: 'Brutalism', icon: Palette, color: '#000000', bg: 'from-[#ffffff] to-[#f5f5f5]' },
  { id: 'glitch', label: 'Glitch', icon: Zap, color: '#00ffff', bg: 'from-[#0a0014] to-[#0d001a]' },
] as const;

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['TERMINAL', 'DEVEX', 'BRUTALISM', 'GLITCH'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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

      {/* Floating code snippets background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['const art = "code";', '{ design: true }', 'export default Aesthetic;', '<Tech />', 'async function create() {}'].map(
          (text, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-xs text-white/[0.06] whitespace-nowrap select-none"
              style={{
                left: `${10 + (i * 18) % 70}%`,
                top: `${15 + (i * 22) % 60}%`,
                transform: `rotate(${-5 + i * 3}deg)`,
              }}
              animate={{ y: [0, -15, 0], opacity: [0.04, 0.08, 0.04] }}
              transition={{ duration: 6 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            >
              {text}
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

        {/* Main heading */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="text-white">The Art of</span>
          <br />
          <div className="relative h-[1.2em] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-[gradient-shift_3s_ease-in-out_infinite]"
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
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Explore four iconic code-inspired design styles: from retro terminals
          to cyberpunk glitch effects. Each section is fully interactive.
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
   FLOATING NAVIGATION
   ────────────────────────────────────────────── */

function FloatingNav({
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
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1.5 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl shadow-black/50"
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
                <span className="relative z-10 hidden sm:inline">{section.label}</span>
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
   SECTION DIVIDER
   ────────────────────────────────────────────── */

function SectionDivider({ label, sectionId, description, icon: Icon }: { label: string; sectionId: string; description: string; icon: React.ElementType }) {
  const section = SECTIONS.find((s) => s.id === sectionId)!;
  const isBrutalism = sectionId === 'brutalism';

  return (
    <div
      className="py-16 md:py-20 text-center px-4"
      style={{
        background: isBrutalism ? '#ffffff' : 'linear-gradient(180deg, #0a0a0a 0%, ' + (sectionId === 'devex' ? '#0f0f0f' : sectionId === 'glitch' ? '#0a0014' : '#0a0a0a') + ' 100%)',
      }}
    >
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
    </div>
  );
}

/* ──────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/80">Code Aesthetic Gallery</div>
              <div className="text-xs text-white/30 font-mono">4 styles, 1 showcase</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/30 font-mono">
            <span className="flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              Next.js 16
            </span>
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              TypeScript
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Tailwind CSS
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Framer Motion
            </span>
          </div>

          <div className="text-xs text-white/20 font-mono text-center md:text-right">
            <div>Built with Z.ai Code</div>
            <div className="mt-1 flex items-center gap-2 justify-center md:justify-end">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
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

      {/* Footer */}
      <Footer />
    </main>
  );
}
