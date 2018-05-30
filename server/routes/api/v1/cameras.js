/***
 * camera相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var cameraController = require('../../../controllers/camera');

//先检查登录
router.use(userController.checkLogin);

//返回camera的集合
router.get('/', cameraController.find);

//返回指定的camera
router.get('/:id', cameraController.findById);

indexRouter.router = router;

module.exports = indexRouter;
