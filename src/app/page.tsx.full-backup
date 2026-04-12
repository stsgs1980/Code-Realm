'use client';

import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Terminal,
  Code2,
  AlertTriangle,
  Zap,
  ChevronUp,
  ChevronDown,
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
  Box,
  Wand2,
  SlidersHorizontal,
  Pen,
  LayoutGrid,
  RotateCcw,
  Smartphone,
  Square,
  Scissors,
  ScanSearch,
  Braces,
  FileText,
  Lock,
  Ruler,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { ThemeToggle } from '@/components/theme-toggle';
import { SoundToggle } from '@/components/sound-toggle';

const TerminalSection = lazy(() => import('@/components/terminal-section').then(m => ({ default: () => <m.TerminalSection /> })));
const DevexSection = lazy(() => import('@/components/devex-section').then(m => ({ default: () => <m.DevexSection /> })));
const BrutalismSection = lazy(() => import('@/components/brutalism-section'));
const GlitchSection = lazy(() => import('@/components/glitch-section'));
const CodeComparisonSection = lazy(() => import('@/components/code-comparison-section').then(m => ({ default: () => <m.CodeComparisonSection /> })));
const CodePlaygroundSection = lazy(() => import('@/components/code-playground-section').then(m => ({ default: () => <m.CodePlaygroundSection /> })));
const GradientGeneratorSection = lazy(() => import('@/components/gradient-generator-section').then(m => ({ default: () => <m.GradientGeneratorSection /> })));
const ColorPaletteSection = lazy(() => import('@/components/color-palette-section').then(m => ({ default: () => <m.ColorPaletteSection /> })));
const ShadowGeneratorSection = lazy(() => import('@/components/shadow-generator-section').then(m => ({ default: () => <m.ShadowGeneratorSection /> })));
const AnimationGeneratorSection = lazy(() => import('@/components/animation-generator-section').then(m => ({ default: () => <m.AnimationGeneratorSection /> })));
const CssFiltersSection = lazy(() => import('@/components/css-filters-section').then(m => ({ default: () => <m.CssFiltersSection /> })));
const TypographySection = lazy(() => import('@/components/typography-section').then(m => ({ default: () => <m.TypographySection /> })));

const SvgEditorSection = lazy(() => import('@/components/svg-editor-section').then(m => ({ default: () => <m.SvgEditorSection /> })));

const FlexboxGridSection = lazy(() => import('@/components/flexbox-grid-section').then(m => ({ default: () => <m.FlexboxGridSection /> })));

const Transform3dSection = lazy(() => import('@/components/transform-3d-section').then(m => ({ default: () => <m.Transform3dSection /> })));

const ResponsiveShowcaseSection = lazy(() => import('@/components/responsive-showcase-section').then(m => ({ default: () => <m.ResponsiveShowcaseSection /> })));

const BorderGeneratorSection = lazy(() => import('@/components/border-generator-section').then(m => ({ default: () => <m.BorderGeneratorSection /> })));

const CssSnippetsSection = lazy(() => import('@/components/css-snippets-section').then(m => ({ default: () => <m.CssSnippetsSection /> })));

const RegexTesterSection = lazy(() => import('@/components/regex-tester-section').then(m => ({ default: () => <m.RegexTesterSection /> })));

const JsonFormatterSection = lazy(() => import('@/components/json-formatter-section').then(m => ({ default: () => <m.JsonFormatterSection /> })));

const MarkdownPreviewSection = lazy(() => import('@/components/markdown-preview-section').then(m => ({ default: () => <m.MarkdownPreviewSection /> })));

const Base64ToolSection = lazy(() => import('@/components/base64-tool-section').then(m => ({ default: () => <m.Base64ToolSection /> })));

const UnitConverterSection = lazy(() => import('@/components/unit-converter-section').then(m => ({ default: () => <m.UnitConverterSection /> })));

/* ──────────────────────────────────────────────
   SECTION LOADER
   ────────────────────────────────────────────── */

function SectionLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
        <span className="font-mono text-sm text-white/30">Loading...</span>
      </div>
    </div>
  );
}

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
  { id: 'shadow', label: 'Shadow', icon: Box, color: '#f59e0b', bg: 'from-[#0a0a0a] to-[#0a1a10]' },
  { id: 'animation', label: 'Animation', icon: Wand2, color: '#8b5cf6', bg: 'from-[#0a0a0a] to-[#0d0d1a]' },
  { id: 'filters', label: 'Filters', icon: SlidersHorizontal, color: '#14b8a6', bg: 'from-[#0a0a0a] to-[#0a1a15]' },
  { id: 'svg', label: 'SVG', icon: Pen, color: '#34d399', bg: 'from-[#0a0a0a] to-[#0a1a15]' },
  { id: 'typography', label: 'Type', icon: Type, color: '#f472b6', bg: 'from-[#0a0a0a] to-[#0a0a12]' },
  { id: 'flexbox', label: 'Layout', icon: LayoutGrid, color: '#10b981', bg: 'from-[#0a0a0a] to-[#0a1a10]' },
  { id: 'transform', label: '3D', icon: RotateCcw, color: '#a78bfa', bg: 'from-[#0a0a0a] to-[#0d0d1a]' },
  { id: 'responsive', label: 'Responsive', icon: Smartphone, color: '#38bdf8', bg: 'from-[#0a0a0a] to-[#0a0f14]' },
  { id: 'border', label: 'Border', icon: Square, color: '#f59e0b', bg: 'from-[#0a0a0a] to-[#14100a]' },
  { id: 'snippets', label: 'Snippets', icon: Scissors, color: '#f59e0b', bg: 'from-[#0a0a0a] to-[#1a140a]' },
  { id: 'regex', label: 'Regex', icon: ScanSearch, color: '#f59e0b', bg: 'from-[#0a0a0a] to-[#14100a]' },
  { id: 'json', label: 'JSON', icon: Braces, color: '#f97316', bg: 'from-[#0a0a0a] to-[#0f0f1a]' },
  { id: 'markdown', label: 'Markdown', icon: FileText, color: '#8b5cf6', bg: 'from-[#0a0a0a] to-[#0d0d18]' },
  { id: 'base64', label: 'Encoder', icon: Lock, color: '#14b8a6', bg: 'from-[#0a0a0a] to-[#0a1014]' },
  { id: 'units', label: 'Units', icon: Ruler, color: '#06b6d4', bg: 'from-[#0a0a0a] to-[#0a1418]' },
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

/* ─── Animated Counter Sub-component ─── */
function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [hasStarted, target, duration]);

  return (
    <span ref={counterRef} className="counter-glow tabular-nums">
      {count}{suffix}
    </span>
  );
}

