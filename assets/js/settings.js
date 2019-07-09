$(function(){
    function init(){
        $.ajax({
            type:'get',
            url:'/getOptions',
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    $('form').html(template('optionsTemp',res))
                }
            }
        })
    }
    init()

    // 因为按钮是动态生成的元素，所以要使用事件委托的方式来实现
    $('form').on('click','.btnsave',function(){
        // var data = $('form').serialize()
        // var obj = itcast.getParameter('?'+data)
        // // obj['site_name']=$('#site_name').val()
        // obj.comment_status = obj.comment_status ? 1 : 0
        // obj.comment_reviewed = obj.comment_reviewed ? 1 : 0
        // console.log(obj)
        var obj = {}
        obj.site_name = $('#site_name').val()
        obj.site_url = $('#site_url').val()
        obj.site_logo = $('#site_logo').val()
        obj.site_description = $('#site_description').val()
        obj.site_keywords = $('#site_keywords').val()
        obj.comment_status = $('#comment_status').prop('checked')?1:0
        obj.comment_reviewed = $('#comment_reviewed').prop('checked')?1:0

        $.ajax({
            type:'post',
            url:'/updateOptions',
            data:obj,
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    alert('设置成功')
                    init()
                }
            }
        })
    })
})