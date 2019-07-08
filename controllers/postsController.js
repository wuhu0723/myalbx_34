var postsModule = require('../modules/postsModule.js')
var moment = require('moment')
// 获取所有文章列表数据
exports.getPostList = (req,res) => {
    // 获取参数:这种获取参数的方式是因为已经添加了body-parser的配置
    var obj = req.query
    // 获取所有文章列表并返回
    // 数据获取调用数据模块进行处理
    postsModule.getPostList(obj,(err,data) => {
        if(err){
            res.json({
                code:400,
                msg:'数据查询失败'
            })
        }else{
            // 将日期格式进行合理的转换
            // for(var i=0;i<data.length;i++){
            //     // moment()中的参数就你想转换的日期值，如果没有写就会默认的获取当前日期值进行转换
            //     data[i].created = moment(data[i].created).format('YYYY-MM-DD HH:mm:ss')
            // }
            
            res.json({
                code:200,
                msg:'数据查询成功',
                data:data
            })
        }
    })
}
// 根据文章id删除文章数据
exports.delPostById = (req,res) => {
    var id = req.query.id
    // 调用数据模块中的方法
    postsModule.delPostById(id,(err) => {
        if(err){
            res.json({
                code:400,
                msg:'数据删除失败'
            })
        }else{
            res.json({
                code:200,
                msg:'数据删成功'
            })
        }
    })
}

// 实现文章的新增
exports.addPost = (req,res) => {
    // 接收参数
    var obj = req.body
    obj.id = null
    obj.views = 0
    obj.likes = 0
    obj.user_id = req.session.currentUser.id
    // 调用数据模块 的新增文章的方法进行文章的新增
    postsModule.addPost(obj,(err) => {
        if(err){
            console.log(err)
            res.json({
                code:400,
                msg:'文章新增失败'
            })
        }else{
            res.json({
                code:200,
                msg:'文章新增成功'
            })
        }
    })
}

// 根据id获取文章数据
exports.getPostById = (req,res) =>{
    var id = req.query.id
    // 调用数据模块进行文章数据的获取
    postsModule.getPostById(id,(err,data) => {
        if(err){
            res.json({
                code:400,
                msg:'数据查询失败'
            })
        }else{
            // 这里进行日期格式的设置是因为前面表单元素需要这种格式:YYYY-MM-DDTHH:mm:ss
            data.created = moment(data.created).format('YYYY-MM-DDTHH:mm:ss')
            res.json({
                code:200,
                msg:'数据查询成功',
                data:data
            })
        }
    })
}

// 实现文章的编辑
exports.editPost = (req,res) => {
    // 接收参数
    var obj = req.body
    // 调用数据模块 的新增文章的方法进行文章的新增
    postsModule.editPost(obj,(err) => {
        if(err){
            console.log(err)
            res.json({
                code:400,
                msg:'文章编辑失败'
            })
        }else{
            res.json({
                code:200,
                msg:'文章编辑成功'
            })
        }
    })
}
