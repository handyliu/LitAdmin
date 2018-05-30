/**
 * 初始化摄像头模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');
console.log(Mock.Random);

const Cameras = [];
for (let i = 0; i < 100; i++) {
  Cameras.push(Mock.mock({
    'id|+1': 1,
    encode: Mock.Random.string(),
    name: Mock.Random.ctitle(2, 12),
    customerid: Mock.Random.integer(),
    customername: Mock.Random.cname(),
    organizeid: Mock.Random.integer(),
    orgname: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    email: Mock.mock('@EMAIL()'),
    address: Mock.mock('@county(true)'),
    'lng|114.0-114.6': 114.423545,
    'lat|26-29': 27.820984,
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

module.exports = Cameras;



