var itcast = {
    // 获取当前href中的路由名称
    getRouterName: (href) => {
        // ?就是是否有参数的标识
        var index = href.indexOf('?')
        // 定义一个变量来存储路由名称
        var routername = ''
        // 判断是否有参数
        if (index == -1) { //冒有参数
            routername = href.substring(href.lastIndexOf('/') + 1)
        } else {
            routername = href.substring(href.lastIndexOf('/') + 1, href.indexOf('?'))
        }
        return routername
    }
}