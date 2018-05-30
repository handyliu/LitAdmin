/***
 * pushmsg相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var pushmsgController = require('../../../controllers/pushmsg');

//先检查登录
router.use(userController.checkLogin);

//返回pushmsg的集合
router.get('/', pushmsgController.find);

//返回指定的pushmsg
router.get('/:id', pushmsgController.findById);

indexRouter.router = router;

module.exports = indexRouter;
