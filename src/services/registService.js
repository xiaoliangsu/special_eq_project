import fetch from '../fetch/http.js';
/*
获取表格1信息
 */
export function getRegistOne(params) {
  return fetch('/api/getRegistOne', params,'get')
}

export function setRegistOne(params) {
  return fetch('/api/setRegistOne', params,'post')
}
