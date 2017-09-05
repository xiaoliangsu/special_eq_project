import fetch from '../fetch/http.js';

//获取待受理订单
export function GetWaitAccpetOrders(param) {
    return fetch('/api/getWaitAcccpetOrders',param,'get')
}
//获取已经受理订单
export function GetAcceptedOrders(param) {
    return fetch('/api/getAcceptedOrders',param,'get')
}
