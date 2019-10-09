### http 协议是什么？

- 是什么：超文本传输协议（属于应用层协议）
- 特点：无状态，现在 cookie 解决了无状态的问题（早期网页开发时，用 cookie 解决，现在是 cookie 和 session 配合使用）
- 作用：规定了服务器和客户端传递信息的规则（统称为报文，分为：请求报文、响应报文。）
- 版本：
  - http 1.0 （老版本） ---------- 不支持长连接
  - http 1.1 （主流版本）--------- 优点：支持长连接，弊端：同时发送资源的数量过小。
  - http 2.0 （最新版） ---------- 同时发送资源的数量稍有提升。
- 报文(请求报文、响应报文)的组成： 1.报文首行 2.报文头 3.空行（仅仅作为一个分割） 4.报文体

##GET请求报文分析（给服务器看的）
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
    ## 请求首行
    GET http://localhost:3000/demo?name=kobe&age=18 HTTP/1.1
    --请求方式 协议名://主机名:端口号/路由名/查询字符串参数 协议版本 ##请求头
    Host: localhost:3000
    --主机名:端口号
    Connection: keep-alive
    --告诉服务器，浏览器支持长连接
    Upgrade-Insecure-Requests: 1
    --告诉服务器浏览器支持 http1.1 协议
    DNT: 1
    --禁止跟踪，告诉服务器不要跟踪我（访问一些用户的习惯和行为），是否生效看服务器是否“迎合你”。
    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36
    --用户代理，能够标识着用户的浏览器品牌以及版本，用户服务器去获取浏览器特性。但是，现在不能用了
    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,_/_;q=0.8,application/signed-exchange;v=b3
    --告诉服务器浏览器所能接收文件的类型及权重（优先级），默认是 1
    Referer: http://localhost:63343/0520_node/day04/1.express%E6%9C%8D%E5%8A%A1%E5%99%A8/demo.html?_ijt=2huo4sk6aap5k9hkc3umi6aqch
    --标识着，“站”在哪里发出去的本次请求。1.防盗链。2.广告计费
    Accept-Encoding: gzip, deflate, br
    --告诉服务器浏览器能接收压缩方式
    Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7
    --告诉服务器浏览器能接受的语言有几种及权重
    Cookie: Webstorm-9af2238=09820128-3adb-43e4-8242-a6f65c9e523a
    --Webstorm 给你“种下”的 Cookie ##空行 ##请求体
    GET 请求，没有请求体
