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
        loaders: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      '@base': path.resolve(__dirname, 'client/public'),
      '@components': path.resolve(__dirname, 'client/src/components'),
      '@actions': path.resolve(__dirname, 'client/src/actions'),
      '@reducers': path.resolve(__dirname, 'client/src/reducers'),
      '@utils': path.resolve(__dirname, 'client/src/utils'),
      '@validations': path.resolve(__dirname, 'client/src/validations'),
      '@config': path.resolve(__dirname, 'client/src/config')
    }
  },
  plugins: [htmlPlugin]
};
