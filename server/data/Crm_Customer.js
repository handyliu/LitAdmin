/**
 * 初始化客户(Customer)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
const Mock = require('mockjs');

const Customers = [];
for (let i = 0; i < 100; i++) {
  Customers.push(Mock.mock({
    F_Id: Mock.Random.guid(),
    F_Name: Mock.Random.cname(),
    F_Email: Mock.Random.email(),
    F_Address: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    F_Description: Mock.Random.csentence(180, 500),
    F_CreatorTime: Mock.Random.date()
  }))
}

module.exports = Customers;
