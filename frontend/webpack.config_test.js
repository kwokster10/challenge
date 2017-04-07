const webpack = require('webpack');
const path = require('path');
const context = path.resolve('./');
var glob = require("glob");

module.exports = {
  context: context,
  entry: glob.sync('./spec/**/*_spec.js'),
  output: {
    path: path.resolve('./spec'),
    filename: 'spec.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/addons': 'react',
    'react/lib/ExecutionEnvironment': 'react',
    'react/lib/ReactContext': 'react',
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
};
