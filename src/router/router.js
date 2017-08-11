import Vue from 'vue'
import VueRouter from "vue-router"
import iView from 'iview';
Vue.use(iView);


Vue.use(VueRouter);


import Header from "../components/header/header.vue"
import Footer from "../components/footer/footer.vue"
import Home from "../components/home/home.vue"
import Login from "../page/login/login.vue"
import Test from "../page/test/test.vue"
import Manage from "../page/manage.vue"
import Sidebar from "../components/sidebar/sidebar.vue"
import User from "../page/user/user.vue"
import FirstApp from "../page/apply/firstApp.vue"
import SetApp from "../page/apply/setApp.vue"
import OrderList from "../page/apply/orderStatus/orderList.vue"
import DevList from "../page/apply/avaiableDev/devList.vue"
import ChangeReq from "../page/apply/avaiableDev/changeReq/changeReq.vue"
import AppDetail from "../page/apply/avaiableDev/appDetail.vue"
import WaitAccept from "../page/accept/waitAccept.vue"
import Regist_One from "../page/print/regist_one.vue"


//const login = r => require.ensure([], () => r(require('../page/login/login')), 'Login');
const router = new VueRouter({
  routes: [
    {path: "/", component: Login},
    //{path: "/home", component: Home},

    {path: '/sidebar', component: Sidebar},
    {path: "/header", component: Header},
    {path: "/footer", component: Footer},
    {path: "/manage", component: Manage},
    {path: "/regist_One", component: Regist_One},
    {
      path: '/home', component: Home,
      children: [
        {
          path: "/test", component: Test,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {path: "/login", component: Login},
        {path: "/user", component: User},
        {path: "/firstApp", component: FirstApp,
          // 添加该字段，表示进入这个路由是需要登录的
          meta: {requireAuth: true}},
        {path: "/setApp", component: SetApp},
        {path: "/orderList", component: OrderList},
        {path: "/devList", component: DevList},
        {path: "/changeReq", component: ChangeReq},
        {path: "/appDetail", component: AppDetail},
        {path: "/waitAccept", component: WaitAccept},


      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    //console.log( localStorage.getItem('loginStatus'))
    if (localStorage.getItem('loginStatus')) {// 判断是否登录
      iView.LoadingBar.start();
      next()
    } else {// 没登录则跳转到登录界面
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
});
export default router;

