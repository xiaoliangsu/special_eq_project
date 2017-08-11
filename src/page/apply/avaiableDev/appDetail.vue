<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="appDetail">
    <div class="setTable">
      <v_regist_one :ruleForm="ruleForm"></v_regist_one>
      <Button type="primary" @click="toblanck">打印预览</Button>
    </div>
    <div class="pdfdownload">
      <a href="https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar" download="wenjian.pdf">一系列上传的文件</a>
    </div>

  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import regist_one from '../../../components/register/registerOne.vue'

  import * as avaiableService from '../../../services/avaiableDev.js'
  export default {
    data() {
      return {
        ruleForm: {
          kind1: '',
          kind2: '',
          kind3: '',
          device_name: '',
          device_code: '',
          device_type: '',
          design_year: '',
          design_com_name: '',
          make_com_name: '',
          const_com_name: '',
          inspect_com_name: '',
          test_com_name: '',
          use_com_name: '',
          check_com_name: '',
        },
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
    components: {
      'v_regist_one': regist_one,

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
