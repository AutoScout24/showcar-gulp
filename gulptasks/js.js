var cache = null;

const path = require('path');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const rollup = require('gulp-rollup');

const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');
const filesize = require('rollup-plugin-filesize');

const globalConfig = require('../global-config');

module.exports = (gulp, options) => {
    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    const config = {
        entry: options.entry,
        cache,
        rollup: require('rollup'),
        plugins: [
            // TODO: https://github.com/calvinmetcalf/rollup-plugin-node-builtins
            nodeResolve({ jsnext: true, main: true, browser: true }),
            commonjs(),
            buble()
        ]
    };

    if (!globalConfig.devmode) {
        config.plugins.push(uglify());
        config.plugins.push(filesize());
    }

    return gulp.src('**/*.js')
               .pipe(sourcemaps.init({ loadMaps: true }))
               .pipe(rollup(config))
               .pipe(rename(filename))
               .pipe(sourcemaps.write('./', { sourceMappingURLPrefix: options.sourceMappingURLPrefix }))
               .pipe(gulp.dest(filepath))
};
