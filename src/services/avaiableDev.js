import fetch from '../fetch/http.js';
// export function InitData() {
//     return fetch('/api/getorders')
// }
export function GetDevOrders(param) {
  return fetch('/device/get',param,'post')
}

//精准搜索
export function getDetailOrder(params) {
  return fetch('/apply/getWorkFlow', params,'post')
}
