$(function () {
    // 当前页码
    var pagenum = 1
    // 每页显示的记录数
    var pagesize = 2
    // 定义筛选条件
    // var query= {}

    // 发起ajax请求，请求所有文章数据
    init({});

    // 实现用户数据的筛选
    $('.btn-search').on('click', function (e) {
        e.preventDefault()
        // 重点是获取用户数据，你也可以使用全局变量
        var query = {}
        // 判断用户有没有选择指定的筛选条件
        if ($('.cateSelector').val() != 'all') {
            query.cate = $('.cateSelector').val()
        }
        if ($('.statuSelector').val() != 'all') {
            query.statu = $('.statuSelector').val()
        }
        // 发起请求
        init(query)
    });



    // 使用一个自调用函数来实现分类数据的加载
    (function () {
        $.ajax({
            url: '/getAllCateList',
            type: 'get',
            success: function (res) {
                // 生成分类数据的动态结构
                var html = '<option value="all">所有分类</option>'
                for (var i = 0; i < res.data.length; i++) {
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
                }
                $('.cateSelector').html(html)
            }
        })
    })()

    // 数据初始化
    function init(query) {
        console.log(123)
        $.ajax({
            type: 'get',
            url: '/getPostList',
            // pagenum=pagenum&pagesize=pagesize&query=[object,Object]
            data: {
                pagenum: pagenum,
                pagesize: pagesize,
                // cate:query.cate, //undefined
                // statu:query.statu
                // 展开运算符：可以将一个对象的具体的属性进行展开，展开为一组一组的键值对
                ...query
            },
            dataType: 'json',
            success: function (res) {
                console.log(res)
                // 生成文章数据结构
                var html = template('postListTemp', res.data)
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
            onPageClicked: function (event, originalEvent, type, page) {
                console.log(page)
                // 我们发现，这个page就是当前的合理页码值，我们只需要将全局的pagenum重置，并且重新获取数据就可以了
                pagenum = page
                // 重新获取数据
                init()
            }
        })
    }

    // 使用事件委托的方式来实现文章数据的删除
    $('tbody').on('click', '.btndel', function () {
        // 添加删除确认对话框
        // confirm返回一个bool值，如果你单击了确定，就是true,否则就是false
        if (window.confirm('请问你是否真的需要删除？')) {
            // 获取id
            var id = $(this).data('id')
            $.ajax({
                type: 'get',
                url: '/delPostById',
                data: { id: id },
                success: (res) => {
                    console.log(res)
                    // 应该进行数据的刷新
                }
            })
        }
    })
})


// // 根据id删除文章数据
// function delpost(id){

//     this.init()
// };