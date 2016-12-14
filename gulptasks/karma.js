const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    const frameworks = ['mocha', 'chai', 'sinon'].concat(options.frameworks || []);
    const plugins = ['karma-mocha-reporter', 'karma-mocha', 'karma-sinon', 'karma-chai', 'karma-electron', 'karma-sauce-launcher'].concat(options.plugins || []);

    let karmaConfig = {
        basePath: process.cwd(),
        files,
        frameworks,
        plugins
    }

    const saucelabsCustomLaunchers = {
        chrome_latest: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        },
        firefox_latest: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        },
        ie_11: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 7',
            version: '11'
        },
        safari_10: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '10.0'
        },
        edge: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: 'latest'
        }
    }

    if (options.sauceLabs) {
        karmaConfig.sauceLabs = options.sauceLabs;
        karmaConfig.customLaunchers = options.customLaunchers ? options.customLaunchers : saucelabsCustomLaunchers;
        karmaConfig.browsers = options.browsers ? options.browsers : Object.keys(karmaConfig.customLaunchers);
        karmaConfig.reporters = options.reports || ['dots', 'saucelabs'];
        karmaConfig.singleRun = true;
        karmaConfig.concurrency = options.concurrency || options.browsers.length;
    } else {
        karmaConfig.browsers = options.browsers || ['Electron'];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.singleRun = !globalConfig.devmode;
        karmaConfig.client = {
            mocha: {
                reporter: 'html'
            }
        };
    }

    new KarmaServer(karmaConfig, done).start();
};
