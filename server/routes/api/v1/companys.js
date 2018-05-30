/***
 * company相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var router = express.Router();
var indexRouter = {};
var userController = require('../../../controllers/user');
var companyController = require('../../../controllers/company');

//先检查登录
router.use(userController.checkLogin);

//返回company的集合
router.get('/', companyController.find);

//返回指定的company
router.get('/:id', companyController.findById);

indexRouter.router = router;

module.exports = indexRouter;
