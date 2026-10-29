import React from 'react';
import { PageRoute } from '../../types/routes';
import { ToolType } from '../../types/favicon';
import { 
  ChevronRight, 
  Home, 
  Type, 
  Image as ImageIcon, 
  Smile, 
  Code2, 
  SlidersHorizontal,
  Download,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  Code
} from 'lucide-react';

interface ToolPageLayoutProps {
  currentRoute: PageRoute;
  activeTool: ToolType | 'all';
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  onNavigate: (route: PageRoute) => void;
  onOpenExport: () => void;
  children: React.ReactNode;
  rightPanel: React.ReactNode;
  guideContent?: React.ReactNode;
}

export const ToolPageLayout: React.FC<ToolPageLayoutProps> = ({
  currentRoute,
  activeTool,
  title,
  badge,
  description,
  icon,
  iconBgColor,
  onNavigate,
  onOpenExport,
  children,
  rightPanel,
  guideContent,
}) => {
  const toolNavItems: { route: PageRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'text-to-favicon', label: 'Text to Favicon', icon: <Type className="w-3.5 h-3.5" /> },
    { route: 'image-to-favicon', label: 'Image to Favicon', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { route: 'emoji-to-favicon', label: 'Emoji to Favicon', icon: <Smile className="w-3.5 h-3.5" /> },
    { route: 'svg-to-favicon', label: 'SVG to Favicon', icon: <Code2 className="w-3.5 h-3.5" /> },
    { route: 'editor', label: 'All-in-One Studio', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6 overflow-x-auto pb-1">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-slate-400 dark:text-slate-500">Generators</span>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="font-semibold text-slate-900 dark:text-white">{title}</span>
      </nav>

      {/* 2. Page Header Banner */}
      <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-indigo-50/30 to-brand-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/30 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl ${iconBgColor} text-white flex items-center justify-center shadow-lg flex-shrink-0 mt-0.5`}>
            {icon}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-200 dark:border-brand-900 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center flex-shrink-0">
          <button
            onClick={() => {
              const el = document.querySelector('pre');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                // Also trigger copy of the tag
                const tagMatch = el.textContent;
                if (tagMatch) {
                  navigator.clipboard.writeText(tagMatch);
                }
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 active:scale-95 transition-all"
          >
            <Code className="w-4 h-4" />
            <span>&lt;link&gt; Tegni Olish</span>
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Fayllarni Yuklash</span>
          </button>
        </div>
      </div>

      {/* 3. Sub-Nav Switcher Tabs */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 flex-shrink-0">
          Tools:
        </span>
        {toolNavItems.map((item) => {
          const isActive = currentRoute === item.route;
          return (
            <button
              key={item.route}
              onClick={() => onNavigate(item.route)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Main 2-Column Responsive Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        {/* Left Column: Dedicated Controls */}
        <div className="lg:col-span-5 space-y-6">
          {children}
        </div>

        {/* Right Column: Live Previews */}
        <div className="lg:col-span-7">
          {rightPanel}
        </div>
      </div>

      {/* 5. Tool-Specific Guide & Explanations */}
      {guideContent && (
        <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800">
          {guideContent}
        </div>
      )}

      {/* 6. Other Tools Recommendation Cards */}
      <div className="mt-16 p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Explore More Favicon Generators
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Need a different type of icon? IconForge has dedicated generators for any use case.
            </p>
          </div>
          <button
            onClick={() => onNavigate('home')}
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {currentRoute !== 'text-to-favicon' && (
            <button
              onClick={() => onNavigate('text-to-favicon')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-brand-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Type className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600">Text to Favicon</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Generate monograms & initials</div>
            </button>
          )}

          {currentRoute !== 'image-to-favicon' && (
            <button
              onClick={() => onNavigate('image-to-favicon')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <ImageIcon className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600">Image to Favicon</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Convert PNG/JPG logos to ICO</div>
            </button>
          )}

          {currentRoute !== 'emoji-to-favicon' && (
            <button
              onClick={() => onNavigate('emoji-to-favicon')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Smile className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600">Emoji to Favicon</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Searchable emoji library</div>
            </button>
          )}

          {currentRoute !== 'svg-to-favicon' && (
            <button
              onClick={() => onNavigate('svg-to-favicon')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 text-left transition-all shadow-xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-violet-50 dark:bg-violet-950 text-violet-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-600">SVG to Favicon</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Vector markup rasterizer</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

