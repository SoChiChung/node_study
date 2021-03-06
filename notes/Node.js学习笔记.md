[TOC]



## Node.js是什么

Node.js是一个基于Chrome V8引擎的JavaScript 运行环境。

底层是有一个翻译机 把js代码翻译成为c/c++运行

## Node.js特点

### 优点

+ 1. 异步非阻塞io（io线程池） 

     同步阻塞：也就是当有像写入数据库这种操作的时候，

     io线程池：传统线程在连接完就会被销毁 线程池就是汇聚了各种线程 例如有个注册要求，传统做法是分配资源，建立线程，请求完毕然后销毁。线程池是把执行完注册需求后的线程保持活跃放在线程池，然后需要调用的时候在调用。

     意义：不需要重复创建线程 服务器启动的时候就建立线程池

+  2.特别适用于io密集型应用

  也就是适用于频繁进行数据库操作的服务器

+ 3. 事件循环机制

+  4.单线程

+ 5. 跨平台

     一处编写 随处可用

     实现原理：

     提供一个翻译机 就像java的jvm一样 在windows写的代码 经过jvm翻译 可运行在linux mac之中



​     

### 不足

1. 回调函数嵌套太多 太深

2. 单线程 处理不好CPU密集型任务

   和java恰好相反
   

   
## node和java 服务器的区别



#### java

一对一服务：

客户端1给服务器发请求 服务器向数据库请求数据 服务器在等待数据库返回数据的时候一直保持与客户端1的连接，如果这时候客户端2给服务器发请求 服务端会另外创建线程响应适用于cpu密集型 也就是客户端发送请求慢 频率低。

   e.g 十万个客户端请求pi的值 java会创建十万个线程同时计算 以一个线程计算结果为5s算 总耗时5s

   <hr>

   #### node

     单线程：

   只要维护好服务源 可以搞定高并发，成本低。适用于io密集型 也就是数据库请求响应慢。

e.g 十万个客户端请求pi的值 node会一个个计算 以一个线程计算结果为5s算 总耗时50万s

## node函数特点

1. Node 中任何一个模块（js）都被有一个外层函数包裹

function(exports,require,module,_filename,___dirname){

_filename:当前文件绝对路径

__dirname：当前文件所在文件夹的绝对路径

}

2. 用外层函数包裹的意义：
   + 隐藏内部实现 实现封装
   + 支持commonJs的模块化
3. 对于浏览器端而言，js由几部分组成：

+ BOM
+ DOM
+ ES规范

4. Node端的js由几部分组成？
   + 没有BOM
   + 没有DOM
   + 几乎包含了所有的ES
   + 没有window 取而代之的是一个叫global的全局变量 不允许this指向global



## npm与yarn

 npm：node package manager node官方的包管理器

+ npm 安装流程：eg客户端通过npm i jQuery 向 npm发送第一次安装请求 npm接受请求后检索仓库 如果找到了对应的仓库名 就会向客户端**返回该资源的下载地址 **然后客户端访问下载地址下载资源，安装完会产生package-lock-json，

  然后如果是npm i ... --save /npm i -S /npm i 把资源的名字写进package-json的dependencies（生产依赖 ）里面.

  如果是npm i --save--dev npm i -D name包名写进devdependencies(开发依赖)之中

+ package-lock-json：缓存了每个下载过的包的安装地址，目的是下次安装的时候

+ 生产依赖：在生产环境中必不可少的包，就是生产依赖。如jQuery axios

+ 开发依赖：开发时需要的依赖的库：例如语法检查 压缩代码 的包 当然存在既属于开发依赖 又属于生产依赖 例如：jquery

+ npm删除：npm remove xxx 在node-module删除包 并在package-json删除声明

+ 版本号说明

  1. "^3.x.x"：锁定大版本 以后安装包的时候 保证版本是3.x.x版本 x默认取最新的 如"jquery：^3.1.1" 就安装目前jquery 最新版本 3.4.1
  2. "~3.1.x": 锁定小版本
  3. "3.1.1"：锁定完整版本
  4. 如果想知道详情 建议还是用npm ls 资源名查看 



