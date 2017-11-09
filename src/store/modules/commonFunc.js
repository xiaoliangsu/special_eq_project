
import {
  CHANGE_BACK_TIME,
  CHANGE_INPUT_TIME,
} from '../../constants/commonFunc.js'

const state = {

  time: '',
  inputTime:'',

}

const actions = {
  /**
   * 设置信息
   */
  changeBackTime({commit}, res) {

    commit(CHANGE_BACK_TIME, res)
  },
  changeInputTime({commit}, res) {

    commit(CHANGE_INPUT_TIME, res)
  },






}
const getters = {
  getBackTime: state => state.time,
  getInputTime: state => state.inputTime,
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
  [CHANGE_INPUT_TIME](state, res) {
    if(res){
      let newTime=new Date(res)

      state.inputTime = newTime.getFullYear() + "年" + (parseInt(newTime.getMonth()) + 1) + "月" + newTime.getDate()+"日";

    }else{
      state.inputTime='';
    }


  },




}

export default {
  state,
  actions,
  getters,
  mutations
}
