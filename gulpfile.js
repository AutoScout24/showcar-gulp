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


gulp.task('ts', scgulp.ts({
    entry: 'test/ts-src/main.entry.ts',
    out: 'test/dist/tsmain.min.js'
}));

gulp.task('ts:watch', () => {
    gulp.watch(['test/ts-src/**/*.ts'], ['ts']);
});

gulp.task('tslint', scgulp.tslint({
    files: 'test/ts-src/**/*.ts'
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


gulp.task('tstest', scgulp.ts({
  entry: 'test/test-src/tsmain.spec.ts',
  out: 'test/dist/tsmain.min.spec.js'
}));

gulp.task('tstest:watch', () => {
  gulp.watch(['test/test-src/!**!/!*.ts', 'test/ts-src/!**!/!*.ts'], ['karma']);
});

gulp.task('karma', ['jstest', 'tstest'], scgulp.karma({
    dependencies: ['jstest', 'tstest'],
    files: ['test/dist/main.min.spec.js', 'test/dist/tsmain.min.spec.js']
}));

gulp.task('imagemin', scgulp.imagemin({
    entry: 'test/images/*.*',
    out: 'test/images/compressed',
    quality: 80
}));

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'ts', 'scss']);

gulp.task('lint', ['eslint', 'stylelint', 'tslint']);

gulp.task('dev', ['set-dev', 'build', 'lint', 'js:watch', 'ts:watch', 'scss:watch', 'serve']);

gulp.task('js-dev', ['set-dev', 'js', 'js:watch', 'ts', 'ts:watch']);
