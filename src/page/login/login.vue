<template>

  <div class="login_page fillcontain">
    <v-toast v-show="showToast"></v-toast>
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <!--<p>特种设备管理系统</p>-->
        </div>
        <!--手机号验证码登陆  还没写好  之后重改-->
        <!--<el-form :model="loginForm" :rules="rules" ref="loginForm" v-if="loginway">-->
        <!--<el-form-item prop="phone">-->
        <!--<el-input v-model="loginForm.phone" placeholder="手机号"><span>dsfsf</span></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="verifyCode">-->
        <!--<el-input type="password" placeholder="验证码" v-model="loginForm.verifyCode"></el-input>-->
        <!--<el-button>删除</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>-->
        <!--</el-form-item>-->
        <!--</el-form>-->

        <!--用户名密码登陆-->
          <Form ref="loginForm" :model="loginForm" :rules="rules">
              <Form-item prop="username">
                  <Input type="text" v-model="loginForm.username" placeholder="用户名">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item prop="password">
                  <Input type="password" v-model="loginForm.password" placeholder="密码">
                  <Icon type="ios-locked-outline" slot="prepend"></Icon>
                  </Input>
              </Form-item>
              <Form-item>
                  <Button type="primary" @click="_login()">登录</Button>
              </Form-item>
          </Form>
        <!--<p class="tip">温馨提示：</p>-->
        <!--<p class="tip">未登录过的新用户，自动注册</p>-->
        <!--<p class="tip">注册过的用户可凭账号密码登录</p>-->
      </section>
    </transition>
  </div>

</template>
<script>
  //import header from '../../components/header/header.vue'
  import axios from "axios"
  import toast from '../../components/tools/toast.vue'
  import {mapActions, mapState,mapGetters} from 'vuex'
  import * as loginService from '../../services/login'
  //import http from '../../fetch/http'
  import * as _ from '../../util/tool'
  export default {
    name: "login",
    data(){
      return {
        loginForm: {
          username: '',
          password: '',

        },
        // loginway: true,
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
        },
        showLogin: false,

      }
    },
    components:{
      'v-toast':toast
    },
    mounted(){
      this.showLogin = true;
      /*
       if (!this.adminInfo.id) {
       this.getAdminData()
       }*/
    },
    computed: {
      ...mapState(['userInfo']),
      ...mapGetters([
                   "showToast",
      ]),
    },
    methods: {
      ...mapActions({ setUserInfo: 'setUserInfo' }),
      _login() {
        if (!this.loginForm.username || !this.loginForm.password) {
          //_.alert('请填写完整')
//          this.$message({
//              type: 'error',
//              message: "请填写完整"
//            });
            this.$Notice.error({
                title: '这是通知标题',
                desc: '请填写完整'
            });
          return
        }
        let data = {
          username: this.loginForm.username,
          password: this.loginForm.password
        }
        this.$store.dispatch('setLoadingState', true)
        loginService.Login(data).then(res => {
            //console.log(res);
            if(res.success) {
              // let userInfo = Object.assign()
              //this.$store.dispatch('setLoadingState', false)
              console.log(res);
              //this.setUserInfo(res.data);
              this.setUserInfo(res);
              this.$router.push('home');
            }
          })
          .catch(error => {
            console.log(error)
          })
      },
      submitForm(){
        var username1 = this.loginForm.username;
        var password1 = this.loginForm.password;


       // _.toast("失败",'fail');


//        //axios.get('/api/login?username='+username1+'&password='+password1).then(function(res) {
//        var obj = {
//          username: username1,
//          password: password1
//        };
//
//        axios.post('/api/login', obj).then(function (res) {
//          if (res.data.state==1) {
//            console.log(res);
//            this.$message({
//              type: 'success',
//              message: '登录成功'
//            });
//            this.$router.push('home');
//          } else {
//            // console.log(res.data.state);
//            this.$message({
//              type: 'error',
//              message: "登录失败"
//            });
//          }
//        }.bind(this)).catch(function (err) {
//          console.log(err);
//        });

      }

    }


  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';


  .login_page {
    background-color: #324057;
    //background-color:black;
  }

  .fillcontain {
    height: 100%;
    width: 100%;
  }

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -80px;
    left: 0;
    p {
      font-size: 30px;
      color: #fff;
    }
  }

  .form_contianer {

    @include wh(320px, 210px);
    @include ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }

  .tip {
    font-size: 12px;
    color: red;
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s ease;
  }

  .form-fade-enter, .form-fade-leave-active {
    //transform: translate3d(0, -50px, 0);
    opacity: 0;
  }


</style>
