import React, { useState } from 'react';
import { ToolPageLayout } from '../components/layout/ToolPageLayout';
import { EmojiEditor } from '../components/editor/EmojiEditor';
import { ShapeControls } from '../components/editor/ShapeControls';
import { LivePreviewPanel } from '../components/preview/LivePreviewPanel';
import { ExportModal } from '../components/export/ExportModal';
import { useFaviconCanvas } from '../hooks/useFaviconCanvas';
import { EditorState } from '../types/favicon';
import { PageRoute } from '../types/routes';
import { Smile, SlidersHorizontal, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';

interface EmojiFaviconPageProps {
  onNavigate: (route: PageRoute) => void;
  sharedState: EditorState;
  onUpdateSharedState: (updates: Partial<EditorState>) => void;
}

export const EmojiFaviconPage: React.FC<EmojiFaviconPageProps> = ({
  onNavigate,
  sharedState,
  onUpdateSharedState,
}) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Force tool to 'emoji'
  const state: EditorState = {
    ...sharedState,
    tool: 'emoji',
  };

  const { masterDataUrl, icons, icoBlob } = useFaviconCanvas(state);

  const guideContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Why Use an Emoji Favicon?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Emojis are expressive, universally recognized, and immediately convey the personality of your app or project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-sm">
            🚀
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instant Recognition</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Users process visual glyphs much faster than arbitrary shapes. Emojis like rockets, lightning bolts, and sparkles communicate action instantly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-sm">
            ✨
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Rasterized to PNG & ICO</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            IconForge rasterizes your chosen emoji directly onto canvas bitmaps. This means your icon renders identically across all operating systems without platform font inconsistencies.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-sm">
            🎨
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pair with Custom Shapes</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Placing your emoji inside a squircle or circle with a vibrant gradient background gives your project a sleek modern SaaS app appearance.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToolPageLayout
        currentRoute="emoji-to-favicon"
        activeTool="emoji"
        title="Emoji to Favicon Generator"
        badge="Emoji Studio"
        description="Choose from hundreds of categorized emojis or search your favorites to instantly create eye-catching website and app icons."
        icon={<Smile className="w-7 h-7" />}
        iconBgColor="bg-gradient-to-tr from-amber-500 to-orange-500"
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
        {/* Emoji Selector Controls */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Emoji Library & Search
            </h2>
          </div>
          <EmojiEditor state={state} onChange={onUpdateSharedState} />
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
