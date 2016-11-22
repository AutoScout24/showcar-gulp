'use strict';

const registerTask = (gulp, name, type, options) => {
    try {

        const task = () => require(`./gulptasks/${type}`)(gulp, options);
        gulp.task(name, task);

        if (options.watch) {
            gulp.task(`${name}:watch`, [name], () => {
                gulp.watch(options.watch, [name]);
            });
        }

    } catch(ex) {
        console.error(`ERROR: Could not register '${name}' task!`);
    }
};

module.exports = (gulp) => {
    return {
        registerTasks(options) {
            Object.keys(options).forEach(taskName => {
                const taskOptions = options[taskName];
                registerTask(gulp, taskName, taskOptions.type, taskOptions);
            });
        }
    };

    // gulp.task('set-dev', () => options.env.production = false);
    // gulp.task('clean', loadTask('clean'));
    // gulp.task('browser-sync', loadTask('browser-sync'));

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
