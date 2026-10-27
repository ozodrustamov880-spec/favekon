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
  HelpCircle 
} from 'lucide-react';
import { ToolType } from '../../types/favicon';

interface NavbarProps {
  currentTab: 'landing' | 'editor' | 'checker' | 'docs';
  setCurrentTab: (tab: 'landing' | 'editor' | 'checker' | 'docs') => void;
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  setSelectedTool,
  isDark,
  toggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const handleToolSelect = (tool: ToolType) => {
    setSelectedTool(tool);
    setCurrentTab('editor');
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => {
            setCurrentTab('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1 -ml-1"
        >
          <BrandLogo size="md" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentTab === 'editor'
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>Generators</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <button
                  onClick={() => handleToolSelect('text')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 text-left transition-colors group"
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
                  onClick={() => handleToolSelect('image')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 text-left transition-colors group"
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
                  onClick={() => handleToolSelect('emoji')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 text-left transition-colors group"
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
                  onClick={() => handleToolSelect('svg')}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 text-left transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-950 text-violet-600 dark:text-violet-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">SVG to Favicon</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Vector markup & sanitization</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Favicon Checker */}
          <button
            onClick={() => setCurrentTab('checker')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'checker'
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Favicon Checker</span>
          </button>

          {/* How It Works Link */}
          <button
            onClick={() => {
              if (currentTab !== 'landing') {
                setCurrentTab('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            How It Works
          </button>

          {/* Documentation */}
          <button
            onClick={() => setCurrentTab('docs')}
            className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              currentTab === 'docs'
                ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Documentation</span>
          </button>
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Primary CTA */}
          <button
            onClick={() => setCurrentTab('editor')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-semibold text-sm shadow-md shadow-brand-500/20 hover:shadow-brand-500/30 active:scale-98 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Create Favicon</span>
          </button>

          {/* Mobile menu button */}
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
            Favicon Tools
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleToolSelect('text')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-medium text-sm"
            >
              <Type className="w-4 h-4 text-indigo-500" />
              <span>Text</span>
            </button>
            <button
              onClick={() => handleToolSelect('image')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-medium text-sm"
            >
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>Image</span>
            </button>
            <button
              onClick={() => handleToolSelect('emoji')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-medium text-sm"
            >
              <Smile className="w-4 h-4 text-amber-500" />
              <span>Emoji</span>
            </button>
            <button
              onClick={() => handleToolSelect('svg')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-medium text-sm"
            >
              <Code2 className="w-4 h-4 text-violet-500" />
              <span>SVG</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
            <button
              onClick={() => {
                setCurrentTab('checker');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-4 h-4 text-brand-500" />
              <span>Favicon Checker</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('docs');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Documentation & Standards</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('landing');
                setMobileMenuOpen(false);
                setTimeout(() => {
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <HelpCircle className="w-4 h-4 text-cyan-500" />
              <span>Frequently Asked Questions</span>
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentTab('editor');
              setMobileMenuOpen(false);
            }}
            className="w-full mt-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-brand-500/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Editor</span>
          </button>
        </div>
      )}
    </header>
  );
};
