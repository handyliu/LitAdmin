/**
 * 初始化报警记录模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');

const Alarms = [];
for (let i = 0; i < 100; i++) {
  Alarms.push(Mock.mock({
    'id|+1': 1,
    deviceid: Mock.Random.integer(),
    devicecode: Mock.Random.string(),
    devicename: Mock.Random.ctitle(2, 12),
    business: Mock.Random.csentence(10, 250),
    customerid: Mock.Random.integer(),
    customername: Mock.Random.cname(),
    organizeid: Mock.Random.integer(),
    orgName: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    'sensorname|1':['门磁','玻璃破碎检测','煤气检测','烟雾检测','SOS 按键','震动检测','漏水检测','红外探测','红外对射','遥控器','射频卡','门铃','D按键','急救手表','指纹锁'],
    address: '@county(true)',
    'lng|114.0-114.6': 114.423545,
    'lat|26-29': 27.820984,
    'AlarmType|1': ['主机报警','传感器报警','主机推送','传感器推送'],
    'status|1':['待处理','已处理','不予处理'],
    description: Mock.Random.csentence(180, 500),
    creatortime: Mock.Random.date('yyyy-MM-dd'),
    creatoruserid: Mock.Random.integer(),
    creator: Mock.Random.cname(),
    telephone: /^1[0-9]{10}$/
  }))
}

module.exports = Alarms;


