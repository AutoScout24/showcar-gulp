var cache = null;

const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const rollup = require('rollup-stream');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');

const html = require('rollup-plugin-html');

const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');
const builtins = require('rollup-plugin-node-builtins');
const scss = require('rollup-plugin-scss');

const globalConfig = require('../global-config');

module.exports = (gulp, options) => {
    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    const config = Object.assign({
        entry: options.entry,
        cache,
        rollup: require('rollup'),
        plugins: [
            scss({
                output: false,
                include: '**/*.scss'
            }),
            html(),
            builtins(),
            nodeResolve({ jsnext: true, main: true, browser: true }),
            commonjs(),
            buble()
        ],
        format: 'iife',
        moduleName: 'asdf'
    }, options.rollupConfig);

    if (!globalConfig.devmode) {
        config.plugins.push(uglify());
        config.plugins.push(filesize());
    }

    return rollup(config)
        .on('bundle', function(bundle) {
            cache = bundle;
        })
        // .on('error', e => { console.log(e); })
        .pipe(source(options.entry))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(rename(filename))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(filepath));
};
