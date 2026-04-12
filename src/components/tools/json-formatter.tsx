'use client';

import { useState, useCallback, useMemo, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  Braces,
  ChevronDown,
  ChevronRight,
  Trash2,
  ClipboardPaste,
  FileJson,
  Minimize2,
  CheckCircle2,
  XCircle,
  BarChart3,
  ArrowDownAZ,
  TreePine,
  Eye,
  ChevronUp,
  X,
  Database,
  Layers,
  Hash,
  Type,
  ToggleLeft,
  CircleDot,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   SSR-SAFE MOUNT HOOK
   ────────────────────────────────────────────── */
const subscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/* ──────────────────────────────────────────────
   SAMPLE DATA
   ────────────────────────────────────────────── */
const SAMPLES: Record<string, { name: string; icon: React.ElementType; data: unknown }> = {
  'api-response': {
    name: 'API Response',
    icon: Layers,
    data: {
      status: 200,
      message: 'Success',
      data: {
        users: [
          { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'admin', active: true },
          { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'editor', active: false },
          { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'viewer', active: true },
        ],
        pagination: { page: 1, perPage: 10, total: 3, hasNext: false, hasPrev: false },
        meta: { requestId: 'req_abc123', timestamp: '2024-01-15T10:30:00Z', version: 'v2.1.0' },
      },
    },
  },
  'package-json': {
    name: 'Package.json',
    icon: FileJson,
    data: {
      name: 'my-awesome-project',
      version: '2.4.1',
      description: 'A modern web application built with Next.js and TypeScript',
      main: 'index.js',
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'eslint . --fix',
        test: 'jest --coverage',
      },
      dependencies: {
        next: '^14.0.0',
        react: '^18.2.0',
        typescript: '^5.3.0',
        tailwindcss: '^3.4.0',
        framer: '^10.16.0',
      },
      devDependencies: {
        eslint: '^8.55.0',
        '@types/react': '^18.2.0',
        prettier: '^3.1.0',
      },
      keywords: ['nextjs', 'typescript', 'tailwind', 'react'],
      license: 'MIT',
      author: { name: 'Developer', email: 'dev@example.com' },
    },
  },
  'user-profile': {
    name: 'User Profile',
    icon: Database,
    data: {
      id: 'usr_9f8e7d6c',
      username: 'johndoe',
      profile: {
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'https://example.com/avatars/john.jpg',
        bio: 'Full-stack developer & open source enthusiast',
        birthday: '1990-05-20',
      },
      contact: { email: 'john.doe@example.com', phone: '+1-555-0123', website: 'https://johndoe.dev' },
      preferences: {
        theme: 'dark',
        language: 'en-US',
        notifications: { email: true, push: false, sms: true },
        privacy: { profileVisible: true, showEmail: false, showPhone: false },
      },
      stats: { posts: 142, followers: 1283, following: 456, reputation: 8750 },
      createdAt: '2022-03-15T08:00:00Z',
      updatedAt: '2024-01-10T14:22:33Z',
      verified: true,
    },
  },
  'dashboard-stats': {
    name: 'Dashboard Stats',
    icon: BarChart3,
    data: {
      period: 'January 2024',
      generatedAt: '2024-01-31T23:59:59Z',
      summary: { totalRevenue: 142580.50, totalOrders: 3842, newCustomers: 812, returnRate: 0.034 },
      revenue: {
        daily: [4250, 3890, 5100, 4780, 6200, 5890, 7100, 4900, 5600, 6800, 7200, 5500, 8100, 6400, 5900, 7600, 8400, 9100, 6800, 7200, 8900, 7500, 6200, 5800, 9400, 10200, 8600, 7100, 6500, 7800, 8200],
        weekly: [28120, 30770, 38500, 36900, 42500, 49100, 32600],
        monthly: [115000, 128500, 142580],
      },
      topProducts: [
        { name: 'Wireless Headphones', sold: 452, revenue: 22600 },
        { name: 'Smart Watch Pro', sold: 328, revenue: 49200 },
        { name: 'USB-C Hub', sold: 287, revenue: 5740 },
        { name: 'Mechanical Keyboard', sold: 198, revenue: 13860 },
        { name: '4K Monitor Stand', sold: 176, revenue: 8800 },
      ],
      channels: { direct: 0.35, organic: 0.28, referral: 0.18, social: 0.12, paid: 0.07 },
      flags: { betaFeaturesEnabled: true, maintenanceMode: false, cacheHitRate: 0.94 },
    },
  },
};

/* ──────────────────────────────────────────────
   FLOATING DECORATIONS
   ────────────────────────────────────────────── */
