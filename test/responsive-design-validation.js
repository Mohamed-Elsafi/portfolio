const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Create directory for reports
const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

// Function to serve local files
async function startServer() {
  const express = require('express');
  const app = express();

  // Serve static files from the portfolio_website directory
  app.use(express.static(path.join(__dirname, '..')));

  // Start server
  return new Promise((resolve) => {
    const server = app.listen(3000, () => {
      console.log('Local server started on port 3000');
      resolve(server);
    });
  });
}

// Main test function
async function runTests() {
  console.log('Starting responsive design tests...');

  // Start local server
  const server = await startServer();

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Test responsive design
    console.log('Testing responsive design...');
    const page = await browser.newPage();

    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 1024, height: 768, name: 'laptop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];

    for (const viewport of viewports) {
      console.log(`Testing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
      await page.setViewport(viewport);
      await page.goto('http://localhost:3000/index.html');

      // Take screenshot
      await page.screenshot({
        path: path.join(reportsDir, `responsive-${viewport.name}.png`),
        fullPage: true
      });
    }

    console.log('Responsive design tests completed successfully!');

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    // Close browser and server
    await browser.close();
    server.close();
    console.log('Test server stopped');
  }
}

// Run tests
runTests().catch(console.error);
