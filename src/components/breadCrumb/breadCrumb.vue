<template>
  <div class="breadCrumb">
    <Breadcrumb>

      <BreadcrumbItem href="/home">首页</BreadcrumbItem>
      <BreadcrumbItem>首次申请</BreadcrumbItem>
      <BreadcrumbItem>{{bread_choose}}</BreadcrumbItem>
    </Breadcrumb>
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
