---
Task ID: 2
Agent: Main Agent
Task: Fix bugs and enhance styling for Code Aesthetic Showcase

Work Log:
- Read worklog from Task 1 to understand project structure and history
- Read all relevant source files: globals.css, devex-section.tsx, terminal-section.tsx, page.tsx

Bug Fixes:
1. **Missing .syn-decorator class**: Added `.syn-decorator { color: #ff79c6; }` to globals.css within a new `@layer syntax` block
2. **Duplicate React key errors**: Fixed `countLines()` in devex-section.tsx - the function was recursing into `<div>` children (spans, text nodes) counting each as a separate line. Fixed to detect `<div>` elements as single lines (return 1) and only recurse for fragments
3. **Terminal cursor position bug**: Replaced fixed `7.8px per char` calculation with a hidden measuring `<span>` that renders the input text invisibly. A `useEffect` on `input` changes reads `offsetWidth` and positions the cursor accurately via `cursorRef.current.style.left`

Styling Enhancements:
4. **Smooth scroll**: Added `html { scroll-behavior: smooth; }` to globals.css
5. **Scroll progress bar**: Added `ScrollProgressBar` component in page.tsx - fixed bar at top with gradient emerald/cyan, width updates on scroll
6. **Hero gradient border**: Wrapped heading in `.hero-gradient-border` container with animated 4-color gradient shifting via `gradient-shift` keyframe
7. **Typing effect**: Added character-by-character typing animation for subtitle text with blinking cursor (`.typing-cursor::after`)
8. **Floating symbols visibility**: Increased count to 7 symbols, changed color from `white/[0.06]` to `rgba(16, 185, 129, 0.12)` (emerald tint), varied positions and timing
9. **Terminal green glow**: Added `.terminal-green-glow` class with pulsing box-shadow animation, applied to terminal window
10. **Animated status bar stats**: CPU and MEM values now update every 2 seconds via `setInterval` with React state
11. **Section dividers**: Added decorative gradient lines (`.section-divider-line`) above and below each section divider (except brutalism which uses white bg)
12. **@layer for syntax classes**: All `.syn-*` classes moved into `@layer syntax` block for proper specificity

All changes verified:
- `bun run lint` passes with zero errors
- Dev server compiles successfully (200 status, no compilation errors)
- No component exports were changed
