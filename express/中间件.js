let express = require("express");
let app = express();
//中间件 实现防盗链
function Middleware(Request, Response, next) {
    if (Request.get("Host") !== 'localhost:3000')
        {
            console.log(Request.get("Host"))
            Response.send("Wrong Host")
        }
    else next()
}
//内置中间件 用于暴露静态资源
app.use(express.static('./views'))

//根路由
app.get("/",Middleware, (Request, Response) => {
    Response.send("这是根路径")
})

//使用内置中间件 暴露views 的demo.html

app.listen(3000, (err) => {
    if (err)
        console.log(err)
    else
        console.log("express服务器搭建成功！")
})