import fetch from '../fetch/http.js';
export function Login(params) {
  return fetch('/api/login', params,'post')
}

