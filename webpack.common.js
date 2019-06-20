const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    title: 'Politico',
    template: 'client/src/index.html',
    filename: 'index.html'
});

module.exports = {
    entry: path.join(__dirname, 'client/src', 'index.jsx'),
    output: {
        path: path.join(__dirname, './client/dist'),
        filename: '[hash].bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.jsx', '.js', '.png', '.svg', '.ico', '.jpg'],
    },
    plugins: [
        htmlPlugin,
    ]
};