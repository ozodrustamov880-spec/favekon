import React from 'react';
import { DESIGN_PRESETS } from '../../utils/presets';
import { DesignPreset, EditorState } from '../../types/favicon';
import { Sparkles } from 'lucide-react';

interface PresetsBarProps {
  onApplyPreset: (preset: DesignPreset) => void;
  activePresetId?: string;
}

export const PresetsBar: React.FC<PresetsBarProps> = ({
  onApplyPreset,
  activePresetId,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>Curated Style Presets</span>
        </label>
        <span className="text-[11px] text-slate-400">Click to apply template</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DESIGN_PRESETS.map((preset) => {
          const cfg = preset.config;
          const isGradient = cfg.backgroundType === 'gradient';
          const bgStyle = isGradient
            ? {
                background: `linear-gradient(135deg, ${cfg.bgGradientFrom || '#4F46E5'}, ${
                  cfg.bgGradientTo || '#7C3AED'
                })`,
              }
            : { backgroundColor: cfg.bgColor || '#1E293B' };

          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset)}
              className={`p-2 rounded-xl border text-left flex items-center gap-2.5 transition-all group ${
                activePresetId === preset.id
                  ? 'border-brand-500 bg-brand-50/60 dark:bg-brand-950/60 ring-2 ring-brand-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-brand-300 dark:hover:border-brand-700'
              }`}
            >
              {/* Mini Icon Preview */}
              <div
                style={bgStyle}
                className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0 transition-transform group-hover:scale-105 ${
                  cfg.shape === 'circle' ? 'rounded-full' : cfg.shape === 'square' ? 'rounded-xs' : 'rounded-lg'
                }`}
              >
                <span style={{ color: cfg.textColor || '#FFFFFF', fontFamily: cfg.fontFamily || 'Inter' }}>
                  {preset.previewIcon}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-400 capitalize">
                  {preset.category}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

