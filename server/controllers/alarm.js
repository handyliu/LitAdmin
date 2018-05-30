/**
 * Alarms 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Alarms = require('../data/alarm');
let alarmController = {};
let _Alarms = Alarms;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
alarmController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltAlarms = [];
  if (name.length > 0) {
    let mockAlarms = _Alarms.filter(alarm => {
      return alarm.name.indexOf(name) > -1;
    });
    total = mockAlarms.length; //总条数
    rltAlarms = mockAlarms.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Alarms.length; //总条数
    rltAlarms = _Alarms.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltAlarms
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
alarmController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let alarm = _.find(_Alarms, function (b) {
    return b.id === id;
  });
  res.json(alarm || null)
};

/**
 * 添加一条信息
 * @param req
 * @param res
 */
alarmController.create = function (req, res) {
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;
  _Alarms.push({
    id: Mock.Random.guid(),
    name: name,
    author: author,
    description: description,
    publishAt: publishAt
  });
  res.json({"errcode": 0, "errmsg": "新增成功"})
};

/***
 * 更新一条记录
 * @param req
 * @param res
 */
alarmController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let name = req.body.name;
  let author = req.body.author;
  let description = req.body.description;
  let publishAt = req.body.publishAt;

  let i = _.findIndex(_Alarms, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Alarms[i].name = name;
    _Alarms[i].author = author;
    _Alarms[i].description = description;
    _Alarms[i].publishAt = publishAt;
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

/**
 * 更新一条记录的部分信息
 * @param req
 * @param res
 */
alarmController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
alarmController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  _Alarms = _Alarms.filter(b => !ids.includes(b.id))
  res.json({"errcode": 0, "errmsg": "删除成功"});
};

/**
 * 单条删除
 * @param req
 * @param res
 */
alarmController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let i = _.findIndex(_Alarms, function (u) {
    return u.id === id
  })
  if (i > -1) {
    _Alarms.splice(i, 1);
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

module.exports = alarmController;
