$(function(){
    // 当前页码
    var pagenum = 1
    // 每页显示的记录数
    var pagesize = 1

    // 发起ajax请求，请求所有文章数据
    init()

    function init(){
        $.ajax({
            type:'get',
            url:'/getPostList',
            data:{
                pagenum:pagenum,
                pagesize:pagesize
            },
            dataType:'json',
            success:function(res){
                console.log(res)
                // 生成文章数据结构
                var html = template('postListTemp',res.data)
                $('tbody').html(html)
                // // 生成分页结构
                setPage(Math.ceil(res.data.total / pagesize))
            }
        })
    }

    // 实现分页
    function setPage(count) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页：会添加对应的样式
            currentPage: pagenum,
            // 总页数:当前数据表的记录总数 / 每页所显示的记录数
            totalPages: count,
            //当单击页码按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,page) {
                console.log(page)
                // 我们发现，这个page就是当前的合理页码值，我们只需要将全局的pagenum重置，并且重新获取数据就可以了
                pagenum = page
                // 重新获取数据
                init()
            }
        })
    }
})