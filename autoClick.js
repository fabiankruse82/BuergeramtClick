const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // headless: false to see the browser in action
  const page = await browser.newPage();
  
  await page.goto('https://service.berlin.de/terminvereinbarung/termin/taken/', { waitUntil: 'networkidle2' });

  const clickButton = async () => {
    try {
      // Wait for the button to be available and click it
      await page.waitForSelector('button', { visible: true });
      const buttons = await page.$$('button');
      for (let button of buttons) {
        const text = await page.evaluate(element => element.textContent, button);
        if (text.includes('Terminsuche wiederholen')) {
          await button.click();
          console.log('Button clicked!');
          break;
        }
      }
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      const currentUrl = page.url();
      console.log('Current URL:', currentUrl);

      if (currentUrl.includes('/termin/stop/')) {
        console.log('Detected URL change, navigating back...');
        await page.goto('https://service.berlin.de/terminvereinbarung/termin/taken/', { waitUntil: 'networkidle2' });
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  await clickBut
  setInterval(clickButton, 61000);
  await new Promise(resolve => setTimeout(resolve, 3600000)); // Run for 1 hour
  await browser.close();
})();
