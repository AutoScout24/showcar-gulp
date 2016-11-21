const clean = require('gulp-clean');
const merge = require('merge-stream');

const cleanPath = (gulp, path) => gulp.src(path, { read: false }).pipe(clean({ force: true }));

module.exports = (gulp, options) => {
    if (Array.isArray(options.path)) {
        return merge.apply(null, options.path.map(p => cleanPath(gulp, p)));
    }

    return cleanPath(options.path);
};
