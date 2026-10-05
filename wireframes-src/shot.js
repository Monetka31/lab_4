const { chromium } = require('playwright');
const path = require('path');

const screens = [
  { file: 'login.html', out: 'screen-01-login.png', h: 760 },
  { file: 'dashboard.html', out: 'screen-02-dashboard.png', h: 820 },
  { file: 'workplaces-list.html', out: 'screen-03-workplaces-list.png', h: 720 },
  { file: 'workplace-detail.html', out: 'screen-04-workplace-detail.png', h: 720 },
  { file: 'my-bookings.html', out: 'screen-05-my-bookings.png', h: 520 },
  { file: 'colleague-search.html', out: 'screen-06-colleague-search.png', h: 500 },
  { file: 'admin-panel.html', out: 'screen-07-admin-panel.png', h: 760 },
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  for (const s of screens) {
    const fp = 'file://' + path.resolve(__dirname, s.file);
    await page.goto(fp);
    await page.setViewportSize({ width: 1280, height: s.h });
    await page.screenshot({ path: path.resolve(__dirname, '..', 'images', s.out) });
    console.log('saved', s.out);
  }
  await browser.close();
})();
