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
        capabilities: process.env.IS_DOCKER ? [chromeDocker] : [appium],
        //services: ['appium'],

        services: [
            ['appium', {
                args: {
                    // ...

                    port: 4721
                    // ...
                }
                // or
                // args: ['-p', '4722', '--relaxed-security', '--log-level', 'info:info']
            }]
        ],

    },
    { clone: false },
);

console.log("config: " + JSON.stringify(this.config));