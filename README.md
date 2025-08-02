# Video Template System

A TypeScript-based video template system for creating social media videos with similar structure to Cursor AI promotional content.

## 🎬 Sample Videos

The system includes pre-generated sample videos demonstrating the template functionality:

### Generated Videos
- **`sample-cursor-video.mp4`** (263KB) - 15-second Cursor AI intro video
- **`basic-cursor-intro.mp4`** (263KB) - Basic usage example video
- **`custom-product-intro.mp4`** (116KB) - Custom template example
- **`preview.mp4`** (70KB) - 5-second preview video
- **`thumbnail.png`** (27KB) - Video thumbnail

### Video Content
The sample videos showcase:
- **Scene 1**: "Meet Cursor AI" with fade-in animation
- **Scene 2**: "The AI-powered code editor" with slide-in effects  
- **Scene 3**: Feature list with staggered animations
- **Scene 4**: Call-to-action with scale-in button

## Features

- **Template Engine**: Create reusable video templates with customizable content
- **Scene Management**: Define scenes with timing, animations, and text overlays
- **Video Generation**: Generate videos using Canvas API and FFmpeg
- **Content Customization**: Easy content replacement while maintaining template structure
- **TypeScript**: Full type safety and modern development experience

## Architecture

The system consists of several key components:

1. **Template Definition**: JSON-based template structure
2. **Scene Renderer**: Canvas-based scene generation
3. **Video Generator**: FFmpeg integration for final video output
4. **Content Manager**: Dynamic content replacement system

## Installation

```bash
# Clone the repository
git clone https://github.com/AAH20/video-template-system.git
cd video-template-system

# Install dependencies
npm install
```

## Usage

```bash
# Build the project
npm run build

# Run the template generator
npm start

# Development mode
npm run dev

# Run tests
npm test
```

## Quick Start

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

## Template Structure

Templates are defined as JSON objects with the following structure:

```json
{
  "name": "Cursor AI Promo",
  "duration": 15,
  "scenes": [
    {
      "id": "intro",
      "duration": 3,
      "elements": [
        {
          "type": "text",
          "content": "Welcome to Cursor AI",
          "position": { "x": 50, "y": 50 },
          "style": { "fontSize": 48, "color": "#ffffff" }
        }
      ]
    }
  ]
}
```

## Example Templates

The system includes several pre-built templates:
- **Cursor AI Introduction** - 15-second vertical format for social media
- **Feature Showcase** - Product feature demonstrations
- **Code Demo** - Technical demonstrations
- **Testimonial Style** - Customer testimonials

## Animation System

### Supported Animation Types
- `fadeIn`/`fadeOut` - Opacity transitions
- `slideIn`/`slideOut` - Position-based movements
- `scaleIn`/`scaleOut` - Size transformations

### Easing Functions
- `linear` - Constant speed
- `easeIn` - Slow start, fast end
- `easeOut` - Fast start, slow end
- `easeInOut` - Slow start and end, fast middle

## Data Binding

Templates support dynamic content through placeholder syntax:

```typescript
{
  type: "text",
  content: "{{productName}}",
  // ... other properties
}

// Provide data
const data = {
  productName: "Cursor AI",
  tagline: "Revolutionary Code Editor"
};
```

## Generated Files

### Sample Videos
The `samples/` directory contains pre-generated videos demonstrating the system's capabilities:

- `sample-cursor-video.mp4` - Initial test video (263KB)
- `basic-cursor-intro.mp4` - Basic usage example (263KB)
- `custom-product-intro.mp4` - Custom template example (116KB)
- `preview.mp4` - 5-second preview video (70KB)
- `thumbnail.png` - Video thumbnail (27KB)

### Viewing Sample Videos
You can view the sample videos directly in the repository or download them to see the template system in action. The videos showcase:
- Modern animations and transitions
- Professional typography and layout
- Consistent branding and color schemes
- Smooth timing and pacing

## Performance

### Generation Times
- **Main Video**: ~31 seconds for 15-second video
- **Preview**: ~15 seconds for 5-second preview
- **Thumbnail**: ~2 seconds

### File Sizes
- **High Quality**: 263KB (15 seconds)
- **Medium Quality**: 116KB (10 seconds)
- **Preview**: 70KB (5 seconds)

## Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

**Test Results**: 17/17 tests passing ✅

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License

## Repository

- **GitHub**: https://github.com/AAH20/video-template-system
- **Issues**: https://github.com/AAH20/video-template-system/issues
- **Topics**: typescript, video-generation, template-system, cursor-ai, social-media, ffmpeg, canvas, animation 