/**
 * Created by handy on 2018/5/21.
 * 运营相关api
 */
import * as API from './'

export default {

  //查询获取op列表(通过page分页)
  findDeviceList: params => {
    return API.GET('/api/v1/devices', params)
  },
  //查询获取一条op信息
  findDeviceById: id => {
    return API.GET(`/api/v1/devices/${id}`)
  },

  //查询获取op列表(通过page分页)
  findCameraList: params => {
    return API.GET('/api/v1/cameras', params)
  },
  //查询获取一条op信息
  findCameraById: id => {
    return API.GET(`/api/v1/cameras/${id}`)
  },

  //查询获取op列表(通过page分页)
  findPatroleventList: params => {
    return API.GET('/api/v1/patrolevents', params)
  },
  //查询获取一条op信息
  findPatroleventById: id => {
    return API.GET(`/api/v1/patrolevents/${id}`)
  },

  //查询获取op列表(通过page分页)
  findPushmsgList: params => {
    return API.GET('/api/v1/pushmsgs', params)
  },
  //查询获取一条op信息
  findPushmsgById: id => {
    return API.GET(`/api/v1/pushmsgs/${id}`)
  },

  //查询获取op列表(通过page分页)
  findSensorList: params => {
    return API.GET('/api/v1/sensors', params)
  },
  //查询获取一条op信息
  findSensorById: id => {
    return API.GET(`/api/v1/sensors/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/devices`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/devices/${id}`, params)
  },

  //单个删除op
  remove: id => {
    return API.DELETE(`/api/v1/devices/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/devices/batch/${ids}`)
  }

}
