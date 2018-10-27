'use strict';

console.log('sdds');
const path = require('path');
const webpack = require('webpack');

console.log('sdds');

const ConcatPlugin = require('webpack-concat-plugin');

const vendorFiles = [
  './node_modules/angular/angular.min.js',
  './node_modules/angular-animate/angular-animate.min.js',
  './node_modules/angular-aria/angular-aria.min.js',
  './node_modules/angular-messages/angular-messages.min.js',
  './node_modules/angular-material/angular-material.min.js',
  './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js'
];

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    'app': './lib/app/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/')
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new ConcatPlugin({
      useHash: false,
      sourceMap: true,
      name: 'vendor',
      fileName: '[name].js',
      filesToConcat: vendorFiles
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'lib')
      ],
      use: [{
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [['@babel/env', { loose: true, modules: false }]]
        }
      }]
    }]
  }
};
