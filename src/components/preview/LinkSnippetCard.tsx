import React, { useState, useRef } from 'react';
import { Copy, Check, Code, Sparkles, Terminal, FileCode2, CheckCircle2, AlertCircle } from 'lucide-react';
import { GeneratedIcon, EditorState } from '../../types/favicon';
import { copyToClipboard } from '../../utils/clipboard';

interface LinkSnippetCardProps {
  masterDataUrl: string;
  icons: GeneratedIcon[];
  editorState: EditorState;
}

export const LinkSnippetCard: React.FC<LinkSnippetCardProps> = ({
  masterDataUrl,
  icons,
  editorState,
}) => {
  const [snippetMode, setSnippetMode] = useState<'data-uri' | 'standard' | 'simple' | 'nextjs'>('data-uri');
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // 32x32 data URL or master 512
  const icon32 = icons.find((i) => i.size === 32);
  const dataUriToUse = icon32?.dataUrl || masterDataUrl;

  // 1. Data URI format (Zero file hosting! Works instantly!)
  const dataUriSnippet = `<!-- Instant Favicon: No files needed! Paste directly into <head> -->
<link rel="icon" type="image/png" href="${dataUriToUse}">`;

  // 2. Simple single line standard link tag
  const simpleLinkSnippet = `<!-- Standard single favicon link -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">`;

  // 3. Full multi-platform production tags
  const standardSnippet = `<!-- Full Favicon Package: Paste inside <head> of your HTML -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="${editorState.bgColor || '#4f46e5'}">`;

  // 4. Next.js App Router metadata
  const nextJsSnippet = `// app/layout.tsx (Next.js Metadata)
export const metadata = {
  title: '${editorState.tabTitle || 'My Application'}',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
};`;

  const getActiveCode = () => {
    switch (snippetMode) {
      case 'data-uri':
        return dataUriSnippet;
      case 'simple':
        return simpleLinkSnippet;
      case 'standard':
        return standardSnippet;
      case 'nextjs':
        return nextJsSnippet;
      default:
        return dataUriSnippet;
    }
  };

  const handleCopy = async () => {
    const code = getActiveCode();
    
    // Select text in textarea if available
    if (textareaRef.current) {
      textareaRef.current.select();
      textareaRef.current.setSelectionRange(0, code.length);
    }

    const success = await copyToClipboard(code);
    if (success) {
      setCopied(true);
      setCopyFeedback('HTML <link> tegi buferga muvaffaqiyatli nusxalandi! Endi uni saytingizning <head> qismiga qo\'ying.');
      setTimeout(() => {
        setCopied(false);
        setCopyFeedback(null);
      }, 4000);
    } else {
      setCopyFeedback('Avtomatik nusxalash cheklangan: Iltimos, quyidagi kodni belgilab Ctrl+C bosing.');
    }
  };

  const handleTextareaClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  };

  return (
    <div id="link-snippet-section" className="rounded-3xl border-2 border-brand-300 dark:border-brand-800 bg-white dark:bg-slate-900 p-6 shadow-lg transition-all">
      {/* Header with Copy CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-1.5">
            <Code className="w-3.5 h-3.5" />
            <span>&lt;link&gt; Tegni Ulanishi</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            HTML &lt;link&gt; Tegini Nusxalash
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Faylni yuklab olmasdan, to'g'ridan-to'g'ri saytingizning <code className="text-brand-600 dark:text-brand-400 font-mono font-bold">&lt;head&gt;</code> qismiga joylashtiring!
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`self-start sm:self-auto px-6 py-3 rounded-2xl font-bold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-500/30 scale-105 ring-2 ring-emerald-400'
              : 'bg-brand-600 hover:bg-brand-500 active:scale-95 text-white shadow-brand-500/30'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Nusxalandi! ✅</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>&lt;link&gt; Tegni Nusxalash</span>
            </>
          )}
        </button>
      </div>

      {/* Success Notification Alert */}
      {copyFeedback && (
        <div className={`mb-4 p-3.5 rounded-2xl text-xs flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200 ${
          copied
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
            : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
        }`}>
          {copied ? <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" /> : <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />}
          <span className="font-medium">{copyFeedback}</span>
        </div>
      )}

      {/* Snippet Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
        <button
          type="button"
          onClick={() => setSnippetMode('data-uri')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            snippetMode === 'data-uri'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Data URI (Faylsiz / Bir zumda)</span>
        </button>

        <button
          type="button"
          onClick={() => setSnippetMode('simple')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            snippetMode === 'simple'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Oddiy &lt;link rel="icon"&gt;</span>
        </button>

        <button
          type="button"
          onClick={() => setSnippetMode('standard')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            snippetMode === 'standard'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>To'liq &lt;head&gt; to'plami</span>
        </button>

        <button
          type="button"
          onClick={() => setSnippetMode('nextjs')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            snippetMode === 'nextjs'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Next.js Metadata</span>
        </button>
      </div>

      {/* Interactive Code Box (Textarea + Auto Select) */}
      <div className="relative group rounded-2xl bg-slate-950 p-3.5 border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono pb-2 border-b border-slate-800/80">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            {snippetMode === 'data-uri' && 'Data URI: HTML-ga qo\'yish bilan rasm avtomatik chiqadi'}
            {snippetMode === 'simple' && 'Standart bitta qatorli favicon linki'}
            {snippetMode === 'standard' && 'HTML <head> uchun to\'liq platforma teglari'}
            {snippetMode === 'nextjs' && 'Next.js App Router layout.tsx'}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="font-sans font-bold">{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
          </button>
        </div>

        {/* Clickable & Selectable Textarea */}
        <textarea
          ref={textareaRef}
          readOnly
          value={getActiveCode()}
          onClick={handleTextareaClick}
          rows={snippetMode === 'standard' ? 6 : snippetMode === 'nextjs' ? 8 : 4}
          className="w-full bg-transparent font-mono text-xs text-brand-300 focus:outline-none focus:ring-1 focus:ring-brand-500 rounded-lg p-1 resize-none selection:bg-brand-600 selection:text-white leading-relaxed cursor-text"
        />
        
        <div className="text-[10px] text-slate-500 text-right mt-1 font-sans">
          Matn ustiga bosib butun kodni belgilashingiz yoki yuqoridagi tugmani bosishingiz mumkin.
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="mt-3.5 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
        <div>
          {snippetMode === 'data-uri' ? (
            <span>
              <strong>Faylsiz qulaylik:</strong> Rasm tasviri to'g'ridan-to'g'ri Base64 kodiga aylantirilgan. Hech qanday <code className="font-mono text-slate-800 dark:text-slate-200">.ico</code> yoki <code className="font-mono text-slate-800 dark:text-slate-200">.png</code> fayllarini serverga joylamasdan ishlaydi!
            </span>
          ) : (
            <span>
              Ushbu kodni HTML faylingizning <code className="text-slate-900 dark:text-white font-mono font-bold">&lt;head&gt;...&lt;/head&gt;</code> teglari oralig'iga joylashtiring.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
