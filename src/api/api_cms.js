/**
 * Created by handy on 2018/5/21.
 * CMS相关api
 */
import * as API from './'

export default {

  //查询获取article列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/articles', params)
  },

  //查询获取一条article信息
  findById: id => {
    return API.GET(`/api/v1/articles/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/articles`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/articles/${id}`, params)
  },

  //单个删除article
  remove: id => {
    return API.DELETE(`/api/v1/articles/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/articles/batch/${ids}`)
  }

}
