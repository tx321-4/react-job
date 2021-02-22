const express = require('express');

const Router = express.Router(); // 路由对象

Router.get('/info', function (req, res) {
  return res.json({code:1});
})

module.exports = Router;