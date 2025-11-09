const puppeteer = require('puppeteer');
const assert = require('assert');

async function runTest() {
    const browser = await puppeteer.launch({
        product: 'firefox',
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 667 });
    await page.goto('file:///app/index.html', { waitUntil: 'networkidle0' });

    // Open mobile menu
    await page.click('.mobile-menu-btn');
    await page.waitForSelector('.mobile-nav.active');

    // Click a nav link
    await page.click('.mobile-nav .nav-link');

    // Check if menu is closed
    const isMenuClosed = await page.evaluate(() => {
        const mobileNav = document.querySelector('.mobile-nav');
        return !mobileNav.classList.contains('active');
    });

    assert.strictEqual(isMenuClosed, true, 'The mobile navigation menu should close after clicking a link.');

    await browser.close();
}

runTest().catch(err => {
    console.error(err);
    process.exit(1);
});
