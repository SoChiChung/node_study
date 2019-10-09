//1.引入 express
let express = require("express");
//引入数据库连接模块
let db = require('./DB')
let userModel = require('./model/userModel')
//2. 创建app服务对象
let app = express();
db.then(() => {//启动服务器 然后启动数据库 接着注册路由
    //使用内置中间件用于获取p1ost请求体参数
    app.use(express.urlencoded({ extened: true }))
    //3. 设置路由
    app.get('/', (Request, Response) => {
        Response.sendFile(__dirname + "/views/index.html")
    });

    //login的post请求
    app.post('/login', async (Request, Response) => {
        //1.获取用户名或者昵称
        const { user_id, nick_name, password } = Request.body;
        //2.检查数据库 核对信息
        try {
            let finResult = await userModel.findOne({ $and: [{ $or: [{ mail: user_id }, { nick_name: user_id }] }, { password: password }] })
            console.log(finResult)
            if (finResult)
                Response.send("登录成功")
            else {
                Response.write("昵称/密码不正确！5秒后返回！")
            }
        } catch (err) {
            console.log(err)
            Response.send("啊偶，网络不稳定")
        }
        //3.如果吻合 进入个人中心 否则登录失败 倒计时 重定向
    })

    app.get('/login', (request, response) => {
        //把原生的response响应方法 加了一个send()方法
        //这里就不需要设置header了
        response.sendFile(__dirname + "/views/login.html")
    });

    //registerd的post
    app.post('/register', async (Request, Response) => {
        //1.获取用户输入
        const { mail, nick_name, password, re_password } = Request.body;
        console.log(Request.body)
        console.log(nick_name)
        //2.校验数据合法性
        const emailReg = /^[a-zA-Z0-9_]{2,16}@[a-zA-Z0-9]{2,16}\.com$/
        const nick_NameReg = /[\u4e00-\u9fa5]/gm
        const passwordReg = /^[a-zA-Z0-9_@#]{2,16}/
        //使用正则进行校验
        if (!emailReg.test(mail)) { Response.send('邮箱输入不合法'); return }
        if (!nick_NameReg.test(nick_name)) { Response.send('昵称输入不合法'); return }
        if (!passwordReg.test(password)) { Response.send("密码不合法"); return }
        if (password !== re_password) { Response.send("两次密码输入不一致"); return }
        try {
            //3.检查邮箱是否被注册过
            let finResult = await userModel.findOne({ email: mail })//查不到返回null或者undefined

            //4.注册过——驳回 否则——注册
            if (finResult) { Response.send("该邮箱已被注册！"); return }
            await userModel.create({ email: mail, nick_name, password })
            Response.send("注册成功！")
            console.log(`邮箱为${mail}的用户${nick_name}注册成功`)
        }
        catch (err) {
            console.log(err)
            Response.send("啊偶，网络不稳定")
        }
    })
    app.get('/register', (request, response) => {
        //把原生的response响应方法 加了一个send()方法
        //这里就不需要设置header了
        response.sendFile(__dirname + "/views/register.html")
    });
}).catch((err) => {
    console.log("数据库连接失败：" + err)
})

//设定监听
app.listen(3000, (err) => {
    if (!err) console.log("express服务器搭建成功")
    else console.log(err)
})