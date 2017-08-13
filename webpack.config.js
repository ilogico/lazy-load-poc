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
        rules: [
            {
                test: /\.js(?:x)?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['react']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use: [
                    'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            camelCase: true
                        }
                    }
                ]
            }
        ]
    }

};