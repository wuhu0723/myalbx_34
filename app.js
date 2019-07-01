// 1.引入express
const express = require('express')
// 引入路由模块
const router = require('./router/index.js')
console.log('-----------------')
console.log(router)
console.log('-----------------')
// 2.创建应用
const app = express()
// 3.添加对指定端口的监听
app.listen(3000,() => {
    console.log('http://127.0.0.1:3000')
})
// 4.添加静态资源的托管
app.use('/assets', express.static('assets'))
app.use('/uploads', express.static('uploads'))

// 5.添加路由配置
// use:让app应用来使用这个路由进行所有的用户请求的路由管理
app.use(router)

console.log(module.exports === exports)