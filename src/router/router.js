import Vue from 'vue'
import VueRouter from "vue-router"
import iView from 'iview';
Vue.use(iView);


Vue.use(VueRouter);


//import Header from "../components/header/header.vue"
const Header = r => require.ensure([], () => r(require('../components/header/header.vue')), 'Header');
//import Footer from "../components/footer/footer.vue"
const Footer = r => require.ensure([], () => r(require('../components/footer/footer.vue')), 'Footer');
//import Home from "../components/home/home.vue"
const Home = r => require.ensure([], () => r(require('../components/home/home.vue')), 'Home');
//import Login from "../page/login/login.vue"
const Login = r => require.ensure([], () => r(require('../page/login/login.vue')), 'Login');
const Regist = r => require.ensure([], () => r(require('../page/regist/regist.vue')), 'Regist');

//import Test from "../page/test/test.vue"
const Test = r => require.ensure([], () => r(require('../page/test/test.vue')), 'Test');
//import Manage from "../page/manage.vue"
const Manage = r => require.ensure([], () => r(require('../page/manage.vue')), 'Manage');
//import Sidebar from "../components/sidebar/sidebar.vue"
const Sidebar = r => require.ensure([], () => r(require('../components/sidebar/sidebar.vue')), 'Sidebar');
//import User from "../page/user/user.vue"
const User = r => require.ensure([], () => r(require('../page/user/user.vue')), 'User');

//import FirstApp from "../page/apply/firstApp.vue"
const FirstApp = r => require.ensure([], () => r(require('../page/apply/firstApp.vue')), 'FirstApp');

const NewOrLast = r => require.ensure([], () => r(require('../page/apply/newOrLast.vue')), 'NewOrLast');

//import SetApp from "../page/apply/setApp.vue"
const SetApp = r => require.ensure([], () => r(require('../page/apply/setApp.vue')), 'SetApp');

// const WaitAcceptList = r => require.ensure([], () => r(require('../page/apply/orderStatus/waitAcceptList.vue')), 'WaitAcceptList');
// const WaitCheckList = r => require.ensure([], () => r(require('../page/apply/orderStatus/waitCheckList.vue')), 'WaitCheckList');
const FinishList = r => require.ensure([], () => r(require('../page/apply/orderStatus/finishList.vue')), 'FinishList');
const ApplyerList = r => require.ensure([], () => r(require('../page/apply/orderStatus/applyerList.vue')), 'ApplyerList');
const UnSubmitOrder = r => require.ensure([], () => r(require('../page/apply/orderStatus/unSubmitOrder.vue')), 'UnSubmitOrder');


//import DevList from "../page/apply/avaiableDev/devList.vue"
const DevList = r => require.ensure([], () => r(require('../page/apply/avaiableDev/devList.vue')), 'DevList');

//import ChangeReq from "../page/apply/avaiableDev/changeReq/changeReq.vue"
const ChangeReq = r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/changeReq.vue')), 'ChangeReq');

//import AppDetail from "../page/apply/avaiableDev/appDetail.vue"
const AppDetail = r => require.ensure([], () => r(require('../page/apply/avaiableDev/appDetail.vue')), 'AppDetail');

const ComAppDetail = r => require.ensure([], () => r(require('../page/apply/avaiableDev/comAppDetail.vue')), 'ComAppDetail');
const CarboxAppDetail = r => require.ensure([], () => r(require('../page/apply/avaiableDev/carboxAppDetail.vue')), 'CarboxAppDetail');


//import WaitAccept from "../page/accept/waitAccept.vue"
const WaitAccept = r => require.ensure([], () => r(require('../page/accept/waitAccept.vue')), 'WaitAccept');

//import Regist_One from "../page/print/regist_one.vue"
const Regist_One = r => require.ensure([], () => r(require('../page/print/regist_one.vue')), 'Regist_One');
const Regist_Two = r => require.ensure([], () => r(require('../page/print/regist_two.vue')), 'Regist_Two');
const Regist_Three = r => require.ensure([], () => r(require('../page/print/regist_three.vue')), 'Regist_Three');
const Disabled_Form = r => require.ensure([], () => r(require('../page/print/disabled_form.vue')), 'Disabled_Form');
const Disabled_Form2 = r => require.ensure([], () => r(require('../page/print/disabled_form2.vue')), 'Disabled_Form2');
const Cylinders_Form = r => require.ensure([], () => r(require('../page/print/cylinders_form.vue')), 'Cylinders_Form');
const Pressure_Form = r => require.ensure([], () => r(require('../page/print/pressure_form.vue')), 'Pressure_Form');
const ChangeReq_Form = r => require.ensure([], () => r(require('../page/print/changeReq_form.vue')), 'ChangeReq_Form');


