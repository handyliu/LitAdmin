/**
 * Created by handy on 2018/5/21.
 * 系统管理相关api
 */
import * as API from './'

export default {

  //查询获取sys列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/syss', params)
  },

  //查询获取一条sys信息
  findById: id => {
    return API.GET(`/api/v1/syss/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/syss`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/syss/${id}`, params)
  },

  //单个删除sys
  remove: id => {
    return API.DELETE(`/api/v1/syss/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/syss/batch/${ids}`)
  }

}
