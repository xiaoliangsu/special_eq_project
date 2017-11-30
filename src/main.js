import Vue from 'vue'
import App from './App.vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
//import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css';
//import './my-theme/index.less';
//import Stomp from 'stomp-client';

import router from "./router/router.js"
import store from './store/'
import base from './config/baseFunc.js'
import echarts from 'echarts'
// import SockJS from './src/config/sockjs.js'

//Vue.use(ElementUI);
Vue.use(iView);
Vue.use(base);
//Vue.use(Stomp);


require('./static/css/reset.css');
require('../src/config/sockjs.js');
require('../src/config/stomp.js');
// const router = new VueRouter({
//     routes
// });


new Vue({
  router,
  echarts,
  store,
 // SockJs,
  el: '#app',
  render: h => h(App)
})
