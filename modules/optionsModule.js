var connection = require('./mysqlHelper.js')


// 添加导航菜单项
exports.addMenu = (obj,callback) => {
    // 1.查询出导航菜单项数据
    var sql = 'select value from `options` where id = 9'
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            // 2.转换为js数组
            var arr = JSON.parse(results[0].value)
            // 3.将数据添加到数组
            arr.push(obj)
            // 4.将数组转换json格式字符串
            var str = JSON.stringify(arr)
            // 5.更新
            sql = 'update options set value = ? where id = 9'
            connection.query(sql,[str],(err1,res2) => {
                if(err1){
                    callback(err1)
                }else{
                    callback(null)
                }
            })
        }
    })
}


exports.getOptions = (callback) => {
    var sql = 'select value from `options` where id < 9'
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}
 

exports.updateOptions = (obj,callback) => {
    var cnt = 0
    // 构建Sql语句
    // {'site_name':'站点名称','site_description':'站点描述'}
    // update `options` set value = '阿里百秀 - 发现生活，发现美！1' where 	`key` = 'site_name'
    for(let key in obj){
        var sql =  `update options set value = '${obj[key]}' where `+ '`key`'+` = '${key}'`
        console.log(sql)
        connection.query(sql,(err) => {
            if(err){
                console.log(err)
            }else{
                cnt ++
            }
            if(cnt == 6){
                console.log(cnt)
                callback(null)
            }
        })
    }
}