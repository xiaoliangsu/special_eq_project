<template>
  <div class="regist_two print">
    <Button type="primary" @click="createPdf" class="nprint">打印</Button>

    <v_regist_two :ruleForm="ruleForm"></v_regist_two>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import regist_two from '../../components/register/registerTwo.vue'
  //import * as avaiableService from '../../services/avaiableDev.js'
  import * as appDetailService from '../../services/appDetailService'

  export default {
    data() {
      return {
        ruleForm: {

        },
        dev_id: '',
        dev_name: '',
        index:0,


      }
    },
    mounted(){
      this.initData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    methods: {
      //...mapActions({ selectedDeviceOption: 'selectedDeviceOption' }),
      initData(){
        this.transparam();
        console.log(this.index);
        appDetailService.getRegistTwo(1).then(res => {
          //表格信息
          this.ruleForm = res.success.ruleForm[this.index];

        }).catch(error => {
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
        if (this.$route.query.index) {
          this.index = this.$route.query.index;
        }

      },

      createPdf() {
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
      'v_regist_two': regist_two,

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
  .regist_one{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    overflow-y: scroll;
    background-color: white;
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
    width: 120px;
    height: 22px;
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
