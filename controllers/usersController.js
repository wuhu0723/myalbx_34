// 引入fs
const fs = require('fs')

module.exports.getIndexPage = (req,res)=>{
    // D:\\广州黑马前端与移动开发就业34期（20190512面授）\\阿里百秀\\day1\\04-代码\\myalbx\\views\\admin\\index.html
    // 现在这么做的原因是我们还没有引入模板引擎
    fs.readFile(__dirname + "/../views/admin/index.html",(err,data) => {
        if(err){
            console.log(err)
            res.end('404')
        }else{
            res.end(data)
        }
    })
}

// 读取首页
// module.exports和exports默认指向同一个空间
// 但是最终以module.exports所指向对象为准
// 通过.语法，这两个对象的操作没有区别
// 但是如果是重置对象，那么只能使用module.exports
// module.exports.getindex = getindex
// exports.getindex = getindex