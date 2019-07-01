// 引入users表的控制器模块
const usersController = require('../controllers/usersController.js')
// 封装路由模块
const express = require('express')
// Router()构造函数创建的路由对象可以当成一个中间件来使用
const router = express.Router()

// router.get('/',(req,res) => {
//     usersController.getIndexPage(req,res)
// })

// 当监听到Get方式的/请求的时候，会调用函数进行处理，并且为传递传递两个参数：req,res
// 这两个参数是服务器传递的，不是你一开始就有的
router.get('/',usersController.getIndexPage)

















// 暴露路由模块
module.exports = router