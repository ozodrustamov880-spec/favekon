import React, { useState } from 'react';
import { ToolPageLayout } from '../components/layout/ToolPageLayout';
import { TextEditor } from '../components/editor/TextEditor';
import { ShapeControls } from '../components/editor/ShapeControls';
import { PresetsBar } from '../components/editor/PresetsBar';
import { LivePreviewPanel } from '../components/preview/LivePreviewPanel';
import { ExportModal } from '../components/export/ExportModal';
import { useFaviconCanvas } from '../hooks/useFaviconCanvas';
import { EditorState, DesignPreset } from '../types/favicon';
import { PageRoute } from '../types/routes';
import { Type, Sparkles, SlidersHorizontal, CheckCircle2, Lightbulb } from 'lucide-react';

interface TextFaviconPageProps {
  onNavigate: (route: PageRoute) => void;
  sharedState: EditorState;
  onUpdateSharedState: (updates: Partial<EditorState>) => void;
}

export const TextFaviconPage: React.FC<TextFaviconPageProps> = ({
  onNavigate,
  sharedState,
  onUpdateSharedState,
}) => {
  const [activePresetId, setActivePresetId] = useState<string>('if-indigo');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Canvas hook with shared state, forcing tool to 'text'
  const state: EditorState = {
    ...sharedState,
    tool: 'text',
  };

  const { masterDataUrl, icons, icoBlob } = useFaviconCanvas(state);

  const handleApplyPreset = (preset: DesignPreset) => {
    setActivePresetId(preset.id);
    onUpdateSharedState(preset.config);
  };

  const handleReset = () => {
    onUpdateSharedState({
      text: 'IF',
      fontFamily: 'Plus Jakarta Sans',
      fontSize: 54,
      fontWeight: '800',
      textColor: '#FFFFFF',
      textShadow: false,
      shape: 'squircle',
      borderRadius: 24,
      backgroundType: 'gradient',
      bgGradientFrom: '#4F46E5',
      bgGradientTo: '#7C3AED',
      bgGradientDirection: 'to-br',
    });
    setActivePresetId('if-indigo');
  };

  const guideContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          How to Create a Professional Text Favicon
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Lettermark and initial favicons are used by top brands like Google (G), Facebook (F), Netflix (N), and Medium (M) because of their instant readability at 16×16 pixels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-brand-600 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Keep it to 1–2 Characters</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Standard browser tabs display icons at only 16×16 pixels. Using 1 or 2 bold initials guarantees your icon remains razor-sharp without turning into a blur.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-brand-600 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Use High Contrast</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Ensure high color contrast between your letter and the background. Crisp white text against a vibrant gradient or dark background yields maximum readability in both light and dark mode tabs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-brand-600 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Select Heavy Font Weights</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Light and thin fonts lose definition when downscaled. We recommend Bold (700), ExtraBold (800), or Black (900) weights for punchy impact.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToolPageLayout
        currentRoute="text-to-favicon"
        activeTool="text"
        title="Text to Favicon Generator"
        badge="Typography Studio"
        description="Craft sleek, professional monograms, company initials, and lettermark favicons with 12+ curated Google Fonts and modern color gradients."
        icon={<Type className="w-7 h-7" />}
        iconBgColor="bg-gradient-to-tr from-indigo-500 to-brand-600"
        onNavigate={onNavigate}
        onOpenExport={() => setIsExportModalOpen(true)}
        guideContent={guideContent}
        rightPanel={
          <LivePreviewPanel
            masterDataUrl={masterDataUrl}
            icons={icons}
            icoBlob={icoBlob}
            editorState={state}
            onUpdateState={onUpdateSharedState}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        }
      >
        {/* Style Presets */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <PresetsBar onApplyPreset={handleApplyPreset} activePresetId={activePresetId} />
        </div>

        {/* Text Typography Settings */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Text & Typography Controls
            </h2>
          </div>
          <TextEditor state={state} onChange={onUpdateSharedState} onReset={handleReset} />
        </div>

        {/* Shape & Background Settings */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <ShapeControls state={state} onChange={onUpdateSharedState} />
        </div>
      </ToolPageLayout>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        icons={icons}
        icoBlob={icoBlob}
        editorState={state}
      />
    </>
  );
};

