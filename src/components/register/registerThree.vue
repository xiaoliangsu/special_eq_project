<template>
  <div class="regist_three_com">
    <div class="setTable">
      <!--<Button type="primary" @click="createPdf" class="nprint">打印</Button>-->
      <h2 class="regist_three_header">特种设备使用登记表(式样三)</h2>
      <div class="sa">
        <p class="regist_kind">登记类别:</p>
      </div>

      <table>

        <tr>
          <td rowspan="6" class="rowsText" id="pdf-wrap"><span>设备基本情况</span></td>
          <td>设备品种</td>
          <td>{{this.ruleForm.eq_kind}}</td>
          <td>产品名称</td>
          <td>{{this.ruleForm.product_name}}</td>
        </tr>
        <tr>
          <!--<td>2.1</td>-->
          <td>气瓶数量</td>
          <td>{{this.ruleForm.cylinder_num}}</td>
          <td>充装介质</td>
          <td>{{this.ruleForm.fill_medium}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>气瓶公称工作压力</td>
          <td>{{this.ruleForm.cylinder_work_pressure}}</td>
          <td>气瓶容积</td>
          <td>{{this.ruleForm.cylinder_volume}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>制造单位名称</td>
          <td>{{this.ruleForm.manu_com_name}}</td>
          <td>制造日期</td>
          <td>{{this.ruleForm.manufacture_date}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>产品编号</td>
          <td>{{this.ruleForm.product_num}}</td>
          <td>单位内编号</td>
          <td>{{this.ruleForm.company_code}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>施工单位名称</td>
          <td>{{this.ruleForm.constr_com_name}}</td>
          <td>监督检验机构名称</td>
          <td>{{this.ruleForm.inspect_com_name}}</td>
        </tr>
        <tr>
          <td rowspan="6" class="rowsText" id="pdf-wrap"><span>设备基本情况</span></td>
          <td>使用单位名称</td>
          <td>{{this.ruleForm.use_company_name}}</td>
          <td>使用单位地址</td>
          <td>{{this.ruleForm.use_company_addr}}</td>
        </tr>
        <tr>
          <!--<td>2.1</td>-->
          <td>使用单位统一社会信用代码</td>
          <td>{{this.ruleForm.use_company_code}}</td>
          <td>邮政编码</td>
          <td>{{this.ruleForm.zipcode}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>车牌号</td>
          <td>{{this.ruleForm.license}}</td>
          <td>车辆VIN码</td>
          <td>{{this.ruleForm.vin}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>投入使用日期</td>
          <td>{{this.ruleForm.begin_to_use_date}}</td>
          <td>单位固定电话</td>
          <td>{{this.ruleForm.company_phone}}</td>
        </tr>
        <tr>
          <!--<td>3.1</td>-->
          <td>安全管理员</td>
          <td>{{this.ruleForm.safe_administrator}}</td>
          <td>移动电话</td>
          <td>{{this.ruleForm.mobilePhone}}</td>
        </tr>



        <td colspan="5" class="rowsText">
          <p> 在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特
            种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。</p>
          <p></p>
          <p>附：产品数据表</p>
          <p>使用单位填表人员：	日期：</p>
          <p>(使用单位公章)</p>
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
    name: 'regist_three',
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
  .regist_three_com{
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

  .regist_three_header{
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
