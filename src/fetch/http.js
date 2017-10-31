import axios from 'axios'
import qs from 'qs'
//两处axios一处，返回状态一处
import * as _ from '../util/tool'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//去掉这个注释
axios.defaults.baseURL = '';
// 这个注释
//axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.withCredentials = true;


//POST传参序列化
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data);
//   }
//   return config;
// }, (error) => {
//   _.toast("错误的传参", 'fail');
//   // this.$Notice.error({
//   //     title: '错误的传参',
//   // });
//   return Promise.reject(error);
// });

//返回状态判断
axios.interceptors.response.use((res) => {
  //if (!res.data.success) {
  //去掉这个注释

  if (res.data.status == 401) {
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('author_key')
    localStorage.removeItem('useComName');
    localStorage.removeItem('useComAddr');
    localStorage.removeItem('useComCode');
    localStorage.removeItem('zipCode');
    localStorage.removeItem('comPhone');
    localStorage.removeItem('mobilePhone');
    localStorage.removeItem('propertyComName');
    localStorage.removeItem('propertyComCode');
  }
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return res;
}, (error) => {
  _.toast("网络异常", 'fail');
  // this.$Notice.error({
  //     title: '网络异常',
  // });
  return Promise.reject(error);
});

// export default function fetch(url, params) {
//     return new Promise((resolve, reject) => {
//         axios.post(url, params)
//             .then(response => {
//                 resolve(response.data);
//             }, err => {
//                 reject(err);
//             })
//             .catch((error) => {
//                 reject(error)
//             })
//     })
// }

export default function fetch(url, params, type) {
  if (type == 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else if (type == 'post') {
    return new Promise((resolve, reject) => {
      axios.post(url, params)
        .then(response => {
          resolve(response.data);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}

// export default {
//   Login(params) {
//     return fetch('/api/login', params)
//   }
// }
