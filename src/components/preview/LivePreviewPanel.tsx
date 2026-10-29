import React, { useState } from 'react';
import { GeneratedIcon, EditorState } from '../../types/favicon';
import { BrowserTabPreview } from './BrowserTabPreview';
import { WebsiteHeaderPreview } from './WebsiteHeaderPreview';
import { MobileAppPreview } from './MobileAppPreview';
import { IconSizesGrid } from './IconSizesGrid';
import { LinkSnippetCard } from './LinkSnippetCard';
import { 
  Download, 
  Archive, 
  Sparkles, 
  Eye, 
  Layers, 
  Smartphone, 
  Globe, 
  Code,
  Copy,
  Check
} from 'lucide-react';
import { triggerDownload } from '../../utils/zipExporter';
import { copyToClipboard } from '../../utils/clipboard';

interface LivePreviewPanelProps {
  masterDataUrl: string;
  icons: GeneratedIcon[];
  icoBlob: Blob | null;
  editorState: EditorState;
  onUpdateState: (updates: Partial<EditorState>) => void;
  onOpenExportModal: () => void;
}

export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({
  masterDataUrl,
  icons,
  icoBlob,
  editorState,
  onUpdateState,
  onOpenExportModal,
}) => {
  const [previewTab, setPreviewTab] = useState<'browser' | 'header' | 'mobile' | 'sizes'>('browser');
  const [copiedQuick, setCopiedQuick] = useState(false);

  const handleDownloadIco = () => {
    if (icoBlob) {
      triggerDownload(icoBlob, 'favicon.ico');
    }
  };

  const handleCopyDirectLink = async () => {
    const icon32 = icons.find((i) => i.size === 32);
    const dataUri = icon32?.dataUrl || masterDataUrl;
    const tag = `<!-- Favicon by IconForge -->\n<link rel="icon" type="image/png" href="${dataUri}">`;
    const success = await copyToClipboard(tag);
    if (success) {
      setCopiedQuick(true);
      setTimeout(() => setCopiedQuick(false), 2500);
    }
    // Also scroll down to the link snippet card
    document.getElementById('link-snippet-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Top Main Showcase Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 px-2.5 py-1 rounded-full border border-brand-200 dark:border-brand-900">
                Live Preview
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                Instant Canvas Render
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              Your Favicon Master
            </h2>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Direct Copy <link> tag CTA */}
            <button
              onClick={handleCopyDirectLink}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/25 active:scale-95 transition-all"
            >
              {copiedQuick ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>&lt;link&gt; Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Code className="w-3.5 h-3.5" />
                  <span>&lt;link&gt; Tegni Olish</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenExportModal}
              className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Eksport</span>
            </button>
          </div>
        </div>

        {/* Big Master Preview & Branding Inputs */}
        <div className="flex flex-col lg:flex-row items-center gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
          {/* 128x128 Scaled Master Viewer */}
          <div className="relative group">
            <div className="w-36 h-36 rounded-2xl checkerboard p-3 flex items-center justify-center border-2 border-slate-200/80 dark:border-slate-700/80 shadow-md">
              {masterDataUrl ? (
                <img
                  src={masterDataUrl}
                  alt="Live Favicon"
                  className="w-28 h-28 object-contain transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-slate-300 dark:bg-slate-700 animate-pulse" />
              )}
            </div>
            <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow">
              512×512 HD
            </span>
          </div>

          {/* Quick Branding Metadata */}
          <div className="flex-1 space-y-3 w-full">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Customize how your website and application appear in the simulated environments below:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Browser Tab Title
                </label>
                <input
                  type="text"
                  value={editorState.tabTitle}
                  onChange={(e) => onUpdateState({ tabTitle: e.target.value })}
                  placeholder="e.g. My Website — Best App"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Brand / App Name
                </label>
                <input
                  type="text"
                  value={editorState.brandName}
                  onChange={(e) => onUpdateState({ brandName: e.target.value })}
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-medium text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Environment Preview Mode Tabs */}
        <div className="mt-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setPreviewTab('browser')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              previewTab === 'browser'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Browser Tab Preview</span>
          </button>

          <button
            onClick={() => setPreviewTab('header')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              previewTab === 'header'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Website Header Preview</span>
          </button>

          <button
            onClick={() => setPreviewTab('mobile')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              previewTab === 'mobile'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Home Screen</span>
          </button>

          <button
            onClick={() => setPreviewTab('sizes')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              previewTab === 'sizes'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>All Resolutions Grid</span>
          </button>
        </div>

        {/* Selected Environment Preview Display */}
        <div className="pt-6">
          {previewTab === 'browser' && (
            <div className="space-y-2">
              <BrowserTabPreview
                iconUrl={masterDataUrl}
                tabTitle={editorState.tabTitle || 'My Awesome Website'}
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 px-1">
                Visualizing how your icon displays in Chrome, Edge, and Arc browser tabs.
              </p>
            </div>
          )}

          {previewTab === 'header' && (
            <div className="space-y-2">
              <WebsiteHeaderPreview
                iconUrl={masterDataUrl}
                brandName={editorState.brandName || 'BrandName'}
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 px-1">
                Visualizing your generated icon as a web logo and navigation asset.
              </p>
            </div>
          )}

          {previewTab === 'mobile' && (
            <div className="space-y-2">
              <MobileAppPreview
                iconUrl={masterDataUrl}
                brandName={editorState.brandName || 'App'}
              />
              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center">
                Visualizing iOS & Android PWA home screen icon installation.
              </p>
            </div>
          )}

          {previewTab === 'sizes' && (
            <IconSizesGrid
              icons={icons}
              hasIco={Boolean(icoBlob)}
              onDownloadIco={handleDownloadIco}
            />
          )}
        </div>
      </div>

      {/* 🚀 FIRST-CLASS <link> TAG COPY CARD (Direct embed & production tags) */}
      <LinkSnippetCard
        masterDataUrl={masterDataUrl}
        icons={icons}
        editorState={editorState}
      />

      {/* Resolutions Grid (Always visible below for instant accessibility) */}
      {previewTab !== 'sizes' && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <IconSizesGrid
            icons={icons}
            hasIco={Boolean(icoBlob)}
            onDownloadIco={handleDownloadIco}
          />
        </div>
      )}
    </div>
  );
};
