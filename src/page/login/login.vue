<template>

  <div class="login_page" id="login_page">
    <!--<v-toast v-show="showToast"></v-toast>-->
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <canvas id="canvas" class="canvas"></canvas>
        <div class="manage_tip">
          <p>特种设备使用登记管理系统</p>
        </div>
        <!--用户名密码登陆-->
        <Form ref="loginForm" :model="loginForm" :rules="rules">
          <Form-item prop="username">
            <Input type="text" v-model="loginForm.username" placeholder="用户名" size="large">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码" size="large">
            <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <!--去掉这个注释-->
          <Form-item prop="verif">
            <Input v-model="loginForm.verif" style="width:100px;height:10px;float:left" placeholder="验证码" size="large"></Input>
            <img src="/admin/captchaimage" ref="verifyImg" style="width:100px;height:35px;float:right"
                 alt="验证码图片" v-on:click="reflushVerify"/>
          </Form-item>
          <!--这里加注释-->
          <!--<Form-item prop="author_key">-->
          <!--<Select v-model="loginForm.author_key" placeholder="请选择角色" @on-change="selectAuthorKey">-->
          <!--<Option value="1">申请单位</Option>-->
          <!--<Option value="2">受理机关</Option>-->
          <!--<Option value="3">审批机关</Option>-->
          <!--<Option value="4">监管机关</Option>-->
          <!--<Option value="5">超级管理员</Option>-->
          <!--<Option value="6">all</Option>-->
          <!--</Select>-->
          <!--</Input>-->
          <!--</Form-item>-->
          <!--到这里-->
          <Form-item>

            <Button type="primary" @click="_login()" long>登录</Button>
          </Form-item>
        </Form>

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
  import qs from 'qs'

  export default {
    name: "login",
    data(){
      return {
        loginForm: {
          username: '',
          password: '',
          author_key:'',
          verif:'',

        },
        loginInfo:{
          username: '',
          state:'',
          author_key:'',
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
        params:'',
        verifImg:'',


      }
    },
    components:{
      'v-toast':toast
    },
    mounted(){
      this.showLogin = true;
      var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.lineWidth = .3;
      ctx.strokeStyle = (new Color(150)).style;

      // var mousePosition = {
      // 	x: 30 * canvas.width / 100,
      // 	y: 30 * canvas.height / 100
      // };
      var mousePosition = {
        x:  canvas.width - 100,
        y:  canvas.height - 60
      };

      var dots = {
        nb: 250,
        distance: 100,
        d_radius: 150,
        array: []
      };

      function colorValue(min) {
        return Math.floor(Math.random() * 255 + min);
      }

      function createColorStyle(r,g,b) {
        return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
      }

      function mixComponents(comp1, weight1, comp2, weight2) {
        return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
      }

      function averageColorStyles(dot1, dot2) {
        var color1 = dot1.color,
          color2 = dot2.color;

        var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
          g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
          b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
        return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
      }

      function Color(min) {
        min = min || 0;
        this.r = colorValue(min);
        this.g = colorValue(min);
        this.b = colorValue(min);
        this.style = createColorStyle(this.r, this.g, this.b);
      }

      function Dot(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -.5 + Math.random();
        this.vy = -.5 + Math.random();

        this.radius = Math.random() * 2;

        this.color = new Color();
      }

      Dot.prototype = {
        draw: function(){
          ctx.beginPath();
          ctx.fillStyle = this.color.style;
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fill();
        }
      };

      function createDots(){
        for(var i = 0; i < dots.nb; i++){
          dots.array.push(new Dot());
        }
      }

      function moveDots() {
        for(var i = 0; i < dots.nb; i++){

          var dot = dots.array[i];

          if(dot.y < 0 || dot.y > canvas.height){
            dot.vx = dot.vx;
            dot.vy = - dot.vy;
          }
          else if(dot.x < 0 || dot.x > canvas.width){
            dot.vx = - dot.vx;
            dot.vy = dot.vy;
          }
          dot.x += dot.vx;
          dot.y += dot.vy;
        }
      }

      function connectDots() {
        for(var i = 0; i < dots.nb; i++){
          for(var j = 0; j < dots.nb; j++){
            var i_dot = dots.array[i];
            var j_dot = dots.array[j];

            if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
              if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                ctx.beginPath();
                ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                ctx.moveTo(i_dot.x, i_dot.y);
                ctx.lineTo(j_dot.x, j_dot.y);
                ctx.stroke();
                ctx.closePath();
              }
            }
          }
        }
      }

      function drawDots() {
        for(var i = 0; i < dots.nb; i++){
          var dot = dots.array[i];
          dot.draw();
        }
      }

      function animateDots() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveDots();
        connectDots();
        drawDots();

        requestAnimationFrame(animateDots);
      }

      //----------------------跟着鼠标动--------------------
      document.getElementById('login_page').addEventListener('mousemove', function(e){
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
      });

      document.getElementById('login_page').addEventListener('mouseleave', function(e){
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
      });
      //----------------------跟着鼠标动--------------------

      createDots();
      requestAnimationFrame(animateDots);
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
         // if (!this.loginForm.username || !this.loginForm.password ||!this.loginForm.verif) {

            this.$Notice.error({
            title: '这是通知标题',
            desc: '请填写完整'
          });
          return
        }

        let data2 = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          verifycode:this.loginForm.verif
          //author_key:this.loginForm.author_key,
        }
        let data = {
          username: this.loginForm.username,
          password: this.loginForm.password,
         // verifycode:this.loginForm.verif
          author_key:this.loginForm.author_key,
        }
//把data换成data2
        this.$store.dispatch('setLoadingState', true)
        loginService.Login(data2).then(res => {
            //去掉这个注释
          if(res.status=="true"){
            //获取权限点
            this.loginInfo.author_key=res.role;

            console.log(this.loginInfo.author_key);
            //登陆状态
            this.loginInfo.state=res.status;
            console.log(this.loginInfo.state);
            //设置localstorage
            this.loginInfo.username=this.loginForm.username;
            this.setUserInfo(this.loginInfo);
            this.$router.push('home');
          }else {
            this.$Notice.error({
              title: '这是通知标题',
              desc: res.msg,
            });
          }

          //这个加注释
//          if(res.success) {
//            // let userInfo = Object.assign()
//            //this.$store.dispatch('setLoadingState', false)
//            console.log(res);
//            //this.setUserInfo(res.data);
//            this.setUserInfo(res);
//            this.$router.push('home');
//          }

        }).catch(error => {
           // console.log(2);
          console.log(error)
        })
      },
      //刷新验证码
      reflushVerify() {
        this.$refs.verifyImg.src="/admin/captchaimage?"+Math.random();
      },
      selectAuthorKey(value){
        this.author_key=value;
        // alert(this.author_key);
      },


    }


  }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .login_page {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    //background-color: #f8f8f9;
    width: 100%;
    height:1000px;
    background: #333;
    overflow: hidden;
    background-size: cover;
    background-attachment:fixed;
    background-position:center;
    z-index: 1;
    background-repeat: no-repeat;
    background-image:url('../../assets/demo-1-bg.jpg');

  }
  .canvas {
    position: fixed;
    //z-index: 1;
    top:0;
    left:100px;
  }



  .login_page {
    background-color: #324057;
    //background-color:black;
    background-img:url('../../assets/demo-1-bg.jpg');
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
      font-size: 29px;
      color: #FFFFFF;
    }
  }

  .form_contianer {

    @include wh(350px, 240px);
    @include ctp(350px, 240px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    // background-color: #fff;
    color: #EEE;

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
