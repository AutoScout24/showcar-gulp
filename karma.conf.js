const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = config => {
    config.set({
        files: [
            // { pattern: 'src/**/*.js', included: false, served: true, watched: true },
            // { pattern: 'test/**/*.js', included: true, served: true, watched: true }
        ],
        frameworks: ['mocha', 'chai', 'sinon'],
        client: {
            useIframe: false
        },
        preprocessors: {
        },
        reporters: ['mocha'],
        plugins: [
            'karma-mocha-reporter',
            'karma-mocha',
            'karma-sinon',
            'karma-chai',
            'karma-electron'
        ],
        client: {
            mocha: {
                reporter: 'html'
            }
        }
    });
};
