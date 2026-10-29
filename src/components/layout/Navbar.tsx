import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  Type, 
  Image as ImageIcon, 
  Smile, 
  Code2, 
  BookOpen, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { PageRoute } from '../../types/routes';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  isDark,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const isGeneratorActive = [
    'text-to-favicon',
    'image-to-favicon',
    'emoji-to-favicon',
    'svg-to-favicon',
    'editor',
  ].includes(currentRoute);

  const handleSelectRoute = (route: PageRoute) => {
    onNavigate(route);
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => handleSelectRoute('home')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1 -ml-1"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {/* Home Link */}
          <button
            onClick={() => handleSelectRoute('home')}
            className={`px-3 py-2 rounded-xl transition-colors ${
              currentRoute === 'home'
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Home
          </button>

          {/* Generators Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
                isGeneratorActive
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4 text-brand-500" />
              <span>Generators</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleSelectRoute('text-to-favicon')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                    currentRoute === 'text-to-favicon' ? 'bg-brand-50 dark:bg-brand-950/80' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Type className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Text to Favicon</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Letters, initials & typography</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRoute('image-to-favicon')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                    currentRoute === 'image-to-favicon' ? 'bg-brand-50 dark:bg-brand-950/80' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Image to Favicon</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WebP photo upload</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRoute('emoji-to-favicon')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                    currentRoute === 'emoji-to-favicon' ? 'bg-brand-50 dark:bg-brand-950/80' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">Emoji to Favicon</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Searchable emoji library</div>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectRoute('svg-to-favicon')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group ${
                    currentRoute === 'svg-to-favicon' ? 'bg-brand-50 dark:bg-brand-950/80' : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">SVG to Favicon</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Vector markup & sanitization</div>
                  </div>
                </button>

                <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleSelectRoute('editor')}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Open All-in-One Studio
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Favicon Checker */}
          <button
            onClick={() => handleSelectRoute('favicon-checker')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
              currentRoute === 'favicon-checker'
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Favicon Checker</span>
          </button>

          {/* Documentation */}
          <button
            onClick={() => handleSelectRoute('documentation')}
            className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 ${
              currentRoute === 'documentation'
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </button>
        </nav>

        {/* Right Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Create Favicon button */}
          <button
            onClick={() => handleSelectRoute('text-to-favicon')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-semibold text-sm shadow-md shadow-brand-500/20 active:scale-98 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Favicon</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4 duration-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-2">
            Favicon Generator Pages
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleSelectRoute('text-to-favicon')}
              className={`flex items-center gap-2 p-2.5 rounded-xl font-medium text-sm transition-colors ${
                currentRoute === 'text-to-favicon' ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 font-bold' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Type className="w-4 h-4 text-indigo-500" />
              <span>Text</span>
            </button>

            <button
              onClick={() => handleSelectRoute('image-to-favicon')}
              className={`flex items-center gap-2 p-2.5 rounded-xl font-medium text-sm transition-colors ${
                currentRoute === 'image-to-favicon' ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 font-bold' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>Image</span>
            </button>

            <button
              onClick={() => handleSelectRoute('emoji-to-favicon')}
              className={`flex items-center gap-2 p-2.5 rounded-xl font-medium text-sm transition-colors ${
                currentRoute === 'emoji-to-favicon' ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 font-bold' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Smile className="w-4 h-4 text-amber-500" />
              <span>Emoji</span>
            </button>

            <button
              onClick={() => handleSelectRoute('svg-to-favicon')}
              className={`flex items-center gap-2 p-2.5 rounded-xl font-medium text-sm transition-colors ${
                currentRoute === 'svg-to-favicon' ? 'bg-brand-50 dark:bg-brand-950 text-brand-600 font-bold' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4 text-violet-500" />
              <span>SVG</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <button
              onClick={() => handleSelectRoute('home')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span>Home</span>
            </button>
            <button
              onClick={() => handleSelectRoute('favicon-checker')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4 text-brand-500" />
              <span>Favicon Checker</span>
            </button>
            <button
              onClick={() => handleSelectRoute('documentation')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Documentation</span>
            </button>
            <button
              onClick={() => handleSelectRoute('editor')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
              <span>All-in-One Studio</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
