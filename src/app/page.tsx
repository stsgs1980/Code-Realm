'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

// ── Showcase Sections ──
import { RetroTerminalPrototype } from '@/components/showcases/retro-terminal';
import { TerminalSection } from '@/components/showcases/terminal';
import { DevexSection } from '@/components/showcases/devex';
import BrutalismSection from '@/components/showcases/brutalism';
import GlitchSection from '@/components/showcases/glitch';
import { CodeComparisonSection } from '@/components/showcases/code-art';

// ── Generator Sections ──
import { GradientGeneratorSection } from '@/components/generators/gradient';
import { ColorPaletteSection } from '@/components/generators/palette';
import { ShadowGeneratorSection } from '@/components/generators/shadow';
import { BorderGeneratorSection } from '@/components/generators/border';
import { AnimationGeneratorSection } from '@/components/generators/animation';
import { CssFiltersSection } from '@/components/generators/css-filters';

// ── Editor Sections ──
import { CodePlaygroundSection } from '@/components/editors/code-playground';
import { SvgEditorSection } from '@/components/editors/svg-editor';
import { CssSnippetsSection } from '@/components/editors/css-snippets';
import { MarkdownPreviewSection } from '@/components/editors/markdown-preview';

// ── Tool Sections ──
import { Base64ToolSection } from '@/components/tools/base64';
import { UnitConverterSection } from '@/components/tools/unit-converter';
import { RegexTesterSection } from '@/components/tools/regex-tester';
import { JsonFormatterSection } from '@/components/tools/json-formatter';
import { TypographySection } from '@/components/tools/typography';
import { FlexboxGridSection } from '@/components/tools/flexbox-grid';
import { Transform3dSection } from '@/components/tools/transform-3d';
import { ResponsiveShowcaseSection } from '@/components/tools/responsive-showcase';

/* ─── SSR-safe mounting ─── */
const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ─── Color Constants ─── */
const CREAM = '#f5f0e1';
const BLACK = '#1a1a1a';
const AMBER = '#d4a017';
const MUTED = '#6b6356';

/* ─── Rotating hero words ─── */
const HERO_WORDS = ['TERMINAL', 'BRUTALISM', 'GLITCH', 'CODE ART', 'GRADIENTS', 'TYPOGRAPHY', 'SHADOWS', 'ANIMATIONS'];

/* ─── Section categories ─── */
const CATEGORIES = [
  { id: 'showcases', label: 'SHOWCASES', sections: 6 },
  { id: 'generators', label: 'GENERATORS', sections: 6 },
  { id: 'editors', label: 'EDITORS', sections: 4 },
  { id: 'tools', label: 'TOOLS', sections: 7 },
];

/* ─── Floating code snippets ─── */
const FLOATING_SNIPPETS = [
  { text: '{ design: true }', x: 5, y: 15, rot: -3 },
  { text: 'export default Art;', x: 72, y: 10, rot: 2 },
  { text: 'const style = "brutal";', x: 82, y: 62, rot: -2 },
  { text: '<Terminal />', x: 8, y: 72, rot: 4 },
  { text: 'async function create() {}', x: 55, y: 80, rot: -1 },
];

