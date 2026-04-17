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

/* ─── Color Constants (Dark Theme) ─── */
const DARK_BG = '#0a0a0a';
const CARD_BG = '#111111';
const WHITE = '#f0f0f0';
const YELLOW = '#f5c542';
const AMBER = '#d4a017';
const GRAY = '#888888';
const MUTED = '#555555';
const SUBTLE_BORDER = 'rgba(255, 255, 255, 0.08)';

/* ─── ASCII Art Banner ─── */
const ASCII_ART = ` ██████╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗ █████╗ ██╗     ███╗   ███╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗██║     ████╗ ████║
██║     ██║   ██║██║  ██║█████╗      ██████╔╝█████╗  ███████║██║     ██╔████╔██║
██║     ██║   ██╗██║  ██║██╔══╝      ██╔══██╗██╔══╝  ██╔══██╗██║     ██║╚██╔╝██║
╚██████╗╚██████╔╝██████╔╝███████╗    ██║  ██║███████╗██║  ██║███████╗██║ ╚═╝ ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝`;

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
  { text: '( design: true )', x: 5, y: 15, rot: -3 },
  { text: 'export default Art;', x: 72, y: 10, rot: 2 },
  { text: 'const style = "brutal";', x: 82, y: 62, rot: -2 },
  { text: '<Terminal />', x: 8, y: 72, rot: 4 },
  { text: 'async function create() {}', x: 55, y: 80, rot: -1 },
  { text: 'import { Gallery } from "art"', x: 15, y: 45, rot: 1 },
  { text: 'render(<Code />)', x: 78, y: 35, rot: -1.5 },
];

/* ─── SectionDivider ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="dark-section-divider" />
        <div className="dark-section-label mt-3">{label}</div>
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
    return <div className="min-h-screen" style={{ backgroundColor: DARK_BG }} />;
  }

  return (
    <div className="min-h-screen dark-page-root font-mono" style={{ color: WHITE }}>
      {/* ── Scroll Progress Bar ── */}
      <div
        className="fixed top-0 left-0 z-[9999] h-[3px] transition-[width] duration-100"
        style={{
          width: `${scrollPercent}%`,
          background: `linear-gradient(90deg, ${YELLOW}, ${AMBER}, #f59e0b)`,
          boxShadow: `0 0 10px rgba(245, 197, 66, 0.4), 0 0 20px rgba(212, 160, 23, 0.2)`,
        }}
      />

      {/* ═══════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════ */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 dark-grid-bg pointer-events-none" />

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{
            background: `radial-gradient(circle, ${YELLOW}, transparent 70%)`,
            top: '10%', left: '15%',
            filter: 'blur(80px)',
            animation: 'hero-orb-drift 20s ease-in-out infinite',
          }} />
          <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.03]" style={{
            background: 'radial-gradient(circle, #06b6d4, transparent 70%)',
            bottom: '20%', right: '10%',
            filter: 'blur(80px)',
            animation: 'hero-orb-drift 18s ease-in-out infinite reverse',
          }} />
        </div>

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
                color: 'rgba(255, 255, 255, 0.04)',
                animationDelay: `${i * 1.2}s`,
              }}
            >
              {snippet.text}
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
          {/* ASCII Art Banner */}
          <div className="overflow-x-auto mb-8 pb-2">
            <pre
              className="ascii-art-glow text-[0.32rem] sm:text-[0.48rem] md:text-[0.62rem] lg:text-[0.78rem] leading-[1.2] inline-block text-left"
              style={{ color: YELLOW }}
              aria-label="CODE REALM ASCII art banner"
            >
              {ASCII_ART.split('\n').map((line, i) => (
                <div
                  key={`ascii-${i}`}
                  className="ascii-line-reveal"
                  style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                >{line || '\u00A0'}</div>
              ))}
            </pre>
          </div>

          {/* Separator */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: SUBTLE_BORDER }} />
            <span className="text-[0.65rem] sm:text-xs tracking-[0.4em] uppercase" style={{ color: MUTED }}>
              The Art of Code
            </span>
            <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: SUBTLE_BORDER }} />
          </div>

          {/* Rotating word */}
          <div className="h-8 sm:h-10 mb-7 flex items-center justify-center overflow-hidden">
            <span
              className="text-lg sm:text-xl md:text-2xl font-bold dark-typing"
              key={currentWord}
              style={{
                color: YELLOW,
                animation: 'boot-fadein 0.3s ease-out',
              }}
            >
              {HERO_WORDS[currentWord]}
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm max-w-md mx-auto mb-10 leading-relaxed" style={{ color: GRAY }}>
            23 sections. 50+ tools. Infinite style.
            From retro terminals to brutalist layouts.
          </p>

          {/* Category navigation */}
          <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Section categories">
            {CATEGORIES.map((cat) => (
              <button
                key={`nav-${cat.id}`}
                className={`dark-nav-btn text-xs sm:text-sm ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => scrollToSection(cat.id)}
                aria-label={`Navigate to ${cat.label}`}
              >
                {cat.label}
                <span className="ml-1.5 opacity-50">({cat.sections})</span>
              </button>
            ))}
          </nav>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm" style={{ color: MUTED }}>
            <span>23 SECTIONS</span>
            <span style={{ color: YELLOW }}>·</span>
            <span>50+ TOOLS</span>
            <span style={{ color: YELLOW }}>·</span>
            <span style={{ color: YELLOW }}>∞ STYLE</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-1" style={{ color: MUTED }}>
          <span className="text-xs tracking-[0.3em] uppercase">Scroll</span>
          <span className="text-lg" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>&#8595;</span>
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
        {/* Gradient progress bar */}
        <div className="dark-footer-progress" />

        <div className="px-4 py-10 sm:py-14">
          <div className="max-w-5xl mx-auto">
            {/* Title */}
            <div className="text-xs sm:text-sm mb-6" style={{ color: MUTED }}>
              {'// CODE REALM — 23 SECTIONS'}
            </div>

            {/* System status */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  backgroundColor: YELLOW,
                  animation: 'amber-blink 1.5s ease-in-out infinite',
                  boxShadow: '0 0 6px rgba(245, 197, 66, 0.5)',
                }}
              />
              <span className="text-xs sm:text-sm font-bold" style={{ color: YELLOW }}>
                &#9632; SYSTEM ONLINE
              </span>
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: SUBTLE_BORDER }} />

            {/* Section summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {CATEGORIES.map((cat) => (
                <div key={`footer-${cat.id}`}>
                  <div className="text-xs font-bold mb-1" style={{ color: WHITE }}>
                    {cat.label}
                  </div>
                  <div className="text-xs" style={{ color: MUTED }}>
                    {cat.sections} sections
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px mb-6" style={{ backgroundColor: SUBTLE_BORDER }} />

            {/* Tech stack */}
            <div className="flex flex-wrap gap-3 sm:gap-6 text-xs" style={{ color: MUTED }}>
              {['NEXT.JS 16', 'REACT 19', 'TYPESCRIPT 5', 'TAILWIND CSS 4'].map((tech) => (
                <span
                  key={`tech-${tech}`}
                  className="dark-footer-link cursor-pointer"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-8 text-xs" style={{ color: MUTED }}>
              <span style={{ color: YELLOW }}>$ </span>
              Built with &lt;3 and monospace fonts
              <span className="dark-cursor-blink" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
