import * as registService from '../../services/registService'
import {
  GET_REGISTONE_FORM,
  SET_REGISTONE_FORM,
  CLEAR_REGISTONE_FORM,
} from '../../constants/regist.js'

const state = {

  registOne: {
    kind1: '',
    kind2: '',
    kind3: '',
    device_name: '',
    device_code: '',
    device_type: '',
    design_year: '',
    design_com_name: '',
    make_com_name: '',
    const_com_name: '',
    inspect_com_name: '',
    test_com_name: '',
    use_com_name: '',
    check_com_name: '',
  },
}

const actions = {
  /**
   * 设置表格信息
   */
  setRegistOneForm({commit}, res) {

    commit(SET_REGISTONE_FORM, res)
  },


  /**
   * 获取表格信息
   */
  getRegistOneForm({commit}, param) {
    registService.getRegistOne(param).then(res => {
      commit(GET_REGISTONE_FORM, res)
    }).catch(error => {
      console.log(error)
    })
  },
  clearRegistOneForm({commit}){
    commit(CLEAR_REGISTONE_FORM)
  }
}
const getters = {
  getRegistOne: state => state.registOne,

}

const mutations = {
  [SET_REGISTONE_FORM](state, res) {
    state.registOne = res


  },


  [GET_REGISTONE_FORM](state, res) {
    state.registOne = res.success
    console.log(state.registOne)

  },
  [CLEAR_REGISTONE_FORM](state){
    state.registOne =  {
      kind1: '',
      kind2: '',
      kind3: '',
      device_name: '',
      device_code: '',
      device_type: '',
      design_year: '',
      design_com_name: '',
      make_com_name: '',
      const_com_name: '',
      inspect_com_name: '',
      test_com_name: '',
      use_com_name: '',
      check_com_name: '',
    }
    console.log('CLEAR_REGISTONE_FORM');
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
