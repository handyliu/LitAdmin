/**
 * Devices 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Devices = require('../data/device');
let deviceController = {};
let _Devices = Devices;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
deviceController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltDevices = [];
  if (name.length > 0) {
    let mockDevices = _Devices.filter(device => {
      return device.name.indexOf(name) > -1;
    });
    total = mockDevices.length; //总条数
    rltDevices = mockDevices.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Devices.length; //总条数
    rltDevices = _Devices.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltDevices
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
deviceController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let device = _.find(_Devices, function (b) {
    return b.id === id;
  });
  res.json(device || null)
};

module.exports = deviceController;