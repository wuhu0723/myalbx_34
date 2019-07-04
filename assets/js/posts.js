$(function(){
    // 当前页码
    var pagenum = 1
    // 每页显示的记录数
    var pagesize = 4

    // 发起ajax请求，请求所有文章数据
    init();

    // 使用一个自调用函数来实现分类数据的加载
    (function(){
        $.ajax({
            url:'/getAllCateList',
            method:'get',
            success:function(res){
                console.log(res)
                // 生成分类数据的动态结构
                var html = '<option value="all">所有分类</option>'
                for(var i=0;i<res.data.length;i++){
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        })
    })()

    // 数据初始化
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