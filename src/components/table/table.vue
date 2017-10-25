<template>
  <div class="table">
    <Table border :columns="columns5" :data="data5"></Table>
    <Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"
          :page-size="10"></Page>
  </div>
</template>
<script>
  export default {
    name: 'breadCrumb',
    props: ["bread_choose"],
    data(){
      return {

      }

    },
    method:{


    },



  }

</script>
<style lang="scss" scoped>



</style>

