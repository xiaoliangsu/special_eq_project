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
  import * as registService from '../../../services/registService'
  export default {
    data() {
      return {
        ruleForm:'',
        dev_id: '',
        dev_name: '',


      }
    },
    mounted(){
      this.ruleForm = this.getRegistOne;
        this.getRegistOneForm(this.dev_id);
      this.ruleForm = this.getRegistOne;
        console.log( this.ruleForm)
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    methods: {
      ...mapActions({ getRegistOneForm: 'getRegistOneForm' }),
      initData(){
        console.log(2);
        this.getRegistOneForm(this.dev_id);
        this.ruleForm = this.getRegistOne;
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
    },

    computed: {
      ...mapState(['registOne']),
      ...mapGetters([
        "getRegistOne",
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
