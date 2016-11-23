const path = require('path');
const KarmaServer = require('karma').Server;
const globalConfig = require('../global-config');

module.exports = (gulp, options, done) => {
    new KarmaServer({
        configFile: path.resolve(__dirname, '../karma.conf.js'),
        files: options.files,
        browsers: ['Electron'],
        singleRun: !globalConfig.devmode,
    }, done).start();
};
