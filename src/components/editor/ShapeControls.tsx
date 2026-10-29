import React from 'react';
import { EditorState, ShapeType, BackgroundType, GradientDirection } from '../../types/favicon';
import { Square, Circle, Sparkles, Sliders, Palette, Shield } from 'lucide-react';

interface ShapeControlsProps {
  state: EditorState;
  onChange: (updates: Partial<EditorState>) => void;
}

const PRESET_COLORS = [
  '#4F46E5', // Indigo
  '#2563EB', // Blue
  '#7C3AED', // Violet
  '#EC4899', // Pink
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#0F172A', // Slate 900
  '#18181B', // Zinc 900
  '#FFFFFF', // White
  '#64748B', // Slate 500
];

export const ShapeControls: React.FC<ShapeControlsProps> = ({ state, onChange }) => {
  return (
    <div className="space-y-6">
      {/* 1. Shape Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Icon Shape
        </label>
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onChange({ shape: 'squircle' })}
            className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              state.shape === 'squircle'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <div className="w-6 h-6 rounded-lg border-2 border-current" />
            <span>Squircle</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ shape: 'rounded' })}
            className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              state.shape === 'rounded'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <div className="w-6 h-6 rounded-md border-2 border-current" />
            <span>Rounded</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ shape: 'circle' })}
            className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              state.shape === 'circle'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <Circle className="w-6 h-6" />
            <span>Circle</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ shape: 'square' })}
            className={`p-2.5 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-all ${
              state.shape === 'square'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 ring-2 ring-brand-500/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
            }`}
          >
            <Square className="w-6 h-6" />
            <span>Square</span>
          </button>
        </div>

        {/* Corner radius slider when rounded */}
        {state.shape === 'rounded' && (
          <div className="pt-2">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Corner Radius</span>
              <span className="font-mono">{state.borderRadius}%</span>
            </div>
            <input
              type="range"
              min={2}
              max={50}
              value={state.borderRadius}
              onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
              className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 2. Background Style */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          Background Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onChange({ backgroundType: 'solid' })}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              state.backgroundType === 'solid'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            Solid Color
          </button>

          <button
            type="button"
            onClick={() => onChange({ backgroundType: 'gradient' })}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              state.backgroundType === 'gradient'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            Gradient
          </button>

          <button
            type="button"
            onClick={() => onChange({ backgroundType: 'transparent' })}
            className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              state.backgroundType === 'transparent'
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-300'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
            }`}
          >
            Transparent
          </button>
        </div>

        {/* Solid Color Picker */}
        {state.backgroundType === 'solid' && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={state.bgColor}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
              />
              <input
                type="text"
                value={state.bgColor.toUpperCase()}
                onChange={(e) => onChange({ bgColor: e.target.value })}
                className="w-28 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-slate-200"
              />
            </div>
            {/* Swatches */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChange({ bgColor: c })}
                  style={{ backgroundColor: c }}
                  className="w-6 h-6 rounded-md border border-slate-300 dark:border-slate-600 transition-transform hover:scale-110"
                />
              ))}
            </div>
          </div>
        )}

        {/* Gradient Picker */}
        {state.backgroundType === 'gradient' && (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">From Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.bgGradientFrom}
                    onChange={(e) => onChange({ bgGradientFrom: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <input
                    type="text"
                    value={state.bgGradientFrom.toUpperCase()}
                    onChange={(e) => onChange({ bgGradientFrom: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">To Color</span>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={state.bgGradientTo}
                    onChange={(e) => onChange({ bgGradientTo: e.target.value })}
                    className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer p-0.5 bg-transparent"
                  />
                  <input
                    type="text"
                    value={state.bgGradientTo.toUpperCase()}
                    onChange={(e) => onChange({ bgGradientTo: e.target.value })}
                    className="w-full px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Gradient Direction */}
            <div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">Direction</span>
              <div className="grid grid-cols-5 gap-1.5">
                {(['to-br', 'to-r', 'to-b', 'to-tr', 'radial'] as GradientDirection[]).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => onChange({ bgGradientDirection: dir })}
                    className={`py-1 rounded-lg text-[10px] font-semibold uppercase border transition-all ${
                      state.bgGradientDirection === dir
                        ? 'border-brand-500 bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {dir.replace('to-', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Border & Shadows */}
      <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Border & Shadow
          </label>
        </div>

        {/* Border Width */}
        <div>
          <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
            <span>Border Width</span>
            <span className="font-mono">{state.borderWidth}px</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={0}
              max={32}
              value={state.borderWidth}
              onChange={(e) => onChange({ borderWidth: Number(e.target.value) })}
              className="w-full accent-brand-600 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            {state.borderWidth > 0 && (
              <input
                type="color"
                value={state.borderColor}
                onChange={(e) => onChange({ borderColor: e.target.value })}
                className="w-6 h-6 rounded border cursor-pointer bg-transparent"
              />
            )}
          </div>
        </div>

        {/* Shadow toggle */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-600 dark:text-slate-400">Icon Drop Shadow</span>
          <button
            type="button"
            onClick={() => onChange({ shadow: !state.shadow })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              state.shadow ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                state.shadow ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

