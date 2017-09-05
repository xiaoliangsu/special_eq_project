import fetch from '../fetch/http.js';

//获取待审批订单
export function GetWaitApprovalOrders(param) {
  return fetch('/api/getWaitApprovalOrders',param,'get')
}
//获取已经审批订单
export function GetApprovaledOrders(param) {
  return fetch('/api/getApprovaledOrders',param,'get')
}

