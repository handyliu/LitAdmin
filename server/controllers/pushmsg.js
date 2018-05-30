/**
 * Pushmsgs 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Pushmsgs = require('../data/pushmsg');
let pushmsgController = {};
let _Pushmsgs = Pushmsgs;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
pushmsgController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltPushmsgs = [];
  if (name.length > 0) {
    let mockPushmsgs = _Pushmsgs.filter(pushmsg => {
      return pushmsg.name.indexOf(name) > -1;
    });
    total = mockPushmsgs.length; //总条数
    rltPushmsgs = mockPushmsgs.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Pushmsgs.length; //总条数
    rltPushmsgs = _Pushmsgs.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltPushmsgs
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
pushmsgController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let pushmsg = _.find(_Pushmsgs, function (b) {
    return b.id === id;
  });
  res.json(pushmsg || null)
};

module.exports = pushmsgController;