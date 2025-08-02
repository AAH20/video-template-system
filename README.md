# Video Template System

A TypeScript-based video template system for creating social media videos with similar structure to Cursor AI promotional content.

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
- Cursor AI Introduction
- Feature Showcase
- Code Demo
- Testimonial Style

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

MIT License 