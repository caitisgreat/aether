var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/src/assets/'
  },
  module: {
    loaders: []
  },
};
