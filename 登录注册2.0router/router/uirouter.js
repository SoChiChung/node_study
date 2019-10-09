//ui路由
let { Router } = require("express");
let router = new Router();
let { resolve } = require("path")

//因为此时的views文件夹是和router文件夹处于同一层 所以用path模块里面的resolve查找 
router.get('/', (Request, Response) => {
    //resolve第一个参数的起点 第二个是目标
    let filePath = resolve(__dirname, '../views/index.html');
    Response.sendFile(filePath)
});
router.get('/login', (Request, Response) => {
    let filePath = resolve(__dirname, '../views/login.html');
    Response.sendFile(filePath)
    /* Response.render('login') */
});
router.get('/register', (Request, Response) => {
    let filePath = resolve(__dirname, '../views/register.html');
    Response.sendFile(filePath)
});

module.exports = router;