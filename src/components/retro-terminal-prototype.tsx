'use client';

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from 'react';

/* ─── SSR-safe mounting ─── */
const subscribe = () => () => {};
function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ─── Color constants ─── */
const CREAM = '#f5f0e1';
const BLACK = '#1a1a1a';
const AMBER = '#d4a017';
const DARK_AMBER = '#b8860b';
const MUTED = '#6b6356';
const RED = '#c23616';
const GREEN = '#2d6a4f';

/* ─── Boot sequence lines ─── */
const BOOT_LINES = [
  'CODE AESTHETIC GALLERY v2.0',
  '═════════════════════════════',
  '> Booting retro terminal...',
  '> Loading amber palette...   [OK]',
  '> Loading brutalist shell... [OK]',
  '> Loading 23 sections...     [OK]',
  '> System ready.',
];

/* ─── Rotating hero words ─── */
const HERO_WORDS = ['TERMINAL', 'BRUTALISM', 'GLITCH', 'CODE ART', 'GRADIENTS', 'TYPOGRAPHY', 'SHADOWS', 'ANIMATIONS'];

/* ─── Style categories for ls command ─── */
const STYLE_CATEGORIES = [
  'terminal/', 'brutalism/', 'glitch/', 'neon/', 'retro/',
  'cyberpunk/', 'minimal/', 'brutal/', 'vaporwave/', 'codeart/',
  'gradients/', 'shadows/', 'typography/', 'svg/', 'canvas/',
  '3d/', 'responsive/', 'dark/', 'glass/', 'aurora/',
  'noise/', 'grid/', 'marquee/', 'scanlines/',
];

