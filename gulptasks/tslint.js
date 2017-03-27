const tslint = require('gulp-tslint');

module.exports = (gulp, options) => {
  return gulp.src(options.files).pipe(tslint()).pipe(tslint.report());
};
