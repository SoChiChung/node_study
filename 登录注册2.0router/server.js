//1.引入 express
let express = require("express");
//引入数据库连接模块
let db = require('./DB')
let path = require('path');
//引入路由模块
let uirouter = require('./router/uirouter')
let bussinessRouter = require('./router/bussinessRouter')
//2. 创建app服务对象
let app = express();
/* let ejs = require('ejs');
app.set("view engine", "ejs");
//设置模板所在目录
app.set("views", "./views") */
db.then(() => {//启动服务器 然后启动数据库 接着注册路由

    /*      //我是新引入的ejs插件 利用ejs模板引擎实现渲染html
        app.set('views', path.join(__dirname, '/views'));
        app.engine('html', require('ejs').__express);
        app.set('view engine', 'html'); */


    //使用内置中间件用于获取p1ost请求体参数
    app.use(express.urlencoded({ extened: true }))
    //3. 设置路由
    app.use(uirouter);
    app.use(bussinessRouter)
}).catch((err) => {
    console.log("数据库连接失败：" + err)
})

//设定监听
app.listen(3000, (err) => {
    if (!err) console.log("express服务器搭建成功")
    else console.log(err)
})