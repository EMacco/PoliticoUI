const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common');

const cleanerPlugin = new CleanWebpackPlugin('./client/dist', {});
const optimizeCSSPlugin = new OptimizeCSSAssetsPlugin({});

const cssPlugin = new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css',
});

const uglifyPlugin = new UglifyJsPlugin({
    cache: true,
    parallel: true,
    sourceMap: true // set to true if you want JS source maps
});

const compressionPlugin = new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
});

module.exports = merge(common, {
    mode: 'production',
    entry: ['./client/src/index.jsx'],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'style-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        cleanerPlugin,
        cssPlugin,
        uglifyPlugin,
        optimizeCSSPlugin,
        compressionPlugin
    ]
});