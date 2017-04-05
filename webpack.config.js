const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
let nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = [{
    name: 'server',
    target: 'node',
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'bin'),
      publicPath: 'dist/',
      filename: 'server.js'
    },
    externals: nodeModules,
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    },
    plugins: []
  },
  {
    name: 'client',
    devtool: 'eval',
    entry: './src/client/app/index.js',
    output: {
      path: path.join(__dirname, 'bin'),
      publicPath: 'dist/client/',
      filename: 'client.js'
    },
    resolve: {
      extensions: ['.js', '.json', '.pug', '.html', '.pug', '.css', '.sass', " "]
    },
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
      ]
    }
  }
];
