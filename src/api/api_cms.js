/**
 * Created by handy on 2018/5/21.
 * cms相关api
 */
import * as API from './'

export default {

  //查询获取cms列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/cmss', params)
  },

  //查询获取一条cms信息
  findById: id => {
    return API.GET(`/api/v1/cmss/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/cmss`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/cmss/${id}`, params)
  },

  //单个删除cms
  remove: id => {
    return API.DELETE(`/api/v1/cmss/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/cmss/batch/${ids}`)
  }

}
