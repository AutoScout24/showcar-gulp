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