### yarn



yarn使用本地缓存，无需互联网连接就能安装本地已经缓存的依赖项

|                        | yarn                         | npm         |
| ---------------------- | ---------------------------- | :---------- |
| 初始化项目             | yarn init                    | npm init    |
| 下载项目所有声明的依赖 | yarn                         | npm install |
| 下载指定的开发依赖     | yarn add                     | npm install |
| 全局下载               | yarn global add              | npm i -g    |
| 删除依赖包             | yarn (global) remove webpack | npm remove  |
|                        |                              |             |
|                        |                              |             |

yarn 没有自己的服务器，用的还是npm的仓库 快的原因是缓存和下载算法很牛逼

## Buffer 缓冲器

1. Buffer 是什么

+ 它是一个类似于数组的对象，用于存储数据（存储是二进制数据）也就是说无论多大 什么类型的数据 都转成了二进制

+ Buffer效率很高（因为存的是二进制 所以和计算机交互的时候无需转换，因此读取很快） 存储和读取很快 直接对计算机内存进行操作

+ 大小一旦确定 不可修改

+ 每个元素占用内存大小为1字节

  

+ node 的核心模块 无需下载 无需引入 即可使用 

2. Buffer的创建

   ```JavaScript
   //创建Buffer 实例
   //不要用 new  被弃用了 new创建是时候 先调用allocUnsafe方法获取空间 然后打扫 所以效率很低
   /*let buf=new Buffer(10)
   console.log(buf)*/
   
   
    // 1.Buffer.from()
   let str='Buffer.from()';
   let buf=Buffer.from(str);
   console.log(str)
   console.log(buf)//输出是16进制  底层是二进制 
   
   // 2.Buffer.alloc() 效率一般
   let buf2=Buffer.alloc(10);//传入参数为Buffer的长度
   console.log("Buffer.alloc")
   console.log(buf2);
   
   // 3.Buffer.allocUnsafe() 不安全在于 alloc使用的是申请的在堆内存中一片新的内存 
   //而allocUnsafe用的是堆上面已存在但是没有引用的内存（js的垃圾回收是周期性的，所以并不是一有垃圾马上被清理）上面残留信息
   let buf3=Buffer.allocUnsafe(100);
   
   console.log("Buffer.allocUnsafe");
   console.log(buf3);
   ```

    

  ## fs



  

| * 简单文件写入(异步)： |                                                              |
| ---------------------- | ------------------------------------------------------------ |
|                        | *     fs.writeFile(file, data[, options], callback)          |
|                        | *           --file:要写入的位置+文件名                       |
|                        | *           --data：要写入的数据                             |
|                        | *           --options：配置对象（可选参数，几乎不用）        |
|                        | *                 --encoding：编码，默认值：utf8             |
|                        | *                 --mode：控制文件的权限，默认值为：0o666(0o666=0o222+0o444) |
|                        | *                       --0o111:文件可被执行的权限(linux)    |
|                        | *                       --0o222:文件可被写入的权限           |
|                        | *                       --0o444:文件可被读取的权限           |
|                        | *                 --flag:打开文件要进行的操作                |
|                        | *                       --'w':直接写入（覆盖原来的数据）     |
|                        | *                       --'a'追加写入（保留原来的数据，追加新的） |
|                        | *           --callback：回调函数                             |
|                        | *                 --err 错误对象，如果有错误，其值为错误对象；如果没有是undefined |

```JavaScript
let fs=require('fs');
fs.writeFile('./test.txt','有点牛逼，第二次',{
    flag:'a'
},(err)=>{
    if(err){
        console.log("success")
    }else{
        console.log(err)
    }
})
```



```
异步一定是有回调函数

但是有回调函数不一定是异步（foreach）
```

不足之处：

+ 简单文件写入：会一次性把所有数据加载到内存之中，如果数据较大会发生内存溢出，适用于小文件写入

