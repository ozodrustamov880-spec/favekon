import React from 'react';
import { EditorState } from '../../types/favicon';
import { RotateCcw, Type } from 'lucide-react';

interface TextEditorProps {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
  onReset: () => void;
}

const FONT_FAMILIES = [
  { name: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans (Modern SaaS)' },
  { name: 'Inter', label: 'Inter (Clean Tech)' },
  { name: 'Outfit', label: 'Outfit (Friendly Geometric)' },
  { name: 'Poppins', label: 'Poppins (Bold & Friendly)' },
  { name: 'Fira Code', label: 'Fira Code (Developer Mono)' },
  { name: 'Space Grotesk', label: 'Space Grotesk (Futuristic)' },
  { name: 'Playfair Display', label: 'Playfair Display (Luxury Serif)' },
  { name: 'Montserrat', label: 'Montserrat (Ultra Bold)' },
  { name: 'Orbitron', label: 'Orbitron (Cyberpunk)' },
  { name: 'Righteous', label: 'Righteous (Retro Display)' },
  { name: 'Pacifico', label: 'Pacifico (Cursive / Script)' },
  { name: 'Caveat', label: 'Caveat (Handwritten)' },
];

export const TextEditor: React.FC<TextEditorProps> = ({
  state,
  onChange,
  onReset,
}) => {
  return (
    <div className="space-y-5">
      {/* Text Input & Reset */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Icon Text / Initials
          </label>
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
        <input
          type="text"
          maxLength={4}
          value={state.text}
          onChange={(e) => onChange({ text: e.target.value })}
          placeholder="e.g. IF"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 shadow-sm"
        />
        <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">
          Tip: 1 to 3 characters look best in browser tabs.
        </span>
      </div>

      {/* Font Family */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
          Font Family
        </label>
        <select
          value={state.fontFamily}
          onChange={(e) => onChange({ fontFamily: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer"
        >
          {FONT_FAMILIES.map((font) => (
            <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Weight & Size */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
            Font Weight
          </label>
          <select
            value={state.fontWeight}
            onChange={(e) => onChange({ fontWeight: e.target.value as any })}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="400">Regular (400)</option>
            <option value="600">SemiBold (600)</option>
            <option value="700">Bold (700)</option>
            <option value="800">ExtraBold (800)</option>
            <option value="900">Black (900)</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Font Size
            </label>
            <span className="text-xs font-mono text-slate-500">{state.fontSize}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={100}
            value={state.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full mt-2 accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
          Text Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={state.textColor}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
          />
          <input
            type="text"
            value={state.textColor.toUpperCase()}
            onChange={(e) => onChange({ textColor: e.target.value })}
            className="w-32 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
          />
          {/* Quick white/black shortcuts */}
          <button
            type="button"
            onClick={() => onChange({ textColor: '#FFFFFF' })}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white text-slate-800 border border-slate-200 shadow-xs"
          >
            White
          </button>
          <button
            type="button"
            onClick={() => onChange({ textColor: '#0F172A' })}
            className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white shadow-xs"
          >
            Dark
          </button>
        </div>
      </div>

      {/* Text Shadow */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs text-slate-600 dark:text-slate-400">Subtle Text Shadow</span>
        <button
          type="button"
          onClick={() => onChange({ textShadow: !state.textShadow })}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
            state.textShadow ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              state.textShadow ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
