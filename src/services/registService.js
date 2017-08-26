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
/*
 获取表格2信息
 */
export function getRegistTwo(params) {
  return fetch('/api/getRegistTwo', params,'get')
}

/*
 获取表格3信息
 */
export function getRegistThree(params) {
  return fetch('/api/getRegistThree', params,'get')
}

