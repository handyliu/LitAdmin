/**
 * 初始化企业/公司/工厂(Companys)模拟数据
 *
 * Created by handy on 2018/5/21.
 */
const Mock = require('mockjs');

const Companys = [];
for (let i = 0; i < 100; i++) {
  Companys.push(Mock.mock({
    F_Id: Mock.Random.guid(),
    F_Name: Mock.Random.ctitle(2, 12),
    F_CustomerName: Mock.Random.cname(),
    F_Email: Mock.Random.email(),
    F_Address: (Mock.Random.province() + Mock.Random.city() + Mock.Random.county()),
    F_ImageUrl: Mock.Random.dataImage('180x150','hahahaha'),
    F_Description: Mock.Random.csentence(180, 500),
    F_CreatorTime: Mock.Random.date()
  }))
}

module.exports = Companys;
