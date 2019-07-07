const express = require('express')
var querystring = require('querystring')


const app = express()
// 3.添加对指定端口的监听
app.listen(3005,() => {
    console.log('http://127.0.0.1:3005')
})


app.get('/',(req,res) =>{
    // 如果有某个指定的状态值，就显示：welcome back
    // 如果没有，说明第一次登陆，就显示first,同时通过cookie设置状态值
    // req.headers.cookie:就是当前浏览器中存储cookie数据的对象
    console.log(req.headers) //'isLogin=true'
    var cookie = querystring.parse(req.headers.cookie)
    console.log(cookie)
    if(cookie.isLogin && cookie.isLogin == 'true'){
        res.end('welcome back')
    }else{
        // 如果写入
        res.writeHead(200,{
            'Content-Type':'text/html;charset=utf-8',
            'Set-Cookie':'isLogin=true'
        })
        res.end('first')
    }
})