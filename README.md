# react 全栈项目 招聘APP 实时在线聊天室

## 原文转载：[招聘APP](https://so.csdn.net/so/search/blog?q=%E3%80%90%E6%8B%9B%E8%81%98App%E3%80%91&t=blog&p=1&s=0&tm=0&lv=-1&ft=0&l=&u=qq_34235864)

## 线上: [招聘APP 在线聊天室](http:zp.liumianti.top) 

* 牛人账户：  
 { name：小明, pwd：1234 }
* Boss账户：  
 { name：百度, pwd：1234 }


## 环境 

- "react": "^17.0.1",
- "redux": "^4.0.5",
- "react-router-dom": "^5.2.0",
- "express": "^4.17.1",
- "mongoose": "5.11.15",
- "socket.io": "^3.1.1",
- "socket.io-client": "^3.1.1",


## 介绍：

招聘APP 实时聊天室 ，react框架开发，引入`Socket.io` 库来实时聊天， 支持注册登录， 显示未读消息个数，不同账户对应不同用户列表；  
项目模块组成：
1. 注册，登陆
2. 个人信息完善
3. 个人页面
4. Boss列表,牛人列表
5. 消息列表页面
6. 聊天室页面

## 技术亮点
1. 以 create-react-app 快速配置 react 项目环境，搭配 antd-mobile UI框架 构建前端项目;
2. 以express.js基于Node.js开发 后端项目，数据库采用mongodb来实现
3. 使用 `Socket.io` 配合 express，快速开发实时应用
4. redux 保存用户信息，聊天消息，页面之间相互调用数据，统一管理
5. 使用pm2 管理部署线上项目

#

### 线上发布注意事项
- 注意  `/src/redux/chat.redux.js`    
  - const socket =io('ws://localhost:9093');// 本地开发环境 删掉注释  
  - const socket =io('ws://zp.xxxx.xxx'); // 线上环境 删掉注释
- 注意  `/server/server.js`
  - origin: "http://localhost:3000", // 本地开发环境 删掉注释  
  - origin: "http://zp.xxxx.xxx", // 线上环境 删掉注释   

- `server`文件夹 拷贝到根目录, 安装依赖
  
  ```bash
  yarn add   cookie-parser express mongoose socket.io utility  --save  
  ```


