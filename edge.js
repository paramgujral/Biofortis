var allure = require('allure-commandline');
const { join } = require('path');
const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');


exports.config = merge(
  wdioConf.config,
  {
    capabilities: [
      {
        browserName: 'MicrosoftEdge',
        maxInstances: 1
      },
        ],
        // services:['chromedriver'],
        services:['selenium-standalone']
   
  },
  { clone: false },
);

