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
// 3.打开连接--不用写，它会默认找到最近所创建的连接来使用


// 获取所有文章数据
/**
 * params:它是一个对象，里面有三个属性：
 * pagenum:页码
 * pagesize:每页记录数
 * query:用户搜索条件
 */
exports.getPostList = (params,callback) => {
    // 1.创建sql语句
    var sql = `select posts.id,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id,users.nickname,categories.name
                from posts
                inner join users on posts.user_id = users.id
                inner join categories on posts.category_id = categories.id
                limit ${(params.pagenum-1)*params.pagesize},${params.pagesize}`
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}