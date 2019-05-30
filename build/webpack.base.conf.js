const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const AutoDllPlugin = require('autodll-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "../src/index.js")
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: ["*", ".js", ".json", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": path.resolve(__dirname, "../src")
    }
  },
  module: {
    rules: [
      //babel将ES6及其以上编译成ES5
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      //将图片文件进行模块化
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader"]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    }),
    new VueLoaderPlugin(),
    //将vue等单独打包进dll文件夹中，这样不需要每次build的时候都重新打包
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: ['vue', 'vue-router', 'vuex']
      }
    }),
    //打包时抽取css为单独文件
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};
