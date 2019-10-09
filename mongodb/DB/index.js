/* 
连接数据库 暴露promise实例
 */
let mongoose = require("mongoose");
//使用新版的索引器
mongoose.set('useCreateIndex', true)
//定义数据库名
const DB_NAME = 'demo';

//定义数据库地址
const DB_URL = 'localhost:27017';
//连接数据库
mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true });

module.exports = new Promise((resolve, reject) => {
    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true });
    //监听连接状态
    mongoose.connection.on('open', (err) => {
        if (err) {
            reject(err)
        } else {
            console.log("数据库连接成功！");
            //操作数据库  
            resolve()
        }
    }) //监听连接状态
    mongoose.connection.on('open', (err) => {
        if (err) {
            reject(err)
        } else {
            console.log("数据库连接成功！");
            //操作数据库  
            resolve()
        }
    })
})