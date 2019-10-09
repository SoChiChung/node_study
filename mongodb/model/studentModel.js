    //创建学生模型
    let mongoose=require("mongoose");
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