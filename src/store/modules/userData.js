import * as loginService from '../../services/login'

import {
  SET_USER_DATA,
  CLEAR_USER_DATA,
  GET_USER_DATA,
} from '../../constants/userData.js'

const state = {

  userData: {},

}

const actions = {
  /**
   * 设置信息
   */
  setUserData({commit}, res) {

    commit(SET_USER_DATA, res)
  },

  getUserData({commit}, res) {
    loginService.GetInfo().then(res => {
      state.userData = res.data;
      console.log(res.data.company);
      if(res.data.company===true){
        localStorage.setItem('company', res.data.company);
        localStorage.setItem('useComName', res.data.useComName);
        localStorage.setItem('useComAddr', res.data.useComAddr);
        localStorage.setItem('useComCode', res.data.useComCode);
        localStorage.setItem('zipcode', res.data.zipcode);
        localStorage.setItem('staticPhone', res.data.staticPhone);
        localStorage.setItem('mobilePhone', res.data.mobilePhone);
        localStorage.setItem('propertyComName', res.data.propertyComName);
        localStorage.setItem('propertyComCode', res.data.propertyComCode);
      //  localStorage.setItem('name', res.data.name);
        localStorage.setItem('verifyId', res.data.verifyId);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('addressCode', res.data.addressCode);
        localStorage.setItem('safeAdministrator', res.data.safeAdministrator);
        localStorage.setItem('addressCode', res.data.addressCode);
      }else{
        localStorage.setItem('company', false);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('mobilePhone', res.data.mobilePhone);
        localStorage.setItem('verifyId', res.data.verifyId);
        localStorage.setItem('zipcode', res.data.zipcode);
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('addressCode', res.data.addressCode);
        localStorage.setItem('useComAddr', res.data.useComAddr);
        localStorage.setItem('addressCode', res.data.addressCode);


      }





    }).catch(error => {
      console.log(error)
    })

  },


  clearUserData({commit}){
    commit(CLEAR_USER_DATA)
  },


}
const getters = {
  getterUserData: state => state.userData,
}

const mutations = {
  [SET_USER_DATA](state, res) {
    state.userData = res
  },

  [GET_USER_DATA](state, res) {
    state.userData = res
    //console.log(state.registTwo)

  },

  [CLEAR_USER_DATA](state){
    state.userData = {}
  },


}

export default {
  state,
  actions,
  getters,
  mutations
}
