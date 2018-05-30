/**
 * Created by handy on 2018/5/21.
 * 首页相关api
 */
import * as API from './'

export default {

  //查询获取adv列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/advs', params)
  },

  //查询获取一条adv信息
  findById: id => {
    return API.GET(`/api/v1/advs/${id}`)
  }

}
