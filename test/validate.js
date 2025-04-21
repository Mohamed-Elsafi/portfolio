const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
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
  const server = app.listen(3000);
  return server;
}

// Main test function
async function runTests() {
  console.log('Starting website validation tests...');
  
  // Start local server
  const server = await startServer();
  console.log('Local server started on port 3000');
  
  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // Pages to test
    const pages = [
      { name: 'homepage', url: 'http://localhost:3000/index.html' },
      { name: 'c-ward-expansion', url: 'http://localhost:3000/pages/c-ward-expansion.html' },
      { name: 'water-tank', url: 'http://localhost:3000/pages/water-tank.html' },
      { name: 'perimeter-fence', url: 'http://localhost:3000/pages/perimeter-fence.html' }
    ];
    
    // Test each page
    for (const page of pages) {
      console.log(`Testing ${page.name}...`);
      
      // Run Lighthouse
      const { lhr } = await lighthouse(page.url, {
        port: (new URL(browser.wsEndpoint())).port,
        output: 'json',
        logLevel: 'error',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      });
      
      // Save report
      fs.writeFileSync(
        path.join(reportsDir, `${page.name}-lighthouse-report.json`),
        JSON.stringify(lhr, null, 2)
      );
      
      // Log scores
      console.log(`${page.name} Lighthouse scores:`);
      console.log('Performance:', lhr.categories.performance.score * 100);
      console.log('Accessibility:', lhr.categories.accessibility.score * 100);
      console.log('Best Practices:', lhr.categories['best-practices'].score * 100);
      console.log('SEO:', lhr.categories.seo.score * 100);
      console.log('-----------------------------------');
      
      // Create summary report
      const summaryReport = {
        page: page.name,
        url: page.url,
        scores: {
          performance: lhr.categories.performance.score * 100,
          accessibility: lhr.categories.accessibility.score * 100,
          bestPractices: lhr.categories['best-practices'].score * 100,
          seo: lhr.categories.seo.score * 100
        },
        timestamp: new Date().toISOString()
      };
      
      fs.writeFileSync(
        path.join(reportsDir, `${page.name}-summary.json`),
        JSON.stringify(summaryReport, null, 2)
      );
    }
    
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
    
    console.log('All tests completed successfully!');
    
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
