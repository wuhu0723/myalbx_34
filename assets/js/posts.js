$(function(){
    // 发起ajax请求，请求所有文章数据
    $.ajax({
        type:'get',
        url:'/getPostList',
        dataType:'json',
        success:function(res){
            console.log(res)
            var html = template('postListTemp',res)
            $('tbody').html(html)
        }
    })
})