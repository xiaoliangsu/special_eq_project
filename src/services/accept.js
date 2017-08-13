import fetch from '../fetch/http.js';
//提交受理结果
export function AccPass(param) {
  return fetch('/api/submitSetInfo',param,"post")
}
