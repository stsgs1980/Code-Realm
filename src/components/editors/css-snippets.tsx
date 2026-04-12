'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import { motion } from 'framer-motion';
import {
 Copy,
 Check,
 Code2,
 Scissors,
 Eye,
 Palette,
 Type,
 AlignCenter,
 MousePointer2,
 Grid3X3,
 CheckSquare,
 MessageSquare,
 ArrowDownToLine,
 Layers,
} from 'lucide-react';

/* ──────────────────────────────────────────────
 SSR-SAFE MOUNT HOOK
 ────────────────────────────────────────────── */
const subscribe = () => () => {};
function useIsMounted() {
 return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ──────────────────────────────────────────────
 SNIPPET DATA
 ────────────────────────────────────────────── */
interface Snippet {
 id: string;
 name: string;
 category: string;
 icon: React.ElementType;
 code: string;
}

const SNIPPETS: Snippet[] = [
 {
 id: 'truncate-text',
 name: 'Truncate Text',
 category: 'Typography',
 icon: Type,
 code: `.truncate {
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
 max-width: 200px;
}`,
 },
 {
 id: 'multi-line-truncate',
 name: 'Multi-Line Truncate',
 category: 'Typography',
 icon: ArrowDownToLine,
 code: `.line-clamp {
 display: -webkit-box;
 -webkit-line-clamp: 3;
 -webkit-box-orient: vertical;
 overflow: hidden;
}`,
 },
 {
 id: 'smooth-scrollbar',
 name: 'Smooth Scrollbar',
 category: 'Layout',
 icon: Layers,
 code: `.custom-scroll::-webkit-scrollbar {
 width: 6px;
}
.custom-scroll::-webkit-scrollbar-track {
 background: rgba(0, 0, 0, 0.1);
 border-radius: 3px;
}
.custom-scroll::-webkit-scrollbar-thumb {
 background: rgba(255, 255, 255, 0.15);
 border-radius: 3px;
}
.custom-scroll::-webkit-scrollbar-thumb:hover {
 background: rgba(255, 255, 255, 0.25);
}`,
 },
 {
 id: 'text-gradient',
 name: 'Text Gradient',
 category: 'Effect',
 icon: Palette,
 code: `.text-gradient {
 background: linear-gradient(135deg, #d4a017, #b8860b;
 -webkit-background-clip: text;
 -webkit-text-fill-color: transparent;
 background-clip: text;
}`,
 },
 {
 id: 'glassmorphism',
 name: 'Glassmorphism Card',
 category: 'Effect',
 icon: Layers,
 code: `.glass-card {
 background: rgba(255, 255, 255, 0.05);
 backdrop-filter: blur(12px);
 -webkit-backdrop-filter: blur(12px);
 border: 1px solid rgba(255, 255, 255, 0.1);
 border-radius: 16px;
 box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}`,
 },
 {
 id: 'neon-glow',
 name: 'Neon Glow Text',
 category: 'Effect',
 icon: Eye,
 code: `.neon-glow {
 color: #d4a017;
 text-shadow:
 0 0 7px #d4a017,
 0 0 10px #d4a017,
 0 0 21px #d4a017,
 0 0 42px #b8860b,
 0 0 82px #b8860b;
}`,
 },
 {
 id: 'animated-underline',
 name: 'Animated Underline',
 category: 'Effect',
 icon: MousePointer2,
 code: `.animated-underline {
 position: relative;
 text-decoration: none;
}
.animated-underline::after {
 content: '';
 position: absolute;
 bottom: -2px;
 left: 0;
 width: 0;
 height: 2px;
 background: #d4a017;
 transition: width 0.3s ease;
}
.animated-underline:hover::after {
 width: 100%;
}`,
 },
 {
 id: 'custom-selection',
 name: 'Custom Selection',
 category: 'Typography',
 icon: Scissors,
 code: `::selection {
 background: rgba(16, 185, 129, 0.3);
 color: #fff;
}
::-moz-selection {
 background: rgba(16, 185, 129, 0.3);
 color: #fff;
}`,
 },
 {
 id: 'aspect-ratio',
 name: 'Aspect Ratio Box',
 category: 'Layout',
 icon: Grid3X3,
 code: `.aspect-box {
 aspect-ratio: 16 / 9;
 width: 100%;
 object-fit: cover;
}`,
 },
 {
 id: 'center-anything',
 name: 'Center Anything',
 category: 'Layout',
 icon: AlignCenter,
 code: `.center-flex {
 display: flex;
 align-items: center;
 justify-content: center;
 min-height: 100vh;
}`,
 },
 {
 id: 'grid-auto-fill',
 name: 'Grid Auto-Fill',
 category: 'Layout',
 icon: Grid3X3,
 code: `.auto-grid {
 display: grid;
 grid-template-columns:
 repeat(auto-fill, minmax(250px, 1fr));
 gap: 1rem;
}`,
 },
 {
 id: 'custom-checkbox',
 name: 'Custom Checkbox',
 category: 'Form',
 icon: CheckSquare,
 code: `.custom-checkbox {
 appearance: none;
 width: 20px;
 height: 20px;
 border: 2px solid rgba(255, 255, 255, 0.2);
 border-radius: 4px;
 background: transparent;
 cursor: pointer;
 transition: all 0.2s;
}
.custom-checkbox:checked {
 background: #d4a017;
 border-color: #d4a017;
}`,
 },
 {
 id: 'css-tooltip',
 name: 'CSS Tooltip',
 category: 'UI',
 icon: MessageSquare,
 code: `.tooltip {
 position: relative;
}
.tooltip::before {
 content: attr(data-tip);
 position: absolute;
 bottom: 100%;
 left: 50%;
 transform: translateX(-50%);
 padding: 6px 12px;
 background: #1a1a2e;
 color: #fff;
 font-size: 12px;
 border-radius: 6px;
 white-space: nowrap;
 opacity: 0;
 pointer-events: none;
 transition: opacity 0.2s;
}
.tooltip:hover::before {
 opacity: 1;
}`,
 },
];

/* ──────────────────────────────────────────────
 SYNTAX HIGHLIGHTING
 ────────────────────────────────────────────── */
function highlightCSSLine(line: string, lineNum: number): React.ReactNode {
 const parts: React.ReactNode[] = [];
 let remaining = line;
 let keyIdx = 0;

 if (remaining.trim() === '') {
 return (
 <div key={'snippet-line-' + lineNum + ''} className="flex leading-[1.5rem]">
 <span className="select-none text-[#1a1a1a]/[0.1] w-7 text-right mr-3 shrink-0 text-[10px]">{lineNum}</span>
 <span>&nbsp;</span>
 </div>
 );
 }

 // Comment lines
 if (remaining.trimStart().startsWith('//')) {
 return (
 <div key={'snippet-line-' + lineNum + ''} className="flex leading-[1.5rem]">
 <span className="select-none text-[#1a1a1a]/[0.1] w-7 text-right mr-3 shrink-0 text-[10px]">{lineNum}</span>
 <span className="syn-comment whitespace-pre text-[11px]">{remaining}</span>
 </div>
 );
 }

 // Selector lines (ending with {)
 const selectorMatch = remaining.match(/^(\s*)([\w.*#:\-\[\]=~^$*"',>+\s]+?)(\s*\{)$/);
 if (selectorMatch) {
 if (selectorMatch[1]) parts.push(<span key={'sl-' + lineNum + '-' + keyIdx++ + ''}>{selectorMatch[1]}</span>);
 parts.push(<span key={'ss-' + lineNum + '-' + keyIdx++ + ''} className="syn-tag">{selectorMatch[2]}</span>);
 parts.push(<span key={'sb-' + lineNum + '-' + keyIdx++ + ''} className="syn-bracket">{selectorMatch[3]}</span>);
 remaining = '';
 } else if (remaining.trim() === '}') {
 return (
 <div key={'snippet-line-' + lineNum + ''} className="flex leading-[1.5rem]">
 <span className="select-none text-[#1a1a1a]/[0.1] w-7 text-right mr-3 shrink-0 text-[10px]">{lineNum}</span>
 <span className="syn-bracket text-[11px]">{remaining}</span>
 </div>
 );
 }

 // Property: value pattern
 const propMatch = remaining.match(/^(\s*)([-\w]+)(\s*:\s*)(.*)$/);
 if (propMatch && remaining.length > 0) {
 if (propMatch[1]) parts.push(<span key={'sp-' + lineNum + '-' + keyIdx++ + ''}>{propMatch[1]}</span>);
 parts.push(<span key={'spr-' + lineNum + '-' + keyIdx++ + ''} className="syn-property">{propMatch[2]}</span>);
 parts.push(<span key={'spu-' + lineNum + '-' + keyIdx++ + ''} className="syn-punctuation">{propMatch[3]}</span>);

 const valueStr = propMatch[4];
 const highlighted = highlightValue(valueStr, lineNum, keyIdx);
 parts.push(...highlighted.nodes);
 keyIdx = highlighted.keyIdx;
 }

 if (parts.length === 0) {
 parts.push(<span key={'plain-' + lineNum + '-' + keyIdx++ + ''} className="syn-value text-[11px]">{remaining}</span>);
 }

 return (
 <div key={'snippet-line-' + lineNum + ''} className="flex leading-[1.5rem]">
 <span className="select-none text-[#1a1a1a]/[0.1] w-7 text-right mr-3 shrink-0 text-[10px]">{lineNum}</span>
 <span className="whitespace-pre text-[11px]">{parts}</span>
 </div>
 );
}

function highlightValue(valueStr: string, lineNum: number, startKey: number): { nodes: React.ReactNode[]; keyIdx: number } {
 const nodes: React.ReactNode[] = [];
 let keyIdx = startKey;
 let remaining = valueStr;
 let lastIdx = 0;

 // Match hex colors
 const colorRegex = /#[0-9a-fA-F]{3,8}/g;
 let match;
 const segments: { start: number; end: number; type: 'color' | 'number' | 'function' | 'keyword' | 'text' }[] = [];

 while ((match = colorRegex.exec(remaining)) !== null) {
 segments.push({ start: match.index, end: match.index + match[0].length, type: 'color' });
 }

 // Match CSS functions (rgb, hsl, linear-gradient, etc.)
 const funcRegex = /\b(rgba?|hsla?|linear-gradient|radial-gradient|conic-gradient|repeat|minmax|clamp|calc|url|attr)\b/g;
 while ((match = funcRegex.exec(remaining)) !== null) {
 segments.push({ start: match.index, end: match.index + match[0].length, type: 'function' });
 }

 // Match CSS keywords
 const keywordRegex = /\b(none|solid|dashed|dotted|center|flex|grid|block|inline|absolute|relative|fixed|hidden|transparent|inherit|initial|nowrap|normal|ease|auto-fill|auto-fit|cover|contain|pointer-events|column|vertical)\b/g;
 while ((match = keywordRegex.exec(remaining)) !== null) {
 segments.push({ start: match.index, end: match.index + match[0].length, type: 'keyword' });
 }

 // Match numbers with units
 const numRegex = /(\d+(?:\.\d+)?)(px|%|deg|em|rem|vh|vw|ms|s|fr)/g;
 while ((match = numRegex.exec(remaining)) !== null) {
 segments.push({ start: match.index, end: match.index + match[0].length, type: 'number' });
 }

 // Sort segments by start position, merge overlaps (prefer first match)
 segments.sort((a, b) => a.start - b.start);

 // Remove overlaps
 const filtered: typeof segments = [];
 let lastEnd = 0;
 for (const seg of segments) {
 if (seg.start >= lastEnd) {
 filtered.push(seg);
 lastEnd = seg.end;
 }
 }

 // Build nodes from segments
 lastIdx = 0;
 for (const seg of filtered) {
 if (seg.start > lastIdx) {
 nodes.push(<span key={'vt-' + lineNum + '-' + keyIdx++ + ''} className="syn-value">{remaining.slice(lastIdx, seg.start)}</span>);
 }
 const text = remaining.slice(seg.start, seg.end);
 switch (seg.type) {
 case 'color':
 nodes.push(<span key={'vc-' + lineNum + '-' + keyIdx++ + ''} className="syn-number">{text}</span>);
 break;
 case 'number':
 nodes.push(<span key={'vn-' + lineNum + '-' + keyIdx++ + ''} className="syn-number">{text}</span>);
 break;
 case 'function':
 nodes.push(<span key={'vf-' + lineNum + '-' + keyIdx++ + ''} className="syn-function">{text}</span>);
 break;
 case 'keyword':
 nodes.push(<span key={'vk-' + lineNum + '-' + keyIdx++ + ''} className="syn-keyword">{text}</span>);
 break;
 default:
 nodes.push(<span key={'vtx-' + lineNum + '-' + keyIdx++ + ''} className="syn-value">{text}</span>);
 }
 lastIdx = seg.end;
 }

 if (lastIdx < remaining.length) {
 nodes.push(<span key={'vtr-' + lineNum + '-' + keyIdx++ + ''} className="syn-value">{remaining.slice(lastIdx)}</span>);
 }

 return { nodes, keyIdx };
}

/* ──────────────────────────────────────────────
 LIVE PREVIEW COMPONENTS
 ────────────────────────────────────────────── */
function PreviewTruncateText() {
 return (
 <div className="space-y-2 p-3">
 <div className="text-[11px] font-mono text-[#6b6356]/40 mb-1">Single-line:</div>
 <div
 className="text-sm text-[#1a1a1a]/70 font-mono"
 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}
 >
 This is a very long text that will be truncated with an ellipsis
 </div>
 <div className="text-[11px] font-mono text-[#6b6356]/40 mt-3 mb-1">Multi-line (3 lines):</div>
 <div
 className="text-sm text-[#1a1a1a]/70 font-mono leading-relaxed"
 style={{
 display: '-webkit-box',
 WebkitLineClamp: 3,
 WebkitBoxOrient: 'vertical',
 overflow: 'hidden',
 maxWidth: '220px',
 }}
 >
 This is a longer block of text that demonstrates the multi-line truncation effect using -webkit-line-clamp. It will show only three lines before cutting off the rest.
 </div>
 </div>
 );
}

function PreviewSmoothScrollbar() {
 return (
 <div
 className="custom-scroll p-3 border border-[#1a1a1a]/12 bg-[#ebe5d0]"
 style={{ maxHeight: '80px', overflowY: 'auto' }}
 >
 <div className="text-[11px] font-mono text-[#6b6356]/50 space-y-1">
 <p>Line 1: Custom scrollbar</p>
 <p>Line 2: Thin 6px track</p>
 <p>Line 3: Rounded thumbs</p>
 <p>Line 4: Hover feedback</p>
 <p>Line 5: Scroll to see</p>
 <p>Line 6: the styling effect</p>
 <p>Line 7: in this preview area</p>
 </div>
 </div>
 );
}

function PreviewTextGradient() {
 return (
 <div className="p-3 flex items-center justify-center">
 <span
 className="text-2xl font-bold"
 style={{
 background: 'linear-gradient(135deg, #d4a017, #b8860b, #d4a017)',
 WebkitBackgroundClip: 'text',
 WebkitTextFillColor: 'transparent',
 backgroundClip: 'text',
 }}
 >
 Gradient Text
 </span>
 </div>
 );
}

function PreviewGlassmorphism() {
 return (
 <div className="p-3 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #d4a01720, #b8860b20)', borderRadius: '12px' }}>
 <div
 className="px-4 py-3 text-center"
 style={{
 background: 'rgba(255, 255, 255, 0.06)',
 backdropFilter: 'blur(12px)',
 WebkitBackdropFilter: 'blur(12px)',
 border: '1px solid rgba(255, 255, 255, 0.12)',
 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
 }}
 >
 <div className="text-[10px] font-mono text-[#6b6356]/50 mb-0.5">Glass</div>
 <div className="text-xs text-[#1a1a1a]/70 font-semibold">Card</div>
 </div>
 </div>
 );
}

function PreviewNeonGlow() {
 return (
 <div className="p-3 flex items-center justify-center">
 <span
 className="text-xl font-bold font-mono"
 style={{
 color: '#d4a017',
 textShadow: '0 0 7px #d4a017, 0 0 10px #d4a017, 0 0 21px #d4a017, 0 0 42px #b8860b, 0 0 82px #b8860b',
 }}
 >
 NEON
 </span>
 </div>
 );
}

function PreviewAnimatedUnderline() {
 return (
 <div className="p-3 flex items-center justify-center">
 <span className="snippet-underline relative text-sm text-[#1a1a1a]/70 font-mono cursor-pointer">Hover me</span>
 </div>
 );
}

function PreviewCustomSelection() {
 return (
 <div className="p-3" style={{ '::selection': { background: 'rgba(16, 185, 129, 0.3)' } }}>
 <div className="text-[11px] font-mono text-[#6b6356]/40 mb-1">Select this text:</div>
 <p className="text-sm text-[#1a1a1a]/70 font-mono" style={{ userSelect: 'text' }}>
 Try selecting this text to see the custom selection color effect with emerald tint.
 </p>
 </div>
 );
}

function PreviewAspectRatio() {
 return (
 <div className="p-3 flex items-center justify-center gap-3">
 <div
 className="rounded-lg border border-[#d4a017]/30 overflow-hidden flex items-center justify-center"
 style={{ aspectRatio: '16 / 9', width: '100px', background: 'rgba(212,160,23,0.12)' }}
 >
 <span className="text-[10px] font-mono text-[#d4a017]/50">16:9</span>
 </div>
 <div
 className="rounded-lg border border-[#b8860b]/30 overflow-hidden flex items-center justify-center"
 style={{ aspectRatio: '1 / 1', width: '55px', background: 'rgba(184,134,11,0.12)' }}
 >
 <span className="text-[10px] font-mono text-[#b8860b]/50">1:1</span>
 </div>
 <div
 className="rounded-lg border border-purple-500/30 overflow-hidden flex items-center justify-center"
 style={{ aspectRatio: '4 / 3', width: '80px', background: 'rgba(184,134,11,0.12)' }}
 >
 <span className="text-[10px] font-mono text-purple-400/50">4:3</span>
 </div>
 </div>
 );
}

function PreviewCenterAnything() {
 return (
 <div className="p-3">
 <div
 className="rounded-lg border border-[#1a1a1a]/12 bg-[#ebe5d0]"
 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px' }}
 >
 <div className="px-3 py-1.5 bg-[#d4a017]/10 border border-[#d4a017]/20">
 <span className="text-[11px] font-mono text-[#d4a017]">Centered!</span>
 </div>
 </div>
 </div>
 );
}

function PreviewGridAutoFill() {
 return (
 <div className="p-3">
 <div
 className="grid gap-1.5"
 style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(45px, 1fr))' }}
 >
 {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
 <div
 key={'grid-cell-' + n + ''}
 className="h-8 rounded border flex items-center justify-center text-[10px] font-mono"
 style={{
 background: 'rgba(16, 185, 129, ' + 0.04 + n * 0.02 + ')',
 borderColor: 'rgba(212,160,23,0.15)',
 color: 'rgba(16, 185, 129, 0.5)',
 }}
 >
 {n}
 </div>
 ))}
 </div>
 </div>
 );
}

