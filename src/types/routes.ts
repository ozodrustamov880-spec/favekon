import { ToolType } from './favicon';

export type PageRoute =
  | 'home'
  | 'text-to-favicon'
  | 'image-to-favicon'
  | 'emoji-to-favicon'
  | 'svg-to-favicon'
  | 'editor'
  | 'favicon-checker'
  | 'documentation';

export interface RouteInfo {
  route: PageRoute;
  path: string;
  title: string;
  metaTitle: string;
  description: string;
  tool?: ToolType;
}

export const ROUTE_MAP: Record<PageRoute, RouteInfo> = {
  home: {
    route: 'home',
    path: '#/',
    title: 'Home',
    metaTitle: 'IconForge — Your brand, in one tiny icon.',
    description: 'Create, customize, preview, and download professional favicons for websites and apps in seconds.',
  },
  'text-to-favicon': {
    route: 'text-to-favicon',
    path: '#/text-to-favicon',
    title: 'Text to Favicon',
    metaTitle: 'Text to Favicon Generator — IconForge',
    description: 'Generate high-res lettermark favicons from initials, monograms, or short text with curated fonts and color gradients.',
    tool: 'text',
  },
  'image-to-favicon': {
    route: 'image-to-favicon',
    path: '#/image-to-favicon',
    title: 'Image to Favicon',
    metaTitle: 'Image to Favicon Converter — IconForge',
    description: 'Convert PNG, JPG, JPEG, and WebP logos into complete multi-size favicon.ico and Apple touch icon packages.',
    tool: 'image',
  },
  'emoji-to-favicon': {
    route: 'emoji-to-favicon',
    path: '#/emoji-to-favicon',
    title: 'Emoji to Favicon',
    metaTitle: 'Emoji to Favicon Generator — IconForge',
    description: 'Select from hundreds of searchable emojis to create colorful, recognizable website icons in seconds.',
    tool: 'emoji',
  },
  'svg-to-favicon': {
    route: 'svg-to-favicon',
    path: '#/svg-to-favicon',
    title: 'SVG to Favicon',
    metaTitle: 'SVG to Favicon Converter — IconForge',
    description: 'Upload vector SVG files or paste sanitized XML code to generate pixel-crisp raster favicons.',
    tool: 'svg',
  },
  editor: {
    route: 'editor',
    path: '#/editor',
    title: 'All-in-One Studio',
    metaTitle: 'Favicon Studio Workspace — IconForge',
    description: 'Full-featured favicon studio workspace with multi-tool tabs, live browser previews, and ZIP packaging.',
  },
  'favicon-checker': {
    route: 'favicon-checker',
    path: '#/favicon-checker',
    title: 'Favicon Checker',
    metaTitle: 'Website Favicon Checker & Inspector — IconForge',
    description: 'Inspect declared favicons, Apple touch icons, and web manifests from any public website domain.',
  },
  documentation: {
    route: 'documentation',
    path: '#/documentation',
    title: 'Documentation',
    metaTitle: 'Favicon Standards & Documentation — IconForge',
    description: 'Complete developer guide, technical specifications, and setup instructions for Next.js, Vite, and HTML.',
  },
};
