<template>
  <div class="regist_one_com">
    <table>
      <tr>
        <td rowspan="6" class="rowsText"><span>设备基本情况</span></td>
        <td>设备种类</td>
        <td>{{this.ruleForm.kind1}}</td>
        <td>设备类别</td>
        <td>{{this.ruleForm.kind2}}</td>
      </tr>
      <tr>
        <!--<td>2.1</td>-->
        <td>设备品种</td>
        <td>{{this.ruleForm.kind3}}</td>
        <td>产品名称</td>
        <td>{{this.ruleForm.device_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设备代码</td>
        <td>{{this.ruleForm.device_code}}</td>
        <td>型号(规格)</td>
        <td>{{this.ruleForm.device_type}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设计使用年限</td>
        <td>{{this.ruleForm.design_year}}</td>
        <td>设计单位名称</td>
        <td>{{this.ruleForm.design_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>制造单位名称</td>
        <td>{{this.ruleForm.make_com_name}}</td>
        <td>施工单位名称</td>
        <td>{{this.ruleForm.const_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>监督检验机构名称</td>
        <td>{{this.ruleForm.inspect_com_name}}</td>
        <td>型式试验机构名称</td>
        <td>{{this.ruleForm.test_com_name}}</td>
      </tr>
      <tr>
        <td rowspan="6" class="rowsText"><span>设备基本情况</span></td>
        <td>设备种类</td>
        <td>{{this.ruleForm.kind1}}</td>
        <td>设备类别</td>
        <td>{{this.ruleForm.kind2}}</td>
      </tr>
      <tr>
        <!--<td>2.1</td>-->
        <td>设备品种</td>
        <td>{{this.ruleForm.kind3}}</td>
        <td>产品名称</td>
        <td>{{this.ruleForm.device_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设备代码</td>
        <td>{{this.ruleForm.device_code}}</td>
        <td>型号(规格)</td>
        <td>{{this.ruleForm.device_type}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设计使用年限</td>
        <td>{{this.ruleForm.design_year}}</td>
        <td>设计单位名称</td>
        <td>{{this.ruleForm.design_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>制造单位名称</td>
        <td>{{this.ruleForm.make_com_name}}</td>
        <td>施工单位名称</td>
        <td>{{this.ruleForm.const_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>监督检验机构名称</td>
        <td>{{this.ruleForm.inspect_com_name}}</td>
        <td>型式试验机构名称</td>
        <td>{{this.ruleForm.test_com_name}}</td>
      </tr>
      <tr>
        <td rowspan="6" class="rowsText"><span>设备基本情况</span></td>
        <td>设备种类</td>
        <td>{{this.ruleForm.kind1}}</td>
        <td>设备类别</td>
        <td>{{this.ruleForm.kind2}}</td>
      </tr>
      <tr>
        <!--<td>2.1</td>-->
        <td>设备品种</td>
        <td>{{this.ruleForm.kind3}}</td>
        <td>产品名称</td>
        <td>{{this.ruleForm.device_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设备代码</td>
        <td>{{this.ruleForm.device_code}}</td>
        <td>型号(规格)</td>
        <td>{{this.ruleForm.device_type}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>设计使用年限</td>
        <td>{{this.ruleForm.design_year}}</td>
        <td>设计单位名称</td>
        <td>{{this.ruleForm.design_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>制造单位名称</td>
        <td>{{this.ruleForm.make_com_name}}</td>
        <td>施工单位名称</td>
        <td>{{this.ruleForm.const_com_name}}</td>
      </tr>
      <tr>
        <!--<td>3.1</td>-->
        <td>监督检验机构名称</td>
        <td>{{this.ruleForm.inspect_com_name}}</td>
        <td>型式试验机构名称</td>
        <td>{{this.ruleForm.test_com_name}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    name:'regist_one',
    props:[ "ruleForm"],

    data(){
      return {

      }
    }

  }

</script>
<style lang="scss" scoped>
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
    width: 120px;
    height: 22px;
    color: #000;
    text-align: center;
  }

  .setTable .rowsText {
    width: 50px;
    text-align: center;
    vertical-align: middle;

  }




</style>
