import fetch from '../fetch/http.js';
//提交受理结果
export function AccPass(param) {
  return fetch('/api/submitSetInfo',param,"post")
}
//获取待受理订单
export function GetWaitAccpetOrders(param) {
    return fetch('/api/getWaitAcccpetOrders',param,'get')
}
//获取已经受理订单
export function GetAcceptedOrders(param) {
    return fetch('/api/getAcceptedOrders',param,'get')
}
//获取订单的受理结果
export function getAccReason(param) {
  return fetch('/api/getAccReason',param,'get')
}
