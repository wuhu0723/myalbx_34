$(function(){
    // 如当前href:http://127.0.0.1:3000/admin/post-add?id=1
    // 获取location.href
    // 获取location.href中的最后一个/后面的内容
    // 1：如果没有参数：就是/后面的内容
    // 2：如果有参数：就是/后面到?前面的内容
    var routername = itcast.getRouterName(location.href)
    
    // 获取你想操作的dom元素
    var menu_posts = $('#menu-posts')
    // 判断路由名称
    // 如果是：post-add   |   posts   |   categories,就 要为id="menu-posts"来设置添加对应的样式和设置相应的属性
    if(routername == 'post-add' || routername == 'posts' || routername == 'categories'){
        menu_posts.addClass('in')
        menu_posts.attr('aria-expanded',true)
    }

    // 设置菜单也需要这个处理
    var menu_settings = $('#menu-settings')
    // 判断路由名称
    // 如果是：post-add   |   posts   |   categories,就 要为id="menu-posts"来设置添加对应的样式和设置相应的属性
    if(routername == 'nav-menus' || routername == 'slides' || routername == 'settings'){
        menu_settings.addClass('in')
        menu_settings.attr('aria-expanded',true)
    }

    // 添加active样式：排它法
    $('li').removeClass('active')
    // 获取当前被单击的元素：我得知道你当前你点击了那项菜单项
    // 所以我们为元素添加标识，而且这个标识需要和路由名称相关
    $('#'+routername).addClass('active')
})