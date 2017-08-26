import fetch from '../fetch/http.js';
//提交审批结果
export function ApprovalPass(param) {
  return fetch('/api/submitSetInfo',param,"post")
}
//获取待审批订单
export function GetWaitApprovalOrders(param) {
  return fetch('/api/getWaitApprovalOrders',param,'get')
}
//获取已经审批订单
export function GetApprovaledOrders(param) {
  return fetch('/api/getApprovaledOrders',param,'get')
}

//获取订单的审批结果
export function getApprovalReason(param) {
  return fetch('/api/getAccReason',param,'get')
}
