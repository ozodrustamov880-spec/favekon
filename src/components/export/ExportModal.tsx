import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Copy, 
  Archive, 
  FileCode, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedIcon, EditorState } from '../../types/favicon';
import { 
  createAndDownloadZip, 
  generateHtmlSnippet, 
  generateWebmanifest, 
  generateReadme, 
  triggerDownload 
} from '../../utils/zipExporter';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  icons: GeneratedIcon[];
  icoBlob: Blob | null;
  editorState: EditorState;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  icons,
  icoBlob,
  editorState,
}) => {
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [activeTab, setActiveTab] = useState<'files' | 'html' | 'manifest' | 'readme'>('files');
  const [isZipping, setIsZipping] = useState(false);

  if (!isOpen) return null;

  const htmlSnippet = generateHtmlSnippet();
  const manifestSnippet = generateWebmanifest(editorState.brandName || 'My Application', editorState.bgColor || '#4f46e5');
  const readmeSnippet = generateReadme(editorState.brandName || 'My Application');

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleDownloadZip = async () => {
    if (!icoBlob) return;
    setIsZipping(true);
    try {
      // Fire celebration confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6'],
      });

      await createAndDownloadZip({
        icons,
        icoBlob,
        appName: editorState.brandName || 'IconForge Favicon',
        themeColor: editorState.bgColor || '#4f46e5',
      });
    } catch (err) {
      console.error('Failed to create zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadSingle = (blob: Blob, filename: string) => {
    triggerDownload(blob, filename);
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([manifestSnippet], { type: 'application/json' });
    triggerDownload(blob, 'site.webmanifest');
  };

  const handleDownloadReadme = () => {
    const blob = new Blob([readmeSnippet], { type: 'text/markdown' });
    triggerDownload(blob, 'README.md');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-500 text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Favicon Export Package</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold">
                  Ready
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Production-grade package compliant with modern browser & platform standards.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Hero Bar */}
        <div className="p-6 bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl checkerboard p-1 shadow-inner flex items-center justify-center border-2 border-white/20">
              {icons.find(i => i.size === 512)?.dataUrl && (
                <img
                  src={icons.find(i => i.size === 512)!.dataUrl}
                  alt="Final Favicon"
                  className="w-14 h-14 object-contain rounded-xl"
                />
              )}
            </div>
            <div>
              <div className="font-bold text-base">Complete Favicon Suite</div>
              <div className="text-xs text-white/80">
                All 6 PNG sizes + binary favicon.ico + webmanifest + installation code
              </div>
            </div>
          </div>

          <button
            onClick={handleDownloadZip}
            disabled={isZipping || !icoBlob}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white text-brand-700 hover:bg-slate-50 font-bold text-sm shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Archive className="w-4 h-4" />
            <span>{isZipping ? 'Packaging ZIP...' : 'Download All as ZIP'}</span>
          </button>
        </div>

        {/* Tab navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('files')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'files'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <span>Individual Files ({icons.length + 3})</span>
          </button>

          <button
            onClick={() => setActiveTab('html')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'html'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML &lt;head&gt; Code</span>
          </button>

          <button
            onClick={() => setActiveTab('manifest')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'manifest'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>site.webmanifest</span>
          </button>

          <button
            onClick={() => setActiveTab('readme')}
            className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'readme'
                ? 'border-brand-600 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>README Instructions</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'files' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                You can download each file individually or grab the entire bundle above.
              </div>

              {/* Special row for favicon.ico */}
              {icoBlob && (
                <div className="p-3.5 rounded-2xl border border-brand-200 dark:border-brand-900/60 bg-brand-50/40 dark:bg-brand-950/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/80 flex items-center justify-center text-brand-600 dark:text-brand-300 font-mono font-bold text-xs">
                      ICO
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                        favicon.ico
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Multi-resolution binary (16x16, 32x32, 48x48)
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadSingle(icoBlob, 'favicon.ico')}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}

              {/* PNG icon rows */}
              {icons.map((icon) => (
                <div
                  key={icon.name}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl checkerboard p-1 flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                      <img
                        src={icon.dataUrl}
                        alt={icon.name}
                        className="w-8 h-8 object-contain"
                        style={{ imageRendering: icon.size <= 32 ? 'pixelated' : 'auto' }}
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                        {icon.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {icon.size}×{icon.size} • {icon.description}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadSingle(icon.blob, icon.name)}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}

              {/* Manifest & Readme single download */}
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-mono text-xs">
                    JSON
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      site.webmanifest
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      PWA specification manifest
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownloadManifest}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-mono text-xs">
                    MD
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white font-mono">
                      README.md
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Step-by-step setup guide
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleDownloadReadme}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'html' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Insert this snippet inside the <code className="text-brand-600 dark:text-brand-400">&lt;head&gt;</code> element of your website:
                </p>
                <button
                  onClick={handleCopyHtml}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 text-white hover:bg-brand-500 flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  {copiedHtml ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy HTML</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{htmlSnippet}</pre>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">Pro-tip:</span> Browsers cache favicons aggressively. After uploading these files to your server, open an Incognito tab or use <kbd className="px-1.5 py-0.5 rounded bg-amber-200/50 dark:bg-amber-900/50">Ctrl+F5</kbd> to see your new favicon immediately.
              </div>
            </div>
          )}

          {activeTab === 'manifest' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Web Application Manifest for Android and Progressive Web Apps (PWA):
                </p>
                <button
                  onClick={handleDownloadManifest}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Manifest</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{manifestSnippet}</pre>
              </div>
            </div>
          )}

          {activeTab === 'readme' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Complete documentation and platform-specific guides:
                </p>
                <button
                  onClick={handleDownloadReadme}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download README.md</span>
                </button>
              </div>

              <div className="relative rounded-2xl bg-slate-950 p-4 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-800 shadow-inner">
                <pre>{readmeSnippet}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/40">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Clean binary files, zero watermarks</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

