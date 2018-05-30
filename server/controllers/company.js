/**
 * Companys 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Companys = require('../data/company');
let companyController = {};
let _Companys = Companys;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
companyController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltCompanys = [];
  if (name.length > 0) {
    let mockCompanys = _Companys.filter(company => {
      return company.name.indexOf(name) > -1;
    });
    total = mockCompanys.length; //总条数
    rltCompanys = mockCompanys.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Companys.length; //总条数
    rltCompanys = _Companys.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltCompanys
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
companyController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let company = _.find(_Companys, function (b) {
    return b.id === id;
  });
  res.json(company || null)
};

module.exports = companyController;