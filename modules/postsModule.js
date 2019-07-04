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
 * query:用户搜索条件-  query.cate:分类条件  query.statu :状态条件,约定query是一个对象，里面有两个属性
 * 经过测试，发现这里不能传递一个对象，我们应该传递一个具体的变量
 * 参数对象：pagenum，pagesize，【cate,statu】
//  * 访问一个对象不存在 的属性，不会报错，只是返回undefind
 */
exports.getPostList = (params,callback) => {
    // 1.创建sql语句
    // select from [inner join .... on] where  [order by]  limit
    var sql = `select posts.id,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id,users.nickname,categories.name
                from posts
                inner join users on posts.user_id = users.id
                inner join categories on posts.category_id = categories.id
                where 1=1  `
        // 这里可以根据判断结构拼接筛选条件
        if(params.cate){
            // 拼接分类条件
            sql += ` and posts.category_id = ${params.cate} `
        }
        if(params.statu){
            // 拼接状态条件
            sql += ` and posts.status = '${params.statu}' `
        }


        sql += ` order by posts.id desc
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