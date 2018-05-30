/***
 * patrolevent相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var patroleventController = require('../../../controllers/patrolevent');

//先检查登录
router.use(userController.checkLogin);

//返回patrolevent的集合
router.get('/', patroleventController.find);

//返回指定的patrolevent
router.get('/:id', patroleventController.findById);

indexRouter.router = router;

module.exports = indexRouter;
