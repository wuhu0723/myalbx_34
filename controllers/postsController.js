var postsModule = require('../modules/postsModule.js')
var moment = require('moment')

exports.getPostList = (req,res) => {
    // 获取所有文章列表并返回
    // 数据获取调用数据模块进行处理
    postsModule.getPostList((err,data) => {
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