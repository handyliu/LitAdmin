/***
 * alarm相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var alarmController = require('../../../controllers/alarm');

//先检查登录
router.use(userController.checkLogin);

//返回alarm的集合
router.get('/', alarmController.find);

//返回指定的alarm
router.get('/:id', alarmController.findById);

//创建alarm
router.post('/', alarmController.create);

//更新alarm全部信息
router.put('/:id', alarmController.update);

//更新alarm部分信息
router.patch('/:id', alarmController.patch);

//批量删除
router.delete('/batch/:ids', alarmController.deleteBatch);

//删除指定的alarm
router.delete('/:id', alarmController.delete);



indexRouter.router = router;

module.exports = indexRouter;
