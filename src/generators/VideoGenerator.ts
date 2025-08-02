import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs-extra';
import * as path from 'path';
import { SceneRenderer } from '../renderers/SceneRenderer';
import { VideoTemplate, Scene, RenderOptions, VideoGeneratorConfig } from '../types';

export class VideoGenerator {
  private config: VideoGeneratorConfig;
  private tempDir: string;

  constructor(config: VideoGeneratorConfig = {}) {
    this.config = {
      ffmpegPath: config.ffmpegPath,
      tempDir: config.tempDir || path.join(process.cwd(), 'temp'),
      maxConcurrency: config.maxConcurrency || 4,
      ...config
    };
    this.tempDir = this.config.tempDir!;
  }

  public async generateVideo(
    template: VideoTemplate,
    data: Record<string, any> = {},
    options: RenderOptions
  ): Promise<string> {
    try {
      // Ensure temp directory exists
      await fs.ensureDir(this.tempDir);

      // Create scene renderer
      const renderer = new SceneRenderer(template.width, template.height);

      // Generate frames for each scene
      const framePaths = await this.generateFrames(template, data, renderer);

      // Combine frames into video
      const outputPath = await this.combineFrames(framePaths, template, options);

      // Clean up temporary files
      await this.cleanup(framePaths);

      return outputPath;
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  private async generateFrames(
    template: VideoTemplate,
    data: Record<string, any>,
    renderer: SceneRenderer
  ): Promise<string[]> {
    const framePaths: string[] = [];
    let frameIndex = 0;

    for (const scene of template.scenes) {
      const sceneData = this.applyDataToScene(scene, data);
      const frameCount = Math.ceil(scene.duration * template.fps);

      for (let i = 0; i < frameCount; i++) {
        const timeInScene = i / template.fps;
        const frameBuffer = renderer.renderScene(sceneData, timeInScene);
        
        const framePath = path.join(this.tempDir, `frame_${frameIndex.toString().padStart(6, '0')}.png`);
        await fs.writeFile(framePath, frameBuffer);
        framePaths.push(framePath);
        frameIndex++;
      }
    }

    return framePaths;
  }

  private applyDataToScene(scene: Scene, data: Record<string, any>): Scene {
    const sceneCopy = JSON.parse(JSON.stringify(scene)) as Scene;

    // Replace placeholder text with actual data
    for (const element of sceneCopy.elements) {
      if (element.type === 'text') {
        element.content = this.replacePlaceholders(element.content, data);
      }
    }

    return sceneCopy;
  }

  private replacePlaceholders(text: string, data: Record<string, any>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  }

  private async combineFrames(
    framePaths: string[],
    template: VideoTemplate,
    options: RenderOptions
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = options.outputPath;
      const frameRate = template.fps;

      let command = ffmpeg()
        .input(path.join(this.tempDir, 'frame_%06d.png'))
        .inputFPS(frameRate)
        .videoCodec('libx264')
        .outputOptions([
          '-pix_fmt yuv420p',
          '-preset medium',
          '-crf 23'
        ]);

      // Apply quality settings
      switch (options.quality) {
        case 'low':
          command.outputOptions(['-crf 28', '-preset fast']);
          break;
        case 'high':
          command.outputOptions(['-crf 18', '-preset slow']);
          break;
        default:
          // medium quality (default)
          break;
      }

      // Add audio if specified
      if (options.audio?.enabled && options.audio.src) {
        command.input(options.audio.src);
        if (options.audio.volume !== undefined) {
          command.outputOptions([`-filter:a volume=${options.audio.volume}`]);
        }
      }

      command
        .output(outputPath)
        .on('end', () => {
          console.log('Video generation completed successfully');
          resolve(outputPath);
        })
        .on('error', (err) => {
          console.error('Error during video generation:', err);
          reject(err);
        })
        .run();
    });
  }

  private async cleanup(framePaths: string[]): Promise<void> {
    try {
      for (const framePath of framePaths) {
        await fs.remove(framePath);
      }
      console.log('Temporary files cleaned up');
    } catch (error) {
      console.warn('Warning: Could not clean up all temporary files:', error);
    }
  }

  public async generatePreview(
    template: VideoTemplate,
    data: Record<string, any> = {},
    duration: number = 5
  ): Promise<string> {
    // Create a shorter preview version
    const previewTemplate = {
      ...template,
      scenes: template.scenes.slice(0, Math.ceil(duration / 3)) // Take first few scenes
    };

    const previewOptions: RenderOptions = {
      outputPath: path.join(this.tempDir, 'preview.mp4'),
      quality: 'low',
      format: 'mp4'
    };

    return this.generateVideo(previewTemplate, data, previewOptions);
  }

  public async generateThumbnail(
    template: VideoTemplate,
    data: Record<string, any> = {},
    sceneIndex: number = 0
  ): Promise<string> {
    const renderer = new SceneRenderer(template.width, template.height);
    const scene = this.applyDataToScene(template.scenes[sceneIndex], data);
    
    // Render middle frame of the scene
    const middleTime = scene.duration / 2;
    const frameBuffer = renderer.renderScene(scene, middleTime);
    
    const thumbnailPath = path.join(this.tempDir, 'thumbnail.png');
    await fs.writeFile(thumbnailPath, frameBuffer);
    
    return thumbnailPath;
  }
} 