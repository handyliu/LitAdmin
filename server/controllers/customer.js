/**
 * Customers 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Customers = require('../data/customer');
let customerController = {};
let _Customers = Customers;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
customerController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltCustomers = [];
  if (name.length > 0) {
    let mockCustomers = _Customers.filter(customer => {
      return customer.name.indexOf(name) > -1;
    });
    total = mockCustomers.length; //总条数
    rltCustomers = mockCustomers.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Customers.length; //总条数
    rltCustomers = _Customers.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltCustomers
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
customerController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let customer = _.find(_Customers, function (b) {
    return b.id === id;
  });
  res.json(customer || null)
};

module.exports = customerController;