/***
 * home相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var homeController = require('../../../controllers/home');

//先检查登录
router.use(userController.checkLogin);

//返回home的集合
router.get('/', homeController.find);

//返回指定的home
router.get('/:id', homeController.findById);

indexRouter.router = router;

module.exports = indexRouter;
