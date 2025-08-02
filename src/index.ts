import { VideoGenerator } from './generators/VideoGenerator';
import { TemplateManager } from './template-manager/TemplateManager';
import { cursorAIIntroTemplate } from './templates/cursor-ai-intro';
import { RenderOptions } from './types';
import * as path from 'path';

export class VideoTemplateSystem {
  private generator: VideoGenerator;
  private templateManager: TemplateManager;

  constructor() {
    this.generator = new VideoGenerator({
      tempDir: path.join(process.cwd(), 'temp'),
      maxConcurrency: 4
    });
    this.templateManager = new TemplateManager();
  }

  public async initialize(): Promise<void> {
    await this.templateManager.initialize();
    
    // Save the built-in Cursor AI template
    await this.templateManager.saveTemplate('cursor-ai-intro', cursorAIIntroTemplate);
    
    console.log('Video Template System initialized successfully');
  }

  public async generateVideo(
    templateName: string,
    data: Record<string, any> = {},
    outputPath: string,
    options: Partial<RenderOptions> = {}
  ): Promise<string> {
    const template = this.templateManager.getTemplate(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    const renderOptions: RenderOptions = {
      outputPath,
      quality: 'medium',
      format: 'mp4',
      ...options
    };

    return this.generator.generateVideo(template, data, renderOptions);
  }

  public async generatePreview(
    templateName: string,
    data: Record<string, any> = {},
    duration: number = 5
  ): Promise<string> {
    const template = this.templateManager.getTemplate(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    return this.generator.generatePreview(template, data, duration);
  }

  public async generateThumbnail(
    templateName: string,
    data: Record<string, any> = {},
    sceneIndex: number = 0
  ): Promise<string> {
    const template = this.templateManager.getTemplate(templateName);
    if (!template) {
      throw new Error(`Template '${templateName}' not found`);
    }

    return this.generator.generateThumbnail(template, data, sceneIndex);
  }

  public getTemplateManager(): TemplateManager {
    return this.templateManager;
  }

  public getGenerator(): VideoGenerator {
    return this.generator;
  }
}

// Example usage
async function main() {
  try {
    const system = new VideoTemplateSystem();
    await system.initialize();

    console.log('Available templates:', system.getTemplateManager().getTemplateNames());

    // Example: Generate a Cursor AI intro video with custom data
    const customData = {
      title: "Cursor AI",
      subtitle: "Revolutionary Code Editor",
      features: [
        "AI Code Completion",
        "Instant Refactoring", 
        "Smart Suggestions",
        "Lightning Fast"
      ]
    };

    const outputPath = path.join(process.cwd(), 'output', 'cursor-ai-video.mp4');
    
    console.log('Generating video...');
    const videoPath = await system.generateVideo(
      'cursor-ai-intro',
      customData,
      outputPath,
      { quality: 'high' }
    );
    
    console.log(`Video generated successfully: ${videoPath}`);

    // Generate a preview
    console.log('Generating preview...');
    const previewPath = await system.generatePreview('cursor-ai-intro', customData, 5);
    console.log(`Preview generated: ${previewPath}`);

    // Generate a thumbnail
    console.log('Generating thumbnail...');
    const thumbnailPath = await system.generateThumbnail('cursor-ai-intro', customData, 0);
    console.log(`Thumbnail generated: ${thumbnailPath}`);

  } catch (error) {
    console.error('Error in main:', error);
    process.exit(1);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}

export default VideoTemplateSystem; 