/* ─── Terminal commands handler ─── */
function processCommand(cmd: string): string[] {
  const trimmed = cmd.trim();
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();

  switch (command) {
    case '':
      return [];
    case 'help':
      return [
        '╔══════════════════════════════════════════╗',
        '║  AVAILABLE COMMANDS                      ║',
        '╠══════════════════════════════════════════╣',
        '║  help          Show this help message     ║',
        '║  about         About this project         ║',
        '║  whoami        Show current user          ║',
        '║  ls /styles    List style categories       ║',
        '║  cat <file>    Read a file                 ║',
        '║  clear         Clear terminal              ║',
        '║  date          Show current date/time      ║',
        '║  echo <text>   Echo text back              ║',
        '║  neofetch      System info display         ║',
        '║  history       Show command history        ║',
        '║  banner        Show boot banner            ║',
        '║  colors        Show palette swatches       ║',
        '║  matrix        Brief matrix animation      ║',
        '╚══════════════════════════════════════════╝',
      ];
    case 'about':
      return [
        'Code Aesthetic Gallery v2.0',
        'A curated collection of 23 iconic code-inspired design styles.',
        'From retro terminals to brutalist layouts, each section explores',
        'the intersection of programming and visual design.',
        'Built with Next.js 16, React, TypeScript, and Tailwind CSS.',
      ];
    case 'whoami':
      return ['developer_001'];
    case 'date':
      return [new Date().toString()];
    case 'echo':
      return [parts.slice(1).join(' ')];
    case 'clear':
      return ['__CLEAR__'];
    case 'history':
      return ['__HISTORY__'];
    case 'banner':
      return [
        '╔══════════════════════════════════════════╗',
        '║  CODE AESTHETIC GALLERY v2.0             ║',
        '║  ═════════════════════════════════════    ║',
        '║  23 SECTIONS  |  50+ COMMANDS  |  ∞ STYLE║',
        '╚══════════════════════════════════════════╝',
      ];
    case 'ls': {
      if (parts[1] === '/styles') {
        return ['drwxr-xr-x  gallery  styles/', ...STYLE_CATEGORIES.map((d) => `  - ${d}`)];
      }
      return [`ls: ${parts[1] || '.'}: No such file or directory`];
    }
    case 'cat': {
      const file = parts[1];
      if (!file) return ['cat: missing file operand'];
      if (file.startsWith('styles/terminal')) {
        return [
          '┌─────────────────────────────┐',
          '│   ███╗   ██╗███████╗██╗  ██╗│',
          '│   ████╗  ██║██╔════╝╚██╗██╔╝│',
          '│   ██╔██╗ ██║█████╗   ╚███╔╝ │',
          '│   ██║╚██╗██║██╔══╝   ██╔██╗ │',
          '│   ██║ ╚████║███████╗██╔╝ ██╗│',
          '│   ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝│',
          '└─────────────────────────────┘',
          '',
          '  The terminal aesthetic channels the raw',
          '  beauty of command-line interfaces.',
          '  Monospace fonts, blinking cursors,',
          '  scanlines, and amber phosphor glow.',
        ];
      }
      return [`cat: ${file}: No such file or directory`];
    }
    case 'neofetch':
      return [
        '    ╭──────────────────────╮',
        '    │  ╭──╮  ╭──╮  ╭──╮   │     gallery@v2.0',
        '    │  │▓▓│  │▓▓│  │▓▓│   │     ─────────────',
        '    │  ╰──╯  ╰──╯  ╰──╯   │     OS: Retro Terminal 2.0',
        '    │  ╭──╮  ╭──╮  ╭──╮   │     Host: Next.js 16',
        '    │  │░░│  │░░│  │░░│   │     Kernel: React 19',
        '    │  ╰──╯  ╰──╯  ╰──╯   │     Shell: TypeScript 5',
        '    │  ╭──╮  ╭──╮  ╭──╮   │     Theme: Amber/Cream',
        '    │  │▒▒│  │▒▒│  │▒▒│   │     Font: JetBrains Mono',
        '    │  ╰──╯  ╰──╯  ╰──╯   │     Palette: 5 colors',
        '    ╰──────────────────────╯     Sections: 23',
        '                                   Uptime: ∞',
      ];
    case 'colors':
      return [
        '  Palette: Amber/Cream',
        '',
        '  ██████  CREAM    #f5f0e1  (background)',
        '  ██████  BLACK    #1a1a1a  (text)',
        '  ██████  AMBER    #d4a017  (accent)',
        '  ██████  D_AMBER  #b8860b  (accent dark)',
        '  ██████  MUTED    #6b6356  (secondary)',
        '  ██████  RED      #c23616  (error)',
        '  ██████  GREEN    #2d6a4f  (success)',
      ];
    case 'matrix':
      return ['__MATRIX__'];
    default:
      return [`command not found: ${command}`, 'Type "help" for available commands.'];
  }
}

/* ─── Matrix animation overlay ─── */
function generateInitialMatrix(columns: number, rows: number, matrixChars: string): string[][] {
  const initial: string[][] = [];
  for (let c = 0; c < columns; c++) {
    const col: string[] = [];
    for (let r = 0; r < rows; r++) {
      col.push(matrixChars[Math.floor(Math.random() * matrixChars.length)]);
    }
    initial.push(col);
  }
  return initial;
}

