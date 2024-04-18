const Page = require('./helpers/page');
jest.setTimeout(12000);

let page;
beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await page.close();
});


test('The header has the correct text', async () => {
    await page.waitFor('a.brand-logo');
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);
    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    await page.click('.right a');
    const url = page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, shows logout button', async () => {
    await page.login();

    const logoutText = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(logoutText).toEqual('Logout');
})