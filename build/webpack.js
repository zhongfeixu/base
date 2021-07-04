const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoConfigPlugin = require('./AutoConfig')
console.log(path.resolve(`src/index.js`))
module.exports = {
  devtool: 'source-map',
  name: 'demo',
  mode: 'development',
  stats: {
    children: false,
    chunks: false,
    assets: false,
    modules: false,
  },
  context: path.resolve(''),
  entry: {
    main: path.resolve(`src/index.js`),
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename:'[name].js',
    publicPath: '', //  js前缀公共部分
  },
  plugins: [
    new AutoConfigPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve('src/index.html'),
    }),
  ],
  module: {
    rules: [
      //babel 配置
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader?cacheDirectory',//loader的cacheDirectory选项，开启后用缓存，提升打包速度
        },
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/   //排除
      },
    ]
  }

}