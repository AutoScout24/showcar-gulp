const gulp = require('gulp');
const scgulp = require('.')(gulp);

scgulp.registerTasks({
    js: {
        type: 'js',
        entry: 'test/js-src/main.entry.js',
        out: 'test/dist/main.min.js',
        watch: 'test/js-src/**/*.js'
    },
    scss: {
        type: 'scss',
        entry: 'test/scss-src/main.scss',
        out: 'test/dist/main.min.css',
        watch: 'test/scss-src/**/*.scss'
    },
    clean: {
        type: 'clean',
        path: ['test/dist/**/*']
    },
    serve: {
        type: 'serve',
        dir: 'test/dist',
        // port: 8080
    }
});

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('dev', ['set-dev', 'js:watch', 'scss:watch', 'serve']);
