var connection = require('./mysqlHelper.js')

exports.login = (email,callback) => {
    // email在数据表中是唯一键
    var sql = `SELECT * from users where email = '${email}'`
    connection.query(sql,(err,result) => {
        if(err){
            callback(err)
        }else{
            // 查询最多能够查询到一条记录
            // result：查询返回结果集，它的类型是数组
            callback(null,result[0])
        }
    })
}