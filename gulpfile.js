const gulp = require('gulp');
const scgulp = require('.')(gulp);

scgulp.registerTasks({
    js: {
        entry: 'test/js-src/main.entry.js',
        out: 'test/dist/main.min.js',
        watch: 'test/js-src/**/*.js'
    },
    scss: {
        entry: 'test/scss-src/main.scss',
        out: 'test/dist/main.min.css',
        watch: 'test/scss-src/**/*.scss'
    },
    clean: {
        // type: 'clean',
        path: ['test/dist/**/*']
    },
    serve: {
        dir: 'test/dist',
        // port: 8080
    },

    // jstest: {
    //     type: 'js',
    //     entry: 'test/test-src/main.spec.js',
    //     out: 'test/dist/main.min.spec.js',
    //     watch: ['test/test-src/**/*.js', 'test/js-src/**/*.js'],
    //     sourceMappingURLPrefix: '/base/test/dist'
    // },
    // karma: {
    //     dependencies: ['jstest'],
    //     // files: ['test/dist/**/*.spec.js']
    //     files: [
    //         { pattern: 'test/dist/**/*.spec.js', included: true, served: true, watched: true },
    //         { pattern: 'test/dist/**/*.spec.js.map', included: false, served: true, watched: false }
    //     ]
    // }
});

gulp.task('set-dev', () => {
    scgulp.config.devmode = true;
});

gulp.task('build', ['js', 'scss']);

gulp.task('dev', ['set-dev', 'js:watch', 'scss:watch', 'serve']);
