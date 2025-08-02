import * as fs from 'fs-extra';
import * as path from 'path';
import { VideoTemplate, TemplateData } from '../types';

export class TemplateManager {
  private templatesDir: string;
  private templates: Map<string, VideoTemplate> = new Map();

  constructor(templatesDir: string = path.join(process.cwd(), 'templates')) {
    this.templatesDir = templatesDir;
  }

  public async initialize(): Promise<void> {
    await fs.ensureDir(this.templatesDir);
    await this.loadTemplates();
  }

  public async loadTemplates(): Promise<void> {
    try {
      const files = await fs.readdir(this.templatesDir);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      for (const file of jsonFiles) {
        const templatePath = path.join(this.templatesDir, file);
        const templateData = await fs.readJson(templatePath);
        const templateName = path.basename(file, '.json');
        this.templates.set(templateName, templateData);
      }

      console.log(`Loaded ${this.templates.size} templates`);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  }

  public async saveTemplate(name: string, template: VideoTemplate): Promise<void> {
    try {
      const templatePath = path.join(this.templatesDir, `${name}.json`);
      await fs.writeJson(templatePath, template, { spaces: 2 });
      this.templates.set(name, template);
      console.log(`Template '${name}' saved successfully`);
    } catch (error) {
      console.error(`Error saving template '${name}':`, error);
      throw error;
    }
  }

  public getTemplate(name: string): VideoTemplate | undefined {
    return this.templates.get(name);
  }

  public getAllTemplates(): VideoTemplate[] {
    return Array.from(this.templates.values());
  }

  public getTemplateNames(): string[] {
    return Array.from(this.templates.keys());
  }

  public async deleteTemplate(name: string): Promise<boolean> {
    try {
      const templatePath = path.join(this.templatesDir, `${name}.json`);
      await fs.remove(templatePath);
      this.templates.delete(name);
      console.log(`Template '${name}' deleted successfully`);
      return true;
    } catch (error) {
      console.error(`Error deleting template '${name}':`, error);
      return false;
    }
  }

  public async duplicateTemplate(originalName: string, newName: string): Promise<void> {
    const originalTemplate = this.getTemplate(originalName);
    if (!originalTemplate) {
      throw new Error(`Template '${originalName}' not found`);
    }

    const duplicatedTemplate = {
      ...originalTemplate,
      name: newName,
      metadata: {
        ...originalTemplate.metadata,
        version: '1.0.0',
        author: 'Template System'
      }
    };

    await this.saveTemplate(newName, duplicatedTemplate);
  }

  public async exportTemplate(name: string, exportPath: string): Promise<void> {
    const template = this.getTemplate(name);
    if (!template) {
      throw new Error(`Template '${name}' not found`);
    }

    await fs.writeJson(exportPath, template, { spaces: 2 });
    console.log(`Template '${name}' exported to ${exportPath}`);
  }

  public async importTemplate(importPath: string, name?: string): Promise<void> {
    try {
      const template = await fs.readJson(importPath);
      const templateName = name || template.name || path.basename(importPath, '.json');
      await this.saveTemplate(templateName, template);
      console.log(`Template imported as '${templateName}'`);
    } catch (error) {
      console.error('Error importing template:', error);
      throw error;
    }
  }

  public validateTemplate(template: VideoTemplate): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check required fields
    if (!template.name) errors.push('Template name is required');
    if (!template.duration || template.duration <= 0) errors.push('Valid duration is required');
    if (!template.width || template.width <= 0) errors.push('Valid width is required');
    if (!template.height || template.height <= 0) errors.push('Valid height is required');
    if (!template.fps || template.fps <= 0) errors.push('Valid FPS is required');
    if (!template.scenes || template.scenes.length === 0) errors.push('At least one scene is required');

    // Validate scenes
    template.scenes?.forEach((scene, index) => {
      if (!scene.id) errors.push(`Scene ${index}: ID is required`);
      if (!scene.duration || scene.duration <= 0) errors.push(`Scene ${index}: Valid duration is required`);
      if (!scene.elements || scene.elements.length === 0) errors.push(`Scene ${index}: At least one element is required`);

      // Validate elements
      scene.elements?.forEach((element, elementIndex) => {
        if (!element.type) errors.push(`Scene ${index}, Element ${elementIndex}: Type is required`);
        if (!element.position) errors.push(`Scene ${index}, Element ${elementIndex}: Position is required`);

        if (element.type === 'text') {
          if (!element.content) errors.push(`Scene ${index}, Element ${elementIndex}: Text content is required`);
          if (!element.style) errors.push(`Scene ${index}, Element ${elementIndex}: Text style is required`);
        }
      });
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  public async createTemplateFromData(
    name: string,
    data: TemplateData,
    baseTemplate?: VideoTemplate
  ): Promise<VideoTemplate> {
    const template: VideoTemplate = baseTemplate || {
      name,
      duration: 15,
      width: 1080,
      height: 1920,
      fps: 30,
      scenes: []
    };

    // Apply data to template
    if (data.title) {
      template.name = data.title;
    }

    if (data.colors) {
      // Apply color scheme to template
      template.scenes = template.scenes.map(scene => ({
        ...scene,
        backgroundColor: data.colors?.background || scene.backgroundColor,
        elements: scene.elements.map(element => {
          if (element.type === 'text' && element.style) {
            return {
              ...element,
              style: {
                ...element.style,
                color: data.colors?.primary || element.style.color
              }
            };
          }
          return element;
        })
      }));
    }

    return template;
  }

  public searchTemplates(query: string): VideoTemplate[] {
    const searchTerm = query.toLowerCase();
    return this.getAllTemplates().filter(template => 
      template.name.toLowerCase().includes(searchTerm) ||
      template.description?.toLowerCase().includes(searchTerm) ||
      template.metadata?.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
} 