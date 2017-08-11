<template>
  <div class="user">
    <span>{{userInfo.username}}</span>
    <Button type="primary" @click="sighOut">退出</Button>


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
        }
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
      ...mapActions({ setSignOut: 'setSignOut' }),
      sighOut() {
        this.setSignOut();

      },
    }

  }

</script>
<style>
</style>
