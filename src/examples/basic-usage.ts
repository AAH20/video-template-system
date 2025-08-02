import VideoTemplateSystem from '../index';
import * as path from 'path';

async function basicUsageExample() {
  console.log('🚀 Video Template System - Basic Usage Example\n');

  try {
    // Initialize the system
    const system = new VideoTemplateSystem();
    await system.initialize();

    console.log('✅ System initialized successfully');
    console.log('📋 Available templates:', system.getTemplateManager().getTemplateNames());

    // Example 1: Generate a simple Cursor AI intro video
    console.log('\n🎬 Example 1: Generating Cursor AI Intro Video');
    
    const basicData = {
      title: "Cursor AI",
      subtitle: "The Future of Coding"
    };

    const outputPath = path.join(process.cwd(), 'output', 'basic-cursor-intro.mp4');
    
    const videoPath = await system.generateVideo(
      'cursor-ai-intro',
      basicData,
      outputPath,
      { quality: 'medium' }
    );
    
    console.log(`✅ Video generated: ${videoPath}`);

    // Example 2: Generate a preview
    console.log('\n🎬 Example 2: Generating Preview');
    const previewPath = await system.generatePreview('cursor-ai-intro', basicData, 5);
    console.log(`✅ Preview generated: ${previewPath}`);

    // Example 3: Generate a thumbnail
    console.log('\n🎬 Example 3: Generating Thumbnail');
    const thumbnailPath = await system.generateThumbnail('cursor-ai-intro', basicData, 0);
    console.log(`✅ Thumbnail generated: ${thumbnailPath}`);

    console.log('\n🎉 All examples completed successfully!');

  } catch (error) {
    console.error('❌ Error in basic usage example:', error);
  }
}

// Example 2: Custom template creation
async function customTemplateExample() {
  console.log('\n🎨 Custom Template Creation Example\n');

  try {
    const system = new VideoTemplateSystem();
    await system.initialize();

    // Create a custom template
    const customTemplate = {
      name: "Custom Product Intro",
      description: "A custom product introduction template",
      duration: 10,
      width: 1080,
      height: 1920,
      fps: 30,
      scenes: [
        {
          id: "intro",
          duration: 3,
          backgroundColor: "#1a1a1a",
          elements: [
            {
              type: "text" as const,
              content: "{{productName}}",
              position: { x: 540, y: 600 },
              style: {
                fontSize: 72,
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bold",
                textAlign: "center" as const
              },
              animation: {
                type: "fadeIn",
                duration: 1,
                easing: "easeOut"
              }
            }
          ]
        },
        {
          id: "description",
          duration: 4,
          backgroundColor: "#1a1a1a",
          elements: [
            {
              type: "text" as const,
              content: "{{tagline}}",
              position: { x: 540, y: 700 },
              style: {
                fontSize: 48,
                color: "#00ff88",
                fontFamily: "Arial, sans-serif",
                textAlign: "center" as const
              },
              animation: {
                type: "slideIn",
                duration: 1.5,
                delay: 0.5,
                easing: "easeOut"
              }
            }
          ]
        },
        {
          id: "cta",
          duration: 3,
          backgroundColor: "#1a1a1a",
          elements: [
            {
              type: "text" as const,
              content: "{{ctaText}}",
              position: { x: 540, y: 800 },
              style: {
                fontSize: 36,
                color: "#ffffff",
                fontFamily: "Arial, sans-serif",
                textAlign: "center" as const
              },
              animation: {
                type: "scaleIn",
                duration: 1,
                delay: 0.5,
                easing: "easeOut"
              }
            }
          ]
        }
      ]
    };

    // Save the custom template
    await system.getTemplateManager().saveTemplate('custom-product', customTemplate);
    console.log('✅ Custom template saved');

    // Generate video with custom data
    const customData = {
      productName: "Amazing Product",
      tagline: "Revolutionary Innovation",
      ctaText: "Get Started Today!"
    };

    const customOutputPath = path.join(process.cwd(), 'output', 'custom-product-intro.mp4');
    
    const customVideoPath = await system.generateVideo(
      'custom-product',
      customData,
      customOutputPath,
      { quality: 'high' }
    );
    
    console.log(`✅ Custom video generated: ${customVideoPath}`);

  } catch (error) {
    console.error('❌ Error in custom template example:', error);
  }
}

// Example 3: Template management
async function templateManagementExample() {
  console.log('\n📁 Template Management Example\n');

  try {
    const system = new VideoTemplateSystem();
    await system.initialize();

    const templateManager = system.getTemplateManager();

    // List all templates
    console.log('📋 All templates:', templateManager.getTemplateNames());

    // Search templates
    const searchResults = templateManager.searchTemplates('cursor');
    console.log('🔍 Search results for "cursor":', searchResults.map(t => t.name));

    // Validate a template
    const template = templateManager.getTemplate('cursor-ai-intro');
    if (template) {
      const validation = templateManager.validateTemplate(template);
      console.log('✅ Template validation:', validation.isValid ? 'PASSED' : 'FAILED');
      if (!validation.isValid) {
        console.log('❌ Validation errors:', validation.errors);
      }
    }

    // Export a template
    const exportPath = path.join(process.cwd(), 'output', 'exported-template.json');
    await templateManager.exportTemplate('cursor-ai-intro', exportPath);
    console.log(`✅ Template exported to: ${exportPath}`);

  } catch (error) {
    console.error('❌ Error in template management example:', error);
  }
}

// Run all examples
async function runAllExamples() {
  console.log('🎬 Video Template System Examples\n');
  console.log('=' .repeat(50));

  await basicUsageExample();
  await customTemplateExample();
  await templateManagementExample();

  console.log('\n' + '=' .repeat(50));
  console.log('🎉 All examples completed!');
}

// Run examples if this file is executed directly
if (require.main === module) {
  runAllExamples();
}

export {
  basicUsageExample,
  customTemplateExample,
  templateManagementExample,
  runAllExamples
}; 