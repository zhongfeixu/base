// 本地项目启动服务


// 依赖引入
const express = require('express');
const webpack = require('webpack');
const open = require('open');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const port = 8888;
// 创建一个网站服务
const app = express();
// 创建一个webpack编译器
const compiler = webpack(require('../build/webpack'));
// 添加webpack热部署中间件到app中
app.use(webpackHotMiddleware(compiler));
// 添加webpack打包服务中间件到app中
app.use(
  webpackDevMiddleware(compiler, {
    stats: compiler.options.stats,
    publicPath: compiler.options.output.publicPath,
  }),
);

// 开始监听指定端口
const server = app.listen(port, err => {
  if (err) {
    console.error('Sorry has a error occur!');
  } else {
    let port = server.address().port;
    const url = 'http://127.0.0.1:' + port;
    open(url);
  }
});