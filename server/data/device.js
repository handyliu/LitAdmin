/**
 * 初始化网关模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');

const Devices = [];
for (let i = 0; i < 100; i++) {
  Devices.push(Mock.mock({
    'id|+1': 1,
    devicecode: Mock.Random.guid(),
    devicename: Mock.Random.ctitle(2, 12),
    devicetype: Mock.Random.integer(),
    customerid: Mock.Random.integer(),
    customername: Mock.Random.cname(),
    organizeid: Mock.Random.integer(),
    orgname: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    companyid: Mock.Random.integer(),
    companyname: Mock.Random.ctitle(2, 12),
    buildingid: Mock.Random.integer(),
    buildingname: Mock.Random.ctitle(2, 12),
    room: Mock.Random.integer(),
    'lng|114.0-114.6': 114.423545,
    'lat|26-29': 27.820984,
    offlinetime: Mock.Random.date(),
    onlinetime: Mock.Random.date(),
    online: Mock.Random.integer(0, 1),
    firmwarever: Mock.Random.string(),
    hardwarever: Mock.Random.string(),
    expirationtime: Mock.Random.date(),
    'deficitmoney|1-100.2':1,
    activetime: Mock.Random.date(),
    istips: Mock.Random.integer(0, 1),
    armstatus: Mock.Random.integer(0, 1),
    description: Mock.Random.csentence(180, 500),
    deletemark: Mock.Random.integer(0, 1),
    enabledmark: Mock.Random.integer(0, 1),
    creatortime: Mock.Random.date('yyyy-MM-dd'),
    creatoruserid: Mock.Random.integer(),
    creator: Mock.Random.cname(),
    lastmodifytime: Mock.Random.date('yyyy-MM-dd'),
    lastmodifyuserid: Mock.Random.integer(),
    lastmodifyuser: Mock.Random.cname(),
    deletetime: Mock.Random.date('yyyy-MM-dd'),
    deleteuserid: Mock.Random.integer(),
    deleteuser: Mock.Random.cname()
  }))
}

module.exports = Devices;

