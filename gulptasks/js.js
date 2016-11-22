var cache = null;

const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');

module.exports = (gulp, options) => {

    const config = {
        entry: options.entry,
        cache,
        plugins: [
            nodeResolve({ jsnext: true, main: true }),
            commonjs(),
            buble(),
            uglify(),
            filesize()
        ]
    };

    return rollup.rollup(config).then(bundle => {
        cache = bundle;

        return bundle.write({
            format: 'iife',
            dest: options.out,
            sourceMap: true
        });
    });
};