function MatrixOverlay() {
  const MATRIX_COLUMNS = 40;
  const MATRIX_ROWS = 20;
  const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  const [chars, setChars] = useState<string[][]>(() => generateInitialMatrix(MATRIX_COLUMNS, MATRIX_ROWS, MATRIX_CHARS));
  const [active, setActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setChars((prev) => {
        const next = prev.map((col) => [...col]);
        for (let c = 0; c < MATRIX_COLUMNS; c++) {
          for (let r = MATRIX_ROWS - 1; r > 0; r--) {
            next[c][r] = next[c][r - 1];
          }
          next[c][0] = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        }
        return next;
      });
    }, 60);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setActive(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ zIndex: 5, backgroundColor: 'rgba(245, 240, 225, 0.85)' }}
    >
      <div className="font-mono text-xs leading-tight opacity-30" style={{ color: AMBER }}>
        {chars.map((col, ci) => (
          <span key={`matrix-col-${ci}`}>
            {col.map((ch, ri) => (
              <span
                key={`matrix-${ci}-${ri}`}
                style={{ opacity: 1 - ri * 0.04 }}
              >
                {ch}
              </span>
            ))}
            {'\n'}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Color swatch for colors command ─── */
function ColorSwatch({ color, label, hex }: { color: string; label: string; hex: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block w-5 h-4 border border-[#1a1a1a]"
        style={{ backgroundColor: color }}
      />
      <span className="inline-block w-16" style={{ color: BLACK }}>{label}</span>
      <span className="inline-block w-24" style={{ color: MUTED }}>{hex}</span>
    </span>
  );
}

/* ─── Main Component ─── */
export function RetroTerminalPrototype() {
  const mounted = useMounted();
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [currentHeroWord, setCurrentHeroWord] = useState(0);

  // Terminal state
  const [terminalHistory, setTerminalHistory] = useState<{ type: 'input' | 'output'; text: string }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalSectionRef = useRef<HTMLDivElement>(null);

  /* ─── Boot sequence ─── */
  useEffect(() => {
    if (!mounted) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < BOOT_LINES.length) {
        setBootLines((prev) => [...prev, BOOT_LINES[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootComplete(true), 300);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [mounted]);

  /* ─── Hero word rotation ─── */
  useEffect(() => {
    if (!bootComplete) return;
    const interval = setInterval(() => {
      setCurrentHeroWord((prev) => (prev + 1) % HERO_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [bootComplete]);

  /* ─── Auto-scroll terminal ─── */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  /* ─── Focus input when terminal visible ─── */
  useEffect(() => {
    if (bootComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [bootComplete]);

  /* ─── Handle command submission ─── */
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const cmd = currentInput.trim();

      if (cmd) {
        setCmdHistory((prev) => [...prev, cmd]);
        setCmdHistoryIndex(-1);
      }

      const output = processCommand(cmd);

      setTerminalHistory((prev) => {
        const newHistory = [...prev, { type: 'input' as const, text: cmd || '' }];

        if (output.length === 1 && output[0] === '__CLEAR__') {
          return [];
        }

        if (output.length === 1 && output[0] === '__HISTORY__') {
          const histEntries = cmdHistory.map((c, i) => `  ${String(i + 1).padStart(4)}  ${c}`);
          if (histEntries.length === 0) histEntries.push('  (empty)');
          return [...newHistory, { type: 'output' as const, text: 'Command History:' }, ...histEntries.map((h) => ({ type: 'output' as const, text: h }))];
        }

        if (output.length === 1 && output[0] === '__MATRIX__') {
          setShowMatrix(true);
          setTimeout(() => setShowMatrix(false), 2000);
          return newHistory;
        }

        for (const line of output) {
          newHistory.push({ type: 'output' as const, text: line });
        }
        return newHistory;
      });

      setCurrentInput('');
    },
    [currentInput, cmdHistory]
  );

  /* ─── Handle keyboard navigation in terminal ─── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (cmdHistory.length === 0) return;
        const newIndex = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
        setCmdHistoryIndex(newIndex);
        setCurrentInput(cmdHistory[newIndex]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (cmdHistoryIndex === -1) return;
        const newIndex = cmdHistoryIndex + 1;
        if (newIndex >= cmdHistory.length) {
          setCmdHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setCmdHistoryIndex(newIndex);
          setCurrentInput(cmdHistory[newIndex]);
        }
      }
    },
    [cmdHistory, cmdHistoryIndex]
  );

  /* ─── Floating code snippets ─── */
  const floatingSnippets = [
    { text: '{ design: true }', x: 5, y: 15, rot: -3 },
    { text: 'export default Art;', x: 70, y: 10, rot: 2 },
    { text: 'const style = "brutal";', x: 80, y: 65, rot: -2 },
    { text: '<Terminal />', x: 10, y: 70, rot: 4 },
    { text: 'async function create() {}', x: 50, y: 80, rot: -1 },
  ];

  /* ─── Don't render on server ─── */
  if (!mounted) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: CREAM }}
      />
    );
  }

  return (
    <div className="min-h-screen retro-paper retro-scanlines font-mono" style={{ color: BLACK }}>
      {/* ──────────────────────────────
          BOOT SEQUENCE
          ────────────────────────────── */}
      {!bootComplete && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="brutal-box p-6 sm:p-8 max-w-lg w-full">
            <div className="space-y-1" style={{ color: AMBER, fontSize: '13px' }}>
              {bootLines.map((line, i) => (
                <div
                  key={`boot-${i}`}
                  className="boot-fadein"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {line}
                </div>
              ))}
              {bootLines.length > 0 && bootLines.length < BOOT_LINES.length && (
                <span className="amber-cursor" />
              )}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────
          MAIN CONTENT
          ────────────────────────────── */}
      {bootComplete && (
        <div className="boot-fadein">
          {/* ── HERO SECTION ── */}
          <header className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 retro-grid pointer-events-none" />

            {/* Floating code snippets */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {floatingSnippets.map((snippet, i) => (
                <div
                  key={`float-${i}`}
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
                <p
                  className="text-sm sm:text-base tracking-widest uppercase mb-2"
                  style={{ color: MUTED }}
                >
                  The Art of
                </p>
                <h1
                  className="text-7xl sm:text-8xl md:text-9xl font-bold leading-none"
                  style={{ color: BLACK }}
                >
                  CODE
                </h1>
              </div>

              {/* Rotating word */}
              <div className="h-10 sm:h-12 mb-6 flex items-center justify-center overflow-hidden">
                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-bold amber-typing"
                  key={currentHeroWord}
                  style={{
                    color: AMBER,
                    animation: 'boot-fadein 0.3s ease-out',
                  }}
                >
                  {HERO_WORDS[currentHeroWord]}
                </span>
              </div>

              {/* Subtitle */}
              <p
                className="text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed"
                style={{ color: MUTED }}
              >
                Explore 23 iconic code-inspired design styles
              </p>

              {/* Brutalist Nav */}
              <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Section navigation">
                {['TERMINAL', 'BRUTAL', 'GLITCH', 'CODE_ART', 'TOOLS'].map((label, i) => (
                  <button
                    key={`nav-${label}`}
                    className={`brutal-nav-btn text-xs sm:text-sm ${i === 0 ? 'active' : ''}`}
                    aria-label={`Navigate to ${label.replace('_', ' ')}`}
                  >
                    {label}
                  </button>
                ))}
              </nav>

              {/* Stats row */}
              <div
                className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm"
                style={{ color: MUTED }}
              >
                <span>23 SECTIONS</span>
                <span style={{ color: AMBER }}>·</span>
                <span>50+ COMMANDS</span>
                <span style={{ color: AMBER }}>·</span>
                <span style={{ color: AMBER }}>∞ POSSIBILITIES</span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 flex flex-col items-center gap-1" style={{ color: MUTED }}>
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <span className="text-lg" style={{ animation: 'scroll-bounce 2s ease-in-out infinite' }}>↓</span>
            </div>
          </header>

          {/* ── INTERACTIVE TERMINAL ── */}
          <section ref={terminalSectionRef} className="px-4 py-16 sm:py-24" aria-label="Interactive Terminal">
            <div className="max-w-3xl mx-auto">
              {/* Section label */}
              <div className="section-label mb-4">{'// SECTION: INTERACTIVE TERMINAL'}</div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-8"
                style={{ color: BLACK }}
              >
                Try it yourself<span style={{ color: AMBER }}>.</span>
              </h2>

              {/* Terminal window */}
              <div className="brutal-box overflow-hidden">
                {/* Window title bar */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5"
                  style={{
                    backgroundColor: '#ebe5d0',
                    borderBottom: '2px solid #1a1a1a',
                  }}
                >
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#27c93f' }} />
                  <span
                    className="ml-3 text-xs tracking-wide"
                    style={{ color: MUTED }}
                  >
                    terminal — gallery@v2.0
                  </span>
                </div>

                {/* Terminal body */}
                <div
                  ref={terminalRef}
                  className="retro-scrollbar p-4 sm:p-6 overflow-y-auto"
                  style={{
                    backgroundColor: CREAM,
                    minHeight: '320px',
                    maxHeight: '420px',
                  }}
                  onClick={() => inputRef.current?.focus()}
                  role="textbox"
                  aria-label="Terminal output"
                  aria-readonly="true"
                >
                  {/* Matrix overlay */}
                  {showMatrix && <MatrixOverlay />}

                  {/* Terminal history */}
                  {terminalHistory.map((entry, i) => (
                    <div key={`term-${i}`} className="text-xs sm:text-sm leading-relaxed">
                      {entry.type === 'input' ? (
                        <div>
                          <span className="amber-prompt">$ </span>
                          <span style={{ color: BLACK }}>{entry.text}</span>
                        </div>
                      ) : (
                        <div style={{ color: entry.text.startsWith('╔') || entry.text.startsWith('║') || entry.text.startsWith('╠') || entry.text.startsWith('╚') || entry.text.startsWith('│') || entry.text.startsWith('┌') || entry.text.startsWith('└') || entry.text.startsWith('╭') || entry.text.startsWith('╰') ? AMBER : BLACK }}>
                          {entry.text}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Input line */}
                  <form onSubmit={handleSubmit} className="flex items-center text-xs sm:text-sm">
                    <span className="amber-prompt mr-1">$ </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none border-none p-0 font-mono text-xs sm:text-sm caret-transparent"
                      style={{ color: BLACK, backgroundColor: 'transparent' }}
                      autoComplete="off"
                      spellCheck={false}
                      aria-label="Terminal command input"
                    />
                    {currentInput.length === 0 && <span className="amber-cursor" />}
                  </form>
                </div>
              </div>

              {/* Hint */}
              <p className="mt-3 text-xs" style={{ color: MUTED }}>
                Type <span className="amber-link cursor-pointer" onClick={() => { setCurrentInput('help'); inputRef.current?.focus(); }}>help</span> to see all commands. Use ↑/↓ for history.
              </p>
            </div>
          </section>

          {/* ── STYLE PREVIEW CARDS ── */}
          <section className="px-4 py-16 sm:py-24" aria-label="Style Previews">
            <div className="max-w-5xl mx-auto">
              {/* Section label */}
              <div className="section-label mb-4">{'// SECTION: STYLE PREVIEWS'}</div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-10"
                style={{ color: BLACK }}
              >
                Design Directions<span style={{ color: AMBER }}>.</span>
              </h2>

              {/* Cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ── Terminal Card ── */}
                <div
                  className="brutal-box p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ borderColor: BLACK }}
                >
                  <div className="section-label mb-4">{'// SECTION_01'}</div>
                  <h3 className="text-lg font-bold mb-4" style={{ color: BLACK }}>TERMINAL</h3>
                  {/* Mini terminal mockup */}
                  <div
                    className="p-3 text-xs font-mono"
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: '#d4a017',
                      minHeight: '80px',
                    }}
                  >
                    <div className="opacity-60 mb-1">gallery@v2.0 ~ $</div>
                    <div className="mb-1">
                      <span className="opacity-80">$ </span>whoami
                    </div>
                    <div className="opacity-90">developer_001</div>
                    <div className="mt-2 opacity-80">
                      <span>$ </span><span className="amber-cursor" style={{ backgroundColor: '#d4a017' }} />
                    </div>
                  </div>
                  <p className="mt-4 text-xs" style={{ color: MUTED }}>
                    Amber phosphor glow on dark screens. Monospace purity.
                  </p>
                </div>

                {/* ── Glitch Card ── */}
                <div
                  className="brutal-box p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ borderColor: BLACK }}
                >
                  <div className="section-label mb-4">{'// SECTION_02'}</div>
                  <h3 className="text-lg font-bold mb-4 glitch-misprint-red" data-text="GLITCH" style={{ color: BLACK, position: 'relative' }}>
                    GLITCH
                  </h3>
                  {/* Glitch text mockup */}
                  <div className="relative h-20 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#ebe5d0' }}>
                    <span
                      className="text-4xl sm:text-5xl font-bold glitch-misprint"
                      style={{ color: BLACK }}
                    >
                      GLITCH
                    </span>
                    <span
                      className="absolute text-4xl sm:text-5xl font-bold glitch-misprint"
                      style={{ color: 'rgba(194, 54, 22, 0.3)', left: 'calc(50% - 58px)', top: '50%', transform: 'translateY(-50%)', animationDelay: '0.3s' }}
                    >
                      GLITCH
                    </span>
                    <span
                      className="absolute text-4xl sm:text-5xl font-bold glitch-misprint"
                      style={{ color: 'rgba(45, 106, 79, 0.2)', left: 'calc(50% - 54px)', top: '50%', transform: 'translateY(-50%)', animationDelay: '0.8s' }}
                    >
                      GLITCH
                    </span>
                  </div>
                  <p className="mt-4 text-xs" style={{ color: MUTED }}>
                    Digital corruption aesthetics. RGB channel splits and data moshing.
                  </p>
                </div>

                {/* ── Code Art Card ── */}
                <div
                  className="brutal-box p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1"
                  style={{ borderColor: BLACK }}
                >
                  <div className="section-label mb-4">{'// SECTION_03'}</div>
                  <h3 className="text-lg font-bold mb-4" style={{ color: BLACK }}>CODE ART</h3>
                  {/* Code tags decoration */}
                  <div className="space-y-2 text-sm" style={{ color: BLACK }}>
                    <div className="flex items-center gap-2">
                      <span style={{ color: AMBER }}>&lt;</span>
                      <span className="font-bold">Card</span>
                      <span style={{ color: AMBER }}>&gt;</span>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <span style={{ color: AMBER }}>&lt;</span>
                      <span className="font-bold">Button</span>
                      <span style={{ color: MUTED }}>variant</span>
                      <span style={{ color: DARK_AMBER }}>=</span>
                      <span style={{ color: GREEN }}>&quot;primary&quot;</span>
                      <span style={{ color: AMBER }}>/&gt;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span style={{ color: AMBER }}>&lt;/</span>
                      <span className="font-bold">Card</span>
                      <span style={{ color: AMBER }}>&gt;</span>
                    </div>
                    <div className="pt-1 flex items-center gap-2" style={{ color: MUTED }}>
                      <span style={{ color: AMBER }}>{'{'}</span>
                      <span>style</span>
                      <span style={{ color: AMBER }}>{'}'}</span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs" style={{ color: MUTED }}>
                    Code as visual medium. Syntax highlighting as design language.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer className="mt-16">
            {/* Amber progress bar */}
            <div className="amber-progress" />

            <div className="px-4 py-10 sm:py-14">
              <div className="max-w-5xl mx-auto">
                {/* Title */}
                <div className="text-xs sm:text-sm mb-6" style={{ color: MUTED }}>
                  {'// CODE AESTHETIC GALLERY v2.0 — PROTOTYPE'}
                </div>

                {/* Status */}
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

                {/* Tech stack */}
                <div className="flex flex-wrap gap-3 sm:gap-6 text-xs" style={{ color: MUTED }}>
                  {['NEXT.JS 16', 'REACT', 'TYPESCRIPT', 'TAILWIND'].map((tech) => (
                    <span
                      key={`tech-${tech}`}
                      className="amber-link cursor-pointer"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
