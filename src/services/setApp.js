import fetch from '../fetch/http.js';
/**
 * 提交按套申请的申请表信息
 */
//调好了
export function submitSetInfo(params) {
    return fetch('/apply/create', params,'post')
}
export function submitStopUseInfo(params) {
  return fetch('/apply/drop', params,'post')
}
export function submitDisabledInfo(params) {
  return fetch('/apply/disable', params,'post')
}


//修改用户信息
export function updateUser(params) {
  return fetch('/user/update', params,'post')
}



export function updateSetInfo(params) {
  return fetch('/apply/update', params,'post')
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
  return fetch('/file/preview?'+params, params,'get')
}

//获取设备类别
export function getDeviceCategory(params) {
  return fetch('/static/deviceCategory', params,'get')
}
export function getDeviceClass(params) {
  return fetch('/static/deviceClass?'+params, params,'get')
}
export function getDeviceType(params) {
  return fetch('/static/deviceType?'+params, params,'get')
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

//获取未提交的申请
export function getUnsubmitApp(params) {
  return fetch('/apply/get?'+params, params,'get')
}
//确认提交
export function confrimApp(param) {
  return fetch('/apply/confirm?'+param,param,'get')
}


export function getAccpeter(params) {
  return fetch('/map/organization?'+params, params,'get')
}


export function submitChangeInfo(params) {
    return fetch('/apply/create', params,'post')
}