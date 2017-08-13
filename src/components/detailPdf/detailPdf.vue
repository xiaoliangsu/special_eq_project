<template>
  <div class="detailPdf">
    <ul class="detail_ul">
      <li v-for="(item,index) in pdfUrl" class="detail_li" >
        <a v-bind:href='item' download="1.txt" class="detail_a">{{index}}.pdf</a>
      </li>
    </ul>

  </div>
</template>
<script>
  export default {
    name:'detailPdf',
    props:[ "pdfUrl"],

    data(){
      return {

      }
    }

  }

</script>
<style lang="scss" scoped>
  .detail_li{
    margin:10px;
    font-size:small;
  }




</style>
