/**
 * Access a website, start devtool tracing, trace for the specified time.
 * Extract a json-file that you can drag and drop in the Chrome devtools.
 * Run with 'node trace-websites' on your commandline.
 * From https://addyosmani.com/blog/puppeteer-recipes/
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const url = '';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.tracing.start({ screenshots: true, path: 'trace.json' });
  await page.goto(url, { timeout: 60000 });
  await page.tracing.stop();

  // Extract data from the trace
  const tracing = JSON.parse(fs.readFileSync('./trace.json', 'utf8'));
  const traceScreenshots = tracing.traceEvents.filter(x => (
      x.cat === 'disabled-by-default-devtools.screenshot' &&
      x.name === 'Screenshot' &&
      typeof x.args !== 'undefined' &&
      typeof x.args.snapshot !== 'undefined'
  ));

  traceScreenshots.forEach(function(snap, index) {
    fs.writeFile(`trace-screenshot-${index}.png`, snap.args.snapshot, 'base64', function(err) {
      if (err) {
        console.log('writeFile error', err);
      }
    });
  });

  await browser.close();
})();
