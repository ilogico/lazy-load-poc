'use strict';
const path = require('path');

module.exports = {
    entry: './src/application.jsx',
    output: {
        filename: 'application.js',
        path: path.join(__dirname, 'build')
    },
    devtool: 'sourcemap',
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js(?:x)?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['react']
                }
            }
        ]
    }

};