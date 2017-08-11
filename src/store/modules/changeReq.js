
import {
    SELECTED_CHANGE_OPTION,
} from '../../constants/changeReq.js'

const state = {
    // 选择的申请类别
    selectedChangeOption: []
}

const actions = {
    /**
     * 选择的设备
     */
    selectedChange({commit},res) {
        commit(SELECTED_CHANGE_OPTION,res);
    }


}

const getters = {
    getSelectedChangeOption: state => state.selectedChangeOption,
}

const mutations = {
    [SELECTED_CHANGE_OPTION](state, res) {
        state.selectedChangeOption = res
    },


}

export default {
    state,
    actions,
    getters,
    mutations
}
