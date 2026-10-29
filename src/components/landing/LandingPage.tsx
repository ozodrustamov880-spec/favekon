import React from 'react';
import { Hero } from './Hero';
import { ToolsGrid } from './ToolsGrid';
import { IconShowcase } from './IconShowcase';
import { HowItWorks } from './HowItWorks';
import { SupportedFormats } from './SupportedFormats';
import { FAQSection } from './FAQSection';
import { PageRoute } from '../../types/routes';

interface LandingPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0">
      <Hero onNavigate={onNavigate} />
      <ToolsGrid onNavigate={onNavigate} />
      <IconShowcase onNavigate={onNavigate} />
      <HowItWorks />
      <SupportedFormats />
      <FAQSection />
    </div>
  );
};
