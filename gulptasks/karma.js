const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {

    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    const frameworks = ['mocha', 'chai', 'sinon', 'source-map-support', 'browserify'].concat(options.frameworks || []);
    const plugins = ['karma-mocha-reporter', 'karma-mocha', 'karma-sinon', 'karma-chai', 'karma-electron', 'karma-sauce-launcher', 'karma-firefox-launcher', 'karma-safari-launcher', 'karma-chrome-launcher', 'karma-browserify', 'karma-source-map-support'].concat(options.plugins || []);

    const proxies = options.proxies || '';
    const urlRoot = options.proxies ? '/karma/' : '/'; // if  proxy, move karma to another url
    const preprocessors = options.preprocessors || '';
    let karmaConfig = {
        // logLevel: 'LOG_DEBUG',
        browserConsoleLogOptions: {
            level: 'log',
            terminal: true
        },
        basePath: process.cwd(),
        files,
        frameworks,
        plugins,
        preprocessors,
        port: 9876, //fix port, don't change
        urlRoot,
        browserify: {
            debug: true, // include inline source maps
            transform: ['require-globify'],
            plugin: [['sourcemapify', { 'root': '/' }]]
        },
        proxies,
        singleRun: true,
        browserNoActivityTimeout: 24 * 60000,
        // use an extended timeout for capturing Sauce Labs
        // browsers in case the service is busy
        captureTimeout: 12 * 60000,
        browserDisconnectTolerance: 3,
    };

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
        /* safari_10: {
         base: 'SauceLabs',
         browserName: 'safari',
         platform: 'OS X 10.11',
         version: '10.0'
         },*/
        /* ie_11: {
         base: 'SauceLabs',
         browserName: 'internet explorer',
         platform: 'Windows 7',
         version: '11'
         },*/
        /* edge: {
         base: 'SauceLabs',
         browserName: 'MicrosoftEdge',
         platform: 'Windows 10',
         version: 'latest'
         }*/
    }

    if (options.sauceLabs) {
        karmaConfig.sauceLabs = options.sauceLabs;
        karmaConfig.customLaunchers = options.customLaunchers ? options.customLaunchers : saucelabsCustomLaunchers;
        karmaConfig.browsers = options.browsers ? options.browsers : Object.keys(karmaConfig.customLaunchers);
        karmaConfig.reporters = options.reports || ['mocha', 'saucelabs'];
        karmaConfig.concurrency = options.concurrency || karmaConfig.browsers.length;
        // karmaConfig.concurrency = 1;
    } else {
        karmaConfig.browsers = options.browsers || ['Electron'];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.singleRun = ! globalConfig.devmode;
    }
    karmaConfig.client = {
        captureConsole: true,
        mocha: {
            reporter: 'html',
        }
    };

    const server = new KarmaServer(karmaConfig, () => {
        done();
        process.exit();
    });
    server.start();
};