'use strict';

const globalConfig = require('./global-config');

const registerTask = (gulp, name, type, options) => {
    try {

        const task = () => require(`./gulptasks/${type}`)(gulp, options);
        gulp.task(name, options.dependencies || [], task);

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
                registerTask(gulp, taskName, taskOptions.type || taskName, taskOptions);
            });
        },

        get config() { return globalConfig; }
    };
};
