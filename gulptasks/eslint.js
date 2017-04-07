const eslint = require('gulp-eslint');

module.exports = (gulp, options) => {
    return gulp.src(options.files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on('error', () => {
            process.exit(1);
        });
};
