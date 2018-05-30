/***
 * device相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var deviceController = require('../../../controllers/device');

//先检查登录
router.use(userController.checkLogin);

//返回device的集合
router.get('/', deviceController.find);

//返回指定的device
router.get('/:id', deviceController.findById);

indexRouter.router = router;

module.exports = indexRouter;