function PreviewCustomCheckbox() {
 const [checked, setChecked] = useState(false);
 return (
 <div className="p-3 flex items-center gap-3">
 <button
 onClick={() => setChecked(!checked)}
 className="relative flex items-center justify-center rounded cursor-pointer transition-all duration-200"
 style={{
 width: '20px',
 height: '20px',
 border: '2px solid ' + checked ? '#d4a017' : 'rgba(26,26,26,0.2)' + '',
 borderRadius: '4px',
 background: checked ? '#d4a017' : 'transparent',
 }}
 aria-label="Toggle checkbox"
 >
 {checked && (
 <Check className="w-3 h-3 text-[#1a1a1a]" style={{ strokeWidth: 3 }} />
 )}
 </button>
 <span className="text-xs font-mono text-[#6b6356]/50">Custom checkbox</span>
 </div>
 );
}

function PreviewCssTooltip() {
 return (
 <div className="p-3 flex items-center justify-center">
 <div className="snippet-tooltip relative inline-block px-3 py-1.5 border border-[#1a1a1a]/12 bg-[#ebe5d0] text-xs font-mono text-[#6b6356]/60 cursor-pointer" data-tip="Pure CSS Tooltip!">
 Hover me
 </div>
 </div>
 );
}

const PREVIEW_MAP: Record<string, React.FC> = {
 'truncate-text': PreviewTruncateText,
 'multi-line-truncate': PreviewTruncateText,
 'smooth-scrollbar': PreviewSmoothScrollbar,
 'text-gradient': PreviewTextGradient,
 'glassmorphism': PreviewGlassmorphism,
 'neon-glow': PreviewNeonGlow,
 'animated-underline': PreviewAnimatedUnderline,
 'custom-selection': PreviewCustomSelection,
 'aspect-ratio': PreviewAspectRatio,
 'center-anything': PreviewCenterAnything,
 'grid-auto-fill': PreviewGridAutoFill,
 'custom-checkbox': PreviewCustomCheckbox,
 'css-tooltip': PreviewCssTooltip,
};

