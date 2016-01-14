var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin('[name].min.css')
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: [
                    /node_modules/,
                    /libs/
                ],
                loader: 'babel',
                query: {
                    "presets": [ "es2015", "react" ]
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!sass')
            }
        ]
    }
};
