const express =  require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
  const app = express();


// 开启中间件
app.use(cookieParser());
app.use(bodyParser.json()); //解析post 传来的json数据

  app.use('/user', userRouter);


  app.listen(9093, function(){
    console.log('Node app start at port 9093!');
  })