const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
});

const hotReloader = new webpack.HotModuleReplacementPlugin();

module.exports = merge(common, {
    mode: 'development',
    entry: {
        app: [
            'react-hot-loader/patch', './client/src/index.jsx'
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'client/src'),
        historyApiFallback: true
    },
    plugins: [cssPlugin, hotReloader]
});