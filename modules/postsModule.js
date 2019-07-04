// 处理posts表的所有数据操作


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
            // 这条语句 可以获取posts表中的总记录数
            sql = 'select count(*) cnt from posts'
            connection.query(sql,(err1,data1)=>{
                if(err1){
                    callback(err1)
                }else{
                    // 我们又需要返回查询出的数据，又需要返回查询出总记录数
                    callback(null,{result:results,total:data1[0].cnt})
                }
            })
        }
    })
}