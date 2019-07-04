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

