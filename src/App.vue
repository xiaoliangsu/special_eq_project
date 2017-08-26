<template>
  <div id="app">
    <!--<v-header v-show="headShow" :signinUp="msg"></v-header>-->
    <!--<button @click="showHead">按钮</button>-->
    <!--<v-footer></v-footer>-->
    <!--<v-manage></v-manage>-->
    <!--<v-test></v-test>-->
    <!--<v-login></v-login>-->

    <router-view></router-view>
  </div>
</template>

<script>
  import header from './components/header/header.vue'
  import footer from "./components/footer/footer.vue"
  import login from './page/login/login.vue'
  import manage from './page/manage.vue'
  import test from './page/test/test.vue'
  import {mapGetters, mapState, mapActions} from 'vuex'


  export default {
    name: 'app',
    computed: mapGetters([
      "headShow"
    ]),
    components: {
      'v-header': header,
      'v-login': login,
      'v-footer': footer,
      'v-manage': manage,
      'v-test': test
    },
    data () {
      return {
        msg: "true"

      }
    },
    methods: {
      ...mapActions(['HeadShowSuccess']),
      showHead(){
        this.HeadShowSuccess();
      },
    }
  }
</script>

<style lang="scss" scoped>
  body {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    //background-color: #f8f8f9;
      width: 100%;
      background: #333;
      overflow: hidden;
      background-size: cover;
      background-attachment:fixed;
      background-position:center;
      z-index: 1;
      background-repeat: no-repeat;
      background-image:url('assets/demo-1-bg.jpg');

  }


</style>
