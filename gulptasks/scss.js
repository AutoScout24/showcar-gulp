const path = require('path');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const pleeease = require('gulp-pleeease');
const util = require('gulp-util');
const rename = require('gulp-rename');

module.exports = (gulp, options) => {

    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    return gulp.src(options.entry)
        .pipe(sourcemaps.init())
        .pipe(sass({
            importer: require('node-sass-import')
        }).on('error', sass.logError))
        .pipe(pleeease())
        .pipe(rename(filename))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(filepath));
};