//import TransformChange from "../page/apply/avaiableDev/changeReq/transformChange.vue"
const TransformChange = r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/transformChange.vue')), 'TransformChange');
const  AreaInChange= r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/areaInChange.vue')),'AreaInChange');
const  AreaAcrossChange= r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/areaAcrossChange.vue')),'AreaAcrossChange');
const  CompanyChange= r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/companyChange.vue')),'CompanyChange');
const  NameChange= r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/nameChange.vue')),'NameChange');
const  YearsChange= r => require.ensure([], () => r(require('../page/apply/avaiableDev/changeReq/yearsChange.vue')),'YearsChange');


//import Accepted from "../page/accept/accepted.vue"
const Accepted = r => require.ensure([], () => r(require('../page/accept/accepted.vue')), 'Accepted');

const CompanyApp = r => require.ensure([], () => r(require('../page/apply/companyApp.vue')), 'CompanyApp');
const CarboxApp = r => require.ensure([], () => r(require('../page/apply/carboxApp.vue')), 'CarboxApp');

const Approvaled = r => require.ensure([], () => r(require('../page/approval/approvaled.vue')), 'Approvaled');
const WaitApproval = r => require.ensure([], () => r(require('../page/approval/waitApproval.vue')), 'WaitApproval');

const Supervision = r => require.ensure([], () => r(require('../page/supervision/supervision.vue')), 'Supervision');


//const login = r => require.ensure([], () => r(require('../page/login/login')), 'Login');
const router = new VueRouter({
  routes: [
    {path: "/", component: Login},
    {path: "/login", component: Login},
    {path: "/regist", component: Regist},
    //{path: "/home", component: Home},

    {path: '/sidebar', component: Sidebar},
    {path: "/header", component: Header},
    {path: "/footer", component: Footer},
    {path: "/manage", component: Manage},
    {path: "/regist_One", component: Regist_One},
    {path: "/regist_Two", component: Regist_Two},
    {path: "/regist_Three", component: Regist_Three},
    {path: "/disabled_form", component: Disabled_Form},
    {path: "/disabled_form2", component: Disabled_Form2},
    {path: "/cylinders_Form", component: Cylinders_Form},
    {path: "/pressure_Form", component: Pressure_Form},
    {path: "/changeReq_Form", component: ChangeReq_Form},


    {
      path: '/home', component: Home,
      children: [
        {
          path: "/test", component: Test,
          meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
          },
        },

        {path: "/user", component: User,
          meta: [ '基本信息']},
        {
          path: "/firstApp", component: FirstApp,
          // 添加该字段，表示进入这个路由是需要登录的
          // meta: {requireAuth: true},
        },
        {path: "/newOrLast", component: NewOrLast,
          meta: [ '申请类别','首次申请'],},
        {path: "/setApp", component: SetApp,
          meta: [ '申请类别','首次申请']},
        {path: "/companyApp", component: CompanyApp},
        {path: "/carboxApp", component: CarboxApp,
          meta: [  '申请类别','首次申请']},


        // {path: "/waitAcceptList", component: WaitAcceptList},
        // {path: "/waitCheckList", component: WaitCheckList},
        {path: "/finishList", component: FinishList,
          meta: ['受理申请发证情况', '已受理申请']},
        {path: "/applyerList", component: ApplyerList,
          meta: [ '受理申请发证情况', '受理中申请']},
        {path: "/unSubmitOrder", component: UnSubmitOrder,
          meta: ['受理申请发证情况',  '未提交申请']},

        {path: "/devList", component: DevList,
          meta: [ '已有设备列表']},
        {path: "/changeReq", component: ChangeReq},
        {path: "/appDetail", component: AppDetail},
        {path: "/comAppDetail", component: ComAppDetail},
        {path: "/carboxAppDetail", component: CarboxAppDetail},


        {path: "/waitAccept", component: WaitAccept,
          meta: [ '未受理申请']},
        {path: "/accepted", component: Accepted,
          meta: [ '已受理申请']},
        {path: "/transformChange", component: TransformChange},

        {path: "/areaInChange", component: AreaInChange},
        {path: "/areaAcrossChange", component: AreaAcrossChange},
        {path: "/companyChange", component: CompanyChange},
        {path: "/nameChange", component: NameChange},
        {path: "/yearsChange", component: YearsChange},

        {path: "/approvaled", component: Approvaled,
          meta: [ '已审查、发证申请']},
        {path: "/waitApproval", component: WaitApproval,
          meta: [ '未审查、发证申请']},
        {path: "/supervision", component: Supervision},


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

