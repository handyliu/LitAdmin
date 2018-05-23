/**
 * Created by handy on 2018/5/21.
 * crm相关api
 */
import * as API from './'

export default {

  //查询获取crm列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/crms', params)
  },

  //查询获取一条crm信息
  findById: id => {
    return API.GET(`/api/v1/crms/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/crms`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/crms/${id}`, params)
  },

  //单个删除crm
  remove: id => {
    return API.DELETE(`/api/v1/crms/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/crms/batch/${ids}`)
  }

}
