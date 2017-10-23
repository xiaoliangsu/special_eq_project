import fetch from '../fetch/http.js';
/*
 获取表格1信息
 */

export function getRegistOne(params) {
  return fetch('/api/getRegistOne', params,'get')
}
export function getRegistTwo(params) {
  return fetch('/api/getRegistTwo', params,'get')
}
export function getRegistThree(params) {
  return fetch('/api/getRegistThree', params,'get')
}


//提交受理通过
export function AccPass(param) {
  return fetch('/admin/apply/accept',param,"post")
}

//提交受理驳回理由
export function AccRej(param) {
  return fetch('/admin/apply/accept',param,"post")
}


//提交审批结果
export function ApprovalPass(param) {
  return fetch('/admin/apply/approve',param,"post")
}
//提交审批驳回结果
export function ApprovalRej(param) {
  return fetch('/admin/apply/approve',param,"post")
}

//获取申请详情
export function getAppDetail(params) {
  return fetch('/apply/get?'+params, params,'get')
}

