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
    ws.close()
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
