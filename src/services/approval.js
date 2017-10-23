import fetch from '../fetch/http.js';

//获取待受理订单
export function GetUnApprovaledOrders(param) {
  return fetch('/admin/unapprovedApplies/get',param,'post')
}

//获取已经受理订单
export function GetApprovedOrders(param) {
  return fetch('/admin/approvedApplies/get',param,'post')
}


export function getDetailOrder(params) {
  return fetch('/apply/get?'+params, params,'get')
}
