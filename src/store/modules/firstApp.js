
import {
    SELECTED_DEVICE_OPTION,
} from '../../constants/firstApp.js'

const state = {
    // 选择的仪器
    selectedOption: [],
    selectedNum:''

}

const actions = {
    /**
     * 选择的设备
     */
    selectedDeviceOption({commit},res) {
        commit(SELECTED_DEVICE_OPTION,res);
    }


}

const getters = {
    getSelectedOption: state => state.selectedOption,
    getSelectedNum: state => state.selectedNum,
}

const mutations = {
    [SELECTED_DEVICE_OPTION](state, res) {
        state.selectedOption = res.selectedDevice;
        state.selectedNum=res.num;

    },


}

export default {
    state,
    actions,
    getters,
    mutations
}
