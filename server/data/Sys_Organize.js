/**
 * 初始化项目机构(Organize)模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');

const Organizes = [];

Organizes.push({
  "F_Id" : 1,
  "F_FullName" : "宜春市",
  "F_ParentId" : "0"
});
Organizes.push({
  "F_Id" : 2,
  "F_FullName" : "万载县",
  "F_ParentId" : "1"
});
Organizes.push({
  "F_Id" : 3,
  "F_FullName" : "上高县",
  "F_ParentId" : "1"
});
Organizes.push({
  "F_Id" : 4,
  "F_FullName" : "株潭镇",
  "F_ParentId" : "2"
});
Organizes.push({
  "F_Id" : 5,
  "F_FullName" : "黄矛镇",
  "F_ParentId" : "2"
});

module.exports = Organizes;
