'use strict';

const registerTask = (gulp, name, options) => {
    try {

        const task = () => require(`./gulptasks/${name}`)(gulp, options);
        const taskname = options.name || name;

        gulp.task(taskname, task);

        if (options.watch) {
            gulp.task(`${taskname}:watch`, [taskname], () => {
                gulp.watch(options.watch, [taskname]);
            });
        }

    } catch(ex) {
        console.error(`ERROR: Could not register '${name}' task!`);
    }
};

module.exports = (gulp) => {
    return {
        registerTasks(options) {
            Object.keys(options).forEach(name => registerTask(gulp, name, options[name]));
        }
    };

    // const plugins = require('gulp-load-plugins')();
    //
    // const distDir = 'dist';
    // const staticDir = `${distDir}`;
    //
    // const options = {
    //     env: {
    //         production: true
    //     },
    //     js: {
    //         entry: 'src/js/main.js',
    //         out: `${staticDir}/main.min.js`
    //     },
    //     sass: {
    //         entry: 'src/scss/main.scss',
    //         out: `${staticDir}/main.min.css`
    //     }
    // };
    //
    // const loadTask = name => {
    //     const task = require(`./gulptasks/${name}`);
    //     return () => task(gulp, plugins, options);
    // };
    //
    // gulp.task('set-dev', () => options.env.production = false);
    //
    // gulp.task('clean', loadTask('clean'));
    // gulp.task('rollup', loadTask('rollup'));
    // gulp.task('sass', loadTask('sass'));
    // gulp.task('browser-sync', loadTask('browser-sync'));
    //
    // gulp.task('rollup:watch', () => {
    //     const path = require('path');
    //     // gulp.watch(path.basename(options.js.entry), ['rollup']);
    //     gulp.watch('src/**/*.js', ['rollup']);
    // });
    //
    // gulp.task('sass:watch', () => {
    //     const path = require('path');
    //
    //     gulp.watch('src/scss/**/*.scss', ['sass']);
    // });
    //
    // gulp.task('lint-css', () => {
    //     const gulpStylelint = require('gulp-stylelint');
    //
    //     return gulp
    //         .src('src/**/*.scss')
    //         .pipe(gulpStylelint({
    //             reporters: [
    //                 {formatter: 'string', console: true}
    //             ]
    //         }));
    // });
    //
    // gulp.task('dev', ['set-dev', 'rollup:watch', 'sass:watch', 'browser-sync']);
};
