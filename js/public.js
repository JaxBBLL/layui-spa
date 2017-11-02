;
!(function(window, document, undefined) {
  var menus = {
    'default': [{
      path: '/one',
      title: '第一个页面'
    }, {
      path: '/two',
      title: '第二个页面'
    }, {
      path: '/three',
      title: '第三个页面'
    }],
    'user': [{
      path: '/one',
      title: '第一个页面'
    }, {
      path: '/two',
      title: '第二个页面'
    }]
  }
  var routerMap = [{
    path: '/one',
    page: '/views/one.html',
    title: '第一个页面',
    parent: '设置'
  }, {
    path: '/two',
    page: '/views/two.html',
    title: '第二个页面',
    parent: '设置',
    menu: 'user'
  }, {
    path: '/three',
    page: '/views/three.html',
    title: '第三个页面',
    parent: '设置'
  }, {
    path: '/404',
    page: '/views/404.html',
    title: '404',
    parent: '设置'
  }]

  var routeData = routeSet(routerMap);


  $router = Router(routeData).configure({
    before: function() {
      console.log('before...')
    },
    after: function() {
      console.log('after...')
    },
    notfound: function() {
      console.log('notfound')
      $state.go('/404')
    }
  });
  $router.init(); //初始化

  //  处理路由初始化的数据
  function routeSet(routerMap) {
    var result = {};
    for (var i = 0; i < routerMap.length; i++) {
      var _cb = [];
      var _menu = routerMap[i].menu || 'default';
      var _path = routerMap[i].path;
      var _page = routerMap[i].page;
      var _title = routerMap[i].title;
      _cb.push(renderPage(_page, _title, _path));
      _cb.push(renderMenu(_menu, _path))
      result[routerMap[i].path] = _cb;
    }
    return result;
  }

  //  路由更改渲染对应的页面
  function renderPage(page, title, path) {
    return function() {
      console.log('on...')
      document.title = title;
      $('#router-view').load(page + '?v=' + new Date().getTime())
      $('#app-menu a').removeClass('router-active')
      $('#app-menu a[href="#'+path+'"]').addClass('router-active')
    }
  }

  function renderMenu(name,path) {
    return function() {
      var menuName = $('#app-menu').data('menu')
      if (menuName === name) {
        return;
      }
      var menu = menus[name];
      var html = '';
      $.each(menu, function(i, item) {
        var h;
        if (item.path === path) {
          h = '<a href="#' + item.path + '" class="router-active">' + item.title + '</a>'
        } else {
          h = '<a href="#' + item.path + '">' + item.title + '</a>'
        }
        html += h;
      })
      $('#app-menu').html(html)
      $('#app-menu').data('menu', name)
    }
  }

})(window, document)
