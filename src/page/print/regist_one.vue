<template>
  <div class="regist_one print">
    <Button type="primary" @click="createPdf" class="nprint">打印</Button>

    <v_regist_one :ruleForm="ruleForm"></v_regist_one>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import regist_one from '../../components/register/registerOne.vue'
  import * as avaiableService from '../../services/avaiableDev.js'
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
  .regist_one{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
    overflow-y: scroll;
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
