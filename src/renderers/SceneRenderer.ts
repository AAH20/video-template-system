import { createCanvas, Canvas, CanvasRenderingContext2D } from 'canvas';
import { Scene, Element, TextElement, ImageElement, ShapeElement, Animation } from '../types';

export class SceneRenderer {
  private canvas: Canvas;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext('2d');
  }

  public renderScene(scene: Scene, timeInScene: number): Buffer {
    // Clear canvas with background color
    this.ctx.fillStyle = scene.backgroundColor || '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render each element
    for (const element of scene.elements) {
      this.renderElement(element, timeInScene);
    }

    return this.canvas.toBuffer('image/png');
  }

  private renderElement(element: Element, timeInScene: number): void {
    const animationProgress = this.calculateAnimationProgress(element.animation, timeInScene);
    
    if (animationProgress === 0) return; // Element not visible yet

    this.ctx.save();
    
    // Apply animation transformations
    this.applyAnimation(element.animation, animationProgress);

    switch (element.type) {
      case 'text':
        this.renderTextElement(element, animationProgress);
        break;
      case 'image':
        this.renderImageElement(element, animationProgress);
        break;
      case 'shape':
        this.renderShapeElement(element, animationProgress);
        break;
    }

    this.ctx.restore();
  }

  private renderTextElement(element: TextElement, opacity: number): void {
    const { content, position, style } = element;

    // Set text properties
    this.ctx.font = `${style.fontWeight || 'normal'} ${style.fontSize}px ${style.fontFamily || 'Arial'}`;
    this.ctx.fillStyle = style.color;
    this.ctx.textAlign = style.textAlign || 'left';
    this.ctx.globalAlpha = opacity;

    // Apply text shadow if specified
    if (style.shadowColor) {
      this.ctx.shadowColor = style.shadowColor;
      this.ctx.shadowBlur = style.shadowBlur || 0;
      this.ctx.shadowOffsetX = style.shadowOffsetX || 0;
      this.ctx.shadowOffsetY = style.shadowOffsetY || 0;
    }

    // Draw text
    this.ctx.fillText(content, position.x, position.y);
  }

  private renderImageElement(element: ImageElement, opacity: number): void {
    // Note: In a real implementation, you would load and cache images
    // For this demo, we'll create a placeholder rectangle
    const { position, style } = element;

    this.ctx.globalAlpha = opacity * (style.opacity || 1);
    this.ctx.fillStyle = '#666666';
    this.ctx.fillRect(position.x, position.y, style.width, style.height);

    // Add border radius if specified
    if (style.borderRadius) {
      this.ctx.beginPath();
      this.ctx.roundRect(position.x, position.y, style.width, style.height, style.borderRadius);
      this.ctx.fill();
    }

    // Add placeholder text
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Image', position.x + style.width / 2, position.y + style.height / 2 + 6);
  }

  private renderShapeElement(element: ShapeElement, opacity: number): void {
    const { shape, position, size, style } = element;

    this.ctx.globalAlpha = opacity;

    if (style.fillColor) {
      this.ctx.fillStyle = style.fillColor;
    }
    if (style.strokeColor) {
      this.ctx.strokeStyle = style.strokeColor;
      this.ctx.lineWidth = style.strokeWidth || 1;
    }

    switch (shape) {
      case 'rectangle':
        this.ctx.fillRect(position.x, position.y, size.width, size.height);
        if (style.strokeColor) {
          this.ctx.strokeRect(position.x, position.y, size.width, size.height);
        }
        break;
      case 'circle':
        this.ctx.beginPath();
        this.ctx.arc(
          position.x + size.width / 2,
          position.y + size.height / 2,
          Math.min(size.width, size.height) / 2,
          0,
          2 * Math.PI
        );
        this.ctx.fill();
        if (style.strokeColor) {
          this.ctx.stroke();
        }
        break;
      case 'triangle':
        this.ctx.beginPath();
        this.ctx.moveTo(position.x + size.width / 2, position.y);
        this.ctx.lineTo(position.x, position.y + size.height);
        this.ctx.lineTo(position.x + size.width, position.y + size.height);
        this.ctx.closePath();
        this.ctx.fill();
        if (style.strokeColor) {
          this.ctx.stroke();
        }
        break;
    }
  }

  private calculateAnimationProgress(animation?: Animation, timeInScene: number): number {
    if (!animation) return 1;

    const startTime = animation.delay || 0;
    const endTime = startTime + animation.duration;

    if (timeInScene < startTime) return 0;
    if (timeInScene >= endTime) return 1;

    const progress = (timeInScene - startTime) / animation.duration;
    return this.applyEasing(progress, animation.easing || 'linear');
  }

  private applyEasing(progress: number, easing: string): number {
    switch (easing) {
      case 'easeIn':
        return progress * progress;
      case 'easeOut':
        return 1 - (1 - progress) * (1 - progress);
      case 'easeInOut':
        return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }

  private applyAnimation(animation?: Animation, progress: number): void {
    if (!animation) return;

    switch (animation.type) {
      case 'fadeIn':
        this.ctx.globalAlpha = progress;
        break;
      case 'fadeOut':
        this.ctx.globalAlpha = 1 - progress;
        break;
      case 'slideIn':
        this.ctx.translate(-100 * (1 - progress), 0);
        break;
      case 'slideOut':
        this.ctx.translate(100 * progress, 0);
        break;
      case 'scaleIn':
        const scale = 0.5 + 0.5 * progress;
        this.ctx.scale(scale, scale);
        break;
      case 'scaleOut':
        const scaleOut = 1 - 0.5 * progress;
        this.ctx.scale(scaleOut, scaleOut);
        break;
    }
  }

  public getCanvas(): Canvas {
    return this.canvas;
  }

  public getContext(): CanvasRenderingContext2D {
    return this.ctx;
  }
} 