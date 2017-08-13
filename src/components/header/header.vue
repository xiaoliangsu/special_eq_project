<template>
    <header class="header" >
        <div class="header-left">
            <!--<img  class="header-logo" src="../../static/images/logo.png">-->
          <span class="logo_prefix">特种设备</span><span class="logo_suffix">管理系统</span>
        </div>

        <div class="header-right">
          <router-link :to="loginStatus? '/user' :'/' " class="head_login">
            <div v-if="loginStatus" class="user_name">
              <span>{{userInfo.username}}</span>
            </div>
            <span v-else>登陆｜注册</span>
          </router-link>

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
    import axios from "axios"
    import {mapState, mapActions,mapGetters} from 'vuex'
    export default {
        data() {
            return {

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
            "loginStatus"

          ])
        },
        methods: {
            ...mapActions([
                'getUserData'
            ]),


        }

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
    .header {
      position: fixed;
      box-sizing: border-box;
      width: 100%;
      height:66px;
      font-size: 14px;
      line-height: 66px;
      background-color:rgb(72,79,95);
      box-shadow:2px 0 3px rgba(0,0,0,.5);
      z-index:1000;
      padding:0 32px 0 25px;
      overflow:hidden;

      .header-left{
        float:left;
        line-height:66px;
        width:200px;
        font-size:18px;
        .logo_prefix{
          color:#209e91;
          font-size:19px;
        }
        .logo_suffix{
          color:#fff;
        }
        .header-logo{
          width: 100%;
          height: 3rem;
        }

      }
      .header-right{
        float:right;
        line-height: 66px;
        width:5rem;
      }







    }



</style>
