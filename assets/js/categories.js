$(function(){
    // 数据初始化
    function init(){
        $.ajax({
            url:'/getAllCateList',
            dataType:'json',
            success:function(res){
                console.log(res)
                $('tbody').html(template('cateTemp',res))
            }
        })
    }
    init()

    // 通过事件委托的方式为编辑超链接添加单击事件
    $('tbody').on('click','.btnedit',function(){
        $('.info').text('编辑分类目录')
        $('.addsubmit').hide()
        $('.editsubmit').show()
        // 获取当前行数据
        // 自定义属性值的获取
        // jq的方式：$(this).data()：获取到的是一个对象
        // 原生方式：$(this)[0].dataset：获取到的是一个对象
        var data = $(this).data()
        $('#name').val(data.name)
        $('#slug').val(data.slug)
        $('[name="id"]').val(data.id)
    })

    // 实现编辑操作
    $('.editsubmit').on('click',function(){
        $.ajax({
            type:'post',
            url:'/editCategory',
            data:$('form').serialize(),
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    alert('ok')
                    init()
                }
            }
        })
    })

    // 为删除超链接添加委托事件
    $('tbody').on('click','.btndel',function(){
        var id = $(this).data().id
        if(confirm('请问是否真的需要删除')){
            $.ajax({
                type:'get',
                url:'/delCategory?id='+id,
                dataType:'json',
                success:function(res){
                    if(res.code == 200){
                        alert('ok')
                        init()
                    }
                }
            })
        }
    })

    // 全选全不选 
    $('.chkAll').on('change',function(){
        // 不要试图通过checked属性来获取复选框的状态，因为jq进行封装
        var statu = $('.chkAll').prop('checked')
        // 为tbody中的所有复选框设置相同状态的值
        $('tbody').find('.chkSinger').prop('checked',statu)
        // 让批量按钮显示
        var cnt = $('tbody').find('.chkSinger:checked').length
        // 判断是否让全选复选框被选中
        if(cnt > 1){
            $('.btndels').show(500)
        }else{
            $('.btndels').hide(500)
        }
    })

    // 当用户选择一条以上的数据时，显示”批量删除“按钮，否则不显示
    $('tbody').on('change','.chkSinger',function(){
        var total = $('tbody').find('.chkSinger').length
        // 获取当前tbody中被选中的复选框的数量
        var cnt = $('tbody').find('.chkSinger:checked').length
        // 判断
        if(cnt > 1){
            $('.btndels').show(500)
        }else{
            $('.btndels').hide(500)
        }
        // 判断是否让全选复选框被选中
        if(cnt == total){
            $('.chkAll').prop('checked',true)
        }else{
            $('.chkAll').prop('checked',false)
        }
    })

    // 批量删除
    $('.btndels').on('click',function(){
        // 获取所有被选中的复选框的id
        // 1.获取所有被选中的复选框
        var allchk = $('tbody').find('.chkSinger:checked') //数组
        var arr = []
        for(var i=0;i<allchk.length ;i++){
            arr.push($(allchk[i]).data('id'))
        }
        // 发起ajax
        $.ajax({
            type:'get',
            url:'/delCategory',
            data:{id:arr.join(',')},
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    alert('ok')
                    init()
                }
            }
        })
    })
})