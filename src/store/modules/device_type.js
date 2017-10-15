

import {
  SET_DEVICE_TYPE,
  GET_DEVICE_TYPE,
  SET_APPLY_TYPE,
} from '../../constants/device_type.js'

const state = {

  deviceType: '',
  deviceTypeNames:["锅炉","压力容器(气瓶除外)","电梯","起重机械","客运索道","大型游乐设施",
  "场(厂)内专用机动车辆","车用气瓶","气瓶(车用气瓶除外)","工业管道"],
  deviceTypeName:'',
  applyType:'',
  applyTypeNames:["首次申请","变更申请","停用申请","报废申请","停用后启用申请"],
  applyTypeName:'',


}

const actions = {

  setDeviceType({commit}, res) {
    commit(SET_DEVICE_TYPE, res)
  },
  setApplyType({commit}, res) {
    commit(SET_APPLY_TYPE, res)
  },




}

const getters = {
  getDeviceType: state => state.deviceType,
  getDeviceTypeName:state =>state.deviceTypeName,
  getApplyType: state => state.applyType,
  getApplyTypeName:state =>state.applyTypeName,
}

const mutations = {
  // [SET_USER_INFO](state, res) {
  //   state.userInfo = res
  // },

  [SET_DEVICE_TYPE](state, status) {
    state.deviceType = status;
    state.deviceTypeName=state.deviceTypeNames[state.deviceType-1];
  },
  [SET_APPLY_TYPE](state, status) {
    state.applyType = status;
    state.applyTypeName=state.applyTypeNames[state.applyType];
  },



}

export default {
  state,
  actions,
  getters,
  mutations
}
