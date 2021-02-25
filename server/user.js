const express = require('express');
const model = require('./model');
const utils = require('utility')
const Router = express.Router(); // 路由对象
const User = model.getModel('user');
const Chat = model.getModel('chat');

// 查询条件 不显示密码和版本号
const _filter = { 'pwd': 0, '_v': 0 };

// 用户信息列表
Router.get('/list', function (req, res) {
  const { type } = req.query
  User.find({ type }, function (err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

// 更新信息
Router.post('/update', function (req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    // eslint-disable-next-line no-undef
    return json.dumps({ code: 1 })
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})


// 用户注册

Router.post('/register', function (req, res) {
  console.log(req.body);
  const { user, pwd, type } = req.body;
  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }
    // 注册后存储cookie model.save 获得id
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了！' })
      }
      const { user, type, _id } = d;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } })
    })
    // User.create({user,pwd: md5Pwd(pwd),type}, function(err, doc){
    //   if(err){
    //     return res.json({code: 1, msg: '后端出错了！'})
    //   }
    //   return res.json({code:0})
    // })
  })
})

// 用户登录
Router.post('/login', function (req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, { 'pwd': 0 }, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})


// 个人信息
Router.get('/info', function (req, res) {
  // 用户cookie校验
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了！' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

// 获取聊天信息列表 1.to user  2. from user

Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userid;
  // 查询多个条件,用$or区分: '$or': [{from:user, to:user}]
  User.find({}, function (e,userdoc){
    let  users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user}, {to:user}]}, function (err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '后端出错了' })
      }
      if (doc) {
        return res.json({ code: 0, msgs: doc , users: users})
      }
    })
  })
})

// 标记已读
Router.post('/readmsg', function(req, res) {
  const userid  = req.cookies.userid;
  const {from} = req.body;
  Chat.update({from,to:userid},{'$set': {read: true}},
  {'multi':true}, function(err,doc){
    if(!err){
      return res.json({code:0, num:doc.nModified})
    }
    return res.json({code:1, msg:'修改失败'})
  })
})

// 密码加密
function md5Pwd (pwd) {
  const salt = '2c*wuYSn@IO9VBErh$T$#S%OXpxTKeO9'
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router;