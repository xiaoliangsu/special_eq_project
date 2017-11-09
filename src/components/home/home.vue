<template>
  <div class="layout">
    <Row type="flex">


      <Col span="4" class="layout-menu-left">

      <Menu theme="dark" class="sideMenu "  width="auto"  :open-names="['1']"
            accordion style="font-size: 16px;"
            @on-select="routeTo" accordion>
        <div class="layout-logo-left"  style="color:white;font-size: 25px;position:fixed;z-index:100;z-index:100;">
          <span class="logo-head">特种设备使用登记系统</span>

        </div>
        <div v-if="this.author_key==1" class="menu-content" style="position:absolute;top:60px;width:100%;">
          <label class="menu-label" >申请类别</label>
          <Submenu name="1-1">
            <template slot="title" style="font-size: 16px;">
              首次申请
            </template>
            <div style="overflow: hidden">
              <MenuGroup title="按台(套)申请">
                <MenuItem name="newOrLast-1">锅炉</MenuItem>
                <MenuItem name="newOrLast-2">压力容器（气瓶除外）</MenuItem>
                <MenuItem name="newOrLast-3">电梯</MenuItem>
                <MenuItem name="newOrLast-4">起重机械</MenuItem>
                <MenuItem name="newOrLast-5">客运索道</MenuItem>
                <MenuItem name="newOrLast-6">大型游乐设施</MenuItem>
                <MenuItem name="newOrLast-7">场 (厂)内专用机动车辆</MenuItem>
              </MenuGroup>
              <MenuGroup title="按单位申请">
                <!--<MenuItem name="newOrLast-two-cylinders">气瓶(车用气瓶除外)</MenuItem>-->
                <!--<MenuItem name="newOrLast-two-pipeline">工业管道</MenuItem>-->
                <MenuItem name="newOrLast-9">气瓶(车用气瓶除外)</MenuItem>
                <MenuItem name="newOrLast-10">工业管道</MenuItem>
              </MenuGroup>
              <MenuGroup title="车用气瓶">
                <!--<MenuItem name="newOrLast-one-carbox">车用气瓶</MenuItem>-->
                <MenuItem name="newOrLast-8">车用气瓶</MenuItem>

              </MenuGroup>
            </div>
          </Submenu>
          <Submenu name="2-1">
            <template slot="title">
              变更申请
            </template>
              <MenuItem name="transformChange">改造变更</MenuItem>
            <MenuGroup title="移装变更">
              <MenuItem name="areaInChange">登记机关行政区域内移装变更</MenuItem>
              <MenuItem name="areaAcrossChange">跨登记机关行政区域移装变更</MenuItem>
            </MenuGroup>
              <MenuItem name="companyChange">单位变更</MenuItem>
              <MenuItem name="nameChange">更名变更</MenuItem>
              <MenuItem name="yearsChange">达到设计使用年限变更</MenuItem>
          </Submenu>
          <Menu-item name="devList-3">停用申请</Menu-item>
          <Menu-item name="devList-5">停用后启用申请</Menu-item>

          <Menu-item name="devList-4">报废申请</Menu-item>

          <!--</Menu-group>-->

          <!--<Menu-group title="申请列表" v-if="this.author_key==1" >-->
          <label class="menu-label">受理审查发证情况</label>

          <!--<Menu-item name="waitAcceptList">待受理申请</Menu-item>-->
          <!--<Menu-item name="unSubmitOrder">未提交申请</Menu-item>-->
          <Menu-item name="applyerList">已提交申请办理情况</Menu-item>

          <!--<Menu-item name="finishList">已受理申请</Menu-item>-->


          <!--<Menu-item name="waitCheckList">待审批申请</Menu-item>-->
          <!--<Menu-item name="finishList">已完成申请</Menu-item>-->
          <label class="menu-label">已有设备</label>

          <Menu-item name="devList">已有设备列表</Menu-item>
          <!--<Menu-item name="devList">打印登记表</Menu-item>-->
        </div>


        <!--</Menu-group>-->


        <Menu-group title="受理机关" v-if="this.author_key==2">
          <label class="menu-label" style="display:block;padding-top:10px;">受理机关</label>

          <Menu-item name="waitAccept">未受理申请</Menu-item>
          <Menu-item name="accepted">已受理申请</Menu-item>


        </Menu-group>

        <Menu-group title="审批机关" v-if="this.author_key==3">
          <label class="menu-label" style="display:block;padding-top:10px;">审批机关</label>

          <Menu-item name="waitApproval">未审批、发证申请</Menu-item>
          <Menu-item name="approvaled">已审批、发证申请</Menu-item>
          <Menu-item name="appRegistDetail">特种设备使用登记明细表</Menu-item>
        </Menu-group>

        <Menu-group title="监管机关" v-if="this.author_key==4">
          <Menu-item name="supervision">已审批申请</Menu-item>
        </Menu-group>
        <!--<Submenu name="2">-->
        <!--<template slot="title">-->
        <!--<Icon type="ios-people"></Icon>-->
        <!--订单状态-->
        <!--</template>-->
        <!--<Menu-item name="orderList">全部订单</Menu-item>-->
        <!--<Menu-item name="2-2">已受理订单</Menu-item>-->
        <!--<Menu-item name="2-2">已审批订单</Menu-item>-->
        <!--<Menu-item name="2-2">已完成订单</Menu-item>-->
        <!--</Submenu>-->
        <!--<Submenu name="3">-->
        <!--<template slot="title">-->
        <!--<Icon type="stats-bars"></Icon>-->
        <!--已有设备列表-->
        <!--</template>-->
        <!--<Menu-group title="使用">-->
        <!--<Menu-item name="devList">已有设备列表</Menu-item>-->
        <!--<Menu-item name="3-2">活跃分析</Menu-item>-->
        <!--<Menu-item name="3-3">时段分析</Menu-item>-->
        <!--</Menu-group>-->
        <!--<Menu-group title="留存">-->
        <!--<Menu-item name="3-4">用户留存</Menu-item>-->
        <!--<Menu-item name="3-5">流失用户</Menu-item>-->
        <!--</Menu-group>-->
        <!--</Submenu>-->

      </Menu>

      </Col>

      <Col span="20">
      <div class="layout-header">
        <v-header v-show="headShow" signinUp="true"></v-header>
      </div>
      <div class="layout-breadcrumb">
        <!--<Breadcrumb>-->

        <!--<BreadcrumbItem href="/home">首页</BreadcrumbItem>-->
        <!--<BreadcrumbItem href="/setApp">首次申请</BreadcrumbItem>-->
        <!--<BreadcrumbItem>锅炉</BreadcrumbItem>-->
        <!--&lt;!&ndash;<BreadcrumbItem>某应用</BreadcrumbItem>&ndash;&gt;-->
        <!--&lt;!&ndash;<Breadcrumb-item href="/">首页</Breadcrumb-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<Breadcrumb-item href="#">文章管理</Breadcrumb-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<Breadcrumb-item href="/articles">文章列表</Breadcrumb-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<Breadcrumb-item>文章{{ id ? '编辑' : '新增' }}</Breadcrumb-item>&ndash;&gt;-->
        <!--</Breadcrumb>-->
        <!--<v-breadCrumb></v-breadCrumb>-->
      </div>
      <div class="layout-content">
        <div class="layout-content-main">
          <!--<div class="content">-->

          <transition name="move" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
          <!--</div>-->
        </div>
      </div>
      <div class="layout-copy">
        2011-2016 &copy; TalkingData
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import header from '../header/header.vue'
  import footer from "../footer/footer.vue"
