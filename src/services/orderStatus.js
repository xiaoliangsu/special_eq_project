import fetch from '../fetch/http.js';

//获取已经提交的订单
// export function GetOrders(param) {
//     return fetch('/api/getorders',param,'get')
// }
export function GetOrders(param) {
  return fetch('/apply/get',param,'post')
}


export function deleteApp(param) {
  return fetch('/apply/delete?'+param,param,'get')
}
//精准搜索
export function getDetailOrder(params) {
  return fetch('/apply/get?'+params, params,'get')
}




export function ChangeTime(param) {
    return fetch('/api/getorders',param,'get')
}
export function ChangeState(param) {
    return fetch('/api/getorders',param,'get')
}

export function ChangeSort(param) {
    return fetch('/api/getorders',param,'get')
}

export function Query(param) {
  return fetch('/api/getorders',param,'get')
}

export function InitSize(param) {
    return fetch('/api/getorders',param,'get')
}

//获取未提交但是保存了的订单
export function GetUnSubmitOrders(param) {
  return fetch('/api/getorders',param,'get')
}


