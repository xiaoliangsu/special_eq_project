<template>
  <div class="user">
    <span>{{userName}}</span>
    <Button type="primary" @click="sighOut">退出{{loginStatus}}</Button>


  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: '',
          option: ''
        },
        userName:'',
      }
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
      ...mapActions(
        ['setSignOut', 'getUserInfo'],
      ),
      sighOut() {
        this.setSignOut();

      },
      initData(){
        this.userName= localStorage.getItem('userInfo');
      }

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
<style>
</style>
