//改造变更的页面，参考setApp.vue
<template>
  <!--按套申请的使用登记表-->
  <div class="transformChange">
ssss

  </div>
</template>
<script>
  import regist_one from '../../../../components/register/registerOne.vue'
  import detailPdf from '../../../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../../../services/setApp'
  export default {



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
  .setApp{
    color:#495060;
  }



</style>

