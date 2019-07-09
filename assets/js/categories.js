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
})