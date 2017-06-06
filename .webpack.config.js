module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    query: {
                        presets: [['es2015', { loose: true, modules: false }]],
                    }
                }
                // exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
            }
        ]
    }
};
