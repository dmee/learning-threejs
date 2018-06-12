const path = require('path');
const webpack = require('webpack');

let basePath = process.env.BASE_PATH;
module.exports = {
    entry: basePath + '/src/modules/index.js',
    output: {
        filename: 'bundle.min.js',
        libraryTarget: 'umd',
        path: basePath + '/dist/scripts/',
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: require.resolve('jquery'),
            use: [{
                loader: 'expose-loader',
                options: 'jQuery'
            }, {
                loader: 'expose-loader',
                options: '$'
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            THREE: 'THREE'
        })
    ]
};