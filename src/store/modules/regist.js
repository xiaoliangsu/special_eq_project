import * as registService from '../../services/registService'
import {
  GET_REGISTONE_FORM,
  SET_REGISTONE_FORM,
  CLEAR_REGISTONE_FORM,
  SET_REGISTTWO_FORM,
  GET_REGISTTWO_FORM,
  CLEAR_REGISTTWO_FORM,
  SET_REGISTTHREE_FORM,
  GET_REGISTTHREE_FORM,
  CLEAR_REGISTTHREE_FORM,
} from '../../constants/regist.js'

const state = {

  registOne: {
    eq_species: '',
    eq_category: '',
    eq_variety: '',
    eq_name: '',
    eq_code: '',
    model: '',
    design_use_limit: '',
    design_com_name: '',
    manufacture_com_name: '',
    construct_com_name: '',
    supervise_com_name: '',
    test_com_name: '',
    use_com_name: '',
    use_com_addr: '',
    use_com_code: '',
    zip_code: '',
    com_code: '',
    eq_use_location: '',
    begin_use_date: '',
    com_phone: '',
    safe_admin: '',
    mobile_phone: '',
    property_com_name: '',
    property_com_code: '',
    telephone: '',
    check_com_name: '',
    check_category: '',
    check_report_num: '',
    check_date: '',
    check_conclusion: '',
    next_check_date: '',
  },
  registTwo: {
    equipment_category: '',
    equipment_variety: '',
    equipment_name: '',
    equipment_num: '',
    using_company_name: '',
    using_company_addr: '',
    eq_use_loc: '',
    com_phone: '',
    using_company_code: '',
    zipCode: '',
    safety_administrator: '',
    mobile_number: '',
  },
  registThree: {
    eq_kind: '',
    product_name:'',
    cylinder_num: '',
    fill_medium: '',
    cylinder_work_pressure: '',
    cylinder_volume: '',
    manu_com_name: '',
    manufacture_date: '',
    product_num: '',
    company_code: '',
    constr_com_name: '',
    inspect_com_name: '',
    use_company_name: '',
    use_company_addr: '',
    use_company_code: '',
    zipcode: '',
    license: '',
    vin: '',
    begin_to_use_date: '',
    company_phone: '',
    safe_administrator: '',
    mobilePhone: '',
  },
}

const actions = {
  /**
   * 设置表格信息
   */
  setRegistOneForm({commit}, res) {

    commit(SET_REGISTONE_FORM, res)
  },
  setRegistTwoForm({commit}, res) {

    commit(SET_REGISTTWO_FORM, res)
  },
  setRegistThreeForm({commit}, res) {

    commit(SET_REGISTTWO_FORM, res)
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

  getRegistTwoForm({commit}, param) {
    registService.getRegistTwo(param).then(res => {
      commit(GET_REGISTTWO_FORM, res)
    }).catch(error => {
      console.log(error)
    })
  },

  getRegistThreeForm({commit}, param) {
    registService.getRegistThree(param).then(res => {
      commit(GET_REGISTTHREE_FORM, res)
    }).catch(error => {
      console.log(error)
    })
  },



  clearRegistOneForm({commit}){
    commit(CLEAR_REGISTONE_FORM)
  },

  clearRegistTwoForm({commit}){
    commit(CLEAR_REGISTTWO_FORM)
  },
  clearRegistThreeForm({commit}){
    commit(CLEAR_REGISTTHREE_FORM)
  }
}
const getters = {
  getRegistOne: state => state.registOne,
  getRegistTwo: state => state.registTwo,
  getRegistThree: state => state.registThree,


}

const mutations = {
  [SET_REGISTONE_FORM](state, res) {
    state.registOne = res
  },
  [SET_REGISTTWO_FORM](state, res) {
    state.registTwo = res
  },
  [SET_REGISTTHREE_FORM](state, res) {
    state.registThree = res
  },


  [GET_REGISTONE_FORM](state, res) {
    state.registOne = res.success
    //console.log(state.registTwo)
  },

  [GET_REGISTTWO_FORM](state, res) {
    state.registTwo = res.success
    //console.log(state.registTwo)

  },
  [GET_REGISTTHREE_FORM](state, res) {
    state.registThree = res.success
    //console.log(state.registTwo)

  },

  [CLEAR_REGISTONE_FORM](state){
    state.registOne =  {
      eq_species: '',
      eq_category: '',
      eq_variety: '',
      eq_name: '',
      eq_code: '',
      model: '',
      design_use_limit: '',
      design_com_name: '',
      manufacture_com_name: '',
      construct_com_name: '',
      supervise_com_name: '',
      test_com_name: '',
      use_com_name: '',
      use_com_addr: '',
      use_com_code: '',
      zip_code: '',
      com_code: '',
      eq_use_location: '',
      begin_use_date: '',
      com_phone: '',
      safe_admin: '',
      mobile_phone: '',
      property_com_name: '',
      property_com_code: '',
      telephone: '',
      check_com_name: '',
      check_category: '',
      check_report_num: '',
      check_date: '',
      check_conclusion: '',
      next_check_date: '',
    }
    console.log('CLEAR_REGISTONE_FORM');
  },
  [CLEAR_REGISTTWO_FORM](state){
    state.registTwo =  {
      equipment_category: '',
      equipment_variety: '',
      equipment_name: '',
      equipment_num: '',
      using_company_name: '',
      using_company_addr: '',
      eq_use_loc: '',
      com_phone: '',
      using_company_code: '',
      zipCode: '',
      safety_administrator: '',
      mobile_number: '',
    }
    console.log('CLEAR_REGISTTWO_FORM');
  },
  [CLEAR_REGISTTHREE_FORM](state){
    state.registThree =  {
      eq_kind: '',
      product_name:'',
      cylinder_num: '',
      fill_medium: '',
      cylinder_work_pressure: '',
      cylinder_volume: '',
      manu_com_name: '',
      manufacture_date: '',
      product_num: '',
      company_code: '',
      constr_com_name: '',
      inspect_com_name: '',
      use_company_name: '',
      use_company_addr: '',
      use_company_code: '',
      zipcode: '',
      license: '',
      vin: '',
      begin_to_use_date: '',
      company_phone: '',
      safe_administrator: '',
      mobilePhone: '',
    }
    console.log('CLEAR_REGISTTHREE_FORM');
  }

}

export default {
  state,
  actions,
  getters,
  mutations
}
