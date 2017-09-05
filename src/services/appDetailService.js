import fetch from '../fetch/http.js';
/*
 获取表格1信息
 */
export function getRegistOne(params) {
  return fetch('/api/getRegistOne', params,'get')
}

//提交受理通过
export function AccPass(param) {
  return fetch('/api/submitSetInfo',param,"post")
}

//提交受理驳回理由
export function AccRej(param) {
  return fetch('/api/submitSetInfo',param,"post")
}


//提交审批结果
export function ApprovalPass(param) {
  return fetch('/api/submitSetInfo',param,"post")
}
