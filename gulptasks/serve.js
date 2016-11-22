const bs = require('browser-sync').create();

module.exports = (gulp, options) => {
    bs.init({
        open: false,
        server: {
            baseDir: options.dir
        },
        port: options.port || 3000
    });

    gulp.watch(`${options.dir}/**/*`).on('change', bs.reload);
};
