<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="appDetail">
    <div class="setTable">
      <table>
        <tr>
          <td rowspan="6" class="rowsText" id="pdf-wrap"><span>设备基本情况</span></td>
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
          <td rowspan="8" class="rowsText"><span>设备基本情况</span></td>
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
          <td>使用单位统一社会信用代码</td>
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
          <!--<td>3.1</td>-->
          <td>使用单位统一社会信用代码</td>
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
          <td>使用单位统一社会信用代码</td>
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
          <td colspan="5" class="rowsText">
            <p> 在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特
              种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。</p>
            <p>附：产品数据表</p>
            <p>使用单位填表人员：	日期：</p>
            <p>(使用单位公章)</p>
            <p>使用单位安全管理人员：	日期：	年	月	日</p>
          </td>
        </tr>
        <tr>
          <td colspan="5" class="rowsText">
            <p>说明：</p>
            <p>登记机关登记人员：	日期：</p>
            <p>(登记机关专用章)</p>
            <p>使用登记证编号：	年	月	日</p>
          </td>
        </tr>
      </table>
      <Button type="primary" @click="toblanck">打印预览</Button>
    </div>
    <div class="pdfdownload">
      <a href="https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar" download="wenjian.pdf">一系列上传的文件</a>
    </div>

  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as avaiableService from '../../../services/avaiableDev.js'
  export default {
    data() {
      return {
        ruleForm: '',
        dev_id: '',
        dev_name: '',


      }
    },
    methods: {
      //...mapActions({ selectedDeviceOption: 'selectedDeviceOption' }),
      initData(){
        avaiableService.InitData(dev_id).then(res => {
          //console.log(res);
          if (res) {
            console.log(res.success);
            this.ruleForm = res.success;

          }
        })
          .catch(error => {
            console.log(error)
          })
      },
      transparam(){
        if (this.$route.query.dev_id) {
          this.dev_id = this.$route.query.dev_id;
        }
        if (this.$route.query.dev_name) {
          this.dev_name = this.$route.query.dev_name;
          console.log(this.dev_name);
        }
      },
      toblanck(){
        this.$router.push('regist_one');


      },
      createPdf() {

//                let newWindow = window.open("_blank");   //打开新窗口
              let codestr = document.getElementById("pdf-wrap").innerHTML;   //获取需要生成pdf页面的div代码
//                newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
//                newWindow.document.close();     //关闭document的输出流, 显示选定的数据
//                newWindow.print();   //打印当前窗口
//                return true;
        window.localStorage.setItem('ty_finance', codestr);
        window.location.href= './res/finance.html';
        window.print();
      },


    },

    computed: {
      ...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
      ]),
    },

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

  .setTable table {
    margin: auto;
    border: 1px solid #000;
    border-collapse: collapse;
    font: SimSun;
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
    vertical-align: middle;
  }

  .setTable .rowsText {
    width: 50px;
    text-align: center;
    vertical-align: middle;

  }
</style>
