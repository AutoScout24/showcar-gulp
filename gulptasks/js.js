const path = require('path');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const globalConfig = require('../global-config');

module.exports = (gulp, options) => {
    const filename = path.basename(options.out);
    const filepath = path.dirname(options.out);

    let webpackOptions = {
        devtool: "source-map",
        output: {
            filename: filename,
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-es2015'],
                        /*presets: [
                         [require('babel-preset-es2015').buildPreset, {
                         modules: process.env.RUN_MODE === 'es' ? false : 'commonjs',
                         }],
                         ],*/
                        cacheDirectory: '.tmp/js',
                    },
                }],
            }]
        },
        plugins: []
    }
    if (! globalConfig.devmode) {
        webpackOptions.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false,
                    drop_console: false,
                }
            })
        )
        // webpackOptions.plugins.push(filesize());
    }

    return gulp.src(options.entry)
        .pipe(webpackStream(webpackOptions, webpack))
        .pipe(gulp.dest(filepath));
};
