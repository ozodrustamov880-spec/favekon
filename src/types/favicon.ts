export type ToolType = 'text' | 'image' | 'emoji' | 'svg';

export type ShapeType = 'rounded' | 'circle' | 'square' | 'squircle';

export type BackgroundType = 'solid' | 'gradient' | 'transparent';

export type GradientDirection = 'to-r' | 'to-br' | 'to-b' | 'to-tr' | 'radial';

export interface EditorState {
  tool: ToolType;
  
  // Text Tool
  text: string;
  fontFamily: string;
  fontSize: number; // percentage (10 to 120)
  fontWeight: '300' | '400' | '500' | '600' | '700' | '800' | '900';
  letterSpacing: number;
  textColor: string;
  textShadow: boolean;
  
  // Shape & Styling
  shape: ShapeType;
  borderRadius: number; // percentage (0 to 50)
  padding: number; // percentage (0 to 50)
  borderWidth: number; // in px at 512 base
  borderColor: string;
  shadow: boolean;
  shadowColor: string;
  shadowBlur: number;
  
  // Background
  backgroundType: BackgroundType;
  bgColor: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgGradientDirection: GradientDirection;
  
  // Image Tool
  imageSrc: string | null;
  imageFit: 'contain' | 'cover' | 'fill';
  imageScale: number; // 0.2 to 3.0
  imageRotation: number; // -180 to 180
  imageOffsetX: number; // -100 to 100
  imageOffsetY: number; // -100 to 100
  
  // Emoji Tool
  emoji: string;
  emojiScale: number; // percentage (20 to 120)
  
  // SVG Tool
  svgCode: string;
  svgColorOverride: boolean;
  svgColor: string;
  
  // Preview customization
  tabTitle: string;
  brandName: string;
}

export interface GeneratedIcon {
  size: number;
  name: string;
  dataUrl: string;
  blob: Blob;
  description: string;
  purpose: string;
}

export interface DesignPreset {
  id: string;
  name: string;
  category: 'minimal' | 'gradient' | 'modern' | 'bold' | 'emoji';
  previewIcon: string;
  config: Partial<EditorState>;
}
