const del = require('del');
const vinylPaths = require('vinyl-paths');

module.exports = (gulp, options) => {
    return gulp.src(options.files, { read: false }).pipe(vinylPaths(del));
};
