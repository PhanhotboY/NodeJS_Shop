import puppeteer from 'puppeteer-core';

import userService from './user.service';
import '../helpers/cache.helper';
import client from '../../../config/cache.config';

let browser, page;

beforeEach(async () => {
    await client.connect();

    browser = await puppeteer.launch({
        headless: true,
        executablePath: '/mnt/c/Program Files (x86)/Google/Chrome/Application/chrome.exe',
        args: [
            '--user-data-dir=D:\\Workspace\\puppeteer\\chrome',
            '--profile-directory=Profile 0',
            '--no-sandbox',
        ],
        timeout: 10000,
    });

    page = await browser.newPage();

    await page.goto('http://localhost:8080/api/users?limit=1', { waitUntil: 'networkidle0' });
});

test('check accuration of API', async () => {
    let innerText = await page.evaluate(() => {
        return document.querySelector('body').innerText;
    });

    const result = JSON.stringify(await userService.getAllUser(1));

    expect(innerText).toEqual(result);
});

afterEach(async () => {
    await browser.close();
    await client.disconnect();
});
