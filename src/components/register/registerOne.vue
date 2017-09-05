<template>
  <div class="regist_one_com">
    <div class="setTable ">
      <!--<Button type="primary" @click="createPdf" class="nprint">打印</Button>-->
      <h2 class="regist_one_header">特种设备使用登记表(式样一)</h2>
      <div class="sa">
        <p class="regist_kind">登记类别:</p>
      </div>

      <table>

        <tr>
          <td rowspan="6" class="rowsText" id="pdf-wrap"><span>设备基本情况</span></td>
          <td>设备种类</td>
          <td>{{this.ruleForm.eq_species}}</td>
          <td>设备类别</td>
          <td>{{this.ruleForm.eq_category}}</td>
        </tr>
        <tr>
          <!--<td>2.1</td>-->
          <td>设备品种</td>
          <td>{{this.ruleForm.eq_variety}}</td>
          <td>产品名称</td>
          <td>{{this.ruleForm.eq_name}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>设备代码</td>
          <td>{{this.ruleForm.eq_code}}</td>
          <td>型号(规格)</td>
          <td>{{this.ruleForm.model}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>设计使用年限</td>
          <td>{{this.ruleForm.design_use_limit}}</td>
          <td>设计单位名称</td>
          <td>{{this.ruleForm.design_com_name}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>制造单位名称</td>
          <td>{{this.ruleForm.manufacture_com_name}}</td>
          <td>施工单位名称</td>
          <td>{{this.ruleForm.construct_com_name}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>监督检验机构名称</td>
          <td>{{this.ruleForm.supervise_com_name}}</td>
          <td>型式试验机构名称</td>
          <td>{{this.ruleForm.test_com_name}}</td>
        </tr>
        <tr>
          <td rowspan="7" class="rowsText"><span>设备基本情况</span></td>
          <td>使用单位名称</td>
          <td>{{this.ruleForm.use_com_name}}</td>
          <td>使用单位地址</td>
          <td>{{this.ruleForm.use_com_addr}}</td>
        </tr>
        <tr>
          <!--<td>2.1</td>-->
          <td>使用单位统一社会信用代码</td>
          <td>{{this.ruleForm.use_com_code}}</td>
          <td>邮政编码</td>
          <td>{{this.ruleForm.zip_code}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>单位内编号</td>
          <td>{{this.ruleForm.com_code}}</td>
          <td>设备使用地点</td>
          <td>{{this.ruleForm.eq_use_location}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>投入使用日期</td>
          <td>{{this.ruleForm.begin_use_date}}</td>
          <td>单位固定电话</td>
          <td>{{this.ruleForm.com_phone}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>安全管理员</td>
          <td>{{this.ruleForm.safe_admin}}</td>
          <td>移动电话</td>
          <td>{{this.ruleForm.mobile_phone}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>产权单位名称</td>
          <td>{{this.ruleForm.property_com_name}}</td>
          <td>产权单位统一社会信用代码</td>
          <td>{{this.ruleForm.property_com_code}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>联系电话</td>
          <td>{{this.ruleForm.telephone}}</td>
          <!--<td>设计单位名称</td>-->
          <!--<td>{{this.ruleForm.design_com_name}}</td>-->
        </tr>


        <tr>
          <td rowspan="3" class="rowsText"><span>设备检验情况</span></td>
          <td>检验机构名称</td>
          <td>{{this.ruleForm.check_com_name}}</td>
          <td>检验类别</td>
          <td>{{this.ruleForm.check_category}}</td>
        </tr>
        <tr>
          <!--<td>2.1</td>-->
          <td>检验报告编号</td>
          <td>{{this.ruleForm.check_report_num}}</td>
          <td>检验日期</td>
          <td>{{this.ruleForm.check_date}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>检验结论</td>
          <td>{{this.ruleForm.check_conclusion}}</td>
          <td>下次检验日期</td>
          <td>{{this.ruleForm.next_check_date}}</td>
        </tr>
        <tr>

          <td colspan="5" class="rowsText">
            <p> 在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特
              种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。</p>
            <p></p>
            <p>附：产品数据表</p>
            <p>使用单位填表人员：	日期：</p>
            <p>(使用单位公章)</p>
            <img src="../../assets/logo.png"  alt="电子印章" />
            <p>使用单位安全管理人员：	日期：	年	月	日</p>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="rowsText">
            <p>说明：</p>
            <p></p>
            <p>登记机关登记人员：	日期：</p>
            <p>(登记机关专用章)</p>
            <p>使用登记证编号：	年	月	日</p>
          </td>
        </tr>
      </table>



    </div>
  </div>
</template>
<script>
  export default {
    name: 'regist_one',
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
