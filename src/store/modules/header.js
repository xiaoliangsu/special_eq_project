
// import axios from "axios"
// import {
//     GET_USERINFO
// } from '../../constants/header.js'
//
// const state = {
//     userInfo: 1, //用户信息
//
//
// }
//
// const getters = {
//   nameGetter(state){
//
//     return state.userInfo.name;
//   }
// }
//
// const actions = {
//     getUserInfo({ commit, state ,}) {
// /*
//       Http.post({
//             url: '/api/goods',
//             params,
//             onSuccess: function(data) {
//                 console.log(data);
//                 commit(GET_USERINFO, data);
//
//                 onSuccess && onSuccess(data);
//             },
//
//         })*/
//
//         axios.get('/api/userInfo').then(function(res) {
//           commit(GET_USERINFO, res);
//          // console.log(res);
//         }.bind(this)).catch(function(err) {
//             console.log(err);
//         });
//
//
//     },
//
// }
//
//
//     const mutations = {
//         [GET_USERINFO](state, data) {
//             state.userInfo=data.data.data;
//             console.log(state.userInfo);
//             //state.driver_name=info.driver_name;
//         },
//
//     }
//
//
//     export default {
//         state,
//         getters,
//         actions,
//         mutations
//     }
