const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
const chromeDriverVersion = '90.0.4430.24';
const firefoxDriverVersion = '0.29.0';
const chrome = {
  browserName: 'chrome',
  maxInstances: 1,
};
const chromeDocker = {
  'goog:chromeOptions': {
    args: ['--disable-dev-shm-usage', '--no-sandbox', '--remote-debugging-port=9222'],
  },
  ...chrome,
};

exports.config = merge(
  wdioConf.config,
  {
    capabilities: process.env.IS_DOCKER ? [chromeDocker] : [chrome], 
    
    //services:['selenium-standalone'],
    services: ['chromedriver'],

  },
  { clone: false },
);


console.log("config: " + JSON.stringify(this.config));