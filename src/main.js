import Vue from 'vue'
import App from './App.vue'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import iView from 'iview'
//import 'iview/dist/styles/iview.css'
import '../my-theme/dist/iview.css';
//import './my-theme/index.less';

import router from "./router/router.js"
import store from './store/'
import base from './config/baseFunc.js'


//Vue.use(ElementUI);
Vue.use(iView);
Vue.use(base);

require('./static/css/reset.css');
// const router = new VueRouter({
//     routes
// });


new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
