<template>
    <header class="header_container" >
        <div class="header-left">
            <!--<img  class="header-logo" src="../../static/images/logo.png">-->
          <!--<span class="logo_prefix">特种设备</span><span class="logo_suffix">管理系统</span>-->
          <div class="bread">
            <Breadcrumb>
              <!--<BreadcrumbItem href="/">Home</BreadcrumbItem>-->
              <BreadcrumbItem v-for="(item, index) in $route.meta" key="index">{{item}}</BreadcrumbItem>
              <BreadcrumbItem v-if="$route.meta[1]=='首次申请'">{{this.getDeviceTypeName}}</BreadcrumbItem>
              <BreadcrumbItem v-if="$route.meta[0]=='已有设备列表'">{{this.getApplyTypeName}}</BreadcrumbItem>

            </Breadcrumb>
          </div>

        </div>


        <div class="header-right">

          <!--<router-link :to="loginStatus? '/user' :'/' " class="head_login">-->
            <!--<div v-if="loginStatus" class="user_name">-->
              <!--<span>{{userName}}</span>-->
              <Dropdown  class="head_login" trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            <!--</div>-->
            <!--<span v-if="!loginStatus">登陆｜注册</span>-->

          <!--</router-link>-->


          <div @click="showMessage" class="message-con">
            <Tooltip :content="messageCount > 0 ? '有' + messageCount + '条未读消息' : '无未读消息'" placement="bottom">
              <Badge :count="messageCount" dot>
                <Icon type="ios-bell" :size="22"></Icon>
              </Badge>
            </Tooltip>
          </div>


          <!--<div>-->
            <!--<button @click="showInfo">快出来</button>-->
            <!--<p><span>希望从msg变到userinfo</span>{{msg}}</p>-->
            <!--<p>{{nameGetter}}</p>-->
          <!--</div>-->

        </div>


        <!--<ul>-->
            <!--<router-link to="/home" tag="li" active-class="active">-->
                <!--<a href="javascript:;" class="test">首页</a>-->
            <!--</router-link>-->

        <!--</ul>-->
    </header>
</template>
<script>
  //  import axios from "axios"
    import {mapState, mapActions,mapGetters} from 'vuex'
  import * as loginService from '../../services/login'

  export default {
        data() {
            return {
              userName:'',
              messageCount: 0,
            };
        },
        props: {
          "signinUp":String
        },
        mounted() {
            //获取用户信息
        },
        computed: {
          ...mapState([

             //"userInfo"
            "loginStatus",
            "userInfo"

            ]),
          ...mapGetters([
              "userInfo",
            "loginStatus",
            "getDeviceTypeName",
            "getApplyTypeName"

          ])
        },
        methods: {
          ...mapActions(
            ['setSignOut', 'getUserInfo'],
          ),
          initData(){
              this.userName= localStorage.getItem('userInfo');
              console.log(this.getDeviceTypeName);
            let messageCount = 3;
            this.messageCount = messageCount.toString();
          },
          showMessage () {
//            util.openNewPage(this, 'message_index');
            this.$router.push('message');
          },
          handleClickUserDropdown (name) {
            if (name === 'ownSpace') {
             // util.openNewPage(this, 'ownspace_index');
              this.$router.push("user");
            } else if (name === 'loginout') {
              localStorage.removeItem('loginStatus');
              localStorage.removeItem('userInfo');
              localStorage.removeItem('author_key');
              localStorage.removeItem('useComName');
              localStorage.removeItem('useComAddr');
              localStorage.removeItem('useComCode');
              localStorage.removeItem('zipcode');
              localStorage.removeItem('staticPhone');
              localStorage.removeItem('mobilePhone');
              localStorage.removeItem('propertyComName');
              localStorage.removeItem('propertyComCode');
              localStorage.removeItem('name');
              localStorage.removeItem('verifyId');
              localStorage.removeItem('safeAdministrator');

              localStorage.removeItem('approveAgencyId');

              this.setSignOut();
              this.$router.push('login');
            }
          },



        },
      mounted(){
        this.initData();
      },
      watch: {
        // 如果路由有变化，会再次执行该方法
        '$route': 'initData'
      },






    }

</script>
<style lang="scss" scoped>


/*
    .header{
      background: rgba(2,15,40,0.70);
      color: #fff;
      height:3rem;
      box-sizing:content-box;
      overflow:hidden;
      @include font-dpr(20px);*/
    /*.header {*/
      /*position: fixed;*/
      /*box-sizing: border-box;*/
      /*width: 100%;*/
      /*height:60px;*/
      /*font-size: 14px;*/
      /*line-height: 66px;*/
      /*//background-color:rgb(72,79,95);*/
      /*//box-shadow:2px 0 3px rgba(0,0,0,.5);*/
      /*z-index:1000;*/
      /*//padding:0 32px 0 25px;*/
      /*overflow: visible;*/

      /*.header-left{*/
        /*float:left;*/
        /*line-height:66px;*/
        /*width:200px;*/
        /*font-size:18px;*/
        /*.logo_prefix{*/
          /*color:#209e91;*/
          /*font-size:19px;*/
        /*}*/
        /*.logo_suffix{*/
          /*color:#fff;*/
        /*}*/
        /*.header-logo{*/
          /*width: 100%;*/
          /*height: 3rem;*/
        /*}*/

      /*}*/


    /*}*/
.header-right{
  float:right;
  line-height: 60px;
  width:auto;
  margin-right:20px;
}
.header_container{
  //background-color: #EFF2F7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator{

  border-radius: 50%;
  margin-right: 37px;
}

  .head_login{
    margin-right:15px;


  }

  .message-con{
    display:inline-block;
    float:right;
    margin-right:15px;
  }


</style>
