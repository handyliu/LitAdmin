/**
 * Patrolevent 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Patrolevent = require('../data/patrolevent');
let patroleventController = {};
let _Patrolevent = Patrolevent;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
patroleventController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltPatrolevent = [];
  if (name.length > 0) {
    let mockPatrolevent = _Patrolevent.filter(patrolevent => {
      return patrolevent.name.indexOf(name) > -1;
    });
    total = mockPatrolevent.length; //总条数
    rltPatrolevent = mockPatrolevent.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Patrolevent.length; //总条数
    rltPatrolevent = _Patrolevent.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltPatrolevent
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
patroleventController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let patrolevent = _.find(_Patrolevent, function (b) {
    return b.id === id;
  });
  res.json(patrolevent || null)
};

module.exports = patroleventController;