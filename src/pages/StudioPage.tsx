import React from 'react';
import { FaviconEditor } from '../components/editor/FaviconEditor';
import { PageRoute } from '../types/routes';
import { Home, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface StudioPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-semibold text-slate-900 dark:text-white">All-in-One Studio</span>
        </nav>
      </div>

      <FaviconEditor />
    </div>
  );
};
