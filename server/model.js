const mongoose = require('mongoose');

// 链接mongo 并且使用react-job这个集合
 
const DB_URL ='mongodb://localhost:27017/react-job'
mongoose.connect(DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })

const models ={
  user: {
    'user': {type:String, require: true},
    'pwd': {type:String, require: true},
    'type': {type:String, require: true},
    // 头像
    'avatar':{type: String},
    //个人简介或者职位简介
    'desc':{type:String},
    // 职位
    'title':{type:String},
    //如何是boss, 还有两个字段
    'company':{type: String},
    'money':{type: String}
  }
}

// 批量动态生成model
for(let m in models){
  mongoose.model(m, new mongoose.Schema(models[m]))
}

// mongoose的工具函数库
module.exports = {
  gegModel: function(name){
    return mongoose.model(name)
  }
}