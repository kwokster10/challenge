const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const path = require('path');
const context = path.resolve('./');

module.exports = {
  context: context,
  entry: {
    vendors: [
      'react',
      'react-dom'
    ],
    app: './exercise.jsx'
  },
  output: {
    path: path.resolve('./public'),
    filename: '[name]_bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
      }]
    }]
  },
  plugins: [
    new CommonsChunkPlugin({
      name: 'vendors'
    })
  ]
};
