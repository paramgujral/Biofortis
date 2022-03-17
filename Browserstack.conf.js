const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');


const appium = {
    maxInstances: 1,
    platformName: 'Android', 
    platformVersion: '11.0',
    udid: 'emulator-5554', 
    automationName: 'UiAutomator2', 
    browserName: 'chrome', 
    newCommandTimeout: 240, 
    autoAcceptAlerts: 'true', 
    path: '/wd/hub/',
    port: 4723
};
const chromeDocker = {
    // 'goog:chromeOptions': {
    //     args: ['--disable-dev-shm-usage', '--no-sandbox', '--remote-debugging-port=9222', '--disable-geolocation', 'disable-popup-blocking',
    //         'disable-notifications'],
    //     prefs: {
    //         'profile.default_content_settings.popups': 1,
    //         'profile.default_content_settings.notifications': 1,
    //     },
    // },
    ...appium,

};

exports.config = merge(
    wdioConf.config,
    {
        user: process.env.BROWSERSTACK_USERNAME || 'paramjeetsinghgu_lnBROJ',
        key: process.env.BROWSERSTACK_ACCESS_KEY || 'ez4EBprSx9Lq66EA4RCj',
        //...
        capabilities: [{
            project: "First Webdriverio Android Project",
            build: "browserstack-build-1",
            name: "local_test",
            device: "Google Pixel 3",
            os_version: "9.0",
            'browserstack.local': true
        }],
    }
);

console.log("config: " + JSON.stringify(this.config));