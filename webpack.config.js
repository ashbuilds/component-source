require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};

module.exports = [
  merge(config, {
    entry: path.resolve(__dirname + '/src/index.js'),
    output: {
      filename: 'index.js',
      publicPath: '/',
      path: __dirname + '/dist',
      libraryTarget: 'commonjs',
    }
  }),
  merge(config, {
    entry: path.resolve(__dirname + '/src/register.js'),
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'register.js',
      libraryTarget: 'commonjs',
    }
  })
];