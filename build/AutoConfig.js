var path = require('path');
var fs = require('fs');
var X2JS = require('x2js');

/**
 * AutoConfigPlugin 构造函数
 * @param {Boolean}  isEnable 是否启用配置插件
 * @param {String} filePath auto-config.xml 文件路径 默认路径为: path.resolve('META-INF/auto-config.xml')
 */
function AutoConfigPlugin(isDisable, filePath) {
  this.isEnable = isDisable !== false;
  this.filePath = filePath;
  this.data = {};
  if (!this.isEnable) {
    this.apply = function () {
    }
  } else {
    this.initAutoConfig();
  }
}

/**
 * 加载auto-config.xml文件
 */
AutoConfigPlugin.prototype.initAutoConfig = function () {
  var file = this.filePath = this.filePath || path.resolve('META-INF/auto-config.xml');
  if (fs.existsSync(file)) {
    var xml = String(fs.readFileSync(file)).toString('utf8');
    var x2js = new X2JS({ attributePrefix: '' });
    var config = x2js.xml2js(xml).config || {};
    var property = ((config.group || {}) || {}).property || [];
    var generate = (config.script || {}).generate;
    var data = this.data;
    generate = generate instanceof Array ? generate : [generate || {}];
    this.config = config;
    property.map(function (property) {
      data[property.name] = property.defaultValue;
    }, {})
    this.generate = generate;
    this.generate.map(this.validateGenerate.bind(this));
    this.generateFiles = generate.map(function (record) { return path.resolve(record.template) })
  }
}

/**
 * 应用插件
 * @param {Compiler} compiler 
 */
AutoConfigPlugin.prototype.apply = function (compiler) {
  var filePath = this.filePath;
  var initAutoConfig = this.initAutoConfig.bind(this);
  var generateFiles = this.generateFiles;
  compiler.plugin('emit', function (compilation, callback) {
    compilation.fileDependencies.add(filePath)
    callback();
  })
  compiler.hooks.invalid.tap('watch', function (id) {
    if (id === filePath) {
      initAutoConfig();
      generateFiles.map(function (file) {
        fs.utimes(file, Date.now() - 1, new Date(), (a) => a);
      })
    }
  })
  this.attachLoaders(compiler);
}

/**
 * 附加模板loader
 * @param {Compiler} compiler 
 */
AutoConfigPlugin.prototype.attachLoaders = function (compiler) {
  var options = compiler.options;
  var module = options.module;
  var rules = module.rules;
  rules.push({
    options: {
      data: this.data
    },
    loader: require.resolve('./AutoConfigLoader.js'),
    include: this.generateFiles,
  })
}

/**
 * 校验generate.template
 */
AutoConfigPlugin.prototype.validateGenerate = function (generate) {
  var templatePath = path.resolve(generate.template || '');
  if (!fs.existsSync(templatePath) || !generate.template) {
    throw new Error('auto-config.xml中generate.template:' + templatePath + ',不存在')
  }
}


module.exports = AutoConfigPlugin;