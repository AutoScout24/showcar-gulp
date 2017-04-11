const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {

    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    const frameworks = ['mocha', 'chai', 'sinon', 'source-map-support', 'browserify'].concat(options.frameworks || []);
    const plugins = ['karma-mocha-reporter', 'karma-mocha', 'karma-sinon', 'karma-chai', 'karma-electron', 'karma-browserstack-launcher', 'karma-firefox-launcher', 'karma-safari-launcher', 'karma-chrome-launcher', 'karma-browserify', 'karma-source-map-support'].concat(options.plugins || []);

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
        singleRun: true
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
        }
    }

    if (options.browserStack) {
        karmaConfig.browserStack = options.credentials || {
                username: process.env.BROWSERSTACK_USERNAME,
                accessKey: process.env.BROWSERSTACK_ACCESS_KEY
            };
        karmaConfig.customLaunchers = options.customLaunchers ? options.customLaunchers : browserStackCustomLaunchers;
        karmaConfig.browsers = options.browsers ? options.browsers : ['bs_edge_win', 'bs_safari_mac', 'bs_firefox_win', 'bs_ie11_win', 'bs_chrome_win'];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.concurrency = options.concurrency || karmaConfig.browsers.length;
        karmaConfig.concurrency = 1; //keep temporary
    } else {
        karmaConfig.browsers = options.browsers || ['Electron'];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.singleRun = ! globalConfig.devmode || options.singleRun;
        karmaConfig.singleRun = true; //keep temporary
    }
    karmaConfig.client = {
        captureConsole: true,
        mocha: {
            reporter: 'html',
            timeout: 10000
        }
    };

    const server = new KarmaServer(karmaConfig, () => {
        done();
        process.exit();
    });
    server.start();
};