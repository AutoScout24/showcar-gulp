const stylelint = require('gulp-stylelint');

module.exports = (gulp, options) => {
    return gulp.src(options.files).pipe(stylelint({
            failAfterError: true,
            debug: true,
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
        .on('error', () => {
            process.exit(1);
        });
};
