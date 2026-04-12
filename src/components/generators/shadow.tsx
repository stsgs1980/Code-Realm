'use client';

import { useState, useCallback, useMemo, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Type,
  Copy,
  Check,
  Plus,
  Trash2,
  Layers,
  Shuffle,
  Download,
  Eye,
  Code2,
  Palette,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   SSR-SAFE MOUNT HOOK
   ────────────────────────────────────────────── */
const subscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface ShadowLayer {
  id: number;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

interface TextShadowSettings {
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
}

interface Preset {
  name: string;
  shadow: string;
  layers?: ShadowLayer[];
}

/* ──────────────────────────────────────────────
   HELPER: hex to rgba
   ────────────────────────────────────────────── */
function hexToRgba(hex: string, opacity: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function generateLayerCSS(layer: ShadowLayer): string {
  const rgba = hexToRgba(layer.color, layer.opacity);
  const inset = layer.inset ? 'inset ' : '';
  return `${inset}${layer.x}px ${layer.y}px ${layer.blur}px ${layer.spread}px ${rgba}`;
}

/* ──────────────────────────────────────────────
   PRESETS
   ────────────────────────────────────────────── */
const PRESETS: Preset[] = [
  { name: 'Soft Glow', shadow: '0 0 20px 5px rgba(212, 160, 23, 0.3)' },
  { name: 'Hard Edge', shadow: '4px 4px 0px rgba(0, 0, 0, 1)' },
  { name: 'Neon', shadow: '0 0 10px #d4a017, 0 0 20px #d4a017, 0 0 40px #b8860b' },
  { name: 'Long Shadow', shadow: '6px 6px 0px rgba(0, 0, 0, 0.5), 12px 12px 0px rgba(0, 0, 0, 0.25)' },
  { name: 'Floating', shadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)' },
  { name: 'Pressed', shadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -2px -2px 4px rgba(255, 255, 255, 0.1)' },
  { name: 'Inner Glow', shadow: 'inset 0 0 20px rgba(212, 160, 23, 0.5)' },
  { name: 'Multiple', shadow: '0 1px 2px rgba(0,0,0,0.07), 0 4px 8px rgba(0,0,0,0.07), 0 16px 32px rgba(0,0,0,0.07)' },
  { name: 'Crisp', shadow: '0 2px 0px rgba(0, 0, 0, 0.8)' },
  { name: 'Dreamy', shadow: '0 0 30px 10px rgba(107, 99, 86, 0.3), 0 0 60px 20px rgba(194, 54, 22, 0.15)' },
  { name: 'Retro', shadow: '8px 8px 0px rgba(245, 158, 11, 0.8)' },
  { name: 'Holographic', shadow: '0 0 15px rgba(184, 134, 11, 0.4), 0 0 30px rgba(107, 99, 86, 0.3), 0 0 45px rgba(194, 54, 22, 0.2)' },
];

/* ──────────────────────────────────────────────
   DEFAULT LAYER
   ────────────────────────────────────────────── */
let nextLayerId = 1;
function createDefaultLayer(): ShadowLayer {
  return {
    id: nextLayerId++,
    x: 0,
    y: 4,
    blur: 12,
    spread: 0,
    color: '#d4a017',
    opacity: 40,
    inset: false,
  };
}

/* ──────────────────────────────────────────────
   SLIDER COMPONENT
   ────────────────────────────────────────────── */
function ShadowSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono text-[#6b6356] uppercase tracking-wider">{label}</span>
        <span className="text-[11px] font-mono text-[#d4a017] tabular-nums">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #d4a017 0%, #b8860b ${((value - min) / (max - min)) * 100}%, rgba(26,26,26,0.1) ${((value - min) / (max - min)) * 100}%`,
        }}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   FLOATING DECORATIONS
   ────────────────────────────────────────────── */
function FloatingDecorations() {
  const symbols = [
    { text: 'shadows', x: 5, y: 10, delay: 0 },
    { text: '[box-shadow]', x: 85, y: 15, delay: 1.2 },
    { text: '◼', x: 92, y: 60, delay: 0.6 },
    { text: 'drop-shadow()', x: 8, y: 75, delay: 2.0 },
    { text: '0 4px 12px', x: 75, y: 85, delay: 1.8 },
    { text: 'inset', x: 15, y: 45, delay: 0.4 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {symbols.map((sym, i) => (
        <motion.div
          key={`shadow-deco-${i}`}
          className="absolute font-mono text-[10px] whitespace-nowrap select-none"
          style={{
            left: `${sym.x}%`,
            top: `${sym.y}%`,
            color: 'rgba(212,160,23,0.08)',
          }}
          animate={{ y: [0, -10, 0], opacity: [0.05, 0.14, 0.05] }}
          transition={{ duration: 7 + i * 0.9, repeatType: "loop", repeat: Infinity, ease: 'easeInOut', delay: sym.delay }}
        >
          {sym.text}
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
export function ShadowGeneratorSection() {
  const mounted = useIsMounted();
  const [mode, setMode] = useState<'box' | 'text'>('box');
  const [layers, setLayers] = useState<ShadowLayer[]>([createDefaultLayer()]);
  const [activeLayerId, setActiveLayerId] = useState<number>(1);
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind'>('css');

  // Text shadow settings
  const [textShadow, setTextShadow] = useState<TextShadowSettings>({
    x: 2,
    y: 2,
    blur: 8,
    color: '#d4a017',
    opacity: 60,
  });

  // Active layer helper
  const activeLayer = useMemo(
    () => layers.find((l) => l.id === activeLayerId) || layers[0],
    [layers, activeLayerId]
  );

  // Update active layer
  const updateLayer = useCallback(
    (field: keyof ShadowLayer, value: number | string | boolean) => {
      setLayers((prev) =>
        prev.map((l) => (l.id === activeLayerId ? { ...l, [field]: value } : l))
      );
    },
    [activeLayerId]
  );

  // Add layer
  const addLayer = useCallback(() => {
    if (layers.length >= 5) return;
    const newLayer = createDefaultLayer();
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayerId(newLayer.id);
  }, [layers.length]);

  // Remove layer
  const removeLayer = useCallback(
    (id: number) => {
      if (layers.length <= 1) return;
      setLayers((prev) => {
        const next = prev.filter((l) => l.id !== id);
        if (activeLayerId === id) {
          setActiveLayerId(next[0].id);
        }
        return next;
      });
    },
    [layers.length, activeLayerId]
  );

  // Combined CSS output for box shadows
  const boxShadowCSS = useMemo(
    () => layers.map(generateLayerCSS).join(', '),
    [layers]
  );

  // Text shadow CSS
  const textShadowCSS = useMemo(
    () => `${textShadow.x}px ${textShadow.y}px ${textShadow.blur}px ${hexToRgba(textShadow.color, textShadow.opacity)}`,
    [textShadow]
  );

  // CSS code output
  const cssCode = useMemo(() => {
    if (mode === 'box') {
      if (exportFormat === 'css') {
        return `.element {\n  box-shadow: ${boxShadowCSS};\n}`;
      }
      return `<div class="shadow-[${boxShadowCSS.replace(/ /g, '_')}]">`;
    }
    if (exportFormat === 'css') {
      return `.element {\n  text-shadow: ${textShadowCSS};\n}`;
    }
    return `<span class="[text-shadow:${textShadowCSS.replace(/ /g, '_')}]">`;
  }, [mode, boxShadowCSS, textShadowCSS, exportFormat]);

  // Copy to clipboard
  const copyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = cssCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [cssCode]);

  // Apply preset
  const applyPreset = useCallback(
    (preset: Preset) => {
      if (mode === 'box') {
        // Parse the preset shadow into layers
        const shadowParts = preset.shadow.split(', ');
        const newLayers: ShadowLayer[] = shadowParts.map((part) => {
          const layer = createDefaultLayer();
          const trimmed = part.trim();
          const insetMatch = trimmed.startsWith('inset ');
          const cleanPart = insetMatch ? trimmed.slice(6) : trimmed;
          const values = cleanPart.split(/\s+/);

          if (values.length >= 4) {
            layer.x = parseFloat(values[0]) || 0;
            layer.y = parseFloat(values[1]) || 0;
            layer.blur = parseFloat(values[2]) || 0;
            layer.spread = parseFloat(values[3]) || 0;
          }
          if (values[4]) {
            const colorStr = values[4];
            if (colorStr.startsWith('#')) {
              layer.color = colorStr.length === 7 ? colorStr : colorStr.slice(0, 7);
              layer.opacity = 100;
            } else if (colorStr.startsWith('rgba')) {
              const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)\)/);
              if (match) {
                const r = parseInt(match[1]);
                const g = parseInt(match[2]);
                const b = parseInt(match[3]);
                layer.color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                layer.opacity = match[4] ? Math.round(parseFloat(match[4]) * 100) : 100;
              }
            } else if (colorStr.startsWith('rgb')) {
              const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
              if (match) {
                const r = parseInt(match[1]);
                const g = parseInt(match[2]);
                const b = parseInt(match[3]);
                layer.color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
                layer.opacity = 100;
              }
            }
          }
          layer.inset = insetMatch;
          return layer;
        });
        setLayers(newLayers);
        setActiveLayerId(newLayers[0].id);
      } else {
        // Apply first shadow part as text shadow
        const trimmed = preset.shadow.split(', ')[0].trim();
        const insetMatch = trimmed.startsWith('inset ');
        const cleanPart = insetMatch ? trimmed.slice(6) : trimmed;
        const values = cleanPart.split(/\s+/);
        setTextShadow((prev) => ({
          ...prev,
          x: parseFloat(values[0]) || 0,
          y: parseFloat(values[1]) || 0,
          blur: parseFloat(values[2]) || 0,
          color: values[3]?.startsWith('#') ? values[3].slice(0, 7) : prev.color,
        }));
      }
    },
    [mode]
  );

  // Random shadow
  const randomShadow = useCallback(() => {
    if (mode === 'box') {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      const layer: ShadowLayer = {
        id: nextLayerId++,
        x: Math.round((Math.random() - 0.5) * 40),
        y: Math.round((Math.random() - 0.5) * 40),
        blur: Math.round(Math.random() * 60),
        spread: Math.round((Math.random() - 0.5) * 30),
        color: randomColor,
        opacity: Math.round(20 + Math.random() * 60),
        inset: Math.random() > 0.7,
      };
      setLayers([layer]);
      setActiveLayerId(layer.id);
    } else {
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      setTextShadow({
        x: Math.round((Math.random() - 0.5) * 20),
        y: Math.round((Math.random() - 0.5) * 20),
        blur: Math.round(Math.random() * 40),
        color: randomColor,
        opacity: Math.round(30 + Math.random() * 60),
      });
    }
  }, [mode]);

  // Export to file
  const exportFile = useCallback(() => {
    const blob = new Blob([cssCode], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shadow.css';
    a.click();
    URL.revokeObjectURL(url);
  }, [cssCode]);

  if (!mounted) return <div className="min-h-screen" />;

  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e1] via-[#ebe5d0] to-[#f5f0e1]" />

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <FloatingDecorations />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.08) 100%)',
        }}
      />

      <div className="relative z-10 w-full mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#d4a017]/20 bg-[#d4a017]/10 mb-4">
            <Box className="w-3.5 h-3.5 text-[#d4a017]" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4a017]">CSS Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-[#d4a017] via-[#b8860b] to-emerald-400 bg-clip-text text-transparent bg-[length:200%_100%]" style={{ animation: 'gradient-shift 6s ease infinite' }}>
              Shadow Lab
            </span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 text-[11px] font-mono text-[#6b6356]/40">
            <span>2 Modes</span>
            <span className="text-[#d4a017]/50">/</span>
            <span>12 Presets</span>
            <span className="text-[#d4a017]/50">/</span>
            <span>5 Layers</span>
            <span className="text-[#d4a017]/50">/</span>
            <span>Live Preview</span>
          </div>
        </motion.div>

        {/* Mode Toggle + Toolbar */}
        <motion.div
          className="flex flex-wrap items-center justify-between gap-3 mb-6"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Mode tabs */}
          <div className="relative flex items-center gap-1 p-1 rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0]">
            {(['box', 'text'] as const).map((m) => (
              <button
                key={`mode-${m}`}
                onClick={() => setMode(m)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  mode === m ? 'text-[#1a1a1a]' : 'text-[#6b6356] hover:text-[#1a1a1a]/80'
                }`}
              >
                {mode === m && (
                  <motion.div
                    layoutId="shadow-mode-bg"
                    className="absolute inset-0 rounded-lg border border-[#1a1a1a]/15 bg-[#ebe5d0]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {m === 'box' ? (
                  <Box className="w-3.5 h-3.5 relative z-10" />
                ) : (
                  <Type className="w-3.5 h-3.5 relative z-10" />
                )}
                <span className="relative z-10">{m === 'box' ? 'Box Shadow' : 'Text Shadow'}</span>
              </button>
            ))}
          </div>

          {/* Toolbar actions */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={randomShadow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1a1a1a]/15 bg-[#ebe5d0] text-xs font-mono text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20 transition-colors cursor-pointer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Shuffle className="w-3 h-3" />
              Random
            </motion.button>
            <motion.button
              onClick={exportFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1a1a1a]/15 bg-[#ebe5d0] text-xs font-mono text-[#1a1a1a]/70 hover:text-[#1a1a1a] hover:border-[#1a1a1a]/20 transition-colors cursor-pointer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download className="w-3 h-3" />
              Export
            </motion.button>
          </div>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left panel: Controls */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {mode === 'box' ? (
              <>
                {/* Layer System */}
                <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] overflow-hidden">
                  {/* Layer header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]/10">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#d4a017]" />
                      <span className="text-xs font-mono text-[#1a1a1a]/70">Layers</span>
                      <span className="text-[10px] font-mono text-[#6b6356]/50">({layers.length}/5)</span>
                    </div>
                    <motion.button
                      onClick={addLayer}
                      disabled={layers.length >= 5}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                        layers.length >= 5
                          ? 'text-[#6b6356]/30 cursor-not-allowed'
                          : 'text-[#d4a017] hover:text-[#d4a017] hover:bg-[#d4a017]/10'
                      }`}
                      whileTap={layers.length < 5 ? { scale: 0.95 } : undefined}
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </motion.button>
                  </div>

                  {/* Layer list */}
                  <div className="p-3 space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                      {layers.map((layer) => (
                        <motion.div
                          key={layer.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setActiveLayerId(layer.id)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                            activeLayerId === layer.id
                              ? 'bg-[#ebe5d0] border border-[#1a1a1a]/15'
                              : 'hover:bg-[#ebe5d0] border border-transparent'
                          }`}
                        >
                          {/* Color dot */}
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-[#1a1a1a]/15"
                            style={{ backgroundColor: layer.color }}
                          />
                          {/* Layer info */}
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-mono text-[#1a1a1a]/70 truncate">
                              {layer.inset && 'inset '}
                              {layer.x}px {layer.y}px {layer.blur}px {layer.spread}px
                            </div>
                            <div className="text-[10px] font-mono text-[#6b6356]/50">
                              {layer.color} @ {layer.opacity}%
                            </div>
                          </div>
                          {/* Active indicator */}
                          {activeLayerId === layer.id && (
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-[#d4a017] flex-shrink-0"
                              layoutId="active-layer-dot"
                              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            />
                          )}
                          {/* Delete */}
                          {layers.length > 1 && (
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeLayer(layer.id);
                              }}
                              className="w-5 h-5 flex items-center justify-center rounded text-[#6b6356]/50 hover:text-[#c23616] hover:bg-[#c23616]/10 transition-colors cursor-pointer"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </motion.button>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Active Layer Controls */}
                <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] p-4 space-y-4">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className="w-3 h-3 rounded-full ring-1 ring-[#1a1a1a]/15"
                      style={{ backgroundColor: activeLayer.color }}
                    />
                    <span className="text-xs font-mono text-[#6b6356]">
                      Layer {layers.findIndex((l) => l.id === activeLayerId) + 1} Controls
                    </span>
                  </div>

                  <ShadowSlider label="X Offset" value={activeLayer.x} min={-50} max={50} step={1} unit="px" onChange={(v) => updateLayer('x', v)} />
                  <ShadowSlider label="Y Offset" value={activeLayer.y} min={-50} max={50} step={1} unit="px" onChange={(v) => updateLayer('y', v)} />
                  <ShadowSlider label="Blur" value={activeLayer.blur} min={0} max={100} step={1} unit="px" onChange={(v) => updateLayer('blur', v)} />
                  <ShadowSlider label="Spread" value={activeLayer.spread} min={-50} max={50} step={1} unit="px" onChange={(v) => updateLayer('spread', v)} />

                  {/* Color picker */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={activeLayer.color}
                        onChange={(e) => updateLayer('color', e.target.value)}
                        className="w-8 h-8 rounded-lg border border-[#1a1a1a]/15 cursor-pointer appearance-none bg-transparent"
                        style={{ padding: 0 }}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={activeLayer.color}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                            updateLayer('color', val.length === 4
                              ? `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`
                              : val
                            );
                          }
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#1a1a1a]/15 bg-[#ebe5d0] text-xs font-mono text-[#1a1a1a]/90 outline-none focus:border-[#d4a017]/30 transition-colors"
                        maxLength={7}
                      />
                    </div>
                  </div>

                  <ShadowSlider label="Opacity" value={activeLayer.opacity} min={0} max={100} step={1} unit="%" onChange={(v) => updateLayer('opacity', v)} />

                  {/* Inset toggle */}
                  <div className="flex items-center gap-3">
                    <label className="relative flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={activeLayer.inset}
                          onChange={(e) => updateLayer('inset', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 rounded-full bg-[#ebe5d0] peer-checked:bg-[#d4a017]/20 transition-colors" />
                        <motion.div
                          className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white/40 peer-checked:bg-[#d4a017] shadow-sm"
                          animate={{ x: activeLayer.inset ? 16 : 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-[#6b6356] group-hover:text-[#1a1a1a]/80 transition-colors">Inset</span>
                    </label>
                  </div>
                </div>
              </>
            ) : (
              /* Text Shadow Controls */
              <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] p-4 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Type className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span className="text-xs font-mono text-[#6b6356]">Text Shadow Controls</span>
                </div>

                <ShadowSlider label="X Offset" value={textShadow.x} min={-20} max={20} step={1} unit="px" onChange={(v) => setTextShadow((p) => ({ ...p, x: v }))} />
                <ShadowSlider label="Y Offset" value={textShadow.y} min={-20} max={20} step={1} unit="px" onChange={(v) => setTextShadow((p) => ({ ...p, y: v }))} />
                <ShadowSlider label="Blur" value={textShadow.blur} min={0} max={40} step={1} unit="px" onChange={(v) => setTextShadow((p) => ({ ...p, blur: v }))} />

                {/* Color picker */}
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={textShadow.color}
                    onChange={(e) => setTextShadow((p) => ({ ...p, color: e.target.value }))}
                    className="w-8 h-8 rounded-lg border border-[#1a1a1a]/15 cursor-pointer appearance-none bg-transparent"
                    style={{ padding: 0 }}
                  />
                  <input
                    type="text"
                    value={textShadow.color}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9a-fA-F]{0,6}$/.test(val)) {
                        setTextShadow((p) => ({
                          ...p,
                          color: val.length === 4
                            ? `#${val[1]}${val[1]}${val[2]}${val[2]}${val[3]}${val[3]}`
                            : val,
                        }));
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#1a1a1a]/15 bg-[#ebe5d0] text-xs font-mono text-[#1a1a1a]/90 outline-none focus:border-[#d4a017]/30 transition-colors"
                    maxLength={7}
                  />
                </div>

                <ShadowSlider label="Opacity" value={textShadow.opacity} min={0} max={100} step={1} unit="%" onChange={(v) => setTextShadow((p) => ({ ...p, opacity: v }))} />
              </div>
            )}

            {/* Presets */}
            <motion.div
              className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]/10">
                <Palette className="w-3.5 h-3.5 text-[#d4a017]" />
                <span className="text-xs font-mono text-[#1a1a1a]/70">Presets</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
                {PRESETS.map((preset, i) => (
                  <motion.button
                    key={`preset-${i}`}
                    onClick={() => applyPreset(preset)}
                    className="group flex flex-col items-center gap-2 p-2.5 rounded-lg border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/15 bg-[#ebe5d0] hover:bg-[#ebe5d0] transition-all cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Preview swatch */}
                    <div
                      className="w-full h-10 rounded-md flex items-center justify-center"
                      style={{
                        background: '#1a1a2e',
                        boxShadow: preset.shadow,
                      }}
                    >
                      {mode === 'text' ? (
                        <span
                          className="text-[10px] font-bold text-[#1a1a1a]"
                          style={{ textShadow: preset.shadow.split(', ')[0] }}
                        >
                          Aa
                        </span>
                      ) : (
                        <div className="w-5 h-5 rounded bg-white/90" />
                      )}
                    </div>
                    <span className="text-[9px] font-mono text-[#6b6356]/70 group-hover:text-[#1a1a1a]/70 transition-colors truncate w-full text-center">
                      {preset.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right panel: Preview + Output */}
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Preview Panel */}
            <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] overflow-hidden">
              {/* VS Code chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1a1a1a]/10 bg-[#ebe5d0]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <div className="flex items-center gap-1.5 ml-3">
                  <Eye className="w-3 h-3 text-[#6b6356]/70" />
                  <span className="text-[10px] font-mono text-[#6b6356]/40">Live Preview</span>
                </div>
              </div>

              {/* Preview area */}
              <div className="relative p-8 flex items-center justify-center" style={{ minHeight: '260px' }}>
                {/* Checkerboard bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #111 25%, transparent 25%),
                      linear-gradient(-45deg, #111 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #111 75%),
                      linear-gradient(-45deg, transparent 75%, #111 75%)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    opacity: 0.3,
                  }}
                />
                {/* Dark background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f1117] to-[#1a1a2e]" />

                <AnimatePresence mode="wait">
                  {mode === 'box' ? (
                    <motion.div
                      key="box-preview"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 w-40 h-40 sm:w-48 sm:h-48 rounded-2xl bg-white flex items-center justify-center"
                      style={{ boxShadow: boxShadowCSS }}
                    >
                      <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#d4a017] to-cyan-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="text-preview"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10 text-center px-4"
                    >
                      <div
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                        style={{
                          color: '#1a1a1a',
                          textShadow: textShadowCSS,
                        }}
                      >
                        The Art of Code
                      </div>
                      <div
                        className="mt-2 text-sm font-mono text-[#6b6356]"
                        style={{ textShadow: textShadowCSS }}
                      >
                        CSS Shadow Preview
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CSS Output */}
            <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] overflow-hidden">
              {/* Header with format toggle */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a1a1a]/10 bg-[#ebe5d0]">
                <div className="flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-[#d4a017]" />
                  <span className="text-[10px] font-mono text-[#6b6356]/40">Output</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* Format toggle */}
                  <div className="relative flex items-center gap-0.5 p-0.5 rounded-md border border-[#1a1a1a]/10 bg-[#ebe5d0]">
                    {(['css', 'tailwind'] as const).map((fmt) => (
                      <button
                        key={`fmt-${fmt}`}
                        onClick={() => setExportFormat(fmt)}
                        className={`relative px-2.5 py-1 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                          exportFormat === fmt ? 'text-[#1a1a1a]' : 'text-[#6b6356]/70 hover:text-[#1a1a1a]/70'
                        }`}
                      >
                        {exportFormat === fmt && (
                          <motion.div
                            layoutId="fmt-bg"
                            className="absolute inset-0 rounded bg-[#ebe5d0] border border-[#1a1a1a]/10"
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{fmt === 'css' ? 'CSS' : 'TW'}</span>
                      </button>
                    ))}
                  </div>
                  {/* Copy button */}
                  <motion.button
                    onClick={copyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono text-[#6b6356] hover:text-[#1a1a1a]/90 border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/15 bg-[#ebe5d0] hover:bg-[#ebe5d0] transition-all cursor-pointer"
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-[#d4a017]" />
                        <span className="text-[#d4a017]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Code display */}
              <div className="p-4 custom-scrollbar max-h-48 overflow-y-auto">
                <pre className="text-xs font-mono leading-relaxed">
                  <code>
                    {cssCode.split('\n').map((line, i) => (
                      <div key={`css-out-${i}`} className="flex">
                        <span className="text-white/10 w-6 text-right mr-4 select-none">{i + 1}</span>
                        <span>
                          {line.includes('.element') && (
                            <span className="syn-tag">{line.split(' ')[0]}</span>
                          )}
                          {line.includes('.element') && line.includes('{') && (
                            <>
                              <span className="syn-bracket">{' {'}</span>
                            </>
                          )}
                          {line.includes('box-shadow') && (
                            <>
                              <span className="syn-property">box-shadow</span>
                              <span className="syn-punctuation">:</span>{' '}
                              <span className="syn-value">{line.split(': ')[1]?.replace(';', '')}</span>
                              <span className="syn-punctuation">;</span>
                            </>
                          )}
                          {line.includes('text-shadow') && (
                            <>
                              <span className="syn-property">text-shadow</span>
                              <span className="syn-punctuation">:</span>{' '}
                              <span className="syn-value">{line.split(': ')[1]?.replace(';', '')}</span>
                              <span className="syn-punctuation">;</span>
                            </>
                          )}
                          {line === '}' && (
                            <span className="syn-bracket">{'}'}</span>
                          )}
                          {line.includes('shadow-[') && (
                            <span className="syn-tag">{line.split(' ')[0]}</span>
                          )}
                          {line.includes('[text-shadow:') && (
                            <span className="syn-tag">{line.split(' ')[0]}</span>
                          )}
                          {!line.includes('box-shadow') && !line.includes('text-shadow') && line !== '}' && !line.includes('.element') && !line.includes('{') && line.length > 0 && !line.includes('shadow-[') && !line.includes('[text-shadow:') && (
                            <span className="syn-value">{line}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Shadow specs summary */}
            <div className="rounded-xl border border-[#1a1a1a]/10 bg-[#ebe5d0] p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a017]" />
                <span className="text-xs font-mono text-[#6b6356]">Shadow Specs</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#6b6356]/50">Property</div>
                  <div className="text-xs font-mono text-[#d4a017]">
                    {mode === 'box' ? 'box-shadow' : 'text-shadow'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#6b6356]/50">Layers</div>
                  <div className="text-xs font-mono text-[#b8860b]">
                    {mode === 'box' ? layers.length : 1}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#6b6356]/50">Format</div>
                  <div className="text-xs font-mono text-[#1a1a1a]/80">
                    {exportFormat === 'css' ? 'CSS' : 'Tailwind'}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-[#6b6356]/50">Chars</div>
                  <div className="text-xs font-mono text-[#1a1a1a]/80">
                    {cssCode.length}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info bar */}
        <motion.div
          className="flex items-center justify-center gap-3 mt-10 text-[11px] font-mono text-[#6b6356]/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Sun className="w-3 h-3" />
          <span>Box &amp; Text Shadows</span>
          <span className="text-emerald-500/30">/</span>
          <Moon className="w-3 h-3" />
          <span>Layered Compositing</span>
          <span className="text-emerald-500/30">/</span>
          <span>CSS + Tailwind Export</span>
        </motion.div>
      </div>
    </section>
  );
}
