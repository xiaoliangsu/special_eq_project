import fetch from '../fetch/http.js';
//已经调好的两个接口
// export function Login(params) {
//   return fetch('/login', params,'post')
// }
// export function Logout(params) {
//   return fetch('/logout', params,'get')
// }

export function Login(params) {
  return fetch('/api/login', params,'post')
}
export function Logout(params) {
  return fetch('/api/logout', params,'get')
}

