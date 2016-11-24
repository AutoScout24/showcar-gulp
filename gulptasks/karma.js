const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    const files = options.files;
    files.push({ pattern: '**/*.js.map', included: false, watched: false });

    new KarmaServer({
        configFile: path.resolve(__dirname, '../karma.conf.js'),
        files,
        browsers: ['Electron'],
        singleRun: !globalConfig.devmode,
    }, done).start();
};
