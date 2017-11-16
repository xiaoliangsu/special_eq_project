import fetch from '../fetch/http.js';

//获取待受理订单
export function GetUnAcceptedOrders(param) {
    return fetch('/admin/unacceptedApplies/get',param,'post')
}

//获取已经受理订单
export function GetAcceptedOrders(param) {
    return fetch('/admin/acceptedApplies/get',param,'post')
}

export function getDetailOrder(params) {
  return fetch('/admin/acceptedApplies/get', params,'post')
}
export function getDetailUnOrder(param) {
  return fetch('/admin/unacceptedApplies/get',param,'post')
}
