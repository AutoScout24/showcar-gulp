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
    resolve: {
      // Add '.ts' and '.tsx' as a resolvable extension.
      extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader?compiler=typescript&+useCache&+useBabel&module=common'
        }]
    },
    plugins: []
  };
  if (!globalConfig.devmode) {
    webpackOptions.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          warnings: false,
          drop_console: false,
        }
      })
    );
  }

  return gulp.src(options.entry)
    .pipe(webpackStream(webpackOptions, webpack))
    .pipe(gulp.dest(filepath));
};
