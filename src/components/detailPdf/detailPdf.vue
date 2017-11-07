<template>
  <div class="detailPdf">
    <ul class="detail_ul">
      <li v-for="(item,key,index) in pdfUrl" class="detail_li">
        <a v-bind:href="'/admin/file/preview?fileId='+item" download="key" class="detail_a">{{key}}.pdf</a>
        <Button type="ghost" size="small" @click="test(index)" v-if="pdfToggle[index]==1">
          <Icon type="eye"></Icon>
          预览
        </Button>
        <Button type="ghost" size="small" @click="test(index)" v-else="pdfToggle[index]==0">
          <Icon type="chevron-down"></Icon>
          收起
        </Button>

        <embed v-if="pdfToggle[index]==0" v-bind:src="'/admin/file/preview?fileId='+item" width="100%" height="1000px"/>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'detailPdf',
    props: ["pdfUrl", "pdfNum"],

    data(){
      return {
        //我也很绝望呀
        pdfToggle: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      }
    },
    methods: {
      writepdf(){
        if (this.pdfToggle.length == 0) {
          for (let i = 0; i < this.pdfNum; i++) {
            this.pdfToggle[i] = 1;
          }
        }


      },
      test(index){
        this.writepdf();

        if (this.pdfToggle[index] == 1) {
          this.pdfToggle.splice(index, 1, 0);
        } else if (this.pdfToggle[index] == 0) {
          this.pdfToggle.splice(index, 1, 1);
        }
      },
    },


  }

</script>
<style lang="scss" scoped>
  .detail_li {
    margin: 10px;
    font-size: small;
  }


</style>
