const stylelint = require('gulp-stylelint');

module.exports = (gulp, options) => {

    return gulp.src(options.files).pipe(stylelint({
        failAfterError: false,
        debug: true,
        reporters: [
            { formatter: 'string', console: true }
        ]
    }));

};