| * 流式文件写入： |                                                              |
| ---------------- | ------------------------------------------------------------ |
|                  | *     流的分类：可读流、可写流                               |
|                  | *     fs.createWriteStream(path[, options])                  |
|                  | *         --path:写入文件的路径+文件名                       |
|                  | *         --options：配置对象（可选）                        |
|                  | *             --flags:打开文件要进行的操作                   |
|                  | *                   --'w':直接写入（覆盖原来的数据）         |
|                  | *                   --'a'追加写入（保留原来的数据，追加新的） |
|                  | *             --encoding:编码，默认值：utf8                  |
|                  | *             --fd:文件标识（linux），默认值是：null         |
|                  | *             --mode：控制文件的权限，默认值为：0o666        |
|                  | *                     --0o111:文件可被执行的权限(linux)      |
|                  | *                     --0o222:文件可被写入的权限             |
|                  | *                     --0o444:文件可被读取的权限             |
|                  | *             --autoClose：自动关闭,不是关闭流，而是关闭文件，默认是true |
|                  | *             --start：写入文件的起始位置                    |

```JavaScript
//流式文件写入
let ws=fs.createWriteStream('./demo.txt')//创建可写流
ws.write("黑色的不是夜晚，是漫长的孤单\n")
ws.write("看脚下一片黑暗，望头顶星光璀璨")
ws.close()
//只要使用了流 必须给流加监听
```

| * 简单文件读取： |                                              |
| ---------------- | -------------------------------------------- |
|                  | *     fs.readFile(path[, options], callback) |
|                  | *         --path：要读取的文件路径+文件名    |
|                  | *         --options：配置对象                |
|                  | *               --encoding：编码，默认是utf8 |
|                  | *               --flag:默认值是'r'           |
|                  | *         --callback：回调函数               |
|                  | *               --err:错误对象               |
|                  | *               --data：读取出来的数据       |

```JavaScript
let fs = require('fs')
let rs = fs.readFile('./demo.txt', (err,data)=>{
    if (err) { console.log(err) }
    else {
        console.log("读取成功")
        //读取出来的是Buffer类型 如果要转成看得懂的内容 要使用console.log(data.toString())
        //因为如果你读取的是像mp3 jpg这种类型数据 无法自动使用tostring转换输出
        fs.writeFile('./copy.txt',data,(err)=>{//把demo.txt的内容复制到copy.txt
            if(err)
            console.log("复制失败")
        })
    }
}) 
```

| * 流式文件读取 |                                                              |
| -------------- | ------------------------------------------------------------ |
|                | *     fs.createReadStream(path[, options])                   |
|                | *       --path:要读取的文件路径+文件名                       |
|                | *       --options：配置对象（可选）                          |
|                | *           --flags:                                         |
|                | *           --encoding:                                      |
|                | *           --fd:                                            |
|                | *           --mode:                                          |
|                | *           --autoClose:                                     |
|                | *           --start:读取的起始位置                           |
|                | *           --end:读取的结束位置                             |
|                | *           --highWaterMark : 每次读取文件的大小（流的管道大小） |
```JavaScript
let fs = require('fs')
/* let rs = fs.readFile('./demo.txt', (err,data)=>{
    if (err) { console.log(err) }
    else {
        console.log("读取成功")
        //读取出来的是Buffer类型 如果要转成看得懂的内容 要使用console.log(data.toString())
        //因为如果你读取的是像mp3 jpg这种类型数据 无法自动使用tostring转换输出
        fs.writeFile('./copy.txt',data,(err)=>{//把demo.txt的内容复制到copy.txt
            if(err)
            console.log("复制失败")
        })
    }
}) ; */

//流式文件读取
let rs2=fs.createReadStream('./demo.txt',{
    start:2,
})
rs2.on('open',()=>{
    console.log("可读流打开")
})
rs2.on('close',()=>{
    console.log("可读流关闭")
    ws.close()//注意：ws.close()的位置在这里！！！
})

let ws=fs.createWriteStream('./copyBystream.txt');
ws.on('open',()=>{
    console.log("可写流打开")
})
ws.on('close',()=>{
    console.log("可写流关闭")
})

rs2.on('data',(data)=>{
    ws.write(data)
})

```

## MongoDB

数据库分类

