import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { FaviconEditor } from './components/editor/FaviconEditor';
import { FaviconChecker } from './components/checker/FaviconChecker';
import { DocumentationPage } from './components/docs/DocumentationPage';
import { ToolType } from './types/favicon';
import { Sparkles } from 'lucide-react';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState<'landing' | 'editor' | 'checker' | 'docs'>('landing');
  const [selectedTool, setSelectedTool] = useState<ToolType>('text');

  // Handle browser back button or hash navigation if any
  const handleStartCreating = () => {
    setCurrentTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (tool: ToolType) => {
    setSelectedTool(tool);
    setCurrentTab('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChecker = () => {
    setCurrentTab('checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDocs = () => {
    setCurrentTab('docs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedTool={selectedTool}
        setSelectedTool={setSelectedTool}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartCreating={handleStartCreating}
            onSelectTool={handleSelectTool}
          />
        )}

        {currentTab === 'editor' && (
          <FaviconEditor initialTool={selectedTool} />
        )}

        {currentTab === 'checker' && (
          <FaviconChecker />
        )}

        {currentTab === 'docs' && (
          <DocumentationPage />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTool={handleSelectTool}
        onOpenChecker={handleOpenChecker}
        onOpenDocs={handleOpenDocs}
      />

      {/* Floating CTA Pill on Landing Page */}
      {currentTab === 'landing' && (
        <div className="fixed bottom-6 right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={handleStartCreating}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-slate-700 dark:border-slate-200"
          >
            <Sparkles className="w-4 h-4 text-brand-400 dark:text-brand-600" />
            <span>Launch Favicon Studio</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
