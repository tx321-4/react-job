const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat');
const app = express();


//work with express
const server = require('http').Server(app); // express server 用http包裹
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000", // 本地开发环境 删掉注释  
 // origin: "http://zp.xxxx.xxx", // 线上环境 删掉注释  
    methods: ["GET", "POST"]
  }
}); //  再传给socket.io对象，使其与express 关联起来


//监听connection事件
io.on('connection', function (socket) {
  console.log('user login')
  socket.on('sendmsg', function (data) { //socket 当前连接的请求
    // console.log(data)
    const { from, to, msg} = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({chatid, from, to, content: msg},function(err,doc){ // 数据库存入数据
      io.emit('recvmsg', Object.assign({}, doc._doc))

    })
    //io.emit('recvmsg', data)
  })
})




// 开启中间件
app.use(cookieParser());
app.use(bodyParser.json()); //解析post 传来的json数据

app.use('/user', userRouter);


//改app.listen 为server.listen：使socket.io 与express成功绑定
server.listen(9093, function () {
  console.log('Node app start at port 9093!');
})