/* ─── SectionDivider ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(26,26,26,0.12)' }} />
        <div className="section-label mt-3">{label}</div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const mounted = useMounted();
  const [scrollPercent, setScrollPercent] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [activeCategory, setActiveCategory] = useState('showcases');

  /* ─── Scroll progress tracking ─── */
  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(percent);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  /* ─── Hero word rotation ─── */
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [mounted]);

  /* ─── Scroll to section ─── */
  const scrollToSection = (category: string) => {
    setActiveCategory(category);
    const el = document.getElementById(`section-${category}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ─── SSR fallback ─── */
  if (!mounted) {
    return <div className="min-h-screen" style={{ backgroundColor: CREAM }} />;
  }

  return (
    <div className="min-h-screen retro-paper retro-scanlines retro-scrollbar font-mono" style={{ color: BLACK }}>
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] transition-[width] duration-100"
        style={{
          width: `${scrollPercent}%`,
          backgroundColor: AMBER,
          boxShadow: '0 0 8px rgba(212, 160, 23, 0.4)',
        }}
      />

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 retro-grid pointer-events-none" />

        {/* Floating code snippets */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLOATING_SNIPPETS.map((snippet, i) => (
            <div
              key={`hero-float-${i}`}
              className="absolute font-mono text-xs whitespace-nowrap select-none float-code"
              style={{
                left: `${snippet.x}%`,
                top: `${snippet.y}%`,
                transform: `rotate(${snippet.rot}deg)`,
                color: 'rgba(212, 160, 23, 0.15)',
                animationDelay: `${i * 1.2}s`,
              }}
            >
              {snippet.text}
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="mb-6">
            <span className="retro-badge">Code Aesthetic Gallery v2.0</span>
          </div>

          {/* Main heading */}
          <div className="mb-4">
            <p className="text-sm sm:text-base tracking-widest uppercase mb-2" style={{ color: MUTED }}>
              The Art of
            </p>
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold leading-none" style={{ color: BLACK }}>
              CODE
            </h1>
          </div>

          {/* Rotating word */}
          <div className="h-10 sm:h-12 mb-6 flex items-center justify-center overflow-hidden">
            <span
              className="text-2xl sm:text-3xl md:text-4xl font-bold amber-typing"
              key={currentWord}
              style={{
                color: AMBER,
                animation: 'boot-fadein 0.3s ease-out',
              }}
            >
              {HERO_WORDS[currentWord]}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: MUTED }}>
            Explore 23 iconic code-inspired design styles.
            From retro terminals to brutalist layouts — the intersection of programming and visual design.
          </p>

          {/* Category navigation */}
          <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Section categories">
            {CATEGORIES.map((cat) => (
              <button
                key={`nav-${cat.id}`}
                className={`brutal-nav-btn text-xs sm:text-sm ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => scrollToSection(cat.id)}
                aria-label={`Navigate to ${cat.label}`}
              >
                {cat.label}
                <span className="ml-1.5 opacity-60">({cat.sections})</span>
              </button>
            ))}
          </nav>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm" style={{ color: MUTED }}>
            <span>23 SECTIONS</span>
            <span style={{ color: AMBER }}>·</span>
            <span>50+ TOOLS</span>
            <span style={{ color: AMBER }}>·</span>
            <span style={{ color: AMBER }}>∞ STYLE</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1" style={{ color: MUTED }}>
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <span className="text-lg" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>↓</span>
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          SHOWCASES (6 sections)
          ═══════════════════════════════════════════ */}
      <div id="section-showcases">
        <SectionDivider label="// SHOWCASES — Visual Style Demos" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <RetroTerminalPrototype />
          </div>
        </section>

        <SectionDivider label="// SHOWCASE 01 — Terminal" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <TerminalSection />
          </div>
        </section>

        <SectionDivider label="// SHOWCASE 02 — Developer Experience" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <DevexSection />
          </div>
        </section>

        <SectionDivider label="// SHOWCASE 03 — Brutalism" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <BrutalismSection />
          </div>
        </section>

        <SectionDivider label="// SHOWCASE 04 — Glitch" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <GlitchSection />
          </div>
        </section>

        <SectionDivider label="// SHOWCASE 05 — Code Art" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <CodeComparisonSection />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          GENERATORS (6 sections)
          ═══════════════════════════════════════════ */}
      <div id="section-generators">
        <SectionDivider label="// GENERATORS — Design Tools" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <GradientGeneratorSection />
          </div>
        </section>

        <SectionDivider label="// GENERATOR 01 — Color Palette" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <ColorPaletteSection />
          </div>
        </section>

        <SectionDivider label="// GENERATOR 02 — Shadow" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <ShadowGeneratorSection />
          </div>
        </section>

        <SectionDivider label="// GENERATOR 03 — Border" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <BorderGeneratorSection />
          </div>
        </section>

        <SectionDivider label="// GENERATOR 04 — Animation" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <AnimationGeneratorSection />
          </div>
        </section>

        <SectionDivider label="// GENERATOR 05 — CSS Filters" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <CssFiltersSection />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          EDITORS (4 sections)
          ═══════════════════════════════════════════ */}
      <div id="section-editors">
        <SectionDivider label="// EDITORS — Code & Content" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <CodePlaygroundSection />
          </div>
        </section>

        <SectionDivider label="// EDITOR 01 — SVG Editor" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <SvgEditorSection />
          </div>
        </section>

        <SectionDivider label="// EDITOR 02 — CSS Snippets" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <CssSnippetsSection />
          </div>
        </section>

        <SectionDivider label="// EDITOR 03 — Markdown Preview" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <MarkdownPreviewSection />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          TOOLS (7 sections)
          ═══════════════════════════════════════════ */}
      <div id="section-tools">
        <SectionDivider label="// TOOLS — Developer Utilities" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <Base64ToolSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 01 — Unit Converter" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <UnitConverterSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 02 — Regex Tester" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <RegexTesterSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 03 — JSON Formatter" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <JsonFormatterSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 04 — Typography" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <TypographySection />
          </div>
        </section>

        <SectionDivider label="// TOOL 05 — Flexbox & Grid" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <FlexboxGridSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 06 — 3D Transforms" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <Transform3dSection />
          </div>
        </section>

        <SectionDivider label="// TOOL 07 — Responsive Showcase" />
        <section className="px-4 pb-8">
          <div className="max-w-5xl mx-auto">
            <ResponsiveShowcaseSection />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════ */}
      <footer className="mt-16">
        {/* Amber progress bar */}
        <div className="amber-progress" />

        <div className="px-4 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-xs sm:text-sm mb-6" style={{ color: MUTED }}>
              {'// CODE AESTHETIC GALLERY v2.0 — 23 SECTIONS'}
            </div>

            {/* System status */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: AMBER,
                  animation: 'amber-blink 1.5s ease-in-out infinite',
                  boxShadow: '0 0 6px rgba(212, 160, 23, 0.5)',
                }}
              />
              <span className="text-xs sm:text-sm font-bold" style={{ color: AMBER }}>
                █ SYSTEM ONLINE
              </span>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />

            {/* Section summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {CATEGORIES.map((cat) => (
                <div key={`footer-${cat.id}`}>
                  <div className="text-xs font-bold mb-1" style={{ color: BLACK }}>
                    {cat.label}
                  </div>
                  <div className="text-xs" style={{ color: MUTED }}>
                    {cat.sections} sections
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }} />

            {/* Tech stack */}
            <div className="flex flex-wrap gap-3 sm:gap-6 text-xs" style={{ color: MUTED }}>
              {['NEXT.JS 16', 'REACT 19', 'TYPESCRIPT 5', 'TAILWIND CSS 4'].map((tech) => (
                <span key={`tech-${tech}`} className="amber-link cursor-pointer">
                  {tech}
                </span>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-8 text-xs" style={{ color: MUTED }}>
              <span className="amber-prompt">$ </span>
              Built with ♥ and monospace fonts
              <span className="amber-cursor" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
