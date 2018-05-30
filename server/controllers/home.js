/**
 * Alarms 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
let homeController = {};
let _Alarms = Alarms;

/**
 * 获取统计（网关总数）
 * @param req
 * @param res
 */
homeController.total = function (req, res) {
  res.json({
    total: Mock.Random.integer(),
    limit: limit,
    data: rltAlarms
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
homeController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let alarm = _.find(_Alarms, function (b) {
    return b.id === id;
  });
  res.json(alarm || null)
};

module.exports = homeController;