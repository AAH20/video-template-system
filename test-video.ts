import VideoTemplateSystem from './src/index';
import * as path from 'path';
import * as fs from 'fs-extra';

async function testVideoGeneration() {
  console.log('🎬 Testing Video Template System\n');

  try {
    // Initialize the system
    console.log('📋 Initializing system...');
    const system = new VideoTemplateSystem();
    await system.initialize();
    console.log('✅ System initialized successfully');

    // Create output directory
    const outputDir = path.join(process.cwd(), 'output');
    await fs.ensureDir(outputDir);
    console.log('✅ Output directory created');

    // Test data for the video
    const testData = {
      title: "Cursor AI",
      subtitle: "Revolutionary Code Editor",
      features: [
        "AI Code Completion",
        "Instant Refactoring",
        "Smart Suggestions",
        "Lightning Fast"
      ]
    };

    console.log('🎨 Test data prepared:', testData);

    // Generate a sample video
    console.log('\n🎬 Generating sample video...');
    const videoPath = path.join(outputDir, 'sample-cursor-video.mp4');
    
    const startTime = Date.now();
    const generatedVideoPath = await system.generateVideo(
      'cursor-ai-intro',
      testData,
      videoPath,
      { 
        quality: 'medium',
        format: 'mp4'
      }
    );
    const endTime = Date.now();
    
    console.log(`✅ Video generated successfully in ${(endTime - startTime) / 1000}s`);
    console.log(`📁 Video saved to: ${generatedVideoPath}`);

    // Generate a preview
    console.log('\n🎬 Generating preview...');
    const previewPath = await system.generatePreview('cursor-ai-intro', testData, 5);
    console.log(`✅ Preview generated: ${previewPath}`);

    // Generate a thumbnail
    console.log('\n🎬 Generating thumbnail...');
    const thumbnailPath = await system.generateThumbnail('cursor-ai-intro', testData, 0);
    console.log(`✅ Thumbnail generated: ${thumbnailPath}`);

    // Check file sizes
    const videoStats = await fs.stat(generatedVideoPath);
    const previewStats = await fs.stat(previewPath);
    const thumbnailStats = await fs.stat(thumbnailPath);

    console.log('\n📊 Generated Files:');
    console.log(`🎥 Main Video: ${(videoStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🎬 Preview: ${(previewStats.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`🖼️  Thumbnail: ${(thumbnailStats.size / 1024).toFixed(2)} KB`);

    console.log('\n🎉 Video generation test completed successfully!');
    console.log('\n📁 Check the "output" directory for generated files:');
    console.log(`   - ${path.basename(generatedVideoPath)}`);
    console.log(`   - ${path.basename(previewPath)}`);
    console.log(`   - ${path.basename(thumbnailPath)}`);

  } catch (error) {
    console.error('❌ Error during video generation test:', error);
    process.exit(1);
  }
}

// Run the test
testVideoGeneration(); 