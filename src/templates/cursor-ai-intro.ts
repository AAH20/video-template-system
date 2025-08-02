import { VideoTemplate } from '../types';

export const cursorAIIntroTemplate: VideoTemplate = {
  name: "Cursor AI Introduction",
  description: "A dynamic introduction video template for Cursor AI featuring modern animations and engaging visuals",
  duration: 15,
  width: 1080,
  height: 1920, // Vertical format for social media
  fps: 30,
  scenes: [
    {
      id: "intro",
      duration: 3,
      backgroundColor: "#0a0a0a",
      elements: [
        {
          type: "text",
          content: "Meet",
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
        },
        {
          type: "text",
          content: "Cursor AI",
          position: { x: 540, y: 700 },
          style: {
            fontSize: 96,
            color: "#00ff88",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center"
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
      id: "tagline",
      duration: 4,
      backgroundColor: "#0a0a0a",
      elements: [
        {
          type: "text",
          content: "The AI-powered",
          position: { x: 540, y: 500 },
          style: {
            fontSize: 48,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "code editor",
          position: { x: 540, y: 600 },
          style: {
            fontSize: 64,
            color: "#00ff88",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center"
          },
          animation: {
            type: "scaleIn",
            duration: 1.5,
            delay: 0.8,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "that writes code with you",
          position: { x: 540, y: 750 },
          style: {
            fontSize: 36,
            color: "#cccccc",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            delay: 1.5,
            easing: "easeOut"
          }
        }
      ]
    },
    {
      id: "features",
      duration: 5,
      backgroundColor: "#0a0a0a",
      elements: [
        {
          type: "text",
          content: "✨ AI Code Completion",
          position: { x: 540, y: 400 },
          style: {
            fontSize: 42,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "slideIn",
            duration: 1,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "🚀 Instant Refactoring",
          position: { x: 540, y: 550 },
          style: {
            fontSize: 42,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "slideIn",
            duration: 1,
            delay: 0.8,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "💡 Smart Suggestions",
          position: { x: 540, y: 700 },
          style: {
            fontSize: 42,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "slideIn",
            duration: 1,
            delay: 1.6,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "⚡ Lightning Fast",
          position: { x: 540, y: 850 },
          style: {
            fontSize: 42,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "slideIn",
            duration: 1,
            delay: 2.4,
            easing: "easeOut"
          }
        }
      ]
    },
    {
      id: "cta",
      duration: 3,
      backgroundColor: "#0a0a0a",
      elements: [
        {
          type: "text",
          content: "Ready to code faster?",
          position: { x: 540, y: 600 },
          style: {
            fontSize: 48,
            color: "#ffffff",
            fontFamily: "Arial, sans-serif",
            textAlign: "center"
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "Try Cursor AI Today",
          position: { x: 540, y: 750 },
          style: {
            fontSize: 56,
            color: "#00ff88",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center"
          },
          animation: {
            type: "scaleIn",
            duration: 1.5,
            delay: 0.8,
            easing: "easeOut"
          }
        },
        {
          type: "shape",
          shape: "rectangle",
          position: { x: 390, y: 900 },
          size: { width: 300, height: 80 },
          style: {
            fillColor: "#00ff88",
            strokeColor: "#00ff88",
            strokeWidth: 2
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            delay: 1.5,
            easing: "easeOut"
          }
        },
        {
          type: "text",
          content: "Download Now",
          position: { x: 540, y: 940 },
          style: {
            fontSize: 32,
            color: "#000000",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textAlign: "center"
          },
          animation: {
            type: "fadeIn",
            duration: 1,
            delay: 1.8,
            easing: "easeOut"
          }
        }
      ]
    }
  ],
  metadata: {
    author: "Video Template System",
    version: "1.0.0",
    tags: ["cursor-ai", "introduction", "social-media", "promotional"]
  }
}; 