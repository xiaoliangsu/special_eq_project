import fetch from '../fetch/http.js';
/**
 * 获取用户信息
 */
export function UserInfo(params) {
  return fetch('/api/userInfo', params,'post')
}

