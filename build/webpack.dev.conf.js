const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    //自动打开浏览器
    open: true,
    //开启热更新
    hot: true,
    // hotOnly:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.SplitChunksPlugin()
  ]
});