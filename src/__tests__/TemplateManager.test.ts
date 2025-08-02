import { TemplateManager } from '../template-manager/TemplateManager';
import { VideoTemplate } from '../types';
import * as path from 'path';
import * as fs from 'fs-extra';

describe('TemplateManager', () => {
  let templateManager: TemplateManager;
  const testTemplatesDir = path.join(process.cwd(), 'test-templates');

  beforeEach(async () => {
    // Clean up and recreate test directory
    await fs.remove(testTemplatesDir);
    await fs.ensureDir(testTemplatesDir);
    
    templateManager = new TemplateManager(testTemplatesDir);
    await templateManager.initialize();
  });

  afterEach(async () => {
    await fs.remove(testTemplatesDir);
  });

  const mockTemplate: VideoTemplate = {
    name: 'Test Template',
    description: 'A test template',
    duration: 10,
    width: 1920,
    height: 1080,
    fps: 30,
    scenes: [
      {
        id: 'intro',
        duration: 3,
        backgroundColor: '#000000',
        elements: [
          {
            type: 'text',
            content: 'Hello World',
            position: { x: 100, y: 100 },
            style: {
              fontSize: 48,
              color: '#ffffff',
              fontFamily: 'Arial'
            }
          }
        ]
      }
    ]
  };

  describe('saveTemplate', () => {
    it('should save a template successfully', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const savedTemplate = templateManager.getTemplate('test-template');
      expect(savedTemplate).toBeDefined();
      expect(savedTemplate?.name).toBe('Test Template');
    });

    it('should save template to file system', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const templatePath = path.join(testTemplatesDir, 'test-template.json');
      const exists = await fs.pathExists(templatePath);
      expect(exists).toBe(true);
    });
  });

  describe('getTemplate', () => {
    it('should return undefined for non-existent template', () => {
      const template = templateManager.getTemplate('non-existent');
      expect(template).toBeUndefined();
    });

    it('should return saved template', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const template = templateManager.getTemplate('test-template');
      expect(template).toEqual(mockTemplate);
    });
  });

  describe('getAllTemplates', () => {
    it('should return empty array when no templates exist', () => {
      const templates = templateManager.getAllTemplates();
      expect(templates).toEqual([]);
    });

    it('should return all saved templates', async () => {
      await templateManager.saveTemplate('template1', mockTemplate);
      await templateManager.saveTemplate('template2', { ...mockTemplate, name: 'Template 2' });
      
      const templates = templateManager.getAllTemplates();
      expect(templates).toHaveLength(2);
      expect(templates.map(t => t.name)).toContain('Test Template');
      expect(templates.map(t => t.name)).toContain('Template 2');
    });
  });

  describe('deleteTemplate', () => {
    it('should delete template successfully', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const result = await templateManager.deleteTemplate('test-template');
      expect(result).toBe(true);
      
      const template = templateManager.getTemplate('test-template');
      expect(template).toBeUndefined();
    });

    it('should return false for non-existent template', async () => {
      const result = await templateManager.deleteTemplate('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('validateTemplate', () => {
    it('should validate correct template', () => {
      const validation = templateManager.validateTemplate(mockTemplate);
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect missing required fields', () => {
      const invalidTemplate = { ...mockTemplate, name: '' };
      const validation = templateManager.validateTemplate(invalidTemplate);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Template name is required');
    });

    it('should detect invalid duration', () => {
      const invalidTemplate = { ...mockTemplate, duration: 0 };
      const validation = templateManager.validateTemplate(invalidTemplate);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('Valid duration is required');
    });

    it('should detect missing scenes', () => {
      const invalidTemplate = { ...mockTemplate, scenes: [] };
      const validation = templateManager.validateTemplate(invalidTemplate);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain('At least one scene is required');
    });
  });

  describe('searchTemplates', () => {
    it('should return empty array for no matches', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const results = templateManager.searchTemplates('nonexistent');
      expect(results).toHaveLength(0);
    });

    it('should find templates by name', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const results = templateManager.searchTemplates('test');
      expect(results).toHaveLength(1);
      expect(results[0]?.name).toBe('Test Template');
    });

    it('should find templates by description', async () => {
      await templateManager.saveTemplate('test-template', mockTemplate);
      
      const results = templateManager.searchTemplates('test template');
      expect(results).toHaveLength(1);
      expect(results[0]?.description).toBe('A test template');
    });
  });
}); 