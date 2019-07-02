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
exports.getPostList = (callback) => {
    // 1.创建sql语句
    var sql = `select posts.id,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id,users.nickname,categories.name
                from posts
                inner join users on posts.user_id = users.id
                inner join categories on posts.category_id = categories.id`
    connection.query(sql,(err,results) => {
        if(err){
            callback(err)
        }else{
            callback(null,results)
        }
    })
}