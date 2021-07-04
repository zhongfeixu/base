const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoConfigPlugin = require('./AutoConfig')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '', //  js前缀公共部分
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
      chunkFilename: '[id].[chunkhash:8].css',
    }),
    // new MiniCssExtractPlugin(),
    new AutoConfigPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve('src/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader','postcss-loader' // postcss-loader 可选
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      //babel 配置
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader?cacheDirectory',//loader的cacheDirectory选项，开启后用缓存，提升打包速度
        },
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/   //排除
      }
    ]
  },
  // optimization: {
  //   　　splitChunks: {
  //   　　　　cacheGroups: {
  //   　　　　　　styles: {
  //   　　　　　　　　name: 'styles',
  //   　　　　　　　　test: /\.scss$/,
  //   　　　　　　　　chunks: 'all',
  //   　　　　　　　　enforce: true, // 忽略到前面到配置，不管是minSize,maxSize等等，只要是css，都打包到同一个文件中
  //   　　　　　　},
  //   　　　　},
  //   　　},
  //   },

}