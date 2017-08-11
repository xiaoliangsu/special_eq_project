
import {
    HEAD_SHOW_SUCCESS,
    HEAD_SHOW_FAIL,
} from '../../constants/base_info.js'

const state = {
    headShow: true

}

const getters = {
    headShow(state){
        return state.headShow;
    }
}

const actions = {
    HeadShowSuccess({commit}) {
        commit(HEAD_SHOW_SUCCESS);
    }
}

const mutations = {
    HEAD_SHOW_SUCCESS(state) {
        state.headShow = !state.headShow;
    },
    [HEAD_SHOW_FAIL](state){
        state.headShow = false;
        //console.log(state.headShow);
    },
}


export default {
    state,
    getters,
    actions,
    mutations
}
