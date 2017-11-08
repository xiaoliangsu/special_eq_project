
import {
  CHANGE_BACK_TIME,
} from '../../constants/commonFunc.js'

const state = {

  time: '',

}

const actions = {
  /**
   * 设置信息
   */
  changeBackTime({commit}, res) {

    commit(CHANGE_BACK_TIME, res)
  },






}
const getters = {
  getBackTime: state => state.time,
}

const mutations = {
  [CHANGE_BACK_TIME](state, res) {

    if(res){
      let newDate = new Date(res);
      let Y = newDate.getFullYear() + '-';
      let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
      let D = newDate.getDate() + ' ';
      res = Y + M + D;
    }else {
      res='';
    }
    state.time = res
  },




}

export default {
  state,
  actions,
  getters,
  mutations
}
