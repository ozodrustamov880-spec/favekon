import React from 'react';
import { Type, Image as ImageIcon, Smile, Code2, ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types/routes';

interface ToolsGridProps {
  onNavigate: (route: PageRoute) => void;
}

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onNavigate }) => {
  const tools: {
    id: PageRoute;
    title: string;
    description: string;
    icon: any;
    color: string;
    badge: string;
    features: string[];
    cta: string;
  }[] = [
    {
      id: 'text-to-favicon',
      title: 'Text to Favicon',
      description: 'Generate stunning lettermarks, company initials, and monogram favicons with 12+ curated web fonts.',
      icon: Type,
      color: 'from-indigo-500 to-indigo-600',
      badge: 'Popular',
      features: ['Initials & Letters', 'Font weights & styles', 'Gradient & solid backgrounds'],
      cta: 'Open Text Generator Page',
    },
    {
      id: 'image-to-favicon',
      title: 'Image to Favicon',
      description: 'Transform any PNG, JPG, or WebP graphic into a complete, pixel-crisp multi-resolution favicon bundle.',
      icon: ImageIcon,
      color: 'from-blue-500 to-blue-600',
      badge: 'High-Res',
      features: ['Drag & drop upload', 'Crop, zoom & rotation', 'Transparent background'],
      cta: 'Open Image Converter Page',
    },
    {
      id: 'emoji-to-favicon',
      title: 'Emoji to Favicon',
      description: 'Choose from hundreds of categorized emojis to instantly give your project a fun, recognizable brand icon.',
      icon: Smile,
      color: 'from-amber-500 to-orange-500',
      badge: 'Instant',
      features: ['Categorized emoji picker', 'Fast emoji search', 'Custom shape backgrounds'],
      cta: 'Open Emoji Generator Page',
    },
    {
      id: 'svg-to-favicon',
      title: 'SVG to Favicon',
      description: 'Upload vector SVGs or paste XML code. Safely sanitized and converted to all standard bitmap resolutions.',
      icon: Code2,
      color: 'from-purple-500 to-violet-600',
      badge: 'Developer',
      features: ['Raw SVG markup paste', 'XSS sanitization sandbox', 'Lossless rasterization'],
      cta: 'Open SVG Converter Page',
    },
  ];

  return (
    <section id="tools" className="py-16 sm:py-24 border-t border-slate-200/70 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
            Dedicated Tools
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Choose Your Generator Page
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Each tool has its own dedicated workspace calibrated for that specific workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:border-brand-300 dark:hover:border-brand-700 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tool.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {tool.description}
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600 dark:text-slate-300">
                    {tool.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(tool.id)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-brand-600 hover:text-white dark:bg-slate-800 dark:hover:bg-brand-600 text-slate-800 dark:text-slate-200 transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
