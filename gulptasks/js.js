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
        plugins: [],
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [require('babel-preset-es2015').buildPreset, {
                            modules: process.env.RUN_MODE === 'es' ? false : 'commonjs',
                        }],
                    ],
                }
            }]
        }
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