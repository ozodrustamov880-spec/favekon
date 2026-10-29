import React, { useState } from 'react';
import { ToolPageLayout } from '../components/layout/ToolPageLayout';
import { ImageEditor } from '../components/editor/ImageEditor';
import { ShapeControls } from '../components/editor/ShapeControls';
import { LivePreviewPanel } from '../components/preview/LivePreviewPanel';
import { ExportModal } from '../components/export/ExportModal';
import { useFaviconCanvas } from '../hooks/useFaviconCanvas';
import { EditorState } from '../types/favicon';
import { PageRoute } from '../types/routes';
import { Image as ImageIcon, SlidersHorizontal, UploadCloud, Layers, CheckCircle2 } from 'lucide-react';

interface ImageFaviconPageProps {
  onNavigate: (route: PageRoute) => void;
  sharedState: EditorState;
  onUpdateSharedState: (updates: Partial<EditorState>) => void;
}

export const ImageFaviconPage: React.FC<ImageFaviconPageProps> = ({
  onNavigate,
  sharedState,
  onUpdateSharedState,
}) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Force tool to 'image'
  const state: EditorState = {
    ...sharedState,
    tool: 'image',
  };

  const { masterDataUrl, icons, icoBlob } = useFaviconCanvas(state);

  const guideContent = (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Best Practices for Image to Favicon Conversion
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Transform existing logo assets into multi-resolution icons without losing clarity or introducing pixelation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-sm">
            PNG
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upload Transparent PNGs</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            For best results, upload a square PNG with an alpha channel (transparent background). This allows your icon to blend into dark, light, or accent browser tabs.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-sm">
            512+
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Start High Resolution</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Upload an image of at least 512×512 pixels. Downscaling a clean, high-DPI asset creates noticeably sharper small favicons than upscaling a tiny 32×32 graphic.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold text-sm">
            CROP
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Use Zoom & Fit Controls</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            If your logo has whitespace around the edges, use our Zoom and Offset controls to zoom in and center the logo symbol, maximizing visual area in browser tabs.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <ToolPageLayout
        currentRoute="image-to-favicon"
        activeTool="image"
        title="Image to Favicon Converter"
        badge="Asset Converter"
        description="Convert your company logo, photo, or graphic (PNG, JPG, WebP) into production-ready favicon.ico, Apple touch icons, and Android PWA assets."
        icon={<ImageIcon className="w-7 h-7" />}
        iconBgColor="bg-gradient-to-tr from-blue-500 to-indigo-600"
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
        {/* Upload & Image Controls */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Upload & Image Positioning
            </h2>
          </div>
          <ImageEditor state={state} onChange={onUpdateSharedState} />
        </div>

        {/* Shape & Background Settings */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Layers className="w-4 h-4 text-brand-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Shape & Background Overlay
            </h2>
          </div>
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

