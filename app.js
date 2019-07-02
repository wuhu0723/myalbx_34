// 1.引入express
const express = require('express')
// 引入路由模块
const router = require('./router/index.js')
// 引入ejs
const ejs = require('ejs')
// 引入body-parser
var bodyParser = require('body-parser')
// 2.创建应用
const app = express()
// 3.添加对指定端口的监听
app.listen(3000,() => {
    console.log('http://127.0.0.1:3000')
})

// 设置模板引擎为ejs
app.set('view engine','ejs')
// 指定模板文件的目录 ，后期使用ejs的时候就可以参照这个目录进行ejs文件查询
app.set('views','views')

// 添加body-parser的配置
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 4.添加静态资源的托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 5.添加路由配置
// use:让app应用来使用这个路由进行所有的用户请求的路由管理,这个views目录 是相对于根目录 而言
app.use(router)