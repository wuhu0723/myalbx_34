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

// 读取后台页面 后台首页
module.exports.getAdminPage = (req,res)=>{
    // render函数完成了三个事件
    // 1.读取文件内容
    // 2.如果数据，就进行动态渲染
    // 3.将渲染结果返回
    res.render('admin/index.ejs')
}
// 后台分类页面
exports.getCategoriesPage = (req,res) => {
    res.render('admin/categories.ejs')
}
exports.getCommentsPage = (req,res) => {
    res.render('admin/comments.ejs')
}
exports.getLoginPage = (req,res) => {
    res.render('admin/login.ejs')
}
exports.getNavMenusPage = (req,res) => {
    res.render('admin/nav-menus.ejs')
}
exports.getPasswordResetPage = (req,res) => {
    res.render('admin/password-reset.ejs')
}
exports.getPostAddPage = (req,res) => {
    res.render('admin/post-add.ejs')
}
exports.getPostsPage = (req,res) => {
    res.render('admin/posts.ejs')
}
exports.getProfilePage = (req,res) => {
    res.render('admin/profile.ejs')
}
exports.getSettingsPage = (req,res) => {
    res.render('admin/settings.ejs')
}
exports.getSlidesPage = (req,res) => {
    res.render('admin/slides.ejs')
}
exports.getUsersPage = (req,res) => {
    res.render('admin/users.ejs')
}