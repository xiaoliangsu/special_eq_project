import fetch from '../fetch/http.js';
/**
 * 提交按套申请的申请表信息
 */
//调好了
export function submitSetInfo(params) {
    return fetch('/apply/create', params,'post')
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


export function getRegistOne(params) {
  return fetch('/download?'+params, params,'get')
}

//获取省市县已经调完
export function getProvinces(params) {
  return fetch('/map/provinces', params,'get')
}
export function getCities(params) {
  return fetch('/map/cities?'+params, params,'get')
}
export function getArea(params) {
  return fetch('/map/areas?'+params, params,'get')
}
