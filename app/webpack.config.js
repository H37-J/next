const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/preload.js',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    externals: {
        puppeteer: 'require("puppeteer")',
        'clone-deep': 'commonjs clone-deep'
    },
    node: {
        __dirname: false,
        __filename: false
    }
};
