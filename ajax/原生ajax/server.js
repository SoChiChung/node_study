let express = require('express');
let app = express();
let router = require('./router/router')
app.use(express.static('public'))
//解析POST请求请求体中以urlencoded形式编码参数
app.use(express.urlencoded({ extended: true }))
app.use(router);
app.listen(3000, (err) => {
    if (!err)
        console.log('App listening on port 3000!');
    else console.log(err)
});