/* ──────────────────────────────────────────────
 COPY BUTTON
 ────────────────────────────────────────────── */
function CopyButton({ code, snippetId }: { code: string; snippetId: string }) {
 const [copied, setCopied] = useState(false);

 const handleCopy = useCallback(async () => {
 try {
 await navigator.clipboard.writeText(code);
 } catch {
 const ta = document.createElement('textarea');
 ta.value = code;
 document.body.appendChild(ta);
 ta.select();
 document.execCommand('copy');
 document.body.removeChild(ta);
 }
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 }, [code]);

 return (
 <motion.button
 onClick={handleCopy}
 className="relative flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-mono transition-all cursor-pointer"
 style={{
 color: copied ? '#d4a017' : '#6b6356',
 backgroundColor: copied ? 'rgba(184,134,11,0.15)' : '#ebe5d0',
 border: '1px solid ' + (copied ? 'rgba(212,160,23,0.2)' : 'rgba(26,26,26,0.1)'),
  }}
 whileHover={{ scale: 1.04 }}
 whileTap={{ scale: 0.96 }}
 aria-label="Copy CSS code"
 >
 {copied ? (
 <>
 <Check className="w-3 h-3" />
 <span>Copied!</span>
 </>
 ) : (
 <>
 <Copy className="w-3 h-3" />
 <span>Copy</span>
 </>
 )}
 </motion.button>
 );
}

