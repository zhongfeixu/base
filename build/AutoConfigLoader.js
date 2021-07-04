function compile(template, data) {
    var content = template.replace(/\$\{(\w|\.|\d)+?\}/gi, function (holder) {
      var name = holder.replace(/(\$\{)|(\})/g, '');
      return data[name] || '';
    })
    return content;
  }
  
  module.exports = function (content) {
    var options = this.query;
    return compile(content, options.data || {});
  }