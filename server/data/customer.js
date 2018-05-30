/**
 * 初始化客户(Customer)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Mock = require('mockjs');

const Customers = [];
for (let i = 0; i < 100; i++) {
  Customers.push(Mock.mock({
    'id|+1': 1,
    customerName: Mock.Random.cname(),
    nickname: Mock.Random.ctitle(2, 12),
    gender: Mock.Random.integer(0, 1),
    birthday: Mock.Random.date('yyyy-MM-dd'),
    mobilephone: /^1[0-9]{10}$/,
    email: Mock.mock('@EMAIL()'),
    wechat: Mock.Random.string(),
    cardno: Mock.Random.string(),
    address: Mock.mock('@county(true)'),
    organizeid: Mock.Random.integer(),
    orgname: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    companyid: Mock.Random.integer(),
    companyname: Mock.Random.ctitle(2, 12),
    jobid: Mock.Random.integer(),
    description: Mock.Random.csentence(180, 500),
    deletemark: Mock.Random.integer(0, 1),
    enabledmark: Mock.Random.integer(0, 1),
    creatortime: Mock.Random.date('yyyy-MM-dd'),
    creatoruserid: Mock.Random.integer(),
    lastmodifytime: Mock.Random.date('yyyy-MM-dd'),
    lastmodifyuserid: Mock.Random.integer(),
    deletetime: Mock.Random.date('yyyy-MM-dd'),
    deleteuserid: Mock.Random.integer(),
    account: Mock.Random.string(),
    ismanager: Mock.Random.integer(0, 1),
    password: Mock.Random.string(),
    secretkey: Mock.Random.string(),
    phonetoken: Mock.Random.string(),
    phonetype: Mock.Random.integer(),
    language: Mock.Random.string(),
    apptype: Mock.Random.integer(0, 1),
    enablepush: Mock.Random.integer(0, 1),
    allowstarttime: Mock.Random.date(),
    allowendtime: Mock.Random.date(),
    lockstartdate: Mock.Random.date(),
    lockenddate: Mock.Random.date(),
    firstvisittime: Mock.Random.date(),
    eviousvisittime: Mock.Random.date(),
    lastvisittime: Mock.Random.date(),
    changepassworddate: Mock.Random.date(),
    multilogin: Mock.Random.integer(0, 1),
    logoncount: Mock.Random.integer(),
    online: Mock.Random.integer(0, 1),
    question: Mock.Random.csentence(5, 50),
    answerquestion: Mock.Random.csentence(180, 500),
    checkipaddress: Mock.Random.integer(0, 1)
  }))
}

module.exports = Customers;