const FLOAT_SYMBOLS = [
  { text: '{ }', x: 4, y: 8, delay: 0 },
  { text: '[ ]', x: 88, y: 12, delay: 1.4 },
  { text: ':', x: 8, y: 78, delay: 0.7 },
  { text: ',', x: 92, y: 82, delay: 2.2 },
  { text: '{', x: 80, y: 40, delay: 1.8 },
  { text: '}', x: 2, y: 48, delay: 2.8 },
  { text: 'null', x: 50, y: 5, delay: 0.3 },
  { text: 'true', x: 40, y: 90, delay: 1.0 },
];

/* ──────────────────────────────────────────────
   JSON UTILITY FUNCTIONS
   ────────────────────────────────────────────── */
interface JsonStats {
  totalKeys: number;
  maxDepth: number;
  objectCount: number;
  arrayCount: number;
  stringCount: number;
  numberCount: number;
  booleanCount: number;
  nullCount: number;
}

function computeStats(data: unknown, depth = 0): JsonStats {
  const base: JsonStats = {
    totalKeys: 0,
    maxDepth: depth,
    objectCount: 0,
    arrayCount: 0,
    stringCount: 0,
    numberCount: 0,
    booleanCount: 0,
    nullCount: 0,
  };
  if (data === null) return { ...base, nullCount: 1 };
  if (Array.isArray(data)) {
    let childMax = depth;
    const arrResult = data.reduce<JsonStats>((acc, item) => {
      const s = computeStats(item, depth + 1);
      if (s.maxDepth > childMax) childMax = s.maxDepth;
      return {
        totalKeys: acc.totalKeys + s.totalKeys,
        maxDepth: Math.max(acc.maxDepth, s.maxDepth),
        objectCount: acc.objectCount + s.objectCount,
        arrayCount: acc.arrayCount + s.arrayCount + 1,
        stringCount: acc.stringCount + s.stringCount,
        numberCount: acc.numberCount + s.numberCount,
        booleanCount: acc.booleanCount + s.booleanCount,
        nullCount: acc.nullCount + s.nullCount,
      };
    }, { ...base, arrayCount: 1 });
    arrResult.maxDepth = childMax;
    return arrResult;
  }
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>;
    const keys = Object.keys(obj);
    let childMax = depth;
    const objResult = keys.reduce<JsonStats>((acc, key) => {
      const s = computeStats(obj[key], depth + 1);
      if (s.maxDepth > childMax) childMax = s.maxDepth;
      return {
        totalKeys: acc.totalKeys + s.totalKeys + 1,
        maxDepth: Math.max(acc.maxDepth, s.maxDepth),
        objectCount: acc.objectCount + s.objectCount + 1,
        arrayCount: acc.arrayCount + s.arrayCount,
        stringCount: acc.stringCount + s.stringCount,
        numberCount: acc.numberCount + s.numberCount,
        booleanCount: acc.booleanCount + s.booleanCount,
        nullCount: acc.nullCount + s.nullCount,
      };
    }, { ...base, objectCount: 1, totalKeys: keys.length });
    objResult.maxDepth = childMax;
    return objResult;
  }
  if (typeof data === 'string') return { ...base, stringCount: 1 };
  if (typeof data === 'number') return { ...base, numberCount: 1 };
  if (typeof data === 'boolean') return { ...base, booleanCount: 1 };
  return base;
}

function sortKeysDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeysDeep);
  if (obj !== null && typeof obj === 'object') {
    const sorted: Record<string, unknown> = {};
    Object.keys(obj as Record<string, unknown>)
      .sort((a, b) => a.localeCompare(b))
      .forEach((key) => {
        sorted[key] = sortKeysDeep((obj as Record<string, unknown>)[key]);
      });
    return sorted;
  }
  return obj;
}

function getJsonPath(segments: (string | number)[]): string {
  return segments.reduce((path, seg, i) => {
    if (i === 0) return `$${typeof seg === 'number' ? `[${seg}]` : `.${seg}`}`;
    return `${path}${typeof seg === 'number' ? `[${seg}]` : `.${seg}`}`;
  }, '');
}

function getTypeName(val: unknown): string {
  if (val === null) return 'null';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}

/* ──────────────────────────────────────────────
   TREE NODE
   ────────────────────────────────────────────── */
interface TreeNodeProps {
  keyName: string | null;
  value: unknown;
  path: (string | number)[];
  collapsed: Set<string>;
  toggleCollapse: (pathStr: string) => void;
  selectedPath: string | null;
  selectPath: (path: string) => void;
  isLast: boolean;
  depth: number;
}

