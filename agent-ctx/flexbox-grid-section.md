---
Task ID: flexbox-grid
Agent: Main Agent
Task: Create CSS Flexbox & Grid Layout Playground section component

Work Log:
- Read worklog.md and analyzed existing project structure, component patterns (gradient-generator-section, code-playground-section)
- Confirmed project conventions: useSyncExternalStore for SSR-safe mounting, Framer Motion animations, dark theme with emerald/cyan accents, glassmorphism panels, VS Code-style editor chrome, .syn-* syntax highlighting classes
- Created `/home/z/my-project/src/components/flexbox-grid-section.tsx` as named export `FlexboxGridSection`
- Implemented all 6 feature groups:

1. **Layout Mode Toggle**: Switch between Flexbox and CSS Grid modes with animated `layoutId` tab indicator (spring animation, emerald glow)

2. **Flexbox Mode Controls**:
   - flex-direction: row | row-reverse | column | column-reverse (arrow short labels)
   - justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly
   - align-items: stretch | flex-start | center | flex-end | baseline
   - flex-wrap: nowrap | wrap | wrap-reverse
   - gap slider: 0-40px
   - Add/remove child items (1-12 items)

3. **CSS Grid Mode Controls**:
   - Grid template columns: 1-6 columns slider with `repeat(N, 1fr)` display
   - Grid template rows: 1-4 rows slider
   - gap: 0-40px slider
   - justify-items / align-items toggle buttons (start/center/end/stretch)
   - Add/remove child items (1-12)

4. **Visual Preview Area**:
   - Live preview container with layout applied in real-time
   - Child items are colorful numbered boxes (12 color palette)
   - Drag-to-reorder with GripVertical icon, dragOver highlight
   - Selected item highlighted with emerald border + glow
   - Item size/position changes animate smoothly via Framer Motion layout animation

5. **CSS Code Output**:
   - Real-time generated CSS code with syntax highlighting using .syn-* classes
   - Copy to clipboard button with Check icon feedback (2s timeout)
   - VS Code-style editor chrome with line numbers
   - Shows container styles + selected item individual styles

6. **8 Layout Presets** (shared between modes):
   - Navigation Bar (flexbox), Holy Grail (grid), Card Grid (grid), Sidebar Dashboard (flexbox), Photo Gallery (grid), Footer Layout (flexbox), Form Layout (grid), Equal Columns (grid)
   - Each preset sets mode, config, and item count
   - Reset button restores defaults

- Built custom `highlightCSS` function using .syn-property, .syn-bracket, .syn-tag, .syn-keyword, .syn-value, .syn-number, .syn-function, .syn-punctuation classes
- Built `ToggleButtonGroup` sub-component for property selection
- Floating decorative symbols: flex, grid, row, col, gap, 1fr, auto, span, wrap, stretch, repeat(), minmax()
- Responsive: 3-column on lg (4+5+3 grid), stacked on mobile
- Dark gradient background (#0a0a0a to #0a1a10), glassmorphism panels, subtle grid background, vignette overlay
- Section header: "Layout Lab" with emerald-to-cyan gradient text, "CSS Tool" badge with LayoutGrid icon
- Info bar: "2 Modes / 15+ Properties / 8 Presets / Live Preview"
- Used useSyncExternalStore for SSR-safe mounting
- All lint checks pass (0 errors, 0 warnings)
- Dev server compiles successfully (264ms)

Stage Summary:
- FlexboxGridSection component fully built with all 6 feature groups
- Named export with 'use client' directive, uses useState/useCallback/useMemo/useRef hooks
- Interactive Flexbox controls: direction, justify-content, align-items, flex-wrap, gap, item count
- Interactive CSS Grid controls: columns, rows, gap, justify-items, align-items, item count
- Individual item property controls: flex-grow/shrink/basis (flexbox), grid-column/row span (grid)
- Drag-to-reorder with visual feedback, selected item highlighting
- 8 layout presets with reset functionality
- Real-time CSS code generation with syntax highlighting and clipboard copy
- Component file: /home/z/my-project/src/components/flexbox-grid-section.tsx
