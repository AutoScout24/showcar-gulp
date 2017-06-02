module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                options: {
                    presets: ['es2015s']
                }
                // exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
            }
        ]
    }
};