//  import sidebar from '../sidebar/sidebar.vue'
  import breadCrumb from '../breadCrumb/breadCrumb.vue'
  //import login from '../../page/login/login.vue'

  import {mapGetters, mapState, mapActions} from 'vuex'
  import VLogin from "../../page/login/login";
  export default {
    data() {
      return {
        author_key: ''
      }
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      },

      ...mapGetters([
        "headShow",


      ])
    },

    mounted() {
      this.author_key = localStorage.getItem('author_key');

    },
    components: {
      VLogin,
      'v-header': header,
//      'v-sidebar': sidebar,
      'v-footer': footer,
      'v-breadCrumb':breadCrumb,

    },
    methods: {
//      routeTo(e) {
//        //console.log(e);
//        //this.$router.push(e);
//        let params = e.split("-");
//        if(params.length>1){
//          let routerPath = params[0];
//          let device_type = params[1];
//        //  let device_detail = params[2];
//          this.$router.push({
//            path: routerPath,
//            query: {
//              device_type: device_type,
//            //  device_detail: device_detail
//            }
//          });
//        }else{
//          let routerPath = params[0];
//          this.$router.push({
//            path: routerPath,
//          });
//        }
//      },
      routeTo(e) {
        //console.log(e);
        //this.$router.push(e);
        let params = e.split("-");
        if(params[0]=='newOrLast'){
          let routerPath = params[0];
          let device_type = params[1];

          this.$router.push({
            path: routerPath,
            query: {
              device_type: device_type,
            }
          });
        }else if(params[0]=='applyerList'){
          let routerPath = params[0];
          let applyState = params[1];
          this.$router.push({
            path: routerPath,
            query: {
              apply_state: applyState,
              ///    device_detail: device_detail
            }
          });

        }else if(params[0]=='devList'){
          let routerPath = params[0];
          let applyState = params[1];
          this.$router.push({
            path: routerPath,
            query: {
              apply_state: applyState,
              ///    device_detail: device_detail
            }
          });
        }else {
          let routerPath = params[0];
          this.$router.push({
            path: routerPath,
          });
        }
      },
      ...mapActions([
        'getUserInfo'
      ]),
    }
  }

