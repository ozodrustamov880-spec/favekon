import React, { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useRouter } from './hooks/useRouter';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { TextFaviconPage } from './pages/TextFaviconPage';
import { ImageFaviconPage } from './pages/ImageFaviconPage';
import { EmojiFaviconPage } from './pages/EmojiFaviconPage';
import { SvgFaviconPage } from './pages/SvgFaviconPage';
import { StudioPage } from './pages/StudioPage';
import { FaviconChecker } from './components/checker/FaviconChecker';
import { DocumentationPage } from './components/docs/DocumentationPage';
import { EditorState } from './types/favicon';
import { Sparkles } from 'lucide-react';

const INITIAL_SHARED_STATE: EditorState = {
  tool: 'text',
  text: 'IF',
  fontFamily: 'Plus Jakarta Sans',
  fontSize: 54,
  fontWeight: '800',
  letterSpacing: 0,
  textColor: '#FFFFFF',
  textShadow: false,
  shape: 'squircle',
  borderRadius: 24,
  padding: 0,
  borderWidth: 0,
  borderColor: '#4338CA',
  shadow: true,
  shadowColor: '#4f46e5',
  shadowBlur: 20,
  backgroundType: 'gradient',
  bgColor: '#4F46E5',
  bgGradientFrom: '#4F46E5',
  bgGradientTo: '#7C3AED',
  bgGradientDirection: 'to-br',
  imageSrc: null,
  imageFit: 'contain',
  imageScale: 1.0,
  imageRotation: 0,
  imageOffsetX: 0,
  imageOffsetY: 0,
  emoji: '🚀',
  emojiScale: 75,
  svgCode: `<svg viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
</svg>`,
  svgColorOverride: false,
  svgColor: '#FFFFFF',
  tabTitle: 'IconForge — Fast Favicons',
  brandName: 'IconForge',
};

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const { currentRoute, navigate } = useRouter();

  // Persistent shared state across tool transitions
  const [sharedState, setSharedState] = useState<EditorState>(INITIAL_SHARED_STATE);

  const updateSharedState = (updates: Partial<EditorState>) => {
    setSharedState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <LandingPage onNavigate={navigate} />
        )}

        {currentRoute === 'text-to-favicon' && (
          <TextFaviconPage
            onNavigate={navigate}
            sharedState={sharedState}
            onUpdateSharedState={updateSharedState}
          />
        )}

        {currentRoute === 'image-to-favicon' && (
          <ImageFaviconPage
            onNavigate={navigate}
            sharedState={sharedState}
            onUpdateSharedState={updateSharedState}
          />
        )}

        {currentRoute === 'emoji-to-favicon' && (
          <EmojiFaviconPage
            onNavigate={navigate}
            sharedState={sharedState}
            onUpdateSharedState={updateSharedState}
          />
        )}

        {currentRoute === 'svg-to-favicon' && (
          <SvgFaviconPage
            onNavigate={navigate}
            sharedState={sharedState}
            onUpdateSharedState={updateSharedState}
          />
        )}

        {currentRoute === 'editor' && (
          <StudioPage onNavigate={navigate} />
        )}

        {currentRoute === 'favicon-checker' && (
          <FaviconChecker onNavigate={navigate} />
        )}

        {currentRoute === 'documentation' && (
          <DocumentationPage onNavigate={navigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Floating CTA Pill on Landing Page */}
      {currentRoute === 'home' && (
        <div className="fixed bottom-6 right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => navigate('text-to-favicon')}
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
