<template>
  <!--表头不能显示用户名-->
  <div class="manage_page fillcontain">

    <!--<el-row style="height: 100%;">-->
      <!--<el-col :span="4"  style="min-height: 100%; background-color: #324057;">-->
        <!--<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>-->
          <!--<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>-->
          <!--<el-submenu index="2">-->
            <!--<template slot="title"><i class="el-icon-document"></i>数据管理</template>-->
            <!--<el-menu-item index="test">用户列表</el-menu-item>-->
            <!--<el-menu-item index="home">商家列表</el-menu-item>-->

          <!--</el-submenu>-->
          <!--<el-submenu index="3">-->
            <!--<template slot="title"><i class="el-icon-plus"></i>添加数据</template>-->
            <!--<el-menu-item index="login">用户列表</el-menu-item>-->
            <!--<el-menu-item index="header">商家列表</el-menu-item>-->

          <!--</el-submenu>-->
          <!--<el-submenu index="4">-->
            <!--<template slot="title"><i class="el-icon-star-on"></i>图表</template>-->
            <!--<el-menu-item index="footer">用户列表</el-menu-item>-->
            <!--<el-menu-item index="login">商家列表</el-menu-item>-->

          <!--</el-submenu>-->
          <!--<el-submenu index="5">-->
            <!--<template slot="title"><i class="el-icon-star-on"></i>图表</template>-->
            <!--<el-menu-item index="footer">用户列表</el-menu-item>-->
            <!--<el-menu-item index="login">商家列表</el-menu-item>-->

          <!--</el-submenu>-->

        <!--</el-menu>-->
      <!--</el-col>-->
      <!--<el-col :span="20" style="height: 100%;overflow: auto;">-->
        <!--<v-header  v-show="headShow" signinUp="true"></v-header>-->
        <!--<keep-alive>-->
          <!--<router-view></router-view>-->
        <!--</keep-alive>-->
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import header from '../components/header/header.vue'
  import {mapGetters, mapState, mapActions} from 'vuex'
  export default {
    computed: {
//      ...mapState([
//
//        "userInfo"
//
//      ]),

      ...mapGetters([
                   "headShow",
                 ]),
      defaultActive: function(){
        return this.$route.path.replace('/', '');
      }
    },
    components: {
      'v-header': header,
    },
    mounted() {
//      //获取用户信息
//
//      this.getUserInfo({
//      });

    },
    methods:{
      ...mapActions([
        'getUserInfo'
      ]),
    }
  }
</script>


<style lang="less" scoped>
  .fillcontain{
    height: 100%;
    width: 100%;
    overflow:auto;
  }
</style>