+ 关系型数据库(RDBS

  特点：关系紧密 都是表

  优点：

  + 易于维护 都使用表结构 格式一致
  + 使用方便 sql语言通用
  + 高级查询 

缺点：

+ 读写性能较差 尤其是海量数据的高效率读写
+ 有固定的表结构 字段（列名）不可随意修改 灵活度较差
+ 高并发读写需求 传统的关系型数据库来说 硬盘io是个大瓶颈



+ 非关系型数据库

特点：关系不紧密，有文档，有键值对

| 关系型数据库              |     非关系型数据库     |      |
| ------------------------- | :--------------------: | ---- |
| 表                        |          集合          |      |
| 每一条数据                |          文档          |      |
| 对象关系模型（ORM）映射表 | 对象文档模型（ODM） 库 |      |
|                           |                        |      |
|                           |                        |      |

优点：

+ 格式灵活：格式可以是key value
+ 速度快：nosql可以以内存为载体 关系型数据库只能用硬盘
+ 易用：部署简单

缺点：

+ 不支持sql
+ 不支持事务

事务：

+ 原子性(Atomicity):事务中的所有操作作为一个整体像原子一样不可分割，要么全部成功,要么全部失败。

+ 一致性(Consistency):事务的执行结果必须使数据库从一个一致性状态到另一个一致性状态。一致性状态是指:1.系统的状态满足数据的完整性约束(主码,参照完整性,check约束等) 2.系统的状态反应数据库本应描述的现实世界的真实状态,比如转账前后两个账户的金额总和应该保持不变。

+ 隔离性(Isolation):并发执行的事务不会相互影响,其对数据库的影响和它们串行执行时一样。比如多个用户同时往一个账户转账,最后账户的结果应该和他们按先后次序转账的结果一样。

+ 持久性(Durability):事务一旦提交,其对数据库的更新就是持久的。任何事务或系统故障都不会导致数据丢失。

**数据库事务是构成单一逻辑工作单元的操作集合**

e.g

```
比如从A账户转账100元到B账号。站在用户角度而言,这是一个逻辑上的单一操作,然而在数据库系统中,至少会分成两个步骤来完成:

1.将A账户的金额减少100元
2.将B账户的金额增加100元。

在这个过程中可能会出现以下问题:

1.转账操作的第一步执行成功,A账户上的钱减少了100元,但是第二步执行失败或者未执行便发生系统崩溃,导致B账户并没有相应增加100元。
2.转账操作刚完成就发生系统崩溃,系统重启恢复时丢失了崩溃前的转账记录。
3.同时又另一个用户转账给B账户,由于同时对B账户进行操作,导致B账户金额出现异常。
```



+ 复杂查询时语句复杂



mongod：启动mongo服务的命令

mongo：连接数据库的命令

mongoose：node端连接数据库的一个框架

## MongoDB原生CRUD（增删改查）命令总结

-C creat：

```
db.集合名.insert(文档对象)
db.集合名.insertOne(文档对象)
db.集合名.insertMany([文档对象，文档对象])
```

-R read：

```
db.集合名.find(查询条件[,投影])
    举例:db.students.find({age:18}),查找年龄为18的所有信息
    举例:db.students.find({age:18,name:'jack'}),查找年龄为18且名字为jack的学生
    
常用操作符：
    1. < , <= , > , >= , !==   对应为： $lt $lte $gt $gte $ne
        举例：db.集合名.find({age:{$gte:20}}),年龄是大于等于20的
    2.逻辑或：使用$in 或 $or
        查找年龄为18或20的学生
        举例：db.students.find({age:{$in:[18,20]}})
        举例：db.students.find({$or:[{age:18},{age:20}]})
    3.逻辑非：$nin
    4.正则匹配：
        举例：db.students.find({name:/^T/})
    5.$where能写函数：
        db.students.find({$where:function(){
            return this.name === 'zhangsan' && this.age === 18
        }})
            
投影：过滤掉不想要的数据，只保留想要展示的数据
    举例：db.students.find({},{_id:0,name:0}),过滤掉id和name
    举例：db.students.find({},{age:1}),只保留age
    
补充：db.集合名.findOne(查询条件[,投影])，默认只要找到一个
```

-U update：

```
db.集合名.update(查询条件,要更新的内容[,配置对象])
    
//如下会将更新内容替换掉整个文档对象，并且_id不受影响
    举例：db.students.update({name:'zhangsan'},{age:19})
    
//使用$set修改指定内容，其他数据不变，不过只能匹配一个zhangsan
    举例：db.students.update({name:'zhangsan'},{$set:{age:19}})
    
//修改多个文档对象，匹配多个zhangsan,把所有zhangsan的年龄都替换为19
    举例：db.students.update({name:'zhangsan'},{$set:{age:19}},{multi:true})
    
 补充：db.集合名.updateOne(查询条件,要更新的内容[,配置对象])
       db.集合名.updateMany(查询条件,要更新的内容[,配置对象])
```

-D delete

```
db.集合名.remove(查询条件)
    //删除所有年龄小于等于19的学生
    举例：db.students.remove({age:{$lte:19}})
```



![img](F:\前端学习\node\notes\images\Mongo原生CRUD.jpg)

## mongoose

插入对象的时候会在数据库内生成一个属性"-v"  表示当前数据版本

schema会对一些数据类型进行转换

```
 e.g 传入对象{age："13"} schema设定了 age:{
 type:"Number"
 }
 此时会对字符串"13"转换 成功返回Number类型便会插入 否则报错
```



## favicon.ico

网站的偏爱图标 

其实没啥用

## 原生node 搭建服务器

```JavaScript
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
```

## express 搭建服务器

```JavaScript
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
//设定监听
app.listen(3555, (err) => {
    if (!err) console.log("express服务器搭建成功")
    else console.log(err)
}) 
```

## GET请求报文分析（给服务器看的）

```
GET http://localhost:3000/demo?name=kobe&age=18 HTTP/1.1
    Host: localhost:3000
    Connection: keep-alive
    Upgrade-Insecure-Requests: 1
    DNT: 1
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3
    Referer: http://localhost:63343/0520_node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=2huo4sk6aap5k9hkc3umi6aqch
    Accept-Encoding: gzip, deflate, br
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    空行
    空行 
```

+ 报文首行

**GET http://localhost:3000/demo?name=kobe&age=18 HTTP/1.1**

​    --请求方式 协议名://主机名:端口号/路由名/查询字符串参数 协议版本 

+ 请求头

​    **Host: localhost:3000**

​    --主机名:端口号

​    **Connection: keep-alive**

​    --告诉服务器，浏览器支持长连接

​    **Upgrade-Insecure-Requests: 1**

​    --告诉服务器浏览器支持 http1.1 协议

​    **DNT: 1**

​    --禁止跟踪，告诉服务器不要跟踪我（访问一些用户的习惯和行为），是否生效看服务器是否“迎合你”。

​    **User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36**

​    --用户代理，能够标识着用户的浏览器品牌以及版本，用户服务器去获取浏览器特性。但是，现在不能用了

​    **Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3**

​    --告诉服务器浏览器所能接收文件的类型及权重（优先级），默认是 1

​    **Referer: http://localhost:63343/0520_node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=2huo4sk6aap5k9hkc3umi6aqch**

​    --标识着，“站”在哪里发出去的本次请求。1.防盗链。2.广告计费

​    **Accept-Encoding: gzip, deflate, br**

​    --告诉服务器浏览器能接收压缩方式

​    **Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en; q=0.7**

​    --告诉服务器浏览器能接受的语言有几种及权重

​    **Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a**

​    --Webstorm 给你“种下”的 Cookie 
+ 空行 

请求行和报文体的分界线

+ 报文体 

  GET请求的报文体没有内容 是个空行



## post请求报文（给服务器看的）



**POST http://localhost:3000/shenghuo HTTP/1.1**

Host: localhost:3000

Connection: keep-alive

Content-Length: 20

Cache-Control: max-age=0

Origin: http://localhost:63343

Upgrade-Insecure-Requests: 1

DNT: 1

Content-Type: application/x-www-form-urlencoded

User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36

Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,**/**;q=0.8,application/signed-exchange;v=b3

Referer: http://localhost:63343/0520_node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=9t7fggn7bkmuts228p80amf3rg

Accept-Encoding: gzip, deflate, br

Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7

Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a



name=zhangsan&age=18

+ 请求首行

​    **POST http://localhost:3000/shenghuo HTTP/1.1**

​        -请求方式 协议名://主机名:端口号/路由名/查询字符串参数 协议版本

+ 请求头

   **Host: localhost:3000**

​    Connection: keep-alive

   **Content-Length: 20**

​        --【post特有】请求体的内容长度

​    **Cache-Control: max-age=0**

​        --强缓存参数

​    Origin: http://localhost:63343

​        --【post特有】请求是“站”哪里发出去的（不是一个完整的地址）当前所处位置（主机位置+端口协议）

​    Upgrade-Insecure-Requests: 1

​        \--

​    DNT: 1

​        \--

​    **Content-Type: application/x-www-form-urlencoded**

​        --该请求是post发过来的请求，而且参数的编码形式是urlencoded

​		--标识该请求来自于一个from表单 以urlencoded编码（就是key=value）

​    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36

​        \--

​    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3

​        \--

​    **Referer: http://localhost:63343/0520_node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=9t7fggn7bkmuts228p80amf3rg**

​        --请求是“站”哪里发出去的 完整的当前所处的url地址

​    Accept-Encoding: gzip, deflate, br

​        

​    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7

​        \-

​    **Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a**

​        \-

+ 空行

+ 请求体

​    name=zhangsan&age=18

​		----携带的数据（以urlencoded编码）

## 响应报文（给浏览器看的）



HTTP/1.1 200 OK

X-Powered-By: Express

Content-Type: text/html; charset=utf-8

Content-Length: 2

ETag: W/"2-eoX0dku9ba8cNUXvu/DyeabcC+s"

Date: Fri, 23 Aug 2019 06:20:53 GMT

Connection: keep-alive



```
<h2>我是一些数据</h2>
```



+ 响应报文首行

​    **HTTP/1.1 200 OK**

​       --协议名/版本 状态码 

+ 响应报文头

​    **X-Powered-By: Express**

​       --服务的实现技术

​       --可在隐藏 expressServer加一行代码

```javascript
app.disable('x-powered-by')
```



​    Content-Type: text/html; charset=utf-8

​       --内容的类型及编码

​    Content-Length: 2

​       --响应体的长度（大小）

​    ETag: W/"2-eoX0dku9ba8cNUXvu/DyeabcC+s"

​       --协商缓存所使用的响应头

​    Date: Fri, 23 Aug 2019 06:20:53 GMT

​       --响应时间

​    Connection: keep-alive

​       --告诉浏览器服务器支持长连接

**空行**

**响应体**

   ```
<h2>我是一些数据</h2>
   ```

## ajax

ajax的原生实现不只是只能用xhr

### IE中的Ajax



ie对ajax使用强缓存 也就是第一次ajax请求的数据有效，当是第二次向同一个地址请求（带着同样的参数），数据会使用强缓存的数据也就是第一次的数据，哪怕此时服务器数据发生了变动。

**解决的方法：请求参数加上当前时间戳。。。**



### abort

abort 取消请求：

```JavaScript
let btn = document.getElementById('btn')
 let lastXhr
  btn.onclick = function () {
   if(lastXhr){
     lastXhr.abort()
   }
    lastXhr = getCode()
  }
  
  function getCode() {
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if(xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.response)
      }
    }

    xhr.open('GET','http://localhost:3000/get_code')

    xhr.send()

    return xhr
    //xhr.abort()
    /*
    * abort()取消本次请求（拦截回来的响应）。
    * */
```

abort工作：要么请求还没到达服务器就被取消，如果请求到了服务器就拦截回来的响应，不过能保证用户得不到响应



# process.cwd()和__dirname的区别

process.cwd()返回的是当前Node.js进程执行时的工作目录

`__dirname` 实际上不是一个全局变量，而是每个模块内部的。

 

## 不 懂

arguments.callee

commonJs

async await

promise pending

解构赋值

