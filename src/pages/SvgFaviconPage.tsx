import React, { useState } from 'react';
import { ToolPageLayout } from '../components/layout/ToolPageLayout';
import { SvgEditor } from '../components/editor/SvgEditor';
import { ShapeControls } from '../components/editor/ShapeControls';
import { LivePreviewPanel } from '../components/preview/LivePreviewPanel';
import { ExportModal } from '../components/export/ExportModal';
import { useFaviconCanvas } from '../hooks/useFaviconCanvas';
import { EditorState } from '../types/favicon';
import { PageRoute } from '../types/routes';
import { Code2, SlidersHorizontal, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

interface SvgFaviconPageProps {
  onNavigate: (route: PageRoute) => void;
  sharedState: EditorState;
  onUpdateSharedState: (updates: Partial<EditorState>) => void;
}

export const SvgFaviconPage: React.FC<SvgFaviconPageProps> = ({
  onNavigate,
  sharedState,
  onUpdateSharedState,
}) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Force tool to 'svg'
  const state: EditorState = {
    ...sharedState,
    tool: 'svg',
  };

  const { masterDataUrl, icons, icoBlob } = useFaviconCanvas(state);

  const guideContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Why Convert SVG to Multi-Size Favicons?
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          While modern browsers support &lt;link rel="icon" type="image/svg+xml"&gt;, legacy browsers, Apple iOS webclips, and Windows taskbars still require traditional PNG and ICO binaries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-sm">
            SVG
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Infinite Scalability</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Vector graphics scale mathematically. When converted through IconForge, your SVG renders crisp lines at 16×16 just as beautifully as on 512×512 PWA splash screens.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-sm">
            🛡️
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Sanitized DOM Sandbox</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All uploaded or pasted SVG markup is passed through a strict DOMPurify parser that strips executable JavaScript, malicious tags, and remote assets before canvas drawing.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold text-sm">
            📦
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Full Backward Compatibility</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            You get both vector beauty and full backward compatibility with Windows, older Safari versions, and classic bookmarks.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToolPageLayout
        currentRoute="svg-to-favicon"
        activeTool="svg"
        title="SVG to Favicon Converter"
        badge="Vector Converter"
        description="Upload vector .svg files or paste raw XML markup. Automatically sanitized and rasterized to multi-resolution PNG and Windows ICO files."
        icon={<Code2 className="w-7 h-7" />}
        iconBgColor="bg-gradient-to-tr from-purple-500 to-violet-600"
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
        {/* SVG Markup & File Upload */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              SVG Markup & Security Validator
            </h2>
          </div>
          <SvgEditor state={state} onChange={onUpdateSharedState} />
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
