// 所有与分类表相关的操作都在这个文件中完成


// 1,引入mysql
var mysql = require('mysql')
// 2.创建连接
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'baixiu',
    dateStrings:true
})

// 获取所有分类数据
exports.getAllCateList = (callback) => {
    var sql = 'select * from categories'
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}

// 实现分类数据的编辑
exports.editCategory = (obj,callback) => {
    var sql = 'update categories set ? where id = ?'
    connection.query(sql,[obj,obj.id],(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

// 实现分类数据的删除
exports.delCategory = (id,callback) => {
    var sql = 'delete from categories where id = ' + id
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}