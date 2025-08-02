// Test setup file
import * as fs from 'fs-extra';
import * as path from 'path';

// Create test directories
beforeAll(async () => {
  const testDirs = ['temp', 'output', 'templates'];
  
  for (const dir of testDirs) {
    await fs.ensureDir(path.join(process.cwd(), dir));
  }
});

// Clean up test files after each test
afterEach(async () => {
  const tempDir = path.join(process.cwd(), 'temp');
  const outputDir = path.join(process.cwd(), 'output');
  
  try {
    await fs.emptyDir(tempDir);
    await fs.emptyDir(outputDir);
  } catch (error) {
    console.warn('Could not clean up test directories:', error);
  }
});

// Global test timeout
jest.setTimeout(30000); 