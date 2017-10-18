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
    eqSpecies: '',
    eqCategory: '',
    eqVariety: '',
    eqName: '',
    eqCode: '',
    model: '',
    designUseLimit: '',
    designComName: '',
    manufactureComName: '',
    constructComName: '',
    superviseComName: '',
    testComName: '',
    useComName: '',
    useComAddr: '',
    useComCode: '',
    zipCode: '',
    comCode: '',
    eqUseLocation: '',
    beginUseDate: '',
    comPhone: '',
    safeAdmin: '',
    mobilePhone: '',
    propertyComName: '',
    propertyComCode: '',
    telephone: '',
    checkComName: '',
    checkCategory: '',
    checkReportNum: '',
    checkDate: '',
    checkConclusion: '',
    nextCheckDate: '',
    // comTablePerson: '',
    // comPersonDate: '',
    // comSafePerson: '',
    // safePersonDate: '',
    // registPerson: '',
    // registCode: '',
    // registDate: '',
    // comStampDate: '',
    // registStampDate: '',
     registKind: '',
  },
  registTwo: {
    registKind: '',
    equipmentCategory: '',
    equipmentVariety: '',
    equipmentName: '',
    equipmentNum: '',
    usingCompanyName: '',
    usingCompanyAddr: '',
    eqUseLoc: '',
    comPhone: '',
    zipCode: '',
    usingCompanyCode: '',
    zipCode: '',
    safetyAdministrator: '',
    mobileNumber: '',
    // comTablePerson: '',
    // comDate1: '',
    // comSafePerson: '',
    // comDate2: '',
    // regisPerson: '',
    // comDate3: '',
    // comDate4: '',
    // registCode: '',
  },
  registThree: {
    eqKind: '',
    productName:'',
    cylinderNum: '',
    fillMedium: '',
    cylinderWorkPressure: '',
    cylinderVolume: '',
    manuComName: '',
    manufactureDate: '',
    productNum: '',
    companyCode: '',
    constrComName: '',
    inspectComName: '',
    useCompanyName: '',
    useCompanyAddr: '',
    useCompanyCode: '',
    zipcode: '',
    license: '',
    vin: '',
    beginToUseDate: '',
    companyPhone: '',
    safeAdministrator: '',
    mobilePhone: '',
    // comTablePerson: '',
    // comPersonDate: '',
    // comSafePerson: '',
    // safePersonDate: '',
    // explanation: '',
    // registPerson: '',
    // registCode: '',
    // registDate: '',
    // comStampDate: '',
    // registStampDate: '',
    registKind: '',
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

    commit(SET_REGISTTHREE_FORM, res)
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
      eqSpecies: '',
      eqCategory: '',
      eqVariety: '',
      eqName: '',
      eqCode: '',
      model: '',
      designUseLimit: '',
      designComName: '',
      manufactureComName: '',
      constructComName: '',
      superviseComName: '',
      testComName: '',
      useComName: '',
      useComAddr: '',
      useComCode: '',
      zipCode: '',
      comCode: '',
      eqUseLocation: '',
      beginUseDate: '',
      comPhone: '',
      safeAdmin: '',
      mobilePhone: '',
      propertyComName: '',
      propertyComCode: '',
      telephone: '',
      checkComName: '',
      checkCategory: '',
      checkReportNum: '',
      checkDate: '',
      checkConclusion: '',
      nextCheckDate: '',
      // comTablePerson: '',
      // comPersonDate: '',
      // comSafePerson: '',
      // safePersonDate: '',
      // registPerson: '',
      // registCode: '',
      // registDate: '',
      // comStampDate: '',
      // registStampDate: '',
      registKind: '',
    }
    console.log('CLEAR_REGISTONE_FORM');
  },
  [CLEAR_REGISTTWO_FORM](state){
    state.registTwo =  {
      registKind: '',
      equipmentCategory: '',
      equipmentVariety: '',
      equipmentName: '',
      equipmentNum: '',
      usingCompanyName: '',
      usingCompanyAddr: '',
      eqUseLoc: '',
      comPhone: '',
      zipCode: '',
      usingCompanyCode: '',
      zipCode: '',
      safetyAdministrator: '',
      mobileNumber: '',
      // comTablePerson: '',
      // comDate1: '',
      // comSafePerson: '',
      // comDate2: '',
      // regisPerson: '',
      // comDate3: '',
      // comDate4: '',
      // registCode: '',
    }
    console.log('CLEAR_REGISTTWO_FORM');
  },
  [CLEAR_REGISTTHREE_FORM](state){
    state.registThree =  {
      eqKind: '',
      productName:'',
      cylinderNum: '',
      fillMedium: '',
      cylinderWorkPressure: '',
      cylinderVolume: '',
      manuComName: '',
      manufactureDate: '',
      productNum: '',
      companyCode: '',
      constrComName: '',
      inspectComName: '',
      useCompanyName: '',
      useCompanyAddr: '',
      useCompanyCode: '',
      zipcode: '',
      license: '',
      vin: '',
      beginToUseDate: '',
      companyPhone: '',
      safeAdministrator: '',
      mobilePhone: '',
      // comTablePerson: '',
      // comPersonDate: '',
      // comSafePerson: '',
      // safePersonDate: '',
      // explanation: '',
      // registPerson: '',
      // registCode: '',
      // registDate: '',
      // comStampDate: '',
      // registStampDate: '',
      registKind: '',
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
