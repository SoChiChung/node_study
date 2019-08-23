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
//流式文件写入
let ws=fs.createWriteStream('./demo.txt')//创建可写流
ws.write("黑色的不是夜晚，是漫长的孤单\n")
ws.write("看脚下一片黑暗，望头顶星光璀璨")
ws.close()
//只要使用了流 必须给流加监听

