let mongoose = require("mongoose");
//使用新版的索引器
mongoose.set('useCreateIndex', true)
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
    //只要生成了模板对象 就能进行数据是增删查改

    let studentModel = mongoose.model('students', studentSchema);//获取students集合/如果没有就创建 
    //并把studentSchema约束赋予students的文档

    //操作数据库

    /* 插入数据 */

    /*     studentModel.create(student02, (err, data) => {
            if (err)
                console.log(err);
            else console.log("插入成功!")
        }
        ) */
    studentModel.find({ age: 22 }, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data)
    })

}).catch((err) => {
    console.log(err)
});
/* let student01 = {
    stu_id: "20190824001",
    name: "简自豪",
    age: "22",
    sex: "男",
    hobby: ["薇恩", "洗澡", "吃资源"],
    info: "龙不吟虎不啸，灯笼不简可笑可笑",
} */
let student02 = {
    stu_id: "20190824003",
    name: "王柳羿",
    age: "20",
    sex: "男",
    hobby: ["宠粉", "植树", "吃拌面"],
    info: "蓝公主生日快乐",
}
/*
!(async()=>{
    await dbPromise
    console.log(1)
})
*/

