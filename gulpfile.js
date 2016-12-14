const gulp = require('gulp');
const scgulp = require('.')(gulp);

scgulp.registerTasks({
    js: {
        entry: 'test/js-src/main.entry.js',
        out: 'test/dist/main.min.js',
        watch: 'test/js-src/**/*.js',
        rollupConfig: {
            format: 'iife',
            moduleName: 'asdf'
        }
    },
    scss: {
        entry: 'test/scss-src/main.scss',
        out: 'test/dist/main.min.css',
        watch: 'test/scss-src/**/*.scss'
    },
    clean: {
        path: ['test/dist/**/*']
    },
    serve: {
        dir: 'test/dist',
    },
    jstest: {
        type: 'js',
        entry: 'test/test-src/main.spec.js',
        out: 'test/dist/main.min.spec.js',
        watch: ['test/test-src/**/*.js', 'test/js-src/**/*.js'],
    },
    karma: {
        dependencies: ['jstest'],
        files: ['test/dist/main.min.spec.js'],
    }
});

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('dev', ['set-dev', 'js:watch', 'jstest:watch', 'karma', 'scss:watch', 'serve']);
