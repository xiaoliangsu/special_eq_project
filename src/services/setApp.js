import fetch from '../fetch/http.js';
/**
 * 提交按套申请的申请表信息
 */
export function submitSetInfo(params) {
    return fetch('/api/submitSetInfo', params,'post')
}

export function submitCompanyInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}
//提交气瓶
export function submitCompanyGasInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}

//提交压力容器
export function submitCompanyPresInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}
export function submitCarboxInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}
/**
 * 保存单位的申请表信息
 */
export function saveCompanyInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}



/**
 * 保存车瓶的申请表信息
 */
export function saveCarboxInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}

/**
 * 保存按套申请的申请表信息
 */
export function saveSetInfo(params) {
  return fetch('/api/submitSetInfo', params,'post')
}

