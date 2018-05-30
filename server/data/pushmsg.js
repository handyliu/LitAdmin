/**
 * 初始化推送消息模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');
const PushMsgs = [];
for (let i = 0; i < 100; i++) {
  PushMsgs.push(Mock.mock({
    'id|+1': 1,
    name: Mock.Random.ctitle(2, 12),
    content: Mock.Random.csentence(10, 500),
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

module.exports = PushMsgs;



