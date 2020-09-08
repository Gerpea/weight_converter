const {
  merge
} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    pathinfo: false,
  },
  devServer: {
    contentBase: './dist',
  },
});