var allure = require('allure-commandline');
const { join } = require('path');
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
const chromeDriverVersion = '90.0.4430.24';
const firefoxDriverVersion = '0.29.0';


exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        browserName: 'firefox',
        maxInstances: 1,
        'moz:firefoxOptions': {
          args: ['-headed']
        }
      },
        ],
        // services:['chromedriver'],
        // services:['selenium-standalone'],
        services: ['geckodriver'],
   
  },
  { clone: false },
);

