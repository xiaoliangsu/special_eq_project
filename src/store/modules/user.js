import * as userService from '../../services/user'
import {
  SET_USER_INFO,
  SET_LOGIN_STATUS,
  GET_USER_DATA
} from '../../constants/user.js'

const state = {
  // 用户登录状态
  // loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
  loginStatus: localStorage.getItem('loginStatus')|| false,

  // 用户登录信息
  //userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  userInfo: localStorage.getItem('userInfo') || {},

  // 用户数据信息
  userData: [],
  //author_key: localStorage.getItem('author_key') || '',
}

const actions = {
  /**
   * 用户登录
   */
  setUserInfo({ commit }, res) {
    localStorage.setItem('userInfo', res.username)
    // console.log("sdsd");
    // console.log(JSON.parse(localStorage.getItem('userInfo')).success);
    localStorage.setItem('loginStatus', res.state)
    localStorage.setItem('author_key',res.author_key)
    console.log(localStorage.getItem('author_key'))
    //console.log(localStorage.getItem('author_key')
    commit(SET_USER_INFO, res)
    commit(SET_LOGIN_STATUS, true)
  },

  /**
   * 退出登录
   */
  setSignOut({ commit }) {
    localStorage.removeItem('loginStatus')
    localStorage.removeItem('userInfo')
    commit(SET_LOGIN_STATUS, false)
    commit(SET_USER_INFO, {})
  },

  /**
   * 请求用户信息
   */
  getUserData({ commit }, id) {
    //commit(COM_LOADING_STATUS, true)
    userService.UserInfo(id)
      .then(res => {
        commit(COM_LOADING_STATUS, false)
        commit(GET_USER_DATA, res.data)
      })
  }
}

const getters = {
  getUserData: state => state.userData,
  loginStatus: state => state.loginStatus,
  userInfo: state => state.userInfo,
  // getAuthorkey:state => state.author_key,
}

const mutations = {
  [SET_USER_INFO](state, res) {
    state.userInfo = res
  },

  [SET_LOGIN_STATUS](state, status) {
    state.loginStatus = status
  },

  [GET_USER_DATA](state, res) {
    state.userData = res
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
