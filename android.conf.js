const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');


var appium = {

    //App Capabilities
    maxInstances: 1,
    appiumVersion: '1.21.0',
    platformName: 'Android',
    automationName: 'UiAutomator2',
    platformVersion: '9',
    //deviceName: 'note 5',
    //udid: '2bd94a019805',
    udid: "603442ef",
    // app: 'D:/Droom/droom_qa1.apk',
    appPackage: "in.droom",
    appActivity: "in.droom.activity.MainActivity",
    noReset: true,
    newCommandTimeout: 240,
    autoAcceptAlerts: 'true',

};

const chromeDocker = {
    'goog:chromeOptions': {
        args: ['--disable-dev-shm-usage', '--no-sandbox', '--remote-debugging-port=9222', '--disable-geolocation', 'disable-popup-blocking',
            'disable-notifications'],
        prefs: {
            'profile.default_content_settings.popups': 1,
            'profile.default_content_settings.notifications': 1,
        },
    },
    ...appium,
};

exports.config = merge(
    wdioConf.config,
    {

        capabilities: process.env.IS_DOCKEservicesR ? [chromeDocker] : [appium],
        //port:4721,
        services: ['appium'],

    },
    { clone: false },
);


console.log("config: " + JSON.stringify(this.config));