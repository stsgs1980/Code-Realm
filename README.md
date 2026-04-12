<div align="center">

```
 ██████╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗ █████╗ ██╗     ███╗   ███╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗██║     ████╗ ████║
██║     ██║   ██║██║  ██║█████╗      ██████╔╝█████╗  ███████║██║     ██╔████╔██║
██║     ██║   ██║██║  ██║██╔══╝      ██╔══██╗██╔══╝  ██╔══██║██║     ██║╚██╔╝██║
╚██████╗╚██████╔╝██████╔╝███████╗    ██║  ██║███████╗██║  ██║███████╗██║ ╚═╝ ██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝
```

### `The Art of CODE AESTHETICS`

**23 sections. 50+ tools. Infinite style.**
*From retro terminals to brutalist layouts — the intersection of programming and visual design.*

[![Next.js](https://img.shields.io/badge/NEXT.JS-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TYPESCRIPT-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TAILWIND-4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/FRAMER_MOTION-12-ff69b4?style=flat-square&logo=framer)](https://www.framer.com/motion/)
[![Bun](https://img.shields.io/badge/BUN-RUNTIME-f472b6?style=flat-square&logo=bun)](https://bun.sh/)

</div>

---

```css
/* ═══════════════════════════════════════════════════════════
   CODE AESTHETIC GALLERY v2.0
   A curated collection of code-inspired design aesthetics
   ═══════════════════════════════════════════════════════════ */

.gallery {
  --sections: 23;
  --tools: 50+;
  --style: infinite;
  --aesthetic: "retro-terminal";
  --accent: #d4a017;
  --paper: #f5f0e1;

  font-family: 'JetBrains Mono', monospace;
  background: var(--paper);
  color: #1a1a1a;

  animation: boot-sequence 2s ease-out;
}

.gallery::before {
  content: "// The intersection of programming and visual design";
}
```

---

## `> SHOWCASES` — Visual Style Demos

| `#` | Section | Description |
|----:|:--------|:------------|
| `00` | **Retro Terminal v2** | Amber/cream prototype — paper texture, scanlines, boot sequence, CRT effects |
| `01` | **Terminal** | Interactive terminal with 15+ commands, theme switching (green/amber/white), CRT scanlines |
| `02` | **DevEx** | VS Code-inspired developer experience with live code preview & count-up metrics |
| `03` | **Brutalism** | Anti-design: broken grid, marquee banners, 404 box, chaos button, raw HTML |
| `04` | **Glitch** | Cyberpunk RGB split, Matrix rain canvas, system dashboard, error log terminal |
| `05` | **Code Art** | 4 style comparisons (Clean/Terminal/Brutalist/Glitch) — live switcher, quote rotation |

<details>
<summary><code>// GENERATORS — Design Tools (6)</code></summary>

| `#` | Section | Description |
|----:|:--------|:------------|
| `06` | **Gradient Lab** | Linear/Radial/Conic gradient builder, 2-4 stops, 8 presets, CSS/Tailwind/SVG export |
| `07` | **Palette Studio** | 7 harmony algorithms, WCAG AA/AAA contrast, HSL sliders, shades, 3 export formats |
| `08` | **Shadow** | Multi-layer box-shadow designer with inset support, color controls, CSS output |
| `09` | **Border** | Interactive border-radius & border-style designer with live preview |
| `10` | **Animation** | CSS keyframe editor with easing curves & real-time preview |
| `11` | **CSS Filters** | Visual playground: brightness, contrast, blur, hue-rotate, saturate & more |

</details>

<details>
<summary><code>// EDITORS — Code & Content (4)</code></summary>

| `#` | Section | Description |
|----:|:--------|:------------|
| `12` | **Playground** | Live HTML/CSS/JS editor with syntax highlighting, auto-run, iframe preview, export |
| `13` | **SVG Editor** | Inline SVG editor with shape tools, path editing, live preview |
| `14` | **CSS Snippets** | 13 curated snippets with live preview, syntax highlighting, one-click copy |
| `15` | **Markdown** | Zero-dependency parser, split/tab view, toolbar, templates, word count, HTML export |

</details>

<details>
<summary><code>// TOOLS — Developer Utilities (7)</code></summary>

| `#` | Section | Description |
|----:|:--------|:------------|
| `16` | **Base64** | Encode/decode Base64, URLs, HTML entities with real-time conversion |
| `17` | **Unit Converter** | px/rem/em/vw/vh/cm/mm conversion with visual reference |
| `18` | **Regex Tester** | Real-time regex with match highlighting, capture groups, pattern explanation |
| `19` | **JSON Studio** | Validator/formatter, syntax highlighting, collapsible tree, path, minify, sort |
| `20` | **Typography** | Font showcase, type scale, weight previews, spacing tools |
| `21` | **Flexbox & Grid** | Interactive Flexbox/CSS Grid playground with visual controls |
| `22` | **3D Transforms** | Perspective, rotate, translate controls — interactive 3D CSS transforms |
| `23` | **Responsive** | Responsive design showcase with breakpoint previews & device mockups |

</details>

---

```javascript
// ═══════════════════════════════════════════════
// AESTHETIC SYSTEM
// ═══════════════════════════════════════════════

const GALLERY = {
  theme: 'amber-cream-retro',
  palette: {
    paper:   '#f5f0e1',  // warm parchment
    ink:     '#1a1a1a',  // dark charcoal
    amber:   '#d4a017',  // golden accent
    muted:   '#6b6356',  // aged stone
    border:  'rgba(26,26,26,0.12)',
  },
  effects: [
    'paper-texture', 'scanlines', 'crt-vignette',
    'floating-code', 'grid-overlay', 'boot-sequence',
    'amber-glow', 'cursor-blink', 'scroll-bounce'
  ],
  typography: {
    primary: "'JetBrains Mono', 'Courier New', monospace",
    weight:   { light: 300, normal: 400, bold: 700 },
    tracking: { body: '0.02em', label: '0.15em', heading: '-0.02em' },
  }
};

export default GALLERY;
```

---

## `Features`

### Design System
- **Amber/cream retro terminal** aesthetic with paper texture & scanlines
- **CRT vignette effect** and subtle grid overlay
- **Floating code snippets** with gentle drift animation
- **Scroll progress bar** with amber gradient shimmer
- **Section dividers** styled as terminal comments `// SHOWCASES — ...`
- **Responsive layout** — mobile-first with `clamp()` typography

### Animation System
```css
@keyframes boot-fadein { from { opacity: 0; transform: translateY(8px); } }
@keyframes amber-blink  { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
@keyframes float-code   { 0%, 100% { transform: translateY(0) rotate(-1deg); }
                          50% { transform: translateY(-10px) rotate(1deg); } }
@keyframes scroll-bounce { 0%, 100% { transform: translateY(0); }
                          50% { transform: translateY(8px); } }
```
- Framer Motion throughout (`whileInView`, `AnimatePresence`, `layoutId`)
- `prefers-reduced-motion` accessibility support
- 30+ custom CSS animations in `globals.css` (4500+ lines)

### Technical Highlights
- **SSR-safe mounting** via `useSyncExternalStore` — zero hydration mismatches
- **Named exports** for all 23 section components — tree-shakeable
- **Zero nested `<button>` elements** — `role="button"` + `tabIndex` pattern
- **Unique React keys** with component-specific prefixes

---

## `Tech Stack`

```
┌─────────────────────────────────────────────────────┐
│  FRAMEWORK    Next.js 16 (App Router, Turbopack)    │
│  LANGUAGE     TypeScript 5                          │
│  STYLING      Tailwind CSS 4 + globals.css          │
│  COMPONENTS   shadcn/ui (New York style)            │
│  ICONS        Lucide React                          │
│  ANIMATION    Framer Motion 12                      │
│  STATE        React hooks + useSyncExternalStore     │
│  DATABASE     Prisma ORM (SQLite)                   │
│  RUNTIME      Bun                                   │
│  LINT         ESLint 9 + eslint-config-next         │
└─────────────────────────────────────────────────────┘
```

---

## `> Getting Started`

```bash
# Clone the repository
git clone https://github.com/Sts8987/Code-Aesthetic-Gallery-v2.0.git
cd Code-Aesthetic-Gallery-v2.0

# Install dependencies
bun install

# Set up database
bun run db:push

# Start development server
bun run dev
```

### Scripts

| Command | Description |
|:--------|:------------|
| `bun run dev` | Start dev server (port 3000) |
| `bun run lint` | Run ESLint |
| `bun run db:push` | Push Prisma schema |
| `bun run db:generate` | Generate Prisma client |

---

## `Project Structure`

```
my-project/
├── public/
│   ├── logo.svg
│   └── robots.txt
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── globals.css            # 4500+ lines — full CSS system
│   │   ├── layout.tsx             # Root layout
│   │   └── page.tsx               # Main page — all 23 sections
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components
│   │   ├── showcases/             # Terminal, DevEx, Brutalism, Glitch,
│   │   │                          # Code Art, Retro Terminal
│   │   ├── generators/            # Gradient, Palette, Shadow, Border,
│   │   │                          # Animation, CSS Filters
│   │   ├── editors/               # Playground, SVG Editor, CSS Snippets,
│   │   │                          # Markdown Preview
│   │   └── tools/                 # Base64, Unit Converter, Regex, JSON,
│   │                              # Typography, Flexbox/Grid, 3D Transform,
│   │                              # Responsive Showcase
│   ├── hooks/
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   └── lib/
│       ├── db.ts                  # Prisma client
│       ├── utils.ts               # Utilities (cn, etc.)
│       └── sections-registry.ts   # Section config
├── download/                      # Generated assets
├── Caddyfile                      # Gateway configuration
├── package.json
├── tsconfig.json
└── worklog.md                     # Development log
```

---

<div align="center">

```
 ╔══════════════════════════════════════════╗
 ║                                          ║
 ║   ██  SYSTEM ONLINE                      ║
 ║   ██  23 SECTIONS LOADED                 ║
 ║   ██  50+ TOOLS READY                    ║
 ║   ██  AMBER THEME ACTIVE                 ║
 ║   ██  █                                  ║
 ║                                          ║
 ╚══════════════════════════════════════════╝
```

```c
/* Built with ♥ and monospace fonts */
printf("> Code Aesthetic Gallery v2.0\n");
printf("> The Art of CODE AESTHETICS\n");
```

</div>
