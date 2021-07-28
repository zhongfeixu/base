# base
最简单的基础架构

# 基础架构
1. 支持webpack+react;
2. 支持统一配置架构的变量（xml）
3. react-rouer配置
 3.1  Suspense 懒加载的时候成功前的显示；
 3.2  HashRouter 哈希模式匹配路由
 3.3  Redirect、Route: exact精确匹配,默认跳转
4. 配置scss
 4.1 安装 css-loader sass-loader sass ；
 4.2 rules {}
 4.3 抽离样式MiniCssExtractPlugin:坑 style-loader：是将打包好的样式style插入到html中；
 4.4 MiniCssExtractPlugi：webpack4之后用这个，全部样式打包到里面，单独抽离，以link的方式插入到html中；
 4.5 多个css打包出去，在dist/css中单独存在，依赖于entry中多入口，如果是多个入口，并且是css对应依赖就会独立开来
 4.6  filename: 'css/[name].[chunkhash:8].css',就可以将main.css打包到css目录下
5. cross-env这是一款运行跨平台设置和使用环境变量的脚本。
    process.env   cross-env NODE_ENV=production ---->process.env.NODE_ENV=production
6. 处理图片 url-loader
   6.1 处理css的引入这个不需要特殊处理
   6.2 html 中的 img  ---> html-loader
7.  postcss-loader 的css兼容性
    postcss.config.js中可以配置对css的插件处理等
8. js如何统一打包到一个js中？ 所以这里以后有个全局便利找文件的目录就行，对于多页面
   将入口的key值改成 /js/product，就可以后面的[name]取得是最后一个值

