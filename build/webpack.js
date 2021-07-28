const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoConfigPlugin = require('./AutoConfig')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
console.log(path.resolve(`src/index.js`))

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: 'source-map',
  name: 'demo',
  mode: !isProduction ? 'development' : 'production',
  stats: {
    children: false,
    chunks: false,
    assets: false,
    modules: false,
  },
  context: path.resolve(''),
  entry: {
    main:path.resolve(`src/index.js`),
    // '/js/test': path.resolve(`src/pages/test/test.js`),
    // '/js/product': path.resolve(`src/pages/product/index.js`),
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '', //  js前缀公共部分
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
        ],
      },

      {
        test: /\.(scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
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
      },
      // 图片解析
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100,
              outputPath: 'images',//决定打包出来的文件的路径 在 dist 下的路径
              // publicPath:'../image',//决定引用的文件的路径 publicPath+name = css中引用的url的路径
              name: '[name]_[hash:10].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
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