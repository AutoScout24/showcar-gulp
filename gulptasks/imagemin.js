const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

module.exports = (gulp, options) => {
    return gulp.src(options.entry)
                .pipe(imagemin([
                        imageminMozjpeg({quality: options.quality}),
                        imageminPngquant({quality: options.quality})
                     ]))
                .pipe(gulp.dest(options.out));
};