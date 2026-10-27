import React from 'react';
import { Hero } from './Hero';
import { ToolsGrid } from './ToolsGrid';
import { IconShowcase } from './IconShowcase';
import { HowItWorks } from './HowItWorks';
import { SupportedFormats } from './SupportedFormats';
import { FAQSection } from './FAQSection';
import { ToolType } from '../../types/favicon';

interface LandingPageProps {
  onStartCreating: () => void;
  onSelectTool: (tool: ToolType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartCreating,
  onSelectTool,
}) => {
  return (
    <div className="space-y-0">
      <Hero onStartCreating={onStartCreating} onSelectTool={onSelectTool} />
      <ToolsGrid onSelectTool={onSelectTool} />
      <IconShowcase onStartCreating={onStartCreating} />
      <HowItWorks />
      <SupportedFormats />
      <FAQSection />
    </div>
  );
};
