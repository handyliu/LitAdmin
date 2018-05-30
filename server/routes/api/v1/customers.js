/***
 * customer相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var customerController = require('../../../controllers/customer');

//先检查登录
router.use(userController.checkLogin);

//返回customer的集合
router.get('/', customerController.find);

//返回指定的customer
router.get('/:id', customerController.findById);

indexRouter.router = router;

module.exports = indexRouter;
