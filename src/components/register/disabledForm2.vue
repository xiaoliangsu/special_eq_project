<template>
  <div class="disabledForm2">
    <div class="setTable ">
      <!--<Button type="primary" @click="createPdf" class="nprint">打印</Button>-->
      <h2 >停用登记表2</h2>






    </div>
  </div>
</template>
<script>
  export default {
    name: 'disabled_form2',
    props: ["ruleForm"],

    data(){
      return {}
    }

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
    /*@page {*/
    /*size: 210mm 297mm;  !* or size: 794px 1123px;   *!*/
    /*}*/
    @page { size: A4; margin: 20mm 2mm 2mm 2mm; }


  }
  .regist_one_com{
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*bottom:0;*/

    overflow-y: scroll;
    border:1px solid black;
    background-color: white;




  }
  .setTable{
    width:210mm;
    height:297mm;
    margin:25mm 2mm 2mm 2mm;
    border: 1px solid red;
    margin:0 auto;
    text-align: center;

  }

  .regist_one_header{
    font-size:16pt;
    font-family: SimSun;
    color:black;
    text-align: center;
    margin-bottom: 54px;
    margin-top:30px;
    position:relative;

  }
  .sa{
    width:460px;
    margin:0 auto;
  }
  .regist_kind{
    font-size:11pt;
    font-family: SimSun;
    color: #000;
    text-align: left;


  }

  .setTable table {
    margin: auto;
    border: 1px solid #000;
    border-collapse: collapse;
  }

  .setTable table span {
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    width: 2em;

  }

  .setTable table td {
    border: 1px solid #000;
    width: 635px;
    height: 24px;
    color: #000;
    text-align: center;
    vertical-align: middle;
    font-family: SimSun;
    font-size:11pt;
  }

  .setTable .rowsText {
    width: 50px;
    text-align: center;
    vertical-align: middle;

  }

</style>
