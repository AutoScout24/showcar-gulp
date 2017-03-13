const gulp = require('gulp');
const scgulp = require('.')(gulp);

gulp.task('js', scgulp.js({
    entry: 'test/js-src/main.entry.js',
    out: 'test/dist/main.min.js',
    // watch: 'test/js-src/**/*.js',
}));

gulp.task('js:watch', () => {
    gulp.watch(['test/js-src/**/*.js'], ['js']);
});

gulp.task('eslint', scgulp.eslint({
    files: 'test/js-src/**/*.js'
}));

gulp.task('scss', scgulp.scss({
    entry: 'test/scss-src/main.scss',
    out: 'test/dist/main.min.css',
    // watch: 'test/scss-src/**/*.scss'
}));

gulp.task('scss:watch', () => {
    gulp.watch(['test/scss-src/!**!/!*.scss'], ['scss']);
});

gulp.task('stylelint', scgulp.stylelint({
    files: 'test/scss-src/**/*.scss'
}));

gulp.task('clean', scgulp.clean({
    files: ['test/dist/!**!/!*']
}));

gulp.task('serve', scgulp.serve({
    dir: 'test/dist'
}));

gulp.task('jstest', scgulp.js({
    entry: 'test/test-src/main.spec.js',
    out: 'test/dist/main.min.spec.js',
    watch: ['test/test-src/!**!/!*.js', 'test/js-src/!**!/!*.js']
}));

gulp.task('jstest:watch', () => {
    gulp.watch(['test/test-src/!**!/!*.js', 'test/js-src/!**/!*.js'], ['karma']);
});

gulp.task('karma', ['jstest'], scgulp.karma({
    dependencies: ['jstest'],
    files: ['test/dist/main.min.spec.js']
}));

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('lint', ['eslint', 'stylelint']);

gulp.task('dev', ['set-dev', 'build', 'lint', 'js:watch', 'scss:watch', 'serve']);

gulp.task('js-dev', ['set-dev', 'js', 'js:watch']);
