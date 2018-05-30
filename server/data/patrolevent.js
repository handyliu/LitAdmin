/**
 * 初始化巡更记录模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs'); 

const PatrolEvents = [];
for (let i = 0; i < 100; i++) {
  PatrolEvents.push(Mock.mock({
    'id|+1': 1, 
    finshedtime: Mock.Random.date('yyyy-MM-dd'),
    operatoruserid: Mock.Random.integer(),
    operatorname: Mock.Random.cname(),
    mobilephone: /^1[0-9]{10}$/,
    organizeid: Mock.Random.integer(),
    orgname: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    result: Mock.Random.csentence(80, 200),
    description: Mock.Random.csentence(180, 500),
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

module.exports = PatrolEvents;

