import fetch from '../fetch/http.js';

//获取待受理订单
export function GetUnApprovaledOrders(param) {
  return fetch('/admin/unapprovedApplies/get',param,'post')
}

//获取已经受理订单
export function GetApprovedOrders(param) {
  return fetch('/admin/approvedApplies/get',param,'post')
}

//获取未发证
export function GetWaitVerifiedOrders(param) {
  return fetch('/admin/approvedApplies/get',param,'post')
}


// export function getDetailOrder(params) {
//   return fetch('/apply/get?'+params, params,'get')
// }
export function getDetailOrder(params) {
  return fetch('/admin/approvedApplies/get', params,'post')
}

export function getDetailUnOrder(params) {
  return fetch('/admin/unapprovedApplies/get', params,'post')
}
