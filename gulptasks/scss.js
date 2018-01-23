const path = require('path');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var atImport = require('postcss-import');
var cssnano = require('cssnano');
const rename = require('gulp-rename');

const globalConfig = require('../global-config');

const plugins = [
    atImport(),
    autoprefixer({browsers: ['last 3 versions', '> 5%', 'ios 9']}),
    cssnano()
];

module.exports = (gulp, options) => {

    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    return gulp.src(options.entry)
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss(plugins))
                .pipe(rename(filename))
                .pipe(sourcemaps.write('./', { sourceMappingURLPrefix: options.sourceMappingURLPrefix }))
                .pipe(gulp.dest(filepath));
};
