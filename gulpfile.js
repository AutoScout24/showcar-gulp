const gulp = require('gulp');
const scgulp = require('.')(gulp);

gulp.task('js', scgulp.rollup({
    entry: 'test/js-src/main.entry.js',
    out: 'test/dist/main.min.js',
    // watch: 'test/js-src/**/*.js',
}));

gulp.task('js:watch', () => {
    gulp.watch(['test/js-src/**/*.js'], ['js']);
});

gulp.task('scss', scgulp.scss({
    entry: 'test/scss-src/main.scss',
    out: 'test/dist/main.min.css',
    // watch: 'test/scss-src/**/*.scss'
}));

gulp.task('scss:watch', () => {
    gulp.watch(['test/scss-src/**/*.scss'], ['js']);
});

gulp.task('clean', scgulp.clean({
    files: ['test/dist/**/*']
}));

gulp.task('serve', scgulp.serve({
    dir: 'test/dist'
}));

gulp.task('jstest', scgulp.rollup({
    entry: 'test/test-src/main.spec.js',
    out: 'test/dist/main.min.spec.js',
    watch: ['test/test-src/**/*.js', 'test/js-src/**/*.js']
}));

gulp.task('jstest:watch', () => {
    gulp.watch(['test/test-src/**/*.js', 'test/js-src/**/*.js'], ['karma']);
});


gulp.task('karma', ['jstest'], scgulp.karma({
    dependencies: ['jstest'],
    files: ['test/dist/main.min.spec.js']
}));

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('dev', ['set-dev', 'js:watch', 'jstest:watch', 'karma', 'scss:watch', 'serve']);
