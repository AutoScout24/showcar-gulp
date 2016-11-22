const clean = require('gulp-clean');

module.exports = (gulp, options) => {
    return gulp.src(options.files, { read: false }).pipe(clean({ force: true }));
};
