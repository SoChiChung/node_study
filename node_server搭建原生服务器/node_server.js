//node原生搭建服务器
let http = require("http");//1.引入http
let qr=require("querystring")//引入querystring把参数字符串转成对象
//2.创建server对象
let server = http.createServer((request, response) => {
    let url=request.url//这是端口号往后的地址 例如 https://www.baidu.com?query=1 显示的就是/?query=1

    //设置返回响应消息
    response.setHeader('content-type', 'text/html;charset=utf-8')
    let querys=qr.parse(url.split("?")[1]);
    //设置返回响应消息 例如显示请求的参数
    response.end(querys.name);
})
//3. 绑定端口监听 也就是服务器运行的端口
server.listen(3555, (err) => {
    if (!err) {
        console.log("服务器启动成功！")
    }
    else console.log(err)
})