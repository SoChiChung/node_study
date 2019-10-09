let { Router } = require('express');
let router = new Router();
let { resolve } = require('path')
router.get('/', (Request, Response) => {
    let filePath = resolve(__dirname, '../public/demo.html')
    Response.sendFile(filePath)
})
router.get('/get', (Request, Response) => {
    Response.send('服务器收到了GET请求')
    console.log("一个GET请求已收到")
    console.log(Request.query)
})
router.post('/post', (Request, Response) => {
    Response.send('服务器收到了POST请求')
    console.log(Request.body)
    console.log("一个POST请求已收到")
})

module.exports = router;