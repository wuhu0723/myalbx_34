// 这个主要用来实现所有与users表相关的业务处理
var userModule = require('../modules/userModule')
exports.login = (req,res) => {
    var obj = req.body
    console.log(obj)
    // 登陆验证应该由数据库中的数据来决定
    userModule.login(obj.email,(err,data) =>{
        if(err){
            res.json({
                code:400,
                msg:'服务器异常'
            })
        }else{
            if(data){ // 有没有能够查询到结果
                if(data.password == obj.password){
                    res.json({
                        code:200,
                        msg:'登陆成功'
                    })
                }else{
                    res.json({
                        code:400,
                        msg:'密码输入错误'
                    })
                }
            }else{
                res.json({
                    code:400,
                    msg:'邮箱输入错误'
                })
            }
        }
    })
}