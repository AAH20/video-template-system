export interface Position {
  x: number;
  y: number;
}

export interface TextStyle {
  fontSize: number;
  color: string;
  fontFamily?: string;
  fontWeight?: string;
  textAlign?: 'left' | 'center' | 'right';
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
}

export interface ImageStyle {
  width: number;
  height: number;
  borderRadius?: number;
  opacity?: number;
}

export interface Animation {
  type: 'fadeIn' | 'fadeOut' | 'slideIn' | 'slideOut' | 'scaleIn' | 'scaleOut';
  duration: number;
  delay?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

export interface TextElement {
  type: 'text';
  content: string;
  position: Position;
  style: TextStyle;
  animation?: Animation;
}

export interface ImageElement {
  type: 'image';
  src: string;
  position: Position;
  style: ImageStyle;
  animation?: Animation;
}

export interface ShapeElement {
  type: 'shape';
  shape: 'rectangle' | 'circle' | 'triangle';
  position: Position;
  size: { width: number; height: number };
  style: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
  };
  animation?: Animation;
}

export type Element = TextElement | ImageElement | ShapeElement;

export interface Scene {
  id: string;
  duration: number;
  backgroundColor?: string;
  elements: Element[];
  transitions?: {
    in?: Animation;
    out?: Animation;
  };
}

export interface VideoTemplate {
  name: string;
  description?: string;
  duration: number;
  width: number;
  height: number;
  fps: number;
  scenes: Scene[];
  metadata?: {
    author?: string;
    version?: string;
    tags?: string[];
  };
}

export interface TemplateData {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: string[];
  colors?: {
    primary?: string;
    secondary?: string;
    background?: string;
  };
  customText?: Record<string, string>;
}

export interface RenderOptions {
  outputPath: string;
  quality?: 'low' | 'medium' | 'high';
  format?: 'mp4' | 'webm' | 'gif';
  audio?: {
    enabled: boolean;
    src?: string;
    volume?: number;
  };
}

export interface VideoGeneratorConfig {
  ffmpegPath?: string;
  tempDir?: string;
  maxConcurrency?: number;
} 