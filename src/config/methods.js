;
(function(window, document, undefined) {
  var state = {
    //  获取当前路由地址
    path: function() {
      var str = window.$config.router.getRoute().join('/');
      return str.split('?')[0];
    },
    // 获取路由的参数
    query: function() {
      var str = window.$config.router.getRoute().join('/');
      str = str.split('?')[1] || ''; // 如果没有参数返回空字符
      var arr = str.split('&'); //  得到key，value值对应的数组
      var query = {};
      for (var i = 0; i < arr.length; i++) {
        var key = arr[i].split('=')[0];
        var value = arr[i].split('=')[1];
        query[key] = value;
      }
      return query;
    },
    // 跳转方法 go('/one', {id: 10})
    go: function(path, query) {
      var tmp = '';
      if (query) {
        for (var k in query) {
          tmp += '&' + k + '=' + query[k]
        }
        tmp = '?' + tmp.substr(1)
      }
      var res = path + tmp;
      window.$config.router.setRoute(res)
    }
  }
  window.$state = state; // 补充的路由方法对象

})(window, document)
