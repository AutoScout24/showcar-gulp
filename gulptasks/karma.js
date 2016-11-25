const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    const frameworks = ['mocha', 'chai', 'sinon'].concat(options.frameworks || []);
    const plugins = ['karma-mocha-reporter', 'karma-mocha', 'karma-sinon', 'karma-chai', 'karma-electron'].concat(options.plugins || []);

    new KarmaServer({
        basePath: process.cwd(),
        files,
        browsers: ['Electron'],
        singleRun: !globalConfig.devmode,
        reporters: ['mocha'],
        frameworks,
        plugins,
        // client: { useIframe: false },
        client: {
            mocha: {
                reporter: 'html'
            }
        }

    }, done).start();
};
