let mongoose = require("mongoose");

//定义数据库名
const DB_NAME = 'demo';

//定义数据库地址
const DB_URL = 'localhost:27017';
//连接数据库
mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, { useNewUrlParser: true })

let dbPromise = new Promise((resolve, reject) => {
    //监听连接状态
    mongoose.connection.on('open', (err) => {
        if (err) {
            reject(err)
        } else {
            console.log("数据库连接成功！");
            //操作数据库  
            resolve()
        }
    })
}).then(() => {
    //引入约束Schema 也就是约束的管理
    let Schema = mongoose.Schema;

    //创建约束对象实例 制定约束条件 例如年龄有大小限制 性别有男女之分
    let studentSchema = new Schema({
        stu_id: {
            type: String,
            required: true,//限制stu_id是必填的
            unique: true,//唯一性
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        sex: {
            type: String,
            required: true
        },
        hobby: [String],
        info: {
            type: Schema.Types.Mixed//学生的个人信息 接受所有类型的数据
        },
        date: {//入学时间
            type: Date,
            default: Date.now()//默认取值
        },
        enable_flag: {//这是有效标志符 表示此条数据是否有效 取值为Y 或者N N就是逻辑删除
            type: String,
            default: "Y"
        }
    });

    //创建模型对象 把studentschema的规则告诉schema 

    //第一个参数与数据库中的集合相对应 第二个参数指定约束对象的实例
    let studentModel = mongoose.model('students', studentSchema);
    //操作数据库
    
}).catch((err) => {
    console.log(err)
});
/*
!(async()=>{
    await dbPromise
    console.log(1)
})
*/

