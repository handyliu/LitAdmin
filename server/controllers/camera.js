/**
 * Cameras 控制器
 * Created by handy on 2018/5/29.
 */
const Mock = require('mockjs');
const Cameras = require('../data/camera');
let cameraController = {};
let _Cameras = Cameras;

/**
 * 通过xx查询，获取列表
 * @param req
 * @param res
 */
cameraController.find = function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //名称
  let total = 0;
  let rltCameras = [];
  if (name.length > 0) {
    let mockCameras = _Cameras.filter(camera => {
      return camera.name.indexOf(name) > -1;
    });
    total = mockCameras.length; //总条数
    rltCameras = mockCameras.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  } else {
    total = _Cameras.length; //总条数
    rltCameras = _Cameras.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  }
  res.json({
    total: total,
    limit: limit,
    data: rltCameras
  })
};

/**
 * 通过id获取某一条
 * @param req
 * @param res
 */
cameraController.findById = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let camera = _.find(_Cameras, function (b) {
    return b.id === id;
  });
  res.json(camera || null)
};

module.exports = cameraController;