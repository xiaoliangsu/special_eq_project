<template>
    <div class="home" >

      <v-header  v-show="headShow" signinUp="true"></v-header>
      <v-sidebar></v-sidebar>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive>
          <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
      <v-footer></v-footer>
    </div>
</template>
<script>
  import header from '../header/header.vue'
  import footer from "../footer/footer.vue"
  import sidebar from '../sidebar/sidebar.vue'

  import {mapGetters, mapState, mapActions} from 'vuex'
    export default {
      name: 'home',
      computed: mapGetters([
        "headShow",

      ]),
      components: {
        'v-header': header,
        'v-sidebar': sidebar,
        'v-footer':footer,

      },

    }

</script>
<style lang="scss" scoped>
    @media print{
        .print{display:block;}
        .nprint{display:none;}
    }

  .content{
    background: none repeat scroll 0 0 #f8f8f9;
    border-color: #80848f;
    position: absolute;
    left: 180px;
    right: 0;
    top: 66px;
    bottom:3rem;
    width: auto;
    padding:25px 40px 25px 40px;
    box-sizing: border-box;
    overflow-y: scroll;
    margin:15px 15px 15px 15px;
  }


</style>
