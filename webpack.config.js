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
    node: {
      __dirname: false
    },
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, 'bin'),
      filename: 'server.js'
    },
    externals: nodeModules,
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
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
      filename: 'client.js'
    },
    module: {
      loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  }
];
