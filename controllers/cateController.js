// 这个文件来实现分类数据的用户请求的响应

var cateModule = require('../modules/cateModule.js')
exports.getAllCateList = (req,res)=>{
    // 调用数据模块进行数据的获取
    cateModule.getAllCateList((err,data) => {
        if(err){
            console.log(err)
            res.json({
                code:400,
                msg:'数据查询失败'
            })
        }else{
            res.json({
                code:200,
                msg:'数据查询成功',
                data:data
            })
        }
    })
}

// 编辑分类数据提交
exports.editCategory = (req,res) => {
    var obj = req.body
    cateModule.editCategory(obj,(err) => {
        if(err){
            res.json({
                code:400,
                msg:'数据编辑失败'
            })
        }else{
            res.json({
                code:200,
                msg:'数据编辑成功'
            })
        }
    })
}


// 编辑分类数据删除
exports.delCategory = (req,res) => {
    var id = req.query.id
    cateModule.delCategory(id,(err) => {
        if(err){
            res.json({
                code:400,
                msg:'数据删除失败'
            })
        }else{
            res.json({
                code:200,
                msg:'数据删除成功'
            })
        }
    })
}

