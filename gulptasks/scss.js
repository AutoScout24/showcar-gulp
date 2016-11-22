const path = require('path');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const pleeease = require('gulp-pleeease');
const util = require('gulp-util');
const rename = require('gulp-rename');

const globalConfig = require('../global-config');

module.exports = (gulp, options) => {

    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    return gulp.src(options.entry)
                .pipe(sourcemaps.init())
                .pipe(sass({
                    importer: require('node-sass-import'),
                }).on('error', sass.logError))
                .pipe(pleeease({
                    autoprefixer: {
                        browsers: ['last 3 versions', '> 5%', 'ios 9']
                    },
                    minifier: !globalConfig.devmode
                }))
                .pipe(rename(filename))
                .pipe(sourcemaps.write('./', { sourceMappingURLPrefix: options.sourceMappingURLPrefix }))
                .pipe(gulp.dest(filepath));
};
