// 专门用来返回页面
// 引入fs
const fs = require('fs')

// 读取前台页面
module.exports.getIndexPage = (req,res)=>{
    res.render('index.ejs')
}
module.exports.getListPage = (req,res)=>{
    res.render('list.ejs')
}
module.exports.getDetailPage = (req,res)=>{
    res.render('detail.ejs')
}

// 读取后台页面 
module.exports.getAdminPage = (req,res)=>{
    res.render('admin/index.ejs')
}