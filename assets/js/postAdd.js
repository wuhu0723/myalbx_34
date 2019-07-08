$(function () {
    // 1.加载所有分类数据
    $.ajax({
        url: '/getAllCateList',
        dataType: 'json',
        success: function (res) {
            // 生成分类数据的动态结构
            var html = ''
            for (var i = 0; i < res.data.length; i++) {
                html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`
            }
            $('#category').html(html)
        }
    })

    // 初始化富文本框：创建一个富文本框覆盖指定id号的textarea
    CKEDITOR.replace( 'content' )
    
    // 保存文章数据--实现文章的新增
    $('.btnSave').on('click',function(e){
        e.preventDefault()
        // 同步数据：将富文本框中的数据与textarea中的数据进行同步--两者同步之后数据会一样
        CKEDITOR.instances.content.updateElement()

        // serialize:获取当前表单中所有拥有name属性的value值
        // 1.直接富文本框中的数据
        // instances:可以获取到当前CKEDITOR的所的实例，通过replace方法就可以创建实例
        // getData是可以获取到数据，但是对于我们而言，需要额外的进行参数的拼接 --不方便
        // console.log(CKEDITOR.instances.content.getData())
        $.ajax({
            type:'post',
            url:'/addPost',
            data:$('.row').serialize(),
            dataType:'json',
            success:function(res){
                if(res.code == 200){
                    $('.alert-danger > strong').text('新增成功')
                    $('.alert-danger > span').text(res.msg)
                    $('.alert-danger').show()
                    setTimeout(() => {
                        location.href = '/admin/posts'
                    }, 3000);
                }
            }
        })
    })


    // 实现文件的上传
    $('#feature').on('change',function(){
        // 1.获取当前被选择文件对象
        // files:可以获取当前所有被选择文件对象，它是一个数组，里面的每一个值都是当前被选择的一个一个文件对象
        var myfile = document.querySelector('#feature').files[0]
        // 2.创建formdata
        var formdata = new FormData()
        // 3.追加参数
        formdata.append('img',myfile)
        // formdata.append('mynormalpa','我们是34期一家人')
        // 4.发起ajax请求
        $.ajax({
            type:'post',
            url:'/uploadFile',
            data:formdata,
            processData:false, //让ajax不要进行数据的处理，因为formdata会进行处理
            contentType:false,//让ajax不要对数据进行编码，因为formdata会进行编码处理
            dataType:'json',
            success:function(res){
                // 判断
                if(res.code == 200){
                    // 将文件名称存储到指定的隐藏域中
                    $('[name=feature]').val(res.img)
                    // $('#userimg').val(res.img)
                    // 实现预览
                    $('.thumbnail').attr('src','/uploads/' + res.img).show()
                }else{

                }
            }
        })
    })

    // 获取当前可能存在的pid值
    // 访问一个不存在的对象---对象没有定义
    // 访问一个对象不存在 的属性，仅仅是返回unddfined
    var id = itcast.getParameter(location.search).id
    // 判断是否有id,如果有就是编辑，如果没有就是新增
    if(id){
        // 要根据id号获取当前id所对应的文章数据
        $.ajax({
            
        })
    }
})