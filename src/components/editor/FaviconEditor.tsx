import React, { useState } from 'react';
import { EditorState, ToolType, DesignPreset } from '../../types/favicon';
import { useFaviconCanvas } from '../../hooks/useFaviconCanvas';
import { TextEditor } from './TextEditor';
import { ImageEditor } from './ImageEditor';
import { EmojiEditor } from './EmojiEditor';
import { SvgEditor } from './SvgEditor';
import { ShapeControls } from './ShapeControls';
import { PresetsBar } from './PresetsBar';
import { LivePreviewPanel } from '../preview/LivePreviewPanel';
import { ExportModal } from '../export/ExportModal';
import { 
  Type, 
  Image as ImageIcon, 
  Smile, 
  Code2, 
  SlidersHorizontal, 
  Sparkles,
  Download
} from 'lucide-react';

interface FaviconEditorProps {
  initialTool?: ToolType;
}

const DEFAULT_EDITOR_STATE: EditorState = {
  tool: 'text',
  text: 'IF',
  fontFamily: 'Plus Jakarta Sans',
  fontSize: 54,
  fontWeight: '800',
  letterSpacing: 0,
  textColor: '#FFFFFF',
  textShadow: false,
  shape: 'squircle',
  borderRadius: 24,
  padding: 0,
  borderWidth: 0,
  borderColor: '#4338CA',
  shadow: true,
  shadowColor: '#4f46e5',
  shadowBlur: 20,
  backgroundType: 'gradient',
  bgColor: '#4F46E5',
  bgGradientFrom: '#4F46E5',
  bgGradientTo: '#7C3AED',
  bgGradientDirection: 'to-br',
  imageSrc: null,
  imageFit: 'contain',
  imageScale: 1.0,
  imageRotation: 0,
  imageOffsetX: 0,
  imageOffsetY: 0,
  emoji: '🚀',
  emojiScale: 75,
  svgCode: `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
</svg>`,
  svgColorOverride: false,
  svgColor: '#FFFFFF',
  tabTitle: 'IconForge — Fast Favicons',
  brandName: 'IconForge',
};

export const FaviconEditor: React.FC<FaviconEditorProps> = ({ initialTool = 'text' }) => {
  const [state, setState] = useState<EditorState>({
    ...DEFAULT_EDITOR_STATE,
    tool: initialTool,
  });
  const [activePresetId, setActivePresetId] = useState<string>('if-indigo');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const { masterDataUrl, icons, icoBlob, isRendering } = useFaviconCanvas(state);

  const updateState = (updates: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleApplyPreset = (preset: DesignPreset) => {
    setActivePresetId(preset.id);
    setState((prev) => ({
      ...prev,
      ...preset.config,
    }));
  };

  const handleReset = () => {
    setState(DEFAULT_EDITOR_STATE);
    setActivePresetId('if-indigo');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Tagline Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Favicon Studio Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Favicon Generator & Editor
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create multi-platform icon assets for modern browsers, iOS bookmarks, Android PWAs, and Windows desktop.
          </p>
        </div>

        <button
          onClick={() => setIsExportModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold text-sm shadow-md shadow-brand-500/20 active:scale-98 transition-all self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export All Formats</span>
        </button>
      </div>

      {/* Main 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Settings (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tool Selector Tabs */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-sm">
            <div className="grid grid-cols-4 gap-1">
              <button
                type="button"
                onClick={() => updateState({ tool: 'text' })}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  state.tool === 'text'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Type className="w-4 h-4" />
                <span>Text</span>
              </button>

              <button
                type="button"
                onClick={() => updateState({ tool: 'image' })}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  state.tool === 'image'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Image</span>
              </button>

              <button
                type="button"
                onClick={() => updateState({ tool: 'emoji' })}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  state.tool === 'emoji'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Smile className="w-4 h-4" />
                <span>Emoji</span>
              </button>

              <button
                type="button"
                onClick={() => updateState({ tool: 'svg' })}
                className={`flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all ${
                  state.tool === 'svg'
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>SVG</span>
              </button>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <PresetsBar onApplyPreset={handleApplyPreset} activePresetId={activePresetId} />
          </div>

          {/* Active Tool Specific Settings */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
              <SlidersHorizontal className="w-4 h-4 text-brand-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {state.tool === 'text' && 'Text & Typography'}
                {state.tool === 'image' && 'Image & Adjustment'}
                {state.tool === 'emoji' && 'Emoji Library'}
                {state.tool === 'svg' && 'SVG Vector Editor'}
              </h2>
            </div>

            {state.tool === 'text' && (
              <TextEditor state={state} onChange={updateState} onReset={handleReset} />
            )}
            {state.tool === 'image' && (
              <ImageEditor state={state} onChange={updateState} />
            )}
            {state.tool === 'emoji' && (
              <EmojiEditor state={state} onChange={updateState} />
            )}
            {state.tool === 'svg' && (
              <SvgEditor state={state} onChange={updateState} />
            )}
          </div>

          {/* Shape & Background Controls (Shared across tools) */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
            <ShapeControls state={state} onChange={updateState} />
          </div>
        </div>

        {/* RIGHT COLUMN: Live Previews & Resolution Outputs (7 cols on lg) */}
        <div className="lg:col-span-7">
          <LivePreviewPanel
            masterDataUrl={masterDataUrl}
            icons={icons}
            icoBlob={icoBlob}
            editorState={state}
            onUpdateState={updateState}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        icons={icons}
        icoBlob={icoBlob}
        editorState={state}
      />
    </div>
  );
};

