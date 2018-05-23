/**
 * Created by handy on 2018/5/21.
 * 运营相关api
 */
import * as API from './'

export default {

  //查询获取op列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/ops', params)
  },

  //查询获取一条op信息
  findById: id => {
    return API.GET(`/api/v1/ops/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/ops`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/ops/${id}`, params)
  },

  //单个删除op
  remove: id => {
    return API.DELETE(`/api/v1/ops/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/ops/batch/${ids}`)
  }

}
