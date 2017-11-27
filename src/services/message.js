import fetch from '../fetch/http.js';

export function getReminder(params) {
  return fetch('/notice/getReminder', params,'get')
}
export function getReadReminder(params) {
  return fetch('/notice/getReadReminder', params,'get')
}

export function getSystemMsg(params) {
  return fetch('/notice/getSystemMsg', params,'get')
}



export function noticeRead(params) {
  return fetch('/notice/read', params,'post')
}
