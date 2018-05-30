/***
 * sensor相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var sensorController = require('../../../controllers/sensor');

//先检查登录
router.use(userController.checkLogin);

//返回sensor的集合
router.get('/', sensorController.find);

//返回指定的sensor
router.get('/:id', sensorController.findById);

indexRouter.router = router;

module.exports = indexRouter;
