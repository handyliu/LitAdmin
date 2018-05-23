/**
 * Created by handy on 2018/5/21.
 * 广告相关api
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
  },

  add: params => {
    return API.POST(`/api/v1/advs`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/advs/${id}`, params)
  },

  //单个删除adv
  remove: id => {
    return API.DELETE(`/api/v1/advs/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/advs/batch/${ids}`)
  }

}