function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const words = ['TERMINAL', 'DEVEX', 'BRUTALISM', 'GLITCH', 'CODE ART', 'GRADIENTS', 'PALETTES', 'SHADOWS', 'ANIMATIONS', 'FILTERS', 'SVG', 'TYPOGRAPHY', 'LAYOUTS', '3D TRANSFORMS', 'RESPONSIVE', 'BORDERS', 'SNIPPETS', 'REGEX', 'JSON', 'MARKDOWN', 'ENCODER', 'CONVERTER'];
  const fullSubtitle = 'Explore twenty-three iconic code-inspired design styles and interactive developer tools: from retro terminals to CSS unit conversion. Each section is fully interactive.';
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

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

  // ─── 3D Tilt on mouse move ───
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 8;
    const rotateX = -((y - centerY) / centerY) * maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = tiltRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  // ─── Track mouse position for particles ───
  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleGlobalMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, []);

  // ─── Enhanced particle canvas with mouse repulsion ───
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
    const PARTICLE_COUNT = isMobile ? 30 : 80;
    const CONNECTION_DIST = 130;
    const REPULSION_RADIUS = 200;
    const REPULSION_STRENGTH = 0.8;
    const COLORS = ['#10b981', '#06b6d4', '#34d399']; // emerald, cyan, lighter emerald

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseVx: number;
      baseVy: number;
      radius: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: 0.8 + Math.random() * 1.2,
        opacity: 0.15 + Math.random() * 0.35,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    let animationId: number;

    function draw() {
      ctx.clearRect(0, 0, w, h);

      // Get canvas-relative mouse position
      const canvasRect = canvas.getBoundingClientRect();
      const mx = mousePosRef.current.x - canvasRect.left;
      const my = mousePosRef.current.y - canvasRect.top;

      // Update positions and draw particles
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < REPULSION_RADIUS && dist > 0) {
          const force = ((REPULSION_RADIUS - dist) / REPULSION_RADIUS) * REPULSION_STRENGTH;
          const nx = dx / dist;
          const ny = dy / dist;
          p.vx += nx * force;
          p.vy += ny * force;
        }

        // Dampen back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;

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
            const lineOpacity = (1 - dist / CONNECTION_DIST) * 0.18;
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

      // Draw faint glow near mouse cursor
      if (mx > 0 && mx < w && my > 0 && my < h) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, REPULSION_RADIUS);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.04)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 1;
        ctx.fillRect(mx - REPULSION_RADIUS, my - REPULSION_RADIUS, REPULSION_RADIUS * 2, REPULSION_RADIUS * 2);
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

  // ─── Magnetic scroll indicator ───
  useEffect(() => {
    const el = scrollIndicatorRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 180;
      if (dist < maxDist) {
        const pull = ((maxDist - dist) / maxDist) * 12;
        const nx = dx / dist;
        const ny = dy / dist;
        el.style.transform = `translate(${nx * pull}px, ${ny * pull}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none bg-grid-subtle" />

      {/* Aurora Northern Lights background */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* Hero gradient orbs */}
      <div className="hero-orb hero-orb-1" aria-hidden="true" />
      <div className="hero-orb hero-orb-2" aria-hidden="true" />
      <div className="hero-orb hero-orb-3" aria-hidden="true" />

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
      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm floating-badge">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-white/60 font-mono">Code Aesthetic Showcase</span>
          </div>
        </motion.div>

        {/* Main heading with 3D tilt effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="tilt-card-3d inline-block mb-6"
        >
          <div
            ref={tiltRef}
            className="tilt-card-3d-inner hero-gradient-border rounded-3xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: 'transform 0.12s ease-out' }}
          >
            <div className="rounded-3xl px-8 py-4 sm:px-10 sm:py-6 bg-[#0a0a0a]/90 backdrop-blur-sm">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
                <span className="text-white">The Art of</span>
                <br />
                <div className="relative h-[1.2em] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-text"
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
          </div>
        </motion.div>

        {/* Subtitle with typing effect */}
        <motion.p
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-8 leading-relaxed h-[3.5rem] sm:h-[3rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>{typedText}</span>
          {!isTypingDone && <span className="typing-cursor" />}
        </motion.p>

        {/* Animated counter stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { value: 23, suffix: '', label: 'Sections' },
            { value: 50, suffix: '+', label: 'Commands' },
            { value: 100, suffix: '%', label: 'Interactive' },
          ].map((stat) => (
            <div key={`stat-counter-${stat.label}`} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white/90">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} duration={1800} />
              </div>
              <div className="text-xs font-mono text-white/30 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold font-mono text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text">
              ∞
            </div>
            <div className="text-xs font-mono text-white/30 mt-1 uppercase tracking-wider">Possibilities</div>
          </div>
        </motion.div>

        {/* Section preview cards - dramatic hover */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 max-w-5xl mx-auto mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {SECTIONS.map((section, i) => (
            <motion.a
              key={section.id}
              href={`#${section.id}`}
              className="hero-section-card group flex flex-col items-center gap-2.5 p-3 sm:p-4 rounded-xl border border-white/[0.06] backdrop-blur-sm"
              style={{ '--section-color': section.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + i * 0.06 }}
            >
              <div
                className="hero-card-icon icon-breathe w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: `${section.color}15`,
                  border: `1px solid ${section.color}30`,
                  animationDelay: `${i * 0.25}s`,
                }}
              >
                <section.icon
                  className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-all duration-300"
                  style={{ color: section.color }}
                />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300">
                {section.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Magnetic scroll indicator */}
        <motion.div
          ref={scrollIndicatorRef}
          className="magnetic-text flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-xs font-mono text-white/25 tracking-[0.2em]">SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronUp className="w-5 h-5 text-white/25 rotate-180" />
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
                className={`nav-link-underline hover-ripple relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
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
                    <span className="text-[10px] font-mono text-white/20">23 sections</span>
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
  const sectionIndex = SECTIONS.findIndex((s) => s.id === sectionId);
  const isBrutalism = sectionId === 'brutalism';
  const [topVisible, setTopVisible] = useState(false);
  const [bottomVisible, setBottomVisible] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Scroll-based parallax for watermark and decorative dots */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const dotsParallaxLeft = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const dotsParallaxRight = useTransform(scrollYProgress, [0, 1], [-15, 15]);

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

  const sectionNumber = String(sectionIndex + 1).padStart(2, '0');

  return (
    <div
      ref={containerRef}
      className="py-20 md:py-28 text-center px-4 relative overflow-hidden"
      style={{
        background: isBrutalism ? '#ffffff' : 'linear-gradient(180deg, #0a0a0a 0%, ' + (sectionId === 'devex' ? '#0f0f0f' : sectionId === 'glitch' ? '#0a0014' : sectionId === 'codeart' ? '#0d0d0d' : '#0a0a0a') + ' 100%)',
      }}
    >
      {/* Large watermark section number behind title (parallax) */}
      {!isBrutalism && (
        <motion.div
          className="section-watermark pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            y: watermarkY,
            color: `${section.color}08`,
          }}
        >
          <span className="text-[8rem] sm:text-[12rem] md:text-[16rem] font-black font-mono leading-none tracking-tighter">
            {sectionNumber}
          </span>
        </motion.div>
      )}

      {/* Top animated gradient line with pulsing center dot + animated flank dots */}
      {!isBrutalism && (
        <div ref={topRef} className={`divider-fadein max-w-2xl mx-auto mb-12 ${topVisible ? 'visible' : ''}`}>
          <div className="divider-glow relative">
            <div className="divider-dot" />
            <motion.div
              className="divider-flank-dot"
              style={{ x: dotsParallaxLeft }}
            />
            <motion.div
              className="divider-flank-dot divider-flank-dot-right"
              style={{ x: dotsParallaxRight }}
            />
          </div>
        </div>
      )}

      {/* Dramatic section number badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
        className="mb-6 relative z-10"
      >
        <div
          className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl font-mono text-lg sm:text-xl font-black tracking-wider"
          style={isBrutalism ? {
            backgroundColor: '#000000',
            color: '#ffffff',
          } : {
            background: `linear-gradient(135deg, ${section.color}25, ${section.color}10)`,
            border: `1.5px solid ${section.color}40`,
            color: section.color,
          }}
        >
          {sectionNumber}
        </div>
      </motion.div>

      {/* Title with horizontal animated lines and gradient glow */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-6 relative z-10"
      >
        {/* Left animated line with end dot */}
        {!isBrutalism && (
          <motion.div
            className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px] relative"
            style={{ backgroundColor: `${section.color}20` }}
            initial={{ scaleX: 0, originX: 1 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: `${section.color}40`,
                boxShadow: `0 0 6px ${section.color}30`,
              }}
            />
          </motion.div>
        )}
        {isBrutalism && (
          <div className="h-[2px] flex-1 max-w-[120px] sm:max-w-[180px] bg-black/20" />
        )}

        {/* Title with subtle gradient glow behind */}
        <div className="relative">
          {!isBrutalism && (
            <div
              className="absolute inset-0 blur-3xl opacity-20 -z-10"
              style={{
                background: `radial-gradient(ellipse, ${section.color}30, transparent 70%)`,
              }}
            />
          )}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            style={{
              color: isBrutalism ? '#000000' : '#ffffff',
              fontFamily: isBrutalism ? 'Times New Roman, Georgia, serif' : 'var(--font-geist-sans), sans-serif',
            }}
          >
            {section.label} Style
          </h2>
        </div>

        {/* Right animated line with start dot */}
        {!isBrutalism && (
          <motion.div
            className="h-[1px] flex-1 max-w-[120px] sm:max-w-[180px] relative"
            style={{ backgroundColor: `${section.color}20` }}
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: `${section.color}40`,
                boxShadow: `0 0 6px ${section.color}30`,
              }}
            />
          </motion.div>
        )}
        {isBrutalism && (
          <div className="h-[2px] flex-1 max-w-[120px] sm:max-w-[180px] bg-black/20" />
        )}
      </motion.div>

      {/* Section badge with icon */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-5 relative z-10"
      >
        <div
          className="section-badge-glow inline-flex items-center gap-2 px-4 py-2 rounded-full border"
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
      </motion.div>

      {/* Description with delayed fade-in */}
      <motion.p
        className="text-base sm:text-lg max-w-xl mx-auto relative z-10"
        style={{ color: isBrutalism ? '#666666' : 'rgba(255,255,255,0.4)' }}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {description}
      </motion.p>

      {/* Bouncing down-arrow indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 relative z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <ChevronDown
            className="w-5 h-5"
            style={{ color: isBrutalism ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.15)' }}
          />
          <span
            className="text-[10px] font-mono uppercase tracking-[0.15em]"
            style={{ color: isBrutalism ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.1)' }}
          >
            Scroll
          </span>
        </motion.div>
      </motion.div>

      {/* Bottom animated gradient line with pulsing center dot + animated flank dots */}
      {!isBrutalism && (
        <div ref={bottomRef} className={`divider-fadein max-w-2xl mx-auto mt-12 ${bottomVisible ? 'visible' : ''}`}>
          <div className="divider-glow relative">
            <div className="divider-dot" />
            <motion.div
              className="divider-flank-dot"
              style={{ x: dotsParallaxRight }}
            />
            <motion.div
              className="divider-flank-dot divider-flank-dot-right"
              style={{ x: dotsParallaxLeft }}
            />
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
    <footer className="w-full py-16 px-4 bg-[#050505] footer-gradient-border">
      <div className="w-full px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Top gradient divider with spinning icon */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-emerald-500/20" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center"
          >
            <Code2 className="w-3 h-3 text-emerald-400/50" />
          </motion.div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/20" />
        </div>

        {/* Signature Z.AI logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-4xl sm:text-5xl font-black gradient-text-anim tracking-tight">
              Z.AI
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm font-mono text-white/25 mt-3"
          >
            Built with &hearts; and &nbsp;☕
          </motion.p>
        </div>

        {/* Row of mini section icons as visual summary */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {SECTIONS.map((s, i) => (
            <motion.a
              key={s.id}
              href={`#${s.id}`}
              className="group/footer-icon flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06]"
              whileHover={{ y: -3, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.04 }}
              title={s.label}
            >
              <s.icon
                className="w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-300"
                style={{ color: `${s.color}80` }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Main footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Code2 className="w-4 h-4 text-black" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white/80">Code Aesthetic Gallery</div>
              <div className="text-xs text-white/30 font-mono">19 sections, 1 showcase</div>
            </div>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/30 font-mono">
            <motion.span
              className="flex items-center gap-1.5 footer-link-glow hover:text-white/50 transition-colors duration-300 cursor-default"
              whileHover={{ y: -1 }}
            >
              <Monitor className="w-3.5 h-3.5" />
              Next.js 16
            </motion.span>
            <motion.span
              className="flex items-center gap-1.5 footer-link-glow hover:text-white/50 transition-colors duration-300 cursor-default"
              whileHover={{ y: -1 }}
            >
              <Type className="w-3.5 h-3.5" />
              TypeScript
            </motion.span>
            <motion.span
              className="flex items-center gap-1.5 footer-link-glow hover:text-white/50 transition-colors duration-300 cursor-default"
              whileHover={{ y: -1 }}
            >
              <Layers className="w-3.5 h-3.5" />
              Tailwind CSS
            </motion.span>
            <motion.span
              className="flex items-center gap-1.5 footer-link-glow hover:text-white/50 transition-colors duration-300 cursor-default"
              whileHover={{ y: -1 }}
            >
              <Zap className="w-3.5 h-3.5" />
              Framer Motion
            </motion.span>
          </div>

          <div className="text-xs text-white/20 font-mono text-center md:text-right">
            <div>Built with Z.ai Code</div>
            <div className="mt-1 flex items-center gap-2 justify-center md:justify-end">
              <span className="inline-block w-2 h-2 rounded-full status-pulse" />
              <span>All systems operational</span>
            </div>
            <div className="mt-3">
              <motion.a
                href="#top"
                onClick={scrollToTop}
                onKeyDown={handleKeyDown}
                className="footer-link-glow inline-flex items-center gap-1 text-white/25 hover:text-white/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400/50 rounded-sm px-1 transition-colors duration-300"
                tabIndex={0}
                aria-label="Scroll to top"
                whileHover={{ y: -2 }}
              >
                <ArrowUp className="w-3 h-3" />
                <span>Back to top</span>
              </motion.a>
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
          className="float-gentle fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-shadow duration-300"
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

/* ──────────────────────────────────────────────
   CURSOR FOLLOWER (Canvas-based trail effect)
   ────────────────────────────────────────────── */

function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const orbRef = useRef({ x: -100, y: -100, scale: 1, targetScale: 1 });
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const isVisibleRef = useRef(true);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisibleRef.current = false;
      return;
    }
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      isVisibleRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const TRAIL_LENGTH = 10;
    const ORB_RADIUS = 12;
    const DOT_RADIUS_MAX = 4;
    const DOT_RADIUS_MIN = 1;
    const LERP_FACTOR = 0.15;
    // Initialize trail with offscreen positions
    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailRef.current.push({ x: -100, y: -100 });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering over interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const interactive = el.closest('a, button, [role="button"], input, textarea, select, [tabindex], .hero-section-card, .nav-link-underline');
        orbRef.current.targetScale = interactive ? 1.6 : 1;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -100, y: -100 };
      orbRef.current.targetScale = 1;
    };

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const orb = orbRef.current;

      // Smooth orb follow with spring easing
      orb.x = lerp(orb.x, mx, LERP_FACTOR);
      orb.y = lerp(orb.y, my, LERP_FACTOR);
      orb.scale = lerp(orb.scale, orb.targetScale, 0.1);

      // Update trail: shift positions and add new at front
      const trail = trailRef.current;
      for (let i = trail.length - 1; i > 0; i--) {
        trail[i] = { ...trail[i - 1] };
      }
      trail[0] = { x: orb.x, y: orb.y };

      // Skip drawing if cursor is offscreen
      if (mx < -50 || mx > w + 50 || my < -50 || my > h + 50) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw trail dots (back to front)
      for (let i = trail.length - 1; i >= 1; i--) {
        const t = i / trail.length;
        const opacity = (1 - t) * 0.5;
        const radius = DOT_RADIUS_MAX - (DOT_RADIUS_MAX - DOT_RADIUS_MIN) * t;

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.fill();
      }

      // Draw main orb glow (outer soft glow)
      const glowRadius = ORB_RADIUS * orb.scale * 2.5;
      const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, glowRadius);
      glow.addColorStop(0, 'rgba(16, 185, 129, 0.12)');
      glow.addColorStop(0.5, 'rgba(6, 182, 212, 0.06)');
      glow.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Draw main orb (solid center)
      const orbRadius = ORB_RADIUS * orb.scale;
      const orbGrad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orbRadius);
      orbGrad.addColorStop(0, 'rgba(52, 211, 153, 0.8)');
      orbGrad.addColorStop(0.6, 'rgba(16, 185, 129, 0.5)');
      orbGrad.addColorStop(1, 'rgba(6, 182, 212, 0.15)');
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orbRadius, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();

      // Inner bright core
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orbRadius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 243, 208, 0.7)';
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render anything if not visible
  if (typeof window !== 'undefined' &&
    (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
     window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="cursor-follower-canvas"
      aria-hidden="true"
    />
  );
}

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
    <main className="min-h-screen bg-[#0a0a0a] noise-overlay">
      <ScrollProgressBar />
      <FloatingNav activeSection={activeSection} onClickSection={scrollToSection} />
      <CursorFollower />

      <ErrorBoundary>
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
        <Suspense fallback={<SectionLoader />}>
          <TerminalSection />
        </Suspense>
      </div>

      {/* Section 2: DevEx */}
      <div id="devex" ref={(el) => { sectionRefs.current['devex'] = el; }}>
        <SectionDivider
          label="Section 02"
          sectionId="devex"
          description="Modern developer documentation style inspired by Vercel and Stripe. VS Code editors, glassmorphism cards, and live code previews."
          icon={Code2}
        />
        <Suspense fallback={<SectionLoader />}>
          <DevexSection />
        </Suspense>
      </div>

      {/* Section 3: Brutalism */}
      <div id="brutalism" ref={(el) => { sectionRefs.current['brutalism'] = el; }}>
        <SectionDivider
          label="Section 03"
          sectionId="brutalism"
          description="Raw, unpolished design that celebrates the ugly. No rounded corners, no gradients — just pure HTML chaos as nature intended."
          icon={AlertTriangle}
        />
        <Suspense fallback={<SectionLoader />}>
          <BrutalismSection />
        </Suspense>
      </div>

      {/* Section 4: Glitch */}
      <div id="glitch" ref={(el) => { sectionRefs.current['glitch'] = el; }}>
        <SectionDivider
          label="Section 04"
          sectionId="glitch"
          description="Digital distortion, neon glows, and cyberpunk aesthetics. Hack the system, watch the matrix rain, and generate glitch text."
          icon={Zap}
        />
        <Suspense fallback={<SectionLoader />}>
          <GlitchSection />
        </Suspense>
      </div>

      {/* Section 5: Code Art */}
      <div id="codeart" ref={(el) => { sectionRefs.current['codeart'] = el; }}>
        <SectionDivider
          label="Section 05"
          sectionId="codeart"
          description="When code becomes the canvas. Compare how the same component looks across four different aesthetic styles — from polished SaaS to glitchy cyberpunk."
          icon={Sparkles}
        />
        <Suspense fallback={<SectionLoader />}>
          <CodeComparisonSection />
        </Suspense>
      </div>

      {/* Section 6: Code Playground */}
      <div id="playground" ref={(el) => { sectionRefs.current['playground'] = el; }}>
        <SectionDivider
          label="Section 06"
          sectionId="playground"
          description="Write HTML, CSS, and JavaScript code with live preview. Experiment with animations, layouts, and interactive effects in real-time."
          icon={Code2}
        />
        <Suspense fallback={<SectionLoader />}>
          <CodePlaygroundSection />
        </Suspense>
      </div>

      {/* Section 7: Gradient Lab */}
      <div id="gradient" ref={(el) => { sectionRefs.current['gradient'] = el; }}>
        <SectionDivider
          label="Section 07"
          sectionId="gradient"
          description="Design beautiful gradients with an interactive builder. Pick colors, choose types, and export production-ready CSS, Tailwind, or SVG code."
          icon={Paintbrush}
        />
        <Suspense fallback={<SectionLoader />}>
          <GradientGeneratorSection />
        </Suspense>
      </div>

      {/* Section 8: Palette Studio */}
      <div id="palette" ref={(el) => { sectionRefs.current['palette'] = el; }}>
        <SectionDivider
          label="Section 08"
          sectionId="palette"
          description="Generate harmonious color palettes using 7 color theory algorithms. Export to CSS, Tailwind, or JSON with WCAG contrast checking."
          icon={Droplets}
        />
        <Suspense fallback={<SectionLoader />}>
          <ColorPaletteSection />
        </Suspense>
      </div>

      {/* Section 9: Shadow Lab */}
      <div id="shadow" ref={(el) => { sectionRefs.current['shadow'] = el; }}>
        <SectionDivider
          label="Section 09"
          sectionId="shadow"
          description="Craft beautiful box and text shadows with a layered compositor. Choose from 12 presets, stack up to 5 layers, and export to CSS or Tailwind."
          icon={Box}
        />
        <Suspense fallback={<SectionLoader />}>
          <ShadowGeneratorSection />
        </Suspense>
      </div>

      {/* Section 10: Animation Lab */}
      <div id="animation" ref={(el) => { sectionRefs.current['animation'] = el; }}>
        <SectionDivider
          label="Section 10"
          sectionId="animation"
          description="Create stunning CSS animations with a visual keyframe editor. Choose from 16 presets, customize timing and easing, and export production-ready keyframes."
          icon={Wand2}
        />
        <Suspense fallback={<SectionLoader />}>
          <AnimationGeneratorSection />
        </Suspense>
      </div>

      {/* Section 11: Filters Lab */}
      <div id="filters" ref={(el) => { sectionRefs.current['filters'] = el; }}>
        <SectionDivider
          label="Section 11"
          sectionId="filters"
          description="Apply real-time CSS filters to images with 8 adjustable properties, 12 curated presets, before/after comparison, and instant CSS export."
          icon={SlidersHorizontal}
        />
        <Suspense fallback={<SectionLoader />}>
          <CssFiltersSection />
        </Suspense>
      </div>

      {/* Section 12: SVG Path Editor */}
      <div id="svg" ref={(el) => { sectionRefs.current['svg'] = el; }}>
        <SectionDivider
          label="Section 12"
          sectionId="svg"
          description="Interactive SVG path builder with 3 drawing modes, style controls, transform tools, 6 pre-built shapes, and real-time path data export."
          icon={Pen}
        />
        <Suspense fallback={<SectionLoader />}>
          <SvgEditorSection />
        </Suspense>
      </div>

      {/* Section 13: Typography Playground */}
      <div id="typography" ref={(el) => { sectionRefs.current['typography'] = el; }}>
        <SectionDivider
          label="Section 13"
          sectionId="typography"
          description="Interactive typography playground with 8 font families, 11 style controls, 8 presets, font pairing suggestions, and live CSS export."
          icon={Type}
        />
        <Suspense fallback={<SectionLoader />}>
          <TypographySection />
        </Suspense>
      </div>

      {/* Section 14: Layout Lab */}
      <div id="flexbox" ref={(el) => { sectionRefs.current['flexbox'] = el; }}>
        <SectionDivider
          label="Section 14"
          sectionId="flexbox"
          description="Master CSS Flexbox and Grid layouts with a visual builder. Drag items, tweak properties, and export production-ready layout code instantly."
          icon={LayoutGrid}
        />
        <Suspense fallback={<SectionLoader />}>
          <FlexboxGridSection />
        </Suspense>
      </div>

      {/* Section 15: 3D Transforms */}
      <div id="transform" ref={(el) => { sectionRefs.current['transform'] = el; }}>
        <SectionDivider
          label="Section 15"
          sectionId="transform"
          description="Explore the third dimension of CSS. Rotate, scale, translate, and skew elements in 3D space with real-time preview and preset animations."
          icon={RotateCcw}
        />
        <Suspense fallback={<SectionLoader />}>
          <Transform3dSection />
        </Suspense>
      </div>

      {/* Section 16: Responsive Lab */}
      <div id="responsive" ref={(el) => { sectionRefs.current['responsive'] = el; }}>
        <SectionDivider
          label="Section 16"
          sectionId="responsive"
          description="Master responsive design with live device preview, breakpoint visualization, layout demos, media query builder, and a unit converter. See your CSS adapt to any screen size."
          icon={Smartphone}
        />
        <Suspense fallback={<SectionLoader />}>
          <ResponsiveShowcaseSection />
        </Suspense>
      </div>

      {/* Section 17: Border Lab */}
      <div id="border" ref={(el) => { sectionRefs.current['border'] = el; }}>
        <SectionDivider
          label="Section 17"
          sectionId="border"
          description="Craft beautiful borders, outlines, and border-image gradients with per-side control. Choose from 10 presets, explore radius mapping, and export production-ready CSS."
          icon={Square}
        />
        <Suspense fallback={<SectionLoader />}>
          <BorderGeneratorSection />
        </Suspense>
      </div>

      {/* Section 18: CSS Snippets */}
      <div id="snippets" ref={(el) => { sectionRefs.current['snippets'] = el; }}>
        <SectionDivider
          label="Section 18"
          sectionId="snippets"
          description="Browse, preview, and copy 13+ commonly-used CSS patterns — from text truncation to glassmorphism, neon glow, custom scrollbars, and more."
          icon={Scissors}
        />
        <Suspense fallback={<SectionLoader />}>
          <CssSnippetsSection />
        </Suspense>
      </div>

      {/* Section 19: Regex Tester */}
      <div id="regex" ref={(el) => { sectionRefs.current['regex'] = el; }}>
        <SectionDivider
          label="Section 19"
          sectionId="regex"
          description="Test, debug, and learn regular expressions in real-time with match highlighting, group capture, and curated presets."
          icon={ScanSearch}
        />
        <Suspense fallback={<SectionLoader />}>
          <RegexTesterSection />
        </Suspense>
      </div>

      {/* Section 20: JSON Studio */}
      <div id="json" ref={(el) => { sectionRefs.current['json'] = el; }}>
        <SectionDivider
          label="Section 20"
          sectionId="json"
          description="Format, validate, and explore JSON data with syntax highlighting, tree view, path finder, statistics, and multiple export formats."
          icon={Braces}
        />
        <Suspense fallback={<SectionLoader />}>
          <JsonFormatterSection />
        </Suspense>
      </div>

      {/* Section 21: Markdown Lab */}
      <div id="markdown" ref={(el) => { sectionRefs.current['markdown'] = el; }}>
        <SectionDivider
          label="Section 21"
          sectionId="markdown"
          description="Write, preview, and export markdown in real-time with live rendering, toolbar actions, sample templates, and full GFM support."
          icon={FileText}
        />
        <Suspense fallback={<SectionLoader />}>
          <MarkdownPreviewSection />
        </Suspense>
      </div>

      {/* Section 22: Encoder Lab */}
      <div id="base64" ref={(el) => { sectionRefs.current['base64'] = el; }}>
        <SectionDivider
          label="Section 22"
          sectionId="base64"
          description="Encode and decode Base64, URLs, and HTML entities in real-time with file upload, auto-detection, and export."
          icon={Lock}
        />
        <Suspense fallback={<SectionLoader />}>
          <Base64ToolSection />
        </Suspense>

        <SectionDivider
          label="Section 23"
          sectionId="units"
          description="Convert between CSS units (px, rem, em, vw, vh, %, pt, cm, mm, in) with live preview, visual ruler, and typography scale demonstrations."
          icon={Ruler}
        />
        <Suspense fallback={<SectionLoader />}>
          <UnitConverterSection />
        </Suspense>
      </div>

      {/* Footer */}
      <Footer />
      </ErrorBoundary>

      {/* Back to Top */}
      <BackToTopButton />

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Sound Toggle */}
      <SoundToggle />
    </main>
  );
}
