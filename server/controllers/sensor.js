/**
 * Sensor 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Sensor = require('../data/sensor');
let sensorController = {};
let _Sensor = Sensor;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
sensorController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltSensor = [];
  if (name.length > 0) {
    let mockSensor = _Sensor.filter(sensor => {
      return sensor.name.indexOf(name) > -1;
    });
    total = mockSensor.length; //总条数
    rltSensor = mockSensor.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Sensor.length; //总条数
    rltSensor = _Sensor.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltSensor
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
sensorController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let sensor = _.find(_Sensor, function (b) {
    return b.id === id;
  });
  res.json(sensor || null)
};

module.exports = sensorController;