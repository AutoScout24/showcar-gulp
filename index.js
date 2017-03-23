'use strict';

const globalConfig = require('./global-config');

module.exports = (gulp) => ({
    js: options => () => require('./gulptasks/js')(gulp, options),
    clean: options => () => require('./gulptasks/clean')(gulp, options),
    scss: options => () => require('./gulptasks/scss')(gulp, options),
    serve: options => () => require('./gulptasks/serve')(gulp, options),
    karma: options => (done) => require('./gulptasks/karma')(gulp, options, done),
    imagemin: options => (done) => require('./gulptasks/imagemin')(gulp, options, done),
    eslint: options => (done) => require('./gulptasks/eslint')(gulp, options, done),
    stylelint: options => (done) => require('./gulptasks/stylelint')(gulp, options, done),
    config: globalConfig
});


/*const registerTask = (gulp, name, type, options) => {
 try {

 const task = done => require(`./gulptasks/${type}`)(gulp, options, done);
 gulp.task(name, options.dependencies || [], task);

 if (options.watch) {
 gulp.task(`${name}:watch`, [name], () => {
 return gulp.watch(options.watch, [name]);
 });
 }

 } catch(ex) {
 console.error(`ERROR: Could not register '${name}' task!`);
 }
 };*/

// module.exports = (gulp) => {
//     return {
//         registerTasks(options) {
//             Object.keys(options).forEach(taskName => {
//                 const taskOptions = options[taskName];
//                 registerTask(gulp, taskName, taskOptions.type || taskName, taskOptions);
//             });
//         },

//         get config() { return globalConfig; }
//     };
// };