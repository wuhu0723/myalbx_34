$(function(){
    // 发起ajax请求，请求所有文章数据
    $.ajax({
        type:'get',
        url:'/getPostList',
        data:{
            pagenum:1,
            pagesize:2
        },
        dataType:'json',
        success:function(res){
            console.log(res)
            var html = template('postListTemp',res)
            $('tbody').html(html)
        }
    })
})