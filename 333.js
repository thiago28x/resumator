const puppeteer = require('puppeteer'); // v13.0.0 or later
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ userDataDir: "./tmp", headless: false, defaultViewport: false, devtools: false, args: ['--lang=en']});
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);
let videourl = "https://www.youtube.com/watch?v=GfhfTcANvjk"



    {
        const targetPage = page;
        await targetPage.setViewport({"width":1920,"height":843})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto(videourl);
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["#button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"],["xpath///*[@id=\"button-shape\"]/button/yt-touch-feedback-shape/div/div[2]"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 22.03662109375,
            y: 16.33709716796875,
          },
        });
        console.log("clicou 1")
        const message = 'Hello, world!';
        await page.evaluate((message) => console.log(message), message);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Show transcript[role=\"option\"]"],["#items > ytd-menu-service-item-renderer:nth-child(4) > tp-yt-paper-item"],["xpath///*[@id=\"items\"]/ytd-menu-service-item-renderer[4]/tp-yt-paper-item"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 50.03662109375,
            y: 18.3275146484375,
          },
        });
        console.log("clicou 2")

    }

          // Wait for the transcript to load
  await page.waitForSelector('.segment-text.style-scope.ytd-transcript-segment-renderer');

  // Get the text content of all elements with the specified class
  const thiago = await page.evaluate(() => {
    const elements = document.querySelectorAll('.segment-text.style-scope.ytd-transcript-segment-renderer');
    return Array.from(elements).map(element => element.textContent);
  });

  // Save the transcript to a file
  fs.writeFileSync('transcript.txt', thiago.join('\n'));

  //console.log(thiago);



    //await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

  
  async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      const timeoutId = setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          clearTimeout(timeoutId);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
