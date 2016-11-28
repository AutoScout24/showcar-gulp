var cache = null;

const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const rollup = require('rollup-stream');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');
const builtins = require('rollup-plugin-node-builtins');

const globalConfig = require('../global-config');

module.exports = (gulp, options) => {
    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    const config = Object.assign({
        entry: options.entry,
        cache,
        rollup: require('rollup'),
        plugins: [
            builtins(),
            nodeResolve({ jsnext: true, main: true, browser: true }),
            commonjs(),
            buble()
        ]
    }, options.rollupConfig);

    if (!globalConfig.devmode) {
        config.plugins.push(uglify());
        config.plugins.push(filesize());
    }

    return rollup(config)
        .on('bundle', function(bundle) {
          cache = bundle;
        })
        .pipe(source(options.entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(rename(filename))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(filepath));
};
