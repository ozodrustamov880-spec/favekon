import React, { useState } from 'react';
import { Copy, Check, Code, Sparkles, Terminal, FileCode2, CheckCircle2 } from 'lucide-react';
import { GeneratedIcon, EditorState } from '../../types/favicon';

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

  // 32x32 data URL or master 512
  const icon32 = icons.find((i) => i.size === 32);
  const dataUriToUse = icon32?.dataUrl || masterDataUrl;

  // 1. Data URI format (Requires ZERO file hosting! Works instantly!)
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
<meta name="theme-color" content="${editorState.bgColor || '#ffffff'}">`;

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

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-brand-200 dark:border-brand-900/60 bg-gradient-to-b from-brand-50/50 via-white to-white dark:from-brand-950/20 dark:via-slate-900 dark:to-slate-900 p-6 shadow-sm transition-all">
      {/* Header with Copy CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-1">
            <Code className="w-3.5 h-3.5" />
            <span>&lt;link&gt; Teglari</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            HTML &lt;link&gt; Tegi Orqali Ulang
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Faylni yuklab olmasdan to'g'ridan-to'g'ri saytingizning <code className="text-brand-600 dark:text-brand-400 font-mono">&lt;head&gt;</code> qismiga nusxalab qo'ying!
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="self-start sm:self-auto px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold text-xs shadow-md shadow-brand-500/25 flex items-center gap-2 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Nusxalandi! (Copied)</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>&lt;link&gt; Tegni Nusxalash</span>
            </>
          )}
        </button>
      </div>

      {/* Snippet Mode Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 border-b border-slate-100 dark:border-slate-800 text-xs">
        <button
          onClick={() => setSnippetMode('data-uri')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            snippetMode === 'data-uri'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Data URI (Faylsiz to'g'ridan-to'g'ri)</span>
        </button>

        <button
          onClick={() => setSnippetMode('simple')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            snippetMode === 'simple'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Oddiy &lt;link rel="icon"&gt;</span>
        </button>

        <button
          onClick={() => setSnippetMode('standard')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            snippetMode === 'standard'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <FileCode2 className="w-3.5 h-3.5" />
          <span>To'liq &lt;head&gt; to'plami</span>
        </button>

        <button
          onClick={() => setSnippetMode('nextjs')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            snippetMode === 'nextjs'
              ? 'bg-brand-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Next.js Metadata</span>
        </button>
      </div>

      {/* Code Snippet Box */}
      <div className="relative group rounded-2xl bg-slate-950 p-4 border border-slate-800 shadow-inner overflow-hidden">
        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono pb-2 border-b border-slate-800/80">
          <span>
            {snippetMode === 'data-uri' && 'HTML head tegiga to\'g\'ridan-to\'g\'ri joylang (fayl yuklash shart emas)'}
            {snippetMode === 'simple' && 'Bitta standart favicon link tegi'}
            {snippetMode === 'standard' && 'HTML <head> uchun to\'liq teglari'}
            {snippetMode === 'nextjs' && 'Next.js App Router layout.tsx'}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Nusxalandi!' : 'Nusxa olish'}</span>
          </button>
        </div>

        <pre className="font-mono text-xs text-brand-300 dark:text-brand-300 overflow-x-auto whitespace-pre-wrap break-all max-h-40 selection:bg-brand-600 selection:text-white leading-relaxed">
          {getActiveCode()}
        </pre>
      </div>

      {/* Quick explanation pill */}
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>
          {snippetMode === 'data-uri' ? (
            <span>
              <strong>Maxsus imkoniyat:</strong> Ushbu kod tasvirni Base64 formatida o'zida saqlaydi, ya'ni serverga rasm joylashtirmasdan ham brauzer tabida favicon ko'rinadi!
            </span>
          ) : (
            <span>
              Ushbu kodni HTML faylingizning <code className="text-slate-800 dark:text-slate-200 font-mono font-bold">&lt;head&gt;...&lt;/head&gt;</code> qismiga joylashtiring.
            </span>
          )}
        </span>
      </div>
    </div>
  );
};
