import { chromium } from "playwright";

const baseURL = "http://127.0.0.1:4173/";
const browser = await chromium.launch({
  headless: true,
  executablePath:
    "/Users/shib1e/Documents/svad'ba/.playwright-browsers/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
});

const shots = [
  {
    name: "desktop",
    width: 1440,
    height: 900,
    path: "/Users/shib1e/Documents/svad'ba/screenshot-desktop-full.png",
  },
  {
    name: "mobile",
    width: 390,
    height: 844,
    path: "/Users/shib1e/Documents/svad'ba/screenshot-mobile-full.png",
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  },
];

for (const shot of shots) {
  const page = await browser.newPage({
    viewport: { width: shot.width, height: shot.height },
    isMobile: shot.isMobile ?? false,
    hasTouch: shot.hasTouch ?? false,
    deviceScaleFactor: shot.deviceScaleFactor ?? 1,
  });

  await page.goto(baseURL, { waitUntil: "networkidle" });
  await page.screenshot({
    path: shot.path,
    fullPage: true,
  });
  await page.close();
}

await browser.close();
