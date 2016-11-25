const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    const files = options.files//.map(f => path.resolve(process.cwd(), f));
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    new KarmaServer({
        basePath: process.cwd(),
        files,
        browsers: ['Electron'],
        singleRun: !globalConfig.devmode,
        // configFile: path.resolve(__dirname, '../karma.conf.js'),

        // client: { useIframe: false },
        reporters: ['mocha'],
        frameworks: ['mocha', 'chai', 'sinon'],//.concat(options.frameworks || []),
        plugins: [
            'karma-mocha-reporter',
            'karma-mocha',
            'karma-sinon',
            'karma-chai',
            'karma-electron'
        ], //.concat(options.plugins || []),
        client: {
            mocha: {
                reporter: 'html'
            }
        }

    }, done).start();
};