/* ──────────────────────────────────────────────
 FLOATING DECORATIONS
 ────────────────────────────────────────────── */
function FloatingDecorations() {
  const symbols = [
    { text: '::selection', x: 5, y: 8, delay: 0 },
    { text: 'clip-path()', x: 90, y: 12, delay: 1.5 },
    { text: '@keyframes', x: 88, y: 55, delay: 0.8 },
    { text: 'backdrop', x: 7, y: 78, delay: 2.2 },
    { text: 'gap: 1rem', x: 80, y: 88, delay: 1.0 },
    { text: '{ }', x: 20, y: 42, delay: 0.3 },
    { text: 'minmax()', x: 48, y: 6, delay: 1.8 },
    { text: 'z-index', x: 70, y: 70, delay: 2.5 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((sym, i) => (
        <motion.div
          key={'snippets-deco-' + i}
          className="absolute font-mono text-[10px] whitespace-nowrap select-none"
          style={{
            left: sym.x + '%',
            top: sym.y + '%',
            color: 'rgba(184,134,11,0.12)',
          }}
          animate={{ y: [0, -10, 0], opacity: [0.04, 0.12, 0.04] }}
          transition={{ duration: 7 + i * 1.1, repeatType: 'loop', repeat: Infinity, ease: 'easeInOut', delay: sym.delay }}
        >
          {sym.text}
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
 CATEGORY BADGE COLORS
 ────────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
 Typography: { bg: 'rgba(184,134,11,0.12)', text: 'rgba(184,134,11,0.8)', border: 'rgba(184,134,11,0.3)' },
 Layout: { bg: 'rgba(212,160,23,0.12)', text: 'rgba(212,160,23,0.8)', border: 'rgba(212,160,23,0.3)' },
 Effect: { bg: 'rgba(184,134,11,0.12)', text: 'rgba(184,134,11,0.8)', border: 'rgba(184,134,11,0.3)' },
 Form: { bg: 'rgba(184,134,11,0.12)', text: 'rgba(184,134,11,0.8)', border: 'rgba(184,134,11,0.3)' },
 UI: { bg: 'rgba(184,134,11,0.12)', text: 'rgba(184,134,11,0.8)', border: 'rgba(184,134,11,0.3)' },
};

/* ──────────────────────────────────────────────
 SNIPPET CARD
 ────────────────────────────────────────────── */
function SnippetCard({ snippet, index }: { snippet: Snippet; index: number }) {
 const PreviewComponent = PREVIEW_MAP[snippet.id];
 const catColors = CATEGORY_COLORS[snippet.category] || CATEGORY_COLORS.Effect;
 const Icon = snippet.icon;
 const codeLines = snippet.code.split('\n');

 return (
 <motion.div
 className="group relative border border-[#1a1a1a]/12 bg-[#ebe5d0] overflow-hidden flex flex-col"
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-40px' }}
 transition={{ duration: 0.5, delay: index * 0.06 }}
 whileHover={{ borderColor: 'rgba(212,160,23,0.15)', y: -2 }}
 >
 {/* Header */}
 <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]/8">
 <div className="flex items-center gap-2.5">
 <div
 className="flex items-center justify-center w-7 h-7"
 style={{ backgroundColor: catColors.bg, border: '1px solid ' + catColors.border }}
 >
 <Icon className="w-3.5 h-3.5" style={{ color: catColors.text }} />
 </div>
 <div>
 <div className="text-xs font-mono text-[#1a1a1a]/70 font-medium">{snippet.name}</div>
 </div>
 </div>
 <div
 className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider"
 style={{ backgroundColor: catColors.bg, color: catColors.text, border: '1px solid ' + catColors.border + '' }}
 >
 {snippet.category}
 </div>
 </div>

 {/* Live Preview */}
 <div className="px-4 py-3 border-b border-[#1a1a1a]/8 bg-[#ebe5d0] min-h-[90px] flex items-center">
 {PreviewComponent && <PreviewComponent />}
 </div>

 {/* Code Block */}
 <div className="flex-1 relative">
 <div className="absolute top-2 right-2 z-10">
 <CopyButton code={snippet.code} snippetId={snippet.id} />
 </div>
 <div className="px-3 py-3 overflow-x-auto custom-scroll max-h-[200px]">
 {codeLines.map((line, i) => highlightCSSLine(line, i + 1))}
 </div>
 </div>
 </motion.div>
 );
}

/* ──────────────────────────────────────────────
 MAIN COMPONENT
 ────────────────────────────────────────────── */
export function CssSnippetsSection() {
 const mounted = useIsMounted();

 if (!mounted) return <div className="min-h-screen" />;

 return (
 <section className="relative w-full min-h-screen py-16 md:py-24 overflow-hidden">
 {/* Background */}
 <div className="absolute inset-0" style={{ background: '#f5f0e1' }} />

 {/* Grid */}
 <div
 className="absolute inset-0 pointer-events-none"
 style={{
 backgroundImage: `
 linear-gradient(rgba(26,26,26,0.06) 1px, transparent 1px),
 linear-gradient(90deg, rgba(26,26,26,0.06) 1px, transparent 1px)
 `,
 backgroundSize: '40px 40px',
 }}
 />

 <FloatingDecorations />

 {/* Vignette */}
 <div
 className="absolute inset-0 pointer-events-none"
 style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,26,26,0.07) 100%)' }}
 />

 <div className="relative z-10 w-full mx-auto px-4 sm:px-6">
 {/* ── Section Header ── */}
 <motion.div
 className="text-center mb-10"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-80px' }}
 transition={{ duration: 0.6 }}
 >
 <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4a017]/20 bg-[#d4a017]/[0.06] mb-4">
 <Copy className="w-3.5 h-3.5 text-[#d4a017]" />
 <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4a017]/70">Quick Copy</span>
 </div>
 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
 <span
 className="bg-clip-text text-transparent"
 style={{
 background: 'linear-gradient(135deg, #d4a017, #b8860b',
 backgroundSize: '200% 100%',
 animation: 'gradient-shift 6s ease infinite',
 }}
 >
 CSS Snippets
 </span>
 </h2>
 <p className="text-sm text-[#6b6356]/40 font-mono max-w-lg mx-auto">
 A curated collection of commonly-used CSS patterns. Browse live previews and copy production-ready code instantly.
 </p>
 <div className="flex items-center justify-center gap-3 mt-4 text-[11px] font-mono text-[#6b6356]/35">
 <span>13 Snippets</span>
 <span className="text-[#b8860b]/40">/</span>
 <span>Live Preview</span>
 <span className="text-[#b8860b]/40">/</span>
 <span>Copy & Paste</span>
 </div>
 </motion.div>

 {/* ── Snippet Grid ── */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 {SNIPPETS.map((snippet, i) => (
 <SnippetCard key={snippet.id} snippet={snippet} index={i} />
 ))}
 </div>

 {/* ── Info Bar ── */}
 <motion.div
 className="flex items-center justify-center gap-4 mt-12 text-[11px] font-mono text-[#6b6356]/30"
 initial={{ opacity: 0 }}
 whileInView={{ opacity: 1 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.3 }}
 >
 {[
 { icon: Code2, text: '13+ Snippets' },
 { icon: Eye, text: 'Live Preview' },
 { icon: Copy, text: 'Copy & Paste' },
 ].map((item, i) => (
 <div key={'snippet-info-' + i + ''} className="flex items-center gap-1.5">
 <item.icon className="w-3 h-3 text-[#b8860b]/40" />
 <span>{item.text}</span>
 {i < 2 && <span className="text-[#b8860b]/20 ml-3">/</span>}
 </div>
 ))}
 </motion.div>
 </div>

 {/* ── Inline styles for snippet previews ── */}
 <style>{`
 .snippet-underline::after {
 content: '';
 position: absolute;
 bottom: -2px;
 left: 0;
 width: 0;
 height: 2px;
 background: #d4a017;
 transition: width 0.3s ease;
 border-radius: 1px;
 }
 .snippet-underline:hover::after {
 width: 100%;
 }
 .snippet-tooltip::before {
 content: attr(data-tip);
 position: absolute;
 bottom: calc(100% + 8px);
 left: 50%;
 transform: translateX(-50%);
 padding: 4px 10px;
 background: #1a1a2e;
 color: #fff;
 font-size: 10px;
 border-radius: 6px;
 white-space: nowrap;
 opacity: 0;
 pointer-events: none;
 transition: opacity 0.2s;
 border: 1px solid rgba(26,26,26,0.1);
 font-family: monospace;
 }
 .snippet-tooltip:hover::before {
 opacity: 1;
 }
 `}</style>
 </section>
 );
}
