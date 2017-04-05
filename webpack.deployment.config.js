var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/app/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: []
  },
};