function TreeNode({ keyName, value, path, collapsed, toggleCollapse, selectedPath, selectPath, isLast, depth }: TreeNodeProps) {
  const pathStr = path.join('.');
  const isCollapsed = collapsed.has(pathStr);
  const isObj = value !== null && typeof value === 'object';
  const isArray = Array.isArray(value);
  const type = getTypeName(value);

  const comma = !isLast ? ',' : '';
  const indent = depth * 20;

  if (isObj) {
    const entries = isArray
      ? (value as unknown[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>);
    const count = isArray ? (value as unknown[]).length : Object.keys(value as Record<string, unknown>).length;
    const bracket = isArray ? ['[', ']'] : ['{', '}'];

    return (
      <div className="font-mono text-sm leading-relaxed">
        {/* Key + opening bracket */}
        <div
          className="flex items-center cursor-pointer hover:bg-white/[0.03] rounded px-1 py-0.5 group"
          style={{ paddingLeft: indent }}
          onClick={() => toggleCollapse(pathStr)}
        >
          <motion.span
            className="mr-1 text-[#6b6356] inline-block w-4 text-center"
            animate={{ rotate: isCollapsed ? 0 : 90 }}
            transition={{ duration: 0.15 }}
          >
            <ChevronRight className="w-3 h-3" />
          </motion.span>
          {keyName !== null && (
            <>
              <span className="text-[#d4a017] mr-1.5">&quot;{keyName}&quot;</span>
              <span className="text-[#6b6356]">:</span>
              <span className="ml-1.5" />
            </>
          )}
          <span className="text-[#6b6356]">{bracket[0]}</span>
          {isCollapsed && (
            <>
              <span className="ml-1.5 text-[#6b6356] text-xs italic">
                {count} {isArray ? 'items' : 'keys'}
              </span>
              <span className="text-[#6b6356]">{bracket[1]}{comma}</span>
            </>
          )}
          <span
            className={`ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded ${
              isArray
                ? 'bg-[#b8860b]/10 text-[#b8860b]/70 border border-[#b8860b]/20'
                : 'bg-amber-500/10 text-[#d4a017]/70 border border-[#d4a017]/20'
            }`}
          >
            {isArray ? 'Array' : 'Object'}
          </span>
        </div>

        {/* Children */}
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {entries.map(([k, v], i) => (
                <TreeNode
                  key={`${pathStr}.${k}`}
                  keyName={isArray ? null : k}
                  value={v}
                  path={[...path, isArray ? Number(k) : k]}
                  collapsed={collapsed}
                  toggleCollapse={toggleCollapse}
                  selectedPath={selectedPath}
                  selectPath={selectPath}
                  isLast={i === entries.length - 1}
                  depth={depth + 1}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing bracket */}
        {isCollapsed ? null : (
          <div style={{ paddingLeft: indent }} className="text-[#6b6356]">
            {bracket[1]}{comma}
          </div>
        )}
      </div>
    );
  }

  // Primitive value
  const valColor = type === 'string'
    ? 'text-[#b8860b]'
    : type === 'number'
      ? 'text-[#b8860b]'
      : type === 'boolean'
        ? 'text-[#6b6356]'
        : 'text-[#c23616]';

  const displayVal = type === 'string'
    ? `&quot;${String(value)}&quot;`
    : String(value);

  const fullJsonPath = getJsonPath(path);
  const isSelected = selectedPath === fullJsonPath;

  return (
    <div
      className={`flex items-center font-mono text-sm leading-relaxed cursor-pointer hover:bg-white/[0.04] rounded px-1 py-0.5 transition-colors ${
        isSelected ? 'bg-white/[0.06]' : ''
      }`}
      style={{ paddingLeft: indent }}
      onClick={() => selectPath(fullJsonPath)}
    >
      <span className="mr-1.5 w-4 inline-block" />
      {keyName !== null && (
        <>
          <span className="text-[#d4a017] mr-1.5">&quot;{keyName}&quot;</span>
          <span className="text-[#6b6356]">:</span>
          <span className="ml-1.5" />
        </>
      )}
      <span className={valColor} dangerouslySetInnerHTML={{ __html: displayVal }} />
      <span className="text-[#6b6356]">{comma}</span>
      <span
        className={`ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded ${
          type === 'string'
            ? 'bg-amber-500/10 text-[#d4a017]/70 border border-[#d4a017]/20'
            : type === 'number'
              ? 'bg-[#b8860b]/10 text-[#b8860b]/70 border border-[#b8860b]/20'
              : type === 'boolean'
                ? 'bg-purple-500/10 text-[#6b6356]/70 border border-purple-500/20'
                : 'bg-[#c23616]/10 text-[#c23616]/70 border border-[#c23616]/20'
        }`}
      >
        {type}
      </span>
    </div>
  );
}

/* ──────────────────────────────────────────────
   MAIN COMPONENT
   ────────────────────────────────────────────── */
export function JsonFormatterSection() {
  const mounted = useIsMounted();
  const outputRef = useRef<HTMLDivElement>(null);

  // ─── State ───
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [treeView, setTreeView] = useState(true);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // ─── Parsed JSON ───
  const parsed = useMemo((): { data: unknown; error: { message: string; line?: number; column?: number } | null } => {
    if (!input.trim()) return { data: null, error: null };
    try {
      const data = JSON.parse(input);
      return { data, error: null };
    } catch (e) {
      const msg = (e as Error).message;
      // Try to extract line/column from error
      const posMatch = msg.match(/position\s+(\d+)/i);
      let line: number | undefined;
      let column: number | undefined;
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const lines = input.slice(0, pos).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
      return { data: null, error: { message: msg, line, column } };
    }
  }, [input]);

  const jsonValid = parsed.data !== null;
  const jsonError = parsed.error;

  // ─── Formatted JSON string ───
  const formattedJson = useMemo(() => {
    if (!jsonValid || parsed.data === null) return '';
    return JSON.stringify(parsed.data, null, 2);
  }, [jsonValid, parsed.data]);

  // ─── Minified JSON string ───
  const minifiedJson = useMemo(() => {
    if (!jsonValid || parsed.data === null) return '';
    return JSON.stringify(parsed.data);
  }, [jsonValid, parsed.data]);

  // ─── Stats ───
  const stats = useMemo((): JsonStats | null => {
    if (!jsonValid || parsed.data === null) return null;
    return computeStats(parsed.data);
  }, [jsonValid, parsed.data]);

  // ─── Line count / char count ───
  const lineCount = input ? input.split('\n').length : 0;
  const charCount = input.length;

  // ─── Syntax-highlighted formatted output with line numbers ───
  const highlightedLines = useMemo(() => {
    if (!formattedJson) return [];
    const lines = formattedJson.split('\n');
    return lines.map((line, idx) => {
      // Simple JSON syntax highlighting
      const parts: { text: string; color: string }[] = [];
      let remaining = line;
      // Match key: pattern
      const keyRegex = /^(\s*)(&quot;[^&]*&quot;|"[^"]*")(\s*:\s*)/;
      const keyMatch = remaining.match(keyRegex);
      if (keyMatch) {
        parts.push({ text: keyMatch[1], color: 'text-[#6b6356]' }); // indent
        parts.push({ text: keyMatch[2], color: 'text-[#d4a017]' }); // key
        parts.push({ text: keyMatch[3], color: 'text-[#1a1a1a]' }); // colon
        remaining = remaining.slice(keyMatch[0].length);
      } else {
        // Check for leading whitespace
        const wsMatch = remaining.match(/^(\s*)/);
        if (wsMatch && wsMatch[1]) {
          parts.push({ text: wsMatch[1], color: 'text-[#6b6356]' });
          remaining = remaining.slice(wsMatch[1].length);
        }
      }
      // Highlight values
      if (remaining) {
        // String value
        if (remaining.match(/^(&quot;[^&]*&quot;|"[^"]*")/)) {
          const strMatch = remaining.match(/^(&quot;[^&]*&quot;|"[^"]*")/);
          parts.push({ text: strMatch![0], color: 'text-[#b8860b]' });
          remaining = remaining.slice(strMatch![0].length);
          // comma
          if (remaining) parts.push({ text: remaining, color: 'text-[#1a1a1a]' });
        } else if (remaining.match(/^\s*true/)) {
          const m = remaining.match(/^(true)/);
          parts.push({ text: m![0], color: 'text-[#6b6356]' });
          remaining = remaining.slice(m![0].length);
          if (remaining) parts.push({ text: remaining, color: 'text-[#1a1a1a]' });
        } else if (remaining.match(/^\s*false/)) {
          const m = remaining.match(/^(false)/);
          parts.push({ text: m![0], color: 'text-[#6b6356]' });
          remaining = remaining.slice(m![0].length);
          if (remaining) parts.push({ text: remaining, color: 'text-[#1a1a1a]' });
        } else if (remaining.match(/^\s*null/)) {
          const m = remaining.match(/^(null)/);
          parts.push({ text: m![0], color: 'text-[#c23616]' });
          remaining = remaining.slice(m![0].length);
          if (remaining) parts.push({ text: remaining, color: 'text-[#1a1a1a]' });
        } else if (remaining.match(/^\s*-?\d+(\.\d+)?/)) {
          const m = remaining.match(/^(-?\d+(\.\d+)?)/);
          parts.push({ text: m![0], color: 'text-[#b8860b]' });
          remaining = remaining.slice(m![0].length);
          if (remaining) parts.push({ text: remaining, color: 'text-[#1a1a1a]' });
        } else {
          parts.push({ text: remaining, color: 'text-[#6b6356]' });
        }
      }
      return { parts, lineNum: idx + 1, raw: line };
    });
  }, [formattedJson]);

  // ─── Handlers ───
  const handleClear = useCallback(() => {
    setInput('');
    setCollapsed(new Set());
    setSelectedPath(null);
    setValidationResult(null);
  }, []);

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch {
      // fallback
    }
  }, []);

  const handleLoadSample = useCallback((sampleKey: string) => {
    const sample = SAMPLES[sampleKey];
    if (sample) {
      setInput(JSON.stringify(sample.data, null, 2));
      setCollapsed(new Set());
      setSelectedPath(null);
      setValidationResult(null);
      setShowSamples(false);
    }
  }, []);

  const handleCopyFormatted = useCallback(async () => {
    const text = treeView ? formattedJson : minifiedJson;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [treeView, formattedJson, minifiedJson]);

  const handleMinify = useCallback(() => {
    if (!jsonValid) return;
    setInput(minifiedJson);
  }, [jsonValid, minifiedJson]);

  const handleValidate = useCallback(() => {
    if (jsonValid) {
      setValidationResult({ valid: true, message: 'Valid JSON' });
    } else if (jsonError) {
      setValidationResult({ valid: false, message: jsonError.message });
    } else {
      setValidationResult({ valid: false, message: 'No input to validate' });
    }
    setTimeout(() => setValidationResult(null), 4000);
  }, [jsonValid, jsonError]);

  const handleSortKeys = useCallback(() => {
    if (!jsonValid || parsed.data === null) return;
    const sorted = sortKeysDeep(parsed.data);
    setInput(JSON.stringify(sorted, null, 2));
  }, [jsonValid, parsed.data]);

  const toggleCollapse = useCallback((pathStr: string) => {
    setCollapsed(prev => {
      const next = new Set(prev);
      if (next.has(pathStr)) next.delete(pathStr);
      else next.add(pathStr);
      return next;
    });
  }, []);

  const collapseAll = useCallback(() => {
    if (!jsonValid || parsed.data === null) return;
    const allPaths = new Set<string>();
    function collectPaths(obj: unknown, path: (string | number)[]) {
      if (obj !== null && typeof obj === 'object') {
        allPaths.add(path.join('.'));
        if (Array.isArray(obj)) {
          obj.forEach((item, i) => collectPaths(item, [...path, i]));
        } else {
          Object.entries(obj as Record<string, unknown>).forEach(([k, v]) => {
            collectPaths(v, [...path, k]);
          });
        }
      }
    }
    collectPaths(parsed.data, []);
    setCollapsed(allPaths);
  }, [jsonValid, parsed.data]);

  const expandAll = useCallback(() => {
    setCollapsed(new Set());
  }, []);

  if (!mounted) {
    return (
      <section className="relative w-full min-h-[80vh] bg-[#f5f0e1]" />
    );
  }

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#f5f0e1] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Floating decorative symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {FLOAT_SYMBOLS.map((sym, i) => (
          <motion.div
            key={`json-float-${i}`}
            className="absolute font-mono text-sm whitespace-nowrap select-none"
            style={{
              left: `${sym.x}%`,
              top: `${sym.y}%`,
              color: 'rgba(180, 128, 23, 0.12)',
            }}
            animate={{ y: [0, -12, 0], opacity: [0.04, 0.1, 0.04] }}
            transition={{ duration: 8 + i * 1.1, repeat: Infinity, ease: 'easeInOut', delay: sym.delay }}
          >
            {sym.text}
          </motion.div>
        ))}
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(180,128,23,0.08) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-[#1a1a1a] bg-[#ebe5d0] mb-6">
            <Braces className="w-4 h-4 text-[#d4a017]" />
            <span className="text-sm text-[#6b6356] font-mono">Data Tool</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient-text">
              JSON Studio
            </span>
          </h2>
          <p className="text-base md:text-lg text-[#6b6356] max-w-xl mx-auto font-mono">
            Format, validate, explore, and transform JSON data
          </p>
        </motion.div>

        {/* Two-panel layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ─── LEFT PANEL: Input ─── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* JSON Input Card */}
            <div className="border border-[#1a1a1a] bg-[#ebe5d0] overflow-hidden">
              {/* VS Code-style chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#ebe5d0]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-[#6b6356] ml-2">json-input</span>
                <div className="flex-1" />
                {/* Stats */}
                <span className="text-[10px] font-mono text-[#6b6356] mr-2">
                  {lineCount} lines · {charCount} chars
                </span>
              </div>

              {/* Textarea */}
              <div className="px-4 py-3">
                <textarea
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setValidationResult(null);
                    setSelectedPath(null);
                  }}
                  className="w-full h-56 sm:h-72 bg-black/30 rounded-lg border border-white/[0.06] focus-within:border-amber-500/40 text-white font-mono text-sm p-3 outline-none resize-none placeholder:text-[#6b6356] custom-scrollbar transition-colors"
                  placeholder="Paste or type JSON here..."
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="JSON input"
                />
              </div>

              {/* Error display */}
              <AnimatePresence>
                {jsonError && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-[#c23616]/10 border border-[#c23616]/20">
                      <div className="flex items-center gap-2 mb-0.5">
                        <XCircle className="w-3.5 h-3.5 text-[#c23616]" />
                        <span className="text-xs font-mono text-[#c23616] font-semibold">Parse Error</span>
                      </div>
                      <p className="text-xs font-mono text-[#c23616]/80">
                        {jsonError.message}
                        {jsonError.line && (
                          <span className="text-[#6b6356]"> (line {jsonError.line}, col {jsonError.column})</span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Validation result toast */}
              <AnimatePresence>
                {validationResult && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`mx-4 mb-3 px-3 py-2 rounded-lg border ${
                      validationResult.valid
                        ? 'bg-[#d4a017]/10 border-[#d4a017]/20'
                        : 'bg-[#c23616]/10 border-[#c23616]/20'
                    }`}>
                      <div className="flex items-center gap-2">
                        {validationResult.valid
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" />
                          : <XCircle className="w-3.5 h-3.5 text-[#c23616]" />
                        }
                        <span className={`text-xs font-mono ${validationResult.valid ? 'text-[#b8860b]' : 'text-[#c23616]'}`}>
                          {validationResult.message}
                          {validationResult.valid && stats && (
                            <span className="text-[#6b6356] ml-2">
                              · {stats.totalKeys} keys · depth {stats.maxDepth}
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap gap-2">
              <motion.button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#1a1a1a] border border-white/[0.06] bg-white/[0.02] hover:text-[#c23616] hover:border-[#c23616]/30 hover:bg-[#c23616]/5 transition-all cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </motion.button>
              <motion.button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#1a1a1a] border border-white/[0.06] bg-white/[0.02] hover:text-[#d4a017] hover:border-[#d4a017]/30 hover:bg-[#d4a017]/5 transition-all cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Paste from clipboard"
              >
                <ClipboardPaste className="w-3.5 h-3.5" />
                Paste
              </motion.button>
              <motion.button
                onClick={handleMinify}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#1a1a1a] border border-white/[0.06] bg-white/[0.02] hover:text-[#b8860b] hover:border-[#b8860b]/30 hover:bg-[#b8860b]/5 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!jsonValid}
                aria-label="Minify JSON"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                Minify
              </motion.button>
              <motion.button
                onClick={handleValidate}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#1a1a1a] border border-white/[0.06] bg-white/[0.02] hover:text-[#d4a017] hover:border-[#d4a017]/30 hover:bg-[#d4a017]/5 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!input.trim()}
                aria-label="Validate JSON"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validate
              </motion.button>
              <motion.button
                onClick={handleSortKeys}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-[#1a1a1a] border border-white/[0.06] bg-white/[0.02] hover:text-[#d4a017] hover:border-[#d4a017]/30 hover:bg-amber-500/5 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={!jsonValid}
                aria-label="Sort keys alphabetically"
              >
                <ArrowDownAZ className="w-3.5 h-3.5" />
                Sort Keys
              </motion.button>
            </div>

            {/* Sample Data Toggle */}
            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowSamples(prev => !prev)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono text-[#1a1a1a] border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileJson className="w-4 h-4 text-[#d4a017]" />
                Sample Data
                {showSamples ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </motion.button>
              <motion.button
                onClick={() => setShowStats(prev => !prev)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono text-[#1a1a1a] border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!jsonValid}
                aria-label="Toggle statistics panel"
              >
                <BarChart3 className="w-4 h-4 text-[#b8860b]" />
                Stats
              </motion.button>
            </div>

            {/* Samples Grid */}
            <AnimatePresence>
              {showSamples && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {Object.entries(SAMPLES).map(([key, sample]) => {
                      const SampleIcon = sample.icon;
                      return (
                        <motion.button
                          key={`sample-${key}`}
                          onClick={() => handleLoadSample(key)}
                          className="flex flex-col items-center gap-2 p-3 rounded-xl border bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] text-center transition-all cursor-pointer"
                          whileHover={{ scale: 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          <SampleIcon className="w-5 h-5 text-[#d4a017]/70" />
                          <span className="text-xs font-mono text-[#1a1a1a]">{sample.name}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Statistics Panel */}
            <AnimatePresence>
              {showStats && stats && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border border-[#1a1a1a] bg-[#ebe5d0] p-4 pt-1">
                    <div className="flex items-center gap-2 mb-3 pt-2">
                      <BarChart3 className="w-3.5 h-3.5 text-[#b8860b]" />
                      <span className="text-xs font-mono text-[#6b6356]">JSON Statistics</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { icon: Database, label: 'Total Keys', value: stats.totalKeys, color: 'text-[#d4a017]' },
                        { icon: Layers, label: 'Max Depth', value: stats.maxDepth, color: 'text-[#d4a017]' },
                        { icon: Braces, label: 'Objects', value: stats.objectCount, color: 'text-orange-400' },
                        { icon: Eye, label: 'Arrays', value: stats.arrayCount, color: 'text-[#b8860b]' },
                        { icon: Type, label: 'Strings', value: stats.stringCount, color: 'text-[#b8860b]' },
                        { icon: Hash, label: 'Numbers', value: stats.numberCount, color: 'text-[#b8860b]' },
                        { icon: ToggleLeft, label: 'Booleans', value: stats.booleanCount, color: 'text-[#6b6356]' },
                        { icon: CircleDot, label: 'Nulls', value: stats.nullCount, color: 'text-[#c23616]' },
                      ].map((stat) => (
                        <div key={`stat-${stat.label}`} className="text-center p-2 rounded-lg bg-white/[0.02]">
                          <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color} opacity-70`} />
                          <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
                          <div className="text-[10px] font-mono text-[#6b6356] uppercase tracking-wider mt-0.5">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Type breakdown bar */}
                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-[#6b6356] mb-1.5">Type Distribution</div>
                      <div className="flex h-2 overflow-hidden bg-[#1a1a1a]/10">
                        {(() => {
                          const total = Math.max(1, stats.stringCount + stats.numberCount + stats.booleanCount + stats.nullCount);
                          const segments = [
                            { count: stats.stringCount, color: '#fcd34d' },
                            { count: stats.numberCount, color: '#22d3ee' },
                            { count: stats.booleanCount, color: '#c084fc' },
                            { count: stats.nullCount, color: '#f87171' },
                          ];
                          return segments.map((seg) => {
                            if (seg.count === 0) return null;
                            return (
                              <div
                                key={`seg-${seg.color}`}
                                className="h-full transition-all duration-500"
                                style={{
                                  width: `${(seg.count / total) * 100}%`,
                                  backgroundColor: seg.color,
                                  opacity: 0.7,
                                }}
                              />
                            );
                          });
                        })()}
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5">
                        <span className="text-[10px] font-mono text-[#b8860b]/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-300/60 inline-block" /> Strings
                        </span>
                        <span className="text-[10px] font-mono text-[#b8860b]/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-cyan-400/60 inline-block" /> Numbers
                        </span>
                        <span className="text-[10px] font-mono text-[#6b6356]/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-purple-400/60 inline-block" /> Booleans
                        </span>
                        <span className="text-[10px] font-mono text-[#c23616]/60 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-red-400/60 inline-block" /> Nulls
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── RIGHT PANEL: Output ─── */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Formatted Output Card */}
            <div className="border border-[#1a1a1a] bg-[#ebe5d0] overflow-hidden flex-1">
              {/* VS Code-style chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#ebe5d0]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-[#6b6356] ml-2">
                  {treeView ? 'tree-view' : 'formatted'}
                </span>
                <div className="flex-1" />

                {/* View mode toggle */}
                <div className="flex items-center bg-white/[0.04] rounded-lg p-0.5 mr-2">
                  <motion.button
                    onClick={() => setTreeView(true)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                      treeView ? 'bg-white/[0.1] text-[#1a1a1a]' : 'text-[#6b6356] hover:text-[#1a1a1a]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Tree view"
                  >
                    <TreePine className="w-3 h-3" />
                    <span className="hidden sm:inline">Tree</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setTreeView(false)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono transition-all cursor-pointer ${
                      !treeView ? 'bg-white/[0.1] text-[#1a1a1a]' : 'text-[#6b6356] hover:text-[#1a1a1a]'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Formatted view"
                  >
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">Text</span>
                  </motion.button>
                </div>

                {/* Collapse / Expand */}
                {treeView && jsonValid && (
                  <>
                    <motion.button
                      onClick={collapseAll}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono text-[#6b6356] hover:text-[#6b6356] bg-white/[0.02] border border-white/[0.06] transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Collapse all"
                    >
                      <ChevronDown className="w-3 h-3" />
                      <span className="hidden sm:inline">Collapse</span>
                    </motion.button>
                    <motion.button
                      onClick={expandAll}
                      className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono text-[#6b6356] hover:text-[#6b6356] bg-white/[0.02] border border-white/[0.06] transition-all cursor-pointer mr-1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Expand all"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <span className="hidden sm:inline">Expand</span>
                    </motion.button>
                  </>
                )}

                {/* Copy button */}
                <motion.button
                  onClick={handleCopyFormatted}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[#1a1a1a] hover:text-[#1a1a1a] border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!jsonValid}
                  aria-label="Copy formatted JSON"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#d4a017]" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy'}
                </motion.button>
              </div>

              {/* Output content */}
              <div ref={outputRef} className="px-4 py-3">
                <div className="min-h-[300px] sm:min-h-[400px] bg-black/30 rounded-lg border border-white/[0.06] p-3 font-mono text-sm leading-relaxed max-h-[600px] overflow-y-auto custom-scrollbar">
                  {jsonValid && parsed.data !== null ? (
                    treeView ? (
                      /* Tree View */
                      <div>
                        <TreeNode
                          keyName={null}
                          value={parsed.data}
                          path={['$']}
                          collapsed={collapsed}
                          toggleCollapse={toggleCollapse}
                          selectedPath={selectedPath}
                          selectPath={setSelectedPath}
                          isLast={true}
                          depth={0}
                        />
                      </div>
                    ) : (
                      /* Formatted Text View with line numbers */
                      <div className="flex">
                        {/* Line numbers */}
                        <div className="select-none text-right pr-4 border-r border-white/[0.06] mr-4 min-w-[2.5rem]">
                          {highlightedLines.map((hl) => (
                            <div key={`ln-${hl.lineNum}`} className="text-[#6b6356] text-xs leading-relaxed">
                              {hl.lineNum}
                            </div>
                          ))}
                        </div>
                        {/* Code */}
                        <div className="flex-1">
                          {highlightedLines.map((hl) => (
                            <div key={`hl-${hl.lineNum}`} className="leading-relaxed">
                              {hl.parts.map((part, pi) => (
                                <span key={`hl-${hl.lineNum}-${pi}`} className={part.color}>
                                  {part.text}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ) : input.trim() ? (
                    <div className="text-[#c23616]/60 italic text-sm py-8 text-center">
                      <XCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
                      Invalid JSON — fix errors to see output
                    </div>
                  ) : (
                    <div className="text-[#6b6356] italic text-sm py-8 text-center">
                      <Braces className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      Paste JSON or load a sample to get started
                    </div>
                  )}
                </div>
              </div>

              {/* Selected Path Display */}
              <AnimatePresence>
                {selectedPath && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mx-4 mb-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-[#d4a017]/20">
                      <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                        <span className="text-[10px] font-mono text-[#d4a017]/60 shrink-0">PATH:</span>
                        <code className="text-xs font-mono text-[#b8860b] break-all">
                          {selectedPath}
                        </code>
                      </div>
                      <button
                        onClick={() => setSelectedPath(null)}
                        className="shrink-0 text-[#6b6356] hover:text-[#6b6356] transition-colors cursor-pointer"
                        aria-label="Dismiss path"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Info bar */}
        <motion.div
          className="max-w-7xl mx-auto mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-[#6b6356]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { icon: Braces, text: 'Format & Validate' },
            { icon: TreePine, text: 'Interactive Tree' },
            { icon: Copy, text: 'Copy & Minify' },
            { icon: BarChart3, text: 'Statistics' },
            { icon: ArrowDownAZ, text: 'Sort Keys' },
            { icon: FileJson, text: '4 Samples' },
          ].map((info, i) => (
            <div key={`json-info-${i}`} className="flex items-center gap-1.5">
              <info.icon className="w-3.5 h-3.5" />
              <span>{info.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
