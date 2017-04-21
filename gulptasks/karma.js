const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {

    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    const frameworks = ['mocha', 'chai', 'sinon', 'source-map-support', 'browserify'].concat(options.frameworks || []);
    const plugins = ['karma-mocha-reporter',
        'karma-mocha',
        'karma-sinon',
        'karma-chai',
        'karma-browserify',
        'karma-electron',
        'karma-firefox-launcher',
        'karma-safari-launcher',
        'karma-chrome-launcher',
        'karma-ie-launcher',
        'karma-edge-launcher',
        'karma-browserstack-launcher',
        'karma-source-map-support'].concat(options.plugins || []);

    const proxies = options.proxies || '';
    const urlRoot = options.proxies ? '/karma/' : '/'; // if  proxy, move karma to another url
    const preprocessors = options.preprocessors || '';
    let karmaConfig = {
        // logLevel: 'LOG_DEBUG', //keep for debugging
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
        proxies,
        browserify: {
            debug: true, // include inline source maps
            transform: ['require-globify'],
            plugin: [['sourcemapify', { 'root': '/' }]]
        },
        // use an extended timeout for browsers in case the service is busy
        browserNoActivityTimeout: 3 * 60000,
        captureTimeout: 3 * 60000,
        browserDisconnectTimeout: 3 * 60000,
        processKillTimeout: 3 * 60000,
        browserDisconnectTolerance: 1,
    };

    const browserStackCustomLaunchers = {
        bs_safari_mac: {
            base: 'BrowserStack',
            browser: 'Safari',
            browser_version: '10.0',
            os: 'OS X',
            os_version: 'Sierra'
        },
        bs_chrome_win: {
            base: 'BrowserStack',
            browser: 'Chrome',
            browser_version: '57.0',
            os: 'Windows',
            os_version: '10'
        },
        bs_firefox_win: {
            base: 'BrowserStack',
            browser: 'Firefox',
            browser_version: '52.0',
            os: 'Windows',
            os_version: '10'
        },
        bs_edge_win: {
            base: 'BrowserStack',
            browser: 'Edge',
            browser_version: '14.0',
            os: 'Windows',
            os_version: '10'
        },
        bs_ie11_win: {
            base: 'BrowserStack',
            browser: 'IE',
            browser_version: '11.0',
            os: 'Windows',
            os_version: '10'
        },
        bs_iphone6s: {
            base: 'BrowserStack',
            device: 'iPhone 6S',
            os: 'ios',
            os_version: '9.3'
        },
        bs_iphone7: {
            base: 'BrowserStack',
            device: 'iPhone 7',
            os: 'ios',
            os_version: '10.0'
        },
        bs_samsungS5_android: {
            base: 'BrowserStack',
            device: 'Samsung Galaxy S5',
            os: 'android',
            browser: 'Android Browser',
            browser_version: '4',
            os_version: '4.4'
        },
        bs_samsungS5_chrome: {
            base: 'BrowserStack',
            device: 'Samsung Galaxy S5',
            os: 'android',
            browser: 'Chrome Mobile',
            browser_version: '33',
            os_version: '4.4'
        },
    }
    if (options.browserStack) {
        karmaConfig.browserStack = typeof(options.browserStack) === 'object' ? options.browserStack : {};
        karmaConfig.browserStack.username = process.env.BROWSERSTACK_USERNAME;
        karmaConfig.browserStack.accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
        karmaConfig.customLaunchers = options.customLaunchers ? options.customLaunchers : browserStackCustomLaunchers;
        karmaConfig.browsers = options.browsers ? options.browsers : ['bs_safari_mac', 'bs_chrome_win', 'bs_firefox_win', 'bs_edge_win', 'bs_ie11_win', 'bs_iphone6s', 'bs_iphone7', 'bs_samsungS5_android', 'bs_samsungS5_chrome'];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.concurrency = options.concurrency || karmaConfig.browsers.length;
        karmaConfig.singleRun = true;
    } else {
        karmaConfig.browsers = options.browsers || ['Electron'];
        karmaConfig.reporters = options.reports || ['mocha', 'BrowserStack'];
        karmaConfig.singleRun = ! globalConfig.devmode || options.singleRun;
    }
    karmaConfig.client = {
        captureConsole: true,
        mocha: {
            reporter: 'html',
            timeout: 10000
        },
        mochaReporter: {
            output: 'full',
            maxLogLines: - 1
        }
    };

    const server = new KarmaServer(karmaConfig, (exitCode) => {
        done();
        process.exit(exitCode);
    });
    server.start();
};