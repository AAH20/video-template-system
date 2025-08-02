#!/usr/bin/env node

/**
 * Quick Video Generator Script
 * 
 * This script allows users to quickly generate videos using the template system
 * without needing to compile TypeScript or understand the full API.
 * 
 * Usage:
 *   node generate-video.js
 *   node generate-video.js --template cursor-ai-intro --title "My Product" --output my-video.mp4
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Default configuration
const defaultConfig = {
  template: 'cursor-ai-intro',
  title: 'My Amazing Product',
  subtitle: 'Revolutionary Innovation',
  output: 'generated-video.mp4',
  quality: 'medium'
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...defaultConfig };
  
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--template':
        config.template = args[++i];
        break;
      case '--title':
        config.title = args[++i];
        break;
      case '--subtitle':
        config.subtitle = args[++i];
        break;
      case '--output':
        config.output = args[++i];
        break;
      case '--quality':
        config.quality = args[++i];
        break;
      case '--help':
        showHelp();
        process.exit(0);
        break;
    }
  }
  
  return config;
}

function showHelp() {
  console.log(`
🎬 Video Template System - Quick Generator

Usage:
  node generate-video.js [options]

Options:
  --template <name>    Template to use (default: cursor-ai-intro)
  --title <text>       Main title text
  --subtitle <text>    Subtitle text
  --output <file>      Output filename (default: generated-video.mp4)
  --quality <level>    Video quality: low, medium, high (default: medium)
  --help              Show this help message

Examples:
  node generate-video.js
  node generate-video.js --title "My Product" --subtitle "Amazing Features"
  node generate-video.js --template cursor-ai-intro --output my-video.mp4 --quality high

Available Templates:
  - cursor-ai-intro: 15-second Cursor AI style introduction
  - custom-product: 10-second custom product template
`);
}

async function generateVideo(config) {
  console.log('🎬 Video Template System - Quick Generator\n');
  
  // Check if TypeScript is compiled
  const distPath = path.join(__dirname, 'dist');
  if (!fs.existsSync(distPath)) {
    console.log('📦 Building TypeScript project...');
    await runCommand('npm', ['run', 'build']);
  }
  
  // Create output directory
  const outputDir = path.dirname(config.output);
  if (outputDir !== '.') {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Create a simple data object
  const data = {
    title: config.title,
    subtitle: config.subtitle,
    features: [
      "Feature 1",
      "Feature 2", 
      "Feature 3",
      "Feature 4"
    ]
  };
  
  console.log('🎨 Configuration:');
  console.log(`   Template: ${config.template}`);
  console.log(`   Title: ${config.title}`);
  console.log(`   Subtitle: ${config.subtitle}`);
  console.log(`   Output: ${config.output}`);
  console.log(`   Quality: ${config.quality}\n`);
  
  // Generate the video using the compiled JavaScript
  try {
    const { VideoTemplateSystem } = require('./dist/index.js');
    
    const system = new VideoTemplateSystem();
    await system.initialize();
    
    console.log('🎬 Generating video...');
    const startTime = Date.now();
    
    const videoPath = await system.generateVideo(
      config.template,
      data,
      config.output,
      { quality: config.quality }
    );
    
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;
    
    console.log(`✅ Video generated successfully in ${duration.toFixed(1)}s`);
    console.log(`📁 Video saved to: ${videoPath}`);
    
    // Show file size
    const stats = fs.statSync(videoPath);
    const fileSize = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📊 File size: ${fileSize} MB`);
    
  } catch (error) {
    console.error('❌ Error generating video:', error.message);
    process.exit(1);
  }
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}

// Main execution
async function main() {
  try {
    const config = parseArgs();
    await generateVideo(config);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateVideo, parseArgs }; 