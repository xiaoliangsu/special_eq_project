import fetch from '../fetch/http.js';
//已经调好的两个接口
export function Login(params) {
  return fetch('/login', params,'post')
}
export function Logout(params) {
  return fetch('/logout', params,'get')
}

export function Regist(params) {
  return fetch('/register/user', params,'post')
}

export function RegistApprover(params) {
  return fetch('/register/approver', params,'post')
}
export function RegistAcceptor(params) {
  return fetch('/register/acceptor', params,'post')
}


export function getAccpeter(params) {
  return fetch('/map/organization?'+params, params,'get')
}
//获取用户基本信息
export function GetInfo(params) {
  return fetch('/user/inform', params,'get')
}