</script>
<style lang="scss" scoped>
  @media print {
    .print {
      display: block;
    }

    .nprint {
      display: none;
    }
  }

  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    height: 100%;

  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
  }
  .layout-content{
    min-height: 200px;
    margin: 10px;
    overflow: scroll;
    background: #fff;
    border-radius: 4px;
    position:absolute;
    left:0;
    top:60px;
    bottom:30px;
    right:0;
    height:auto;

  }
  .layout-content-main{
    padding: 10px;
    padding-top:0;
    // height:540px;

  }
  .layout-copy{
    text-align: center;
    //padding: 10px 0 20px;
    color: #9ea7b4;
    position: fixed;
    z-index: 100;
    left: 300px;
    height:30px;
    right: 0;
    bottom: 0;

    //background-color: red;
  }
  .layout-menu-left{
    background: #464c5b;
    height:100%;
    overflow: scroll;


  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 16.7%;
    height: 60px;
    background: #fff;
    border-radius: 3px;
    padding:10px;
    padding-left:17px;
    // margin: 15px auto;
    .logo-head{
     font-size:1.4vw;
      margin-left:0.2rem;
      color:#464c5b;

    }

  }





  .ivu-row-flex{
    height:100%;
  }


  .menu-label {
    color: rgba(255, 255, 255, .36);
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    font-size: 16px;
  }
  .content {
    background: none repeat scroll 0 0 #f8f8f9;
    border-color: #80848f;
    position: absolute;
    left: 240px;
    right: 0;
    top: 66px;
    bottom: 3rem;

    padding: 25px 40px 25px 40px;
    box-sizing: border-box;
    overflow-y: scroll;
    //margin: 15 px 15 px 15 px 15 px;
    margin: 0;
  }
  .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{
    padding-left:43px;
    padding-top: 5px;
    padding-bottom:5px;
  }
  .menu-content::-webkit-scrollbar {
    display:none;
  }


</style>
