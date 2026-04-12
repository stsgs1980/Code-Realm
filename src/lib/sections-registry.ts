import {
  Terminal, Monitor, Zap, Ghost, Code2, Paintbrush, Droplets,
  Layers, Play, FileCode, Palette, Braces, FileText, Binary,
  Ruler, Hash, FileJson, Type, Layout, Box, Smartphone, Square
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface SectionConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  category: 'showcase' | 'generator' | 'editor' | 'tool';
  description: string;
}

export const SECTIONS: SectionConfig[] = [
  // Showcases
  { id: 'terminal', label: 'Terminal', icon: Terminal, color: '#10b981', category: 'showcase', description: 'Interactive retro terminal with commands' },
  { id: 'devex', label: 'DevEx', icon: Monitor, color: '#06b6d4', category: 'showcase', description: 'VS Code-inspired developer experience' },
  { id: 'brutalism', label: 'Brutalism', icon: Zap, color: '#f59e0b', category: 'showcase', description: 'Raw brutalist web design showcase' },
  { id: 'glitch', label: 'Glitch', icon: Ghost, color: '#ec4899', category: 'showcase', description: 'Cyberpunk glitch effects' },
  { id: 'code-art', label: 'Code Art', icon: Code2, color: '#a855f7', category: 'showcase', description: 'Creative coding art styles' },
  { id: 'retro-terminal', label: 'Retro v2', icon: Terminal, color: '#d4a017', category: 'showcase', description: 'Retro amber terminal prototype' },

  // Generators
  { id: 'gradient', label: 'Gradient Lab', icon: Paintbrush, color: '#ec4899', category: 'generator', description: 'CSS gradient generator' },
  { id: 'palette', label: 'Palette Studio', icon: Droplets, color: '#06b6d4', category: 'generator', description: 'Color palette generator' },
  { id: 'shadow', label: 'Shadow', icon: Layers, color: '#f59e0b', category: 'generator', description: 'Box shadow generator' },
  { id: 'border', label: 'Border', icon: Square, color: '#10b981', category: 'generator', description: 'CSS border generator' },
  { id: 'animation', label: 'Animation', icon: Play, color: '#a855f7', category: 'generator', description: 'CSS animation generator' },
  { id: 'css-filters', label: 'CSS Filters', icon: Palette, color: '#ec4899', category: 'generator', description: 'CSS filter playground' },

  // Editors
  { id: 'code-playground', label: 'Playground', icon: FileCode, color: '#06b6d4', category: 'editor', description: 'Live HTML/CSS/JS editor' },
  { id: 'svg-editor', label: 'SVG Editor', icon: Braces, color: '#f59e0b', category: 'editor', description: 'SVG drawing editor' },
  { id: 'css-snippets', label: 'CSS Snippets', icon: FileText, color: '#10b981', category: 'editor', description: 'CSS code snippets library' },
  { id: 'markdown-preview', label: 'Markdown', icon: FileText, color: '#a855f7', category: 'editor', description: 'Markdown preview editor' },

  // Tools
  { id: 'base64', label: 'Base64', icon: Binary, color: '#06b6d4', category: 'tool', description: 'Base64 encode/decode tool' },
  { id: 'unit-converter', label: 'Units', icon: Ruler, color: '#f59e0b', category: 'tool', description: 'CSS unit converter' },
  { id: 'regex-tester', label: 'Regex', icon: Hash, color: '#10b981', category: 'tool', description: 'Regular expression tester' },
  { id: 'json-formatter', label: 'JSON', icon: FileJson, color: '#ec4899', category: 'tool', description: 'JSON formatter & validator' },
  { id: 'typography', label: 'Typography', icon: Type, color: '#a855f7', category: 'tool', description: 'Typography playground' },
  { id: 'flexbox-grid', label: 'Flexbox', icon: Layout, color: '#06b6d4', category: 'tool', description: 'Flexbox & Grid layout tool' },
  { id: 'transform-3d', label: '3D Transform', icon: Box, color: '#f59e0b', category: 'tool', description: 'CSS 3D transform playground' },
  { id: 'responsive', label: 'Responsive', icon: Smartphone, color: '#10b981', category: 'tool', description: 'Responsive design showcase' },
];
