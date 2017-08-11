import fetch from '../fetch/http.js';
/**
 * 提交按套申请的申请表信息
 */
export function submitSetInfo(params) {
    return fetch('/api/submitSetInfo', params,'post')
}

