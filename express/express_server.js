//1.引入 express
let express = require("express");
//2. 创建app服务对象
let app = express();
//3. 设置路由
app.get('/', (request, response) => {
    //把原生的response响应方法 加了一个send()方法
    //这里就不需要设置header了
    response.send('我是主页面')
});

app.get('/download', (request, response) => {
    //download:把数据给浏览器下载
    response.download('./Node.js学习笔记.md')
});
app.get('/sendFile', (request, response) => {
    //sendFile：直接把资源展示在页面
    response.sendFile(__dirname+'/notes/images/2.GET与POST对比.png')
});
//设定监听
app.listen(3555, (err) => {
    if (!err) console.log("express服务器搭建成功")
    else console.log(err)
})