# Video Template System - Usage Guide

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd video-template-system

# Install dependencies
npm install

# Build the project
npm run build
```

### Basic Usage

```typescript
import VideoTemplateSystem from './src/index';

async function createVideo() {
  // Initialize the system
  const system = new VideoTemplateSystem();
  await system.initialize();

  // Generate a video using the Cursor AI template
  const videoPath = await system.generateVideo(
    'cursor-ai-intro',
    {
      title: "My Amazing Product",
      subtitle: "Revolutionary Innovation"
    },
    './output/my-video.mp4',
    { quality: 'high' }
  );

  console.log(`Video generated: ${videoPath}`);
}
```

## Template System

### Understanding Templates

A video template defines the structure, timing, and visual elements of a video. Templates are composed of:

1. **Scenes**: Individual segments of the video
2. **Elements**: Visual components within each scene
3. **Animations**: Motion and transition effects
4. **Data Bindings**: Placeholders for dynamic content

### Built-in Templates

The system comes with several pre-built templates:

#### Cursor AI Introduction Template
- **Duration**: 15 seconds
- **Format**: Vertical (1080x1920) for social media
- **Structure**: 4 scenes with modern animations
- **Use Case**: Product introductions, feature showcases

### Creating Custom Templates

```typescript
import { VideoTemplate } from './src/types';

const myTemplate: VideoTemplate = {
  name: "My Custom Template",
  description: "A custom video template",
  duration: 10,
  width: 1080,
  height: 1920,
  fps: 30,
  scenes: [
    {
      id: "intro",
      duration: 3,
      backgroundColor: "#000000",
      elements: [
        {
          type: "text",
          content: "{{title}}",
          position: { x: 540, y: 600 },
          style: {
            fontSize: 72,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center"
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            easing: "easeOut"
          }
        }
      ]
    }
  ]
};
```

## Data Binding

### Placeholder Syntax

Templates use `{{placeholderName}}` syntax for dynamic content:

```typescript
{
  type: "text",
  content: "Welcome to {{productName}}",
  // ... other properties
}
```

### Providing Data

```typescript
const data = {
  productName: "Cursor AI",
  tagline: "The Future of Coding",
  features: ["AI Code Completion", "Instant Refactoring"],
  ctaText: "Get Started Today!"
};
```

## Animation System

### Supported Animation Types

#### Fade Animations
```typescript
{
  type: "fadeIn", // or "fadeOut"
  duration: 1,
  delay: 0.5,
  easing: "easeOut"
}
```

#### Slide Animations
```typescript
{
  type: "slideIn", // or "slideOut"
  duration: 1.5,
  delay: 0.8,
  easing: "easeInOut"
}
```

#### Scale Animations
```typescript
{
  type: "scaleIn", // or "scaleOut"
  duration: 1,
  delay: 0.3,
  easing: "easeOut"
}
```

### Easing Functions

- `linear`: Constant speed
- `easeIn`: Slow start, fast end
- `easeOut`: Fast start, slow end
- `easeInOut`: Slow start and end, fast middle

## Element Types

### Text Elements

```typescript
{
  type: "text",
  content: "Your text here",
  position: { x: 100, y: 100 },
  style: {
    fontSize: 48,
    color: "#ffffff",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    textAlign: "center",
    shadowColor: "#000000",
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2
  }
}
```

### Image Elements

```typescript
{
  type: "image",
  src: "./assets/logo.png",
  position: { x: 200, y: 200 },
  style: {
    width: 300,
    height: 200,
    borderRadius: 10,
    opacity: 0.9
  }
}
```

### Shape Elements

```typescript
{
  type: "shape",
  shape: "rectangle", // "circle", "triangle"
  position: { x: 100, y: 100 },
  size: { width: 200, height: 100 },
  style: {
    fillColor: "#00ff88",
    strokeColor: "#ffffff",
    strokeWidth: 2
  }
}
```

## Video Generation Options

### Quality Settings

```typescript
const options = {
  quality: 'high', // 'low', 'medium', 'high'
  format: 'mp4',   // 'mp4', 'webm', 'gif'
  audio: {
    enabled: true,
    src: './assets/background-music.mp3',
    volume: 0.7
  }
};
```

### Output Configuration

```typescript
const renderOptions = {
  outputPath: './output/final-video.mp4',
  quality: 'high',
  format: 'mp4',
  audio: {
    enabled: false
  }
};
```

## Template Management

### Saving Templates

```typescript
const templateManager = system.getTemplateManager();
await templateManager.saveTemplate('my-template', myTemplate);
```

### Loading Templates

```typescript
const template = templateManager.getTemplate('my-template');
```

### Searching Templates

```typescript
const results = templateManager.searchTemplates('cursor');
```

### Validating Templates

```typescript
const validation = templateManager.validateTemplate(myTemplate);
if (!validation.isValid) {
  console.log('Validation errors:', validation.errors);
}
```

## Advanced Features

### Preview Generation

```typescript
const previewPath = await system.generatePreview(
  'cursor-ai-intro',
  customData,
  5 // duration in seconds
);
```

### Thumbnail Generation

```typescript
const thumbnailPath = await system.generateThumbnail(
  'cursor-ai-intro',
  customData,
  0 // scene index
);
```

### Custom Template Creation

```typescript
const customData = {
  title: "My Product",
  tagline: "Amazing Features",
  colors: {
    primary: "#ff6b6b",
    secondary: "#4ecdc4",
    background: "#2c3e50"
  }
};

const template = await templateManager.createTemplateFromData(
  'custom-product',
  customData,
  baseTemplate
);
```

## Best Practices

### Template Design

1. **Keep scenes short**: 3-5 seconds per scene for engagement
2. **Use consistent branding**: Maintain color schemes and fonts
3. **Plan animations**: Coordinate timing and easing functions
4. **Test with different data**: Ensure placeholders work correctly

### Performance Optimization

1. **Use appropriate quality settings**: Balance quality vs. generation time
2. **Optimize image sizes**: Use appropriately sized images
3. **Limit complex animations**: Too many simultaneous animations can slow rendering
4. **Clean up temporary files**: The system handles this automatically

### Content Guidelines

1. **Readable text**: Use appropriate font sizes and contrast
2. **Mobile-friendly**: Design for vertical video formats
3. **Brand consistency**: Maintain visual identity across templates
4. **Call-to-action**: Include clear CTAs in your videos

## Troubleshooting

### Common Issues

#### Template Not Found
```typescript
// Ensure template is saved before using
await templateManager.saveTemplate('my-template', template);
const savedTemplate = templateManager.getTemplate('my-template');
```

#### Video Generation Fails
```typescript
// Check FFmpeg installation
// Ensure output directory exists
// Verify template validation passes
```

#### Animation Issues
```typescript
// Check animation timing
// Ensure easing functions are valid
// Verify element positioning
```

### Debug Mode

```typescript
// Enable detailed logging
const system = new VideoTemplateSystem({
  debug: true,
  tempDir: './debug-temp'
});
```

## Examples

See the `src/examples/` directory for complete working examples:

- `basic-usage.ts`: Simple video generation
- `custom-template.ts`: Creating custom templates
- `template-management.ts`: Template management operations

## API Reference

For detailed API documentation, see the TypeScript type definitions in `src/types/index.ts`. 