const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });
    const frameworks = ['mocha', 'chai', 'sinon'].concat(
        options.frameworks || []
    );
    const plugins = [
        'karma-mocha-reporter',
        'karma-mocha',
        'karma-sinon',
        'karma-chai',
        'karma-webpack',
        'karma-electron',
        'karma-firefox-launcher',
        'karma-safari-launcher',
        'karma-chrome-launcher',
        'karma-ie-launcher',
        'karma-edge-launcher',
        'karma-browserstack-launcher',
        'karma-sauce-launcher',
        'karma-sourcemap-loader'
    ].concat(options.plugins || []);

    const proxies = options.proxies || '';
    const urlRoot = options.proxies ? '/karma/' : '/'; // if  proxy, move karma to another url
    const preprocessors = options.preprocessors;
    let karmaConfig = {
    // webpack configuration
        webpack: require('../.webpack.config.js'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        // logLevel: 'DEBUG', //keep for debugging
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
        // use an extended timeout for browsers in case the service is busy
        browserNoActivityTimeout: 4 * 60000,
        captureTimeout: 4 * 60000,
        browserDisconnectTimeout: 4 * 60000,
        processKillTimeout: 4 * 60000,
        browserDisconnectTolerance: 1,
    };

    const launchers = {
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
            browser_version: 'latest',
            os: 'Windows',
            os_version: '10'
        },
        bs_firefox_win: {
            base: 'BrowserStack',
            browser: 'Firefox',
            browser_version: '61.0',
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
        sl_chrome: {
            base: 'SauceLabs',
            browserName: 'chrome',
            version: 'latest'
        },
        sl_firefox: {
            base: 'SauceLabs',
            browserName: 'firefox',
            version: 'latest'
        },
        sl_ie: {
            base: 'SauceLabs',
            browserName: 'internet explorer',
            platform: 'Windows 8.1',
            version: '11'
        },
        sl_safari: {
            base: 'SauceLabs',
            browserName: 'safari',
            platform: 'OS X 10.11',
            version: '10.0'
        },
        sl_edge: {
            base: 'SauceLabs',
            browserName: 'MicrosoftEdge',
            platform: 'Windows 10',
            version: 'latest'
        }
    };

    if (options.browserStack) {
        karmaConfig.browserStack =
      typeof options.browserStack === 'object' ? options.browserStack : {};
        karmaConfig.browserStack.username = process.env.BROWSERSTACK_USERNAME;
        karmaConfig.browserStack.accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
        karmaConfig.customLaunchers = options.customLaunchers
            ? options.customLaunchers
            : launchers;
        karmaConfig.browsers = options.browsers
            ? options.browsers
            : [
                'bs_safari_mac',
                'bs_chrome_win',
                'bs_firefox_win',
                'bs_edge_win',
                'bs_ie11_win',
                'bs_iphone6s',
                'bs_iphone7',
                'bs_samsungS5_android',
                'bs_samsungS5_chrome'
            ];
        karmaConfig.reporters = options.reports || ['mocha'];
        karmaConfig.concurrency =
      options.concurrency || karmaConfig.browsers.length;
        karmaConfig.singleRun = true;
        karmaConfig.browserStack.timeout = 60 * 8; //8 minutes
    } else if (options.sauceLabs) {
        karmaConfig.sauceLabs =
      typeof options.sauceLabs === 'object' ? options.sauceLabs : {};
        karmaConfig.sauceLabs.username = options.sauceLabs.username || process.env.SAUCE_USERNAME;
        karmaConfig.sauceLabs.accessKey = options.sauceLabs.accessKey || process.env.SAUCE_ACCESS_KEY;
        karmaConfig.sauceLabs.tunnelIdentifier = options.sauceLabs.tunnelId || process.env.TRAVIS_JOB_NUMBER;
        karmaConfig.sauceLabs.startConnect = false;
        karmaConfig.customLaunchers = options.customLaunchers
            ? options.customLaunchers
            : launchers;
        karmaConfig.browsers = options.browsers
            ? options.browsers
            : ['sl_chrome', 'sl_firefox', 'sl_ie', 'sl_safari', 'sl_edge'];
        karmaConfig.reporters = options.reports || ['dots', 'saucelabs'];
        karmaConfig.singleRun = true;
        karmaConfig.concurrency =
      options.concurrency || karmaConfig.browsers.length;
    } else {
        karmaConfig.browsers = options.browsers || ['Electron'];
        karmaConfig.reporters = options.reports || ['mocha', 'BrowserStack'];
        karmaConfig.singleRun = !globalConfig.devmode || options.singleRun;
    }
    karmaConfig.client = {
        captureConsole: true,
        mocha: {
            reporter: 'html',
            timeout: 20000
        },
        mochaReporter: {
            output: 'full',
            maxLogLines: -1
        }
    };

    const server = new KarmaServer(karmaConfig, exitCode => {
        done();
        process.exit(exitCode);
    });
    server.start();
};
