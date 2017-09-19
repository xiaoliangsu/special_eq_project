<template>
  <div class="firstApp">
    <!--<Tabs type="card"  v-model="name" >-->
      <!--<TabPane label="按台(套)申请(除车瓶)" value="name1" ><v-setApp></v-setApp></TabPane>-->
      <!--<TabPane label="按单位申请" value="name2" ><v-companyApp></v-companyApp></TabPane>-->
      <!--<TabPane label="申请车瓶" value="name3" ><v-carboxApp></v-carboxApp></TabPane>-->
    <!--</Tabs>-->





    <!--<h2>选择设备</h2>-->
    <!--<div class="content-box">-->

      <!--<Form :model="form" :label-width="100">-->
       <!---->
        <!--<Form-item label="申请设备种类">-->
          <!--<Cascader :data="form.options" trigger="hover" style="width:250px" v-model="defaultOption"-->
                    <!--@on-change="handleChange"></Cascader>-->
        <!--</Form-item>-->
        <!--&lt;!&ndash;<Form-item label="申请数量" v-if="this.getSelectedOption[0]=='one'||this.form.selectedOptions[0]=='one'||this.getSelectedOption[1]=='carbox'">&ndash;&gt;-->
        <!--<Form-item label="申请数量" v-if="this.defaultOption[0]=='one'||this.defaultOption[1]=='carbox'">-->

          <!--<Input-number :max="10" :min="1" v-model="form.num1"></Input-number>-->
        <!--</Form-item>-->
        <!--<Button type="primary" @click="next" :disabled="ifNext">下一步</Button>-->
      <!--</Form>-->
    <!--</div>-->
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import setApp from '../apply/setApp.vue'
  import companyApp from '../apply/companyApp.vue'
  import carboxApp from '../apply/carboxApp.vue'
  export default {
    data() {
      return {
//        form: {
//          options: [{
//            value: 'one',
//            label: '按台（套）申请',
//            children: [{
//              value: 'boiler',
//              label: '锅炉',
//            }, {
//              value: 'pressure',
//              label: '压力容器（气瓶除外）'
//            }, {
//              value: 'elevator',
//              label: '电梯'
//            }, {
//              value: 'hoisting',
//              label: '起重机械'
//            }, {
//              value: 'cableway',
//              label: '客运索道'
//            }, {
//              value: 'play',
//              label: '大型游乐设施'
//            }, {
//              value: 'factorycar',
//              label: '场 (厂)内专用机动车辆'
//            }, {
//              value: 'carbox',
//              label: '车用气瓶'
//            },]
//
//          }, {
//            value: 'two',
//            label: '按单位申请',
//            children: [{
//              value: 'cylinders',
//              label: '气瓶(车用气瓶除外)',
//            }, {
//              value: 'pipeline',
//              label: '工业管道'
//            },]
//          }
//          ],
//          selectedOptions: [],
//          num1: 1,
//        },
        active: 1,
        ifNext: true,
        device_type:'',
        device_detail:'',
        // selected: "",
//        dev_id: '',
//        dev_name: '',
        changeDeviceNum: '',
        defaultOption: [],
        params: {
          selectedDevice: '',
          num: '',
        },
        defaultselected: {
          selectedDevice: '',
          num: '',
        },
        name:0,



      }
    },
    mounted(){
      this.initData();

    },
    watch: {
      '$route': 'initData'
      //'$route': 'pushApp'

    },
    components: {
      'v-setApp': setApp,
      'v-companyApp': companyApp,
      'v-carboxApp': carboxApp,
    },
    methods: {
      ...mapActions({selectedDeviceOption: 'selectedDeviceOption'}),

      //取得参数
      transparam(){
        if (this.$route.query.device_type) {
          this.device_type = this.$route.query.device_type;
        }
        if (this.$route.query.device_detail) {
          this.device_detail = this.$route.query.device_detail;
          //console.log(this.dev_name);
        }
        if (this.$route.query.changeDeviceNum) {
          this.changeDeviceNum = this.$route.query.changeDeviceNum;
          // console.log(this.changeDeviceNum);
        }
      },
      //初始化
      initData(){
        //如果是第一次申请
        //this.name=0;
        if (!this.$route.query.changeDeviceNum) {
          //console.log(this.defaultOption);
          this.defaultOption = [];

        //  this.form.num1 = 1;
//          this.params.selectedDevice='';
//          this.params.num='';
//          this.selectedDeviceOption(this.params);
//          this.form.selectedOptions='';
        } else {
          //如果是保存后的订单
          this.transparam();
          if(this.changeDeviceNum[0]=='one' && this.changeDeviceNum[1]!=='carbox'){
            this.name=0;
          }else if(this.changeDeviceNum[0]=='two'){
              this.name=1;
          }else if( this.changeDeviceNum[1]=='carbox'){
              this.name=2;
          }

          //  this.$router.go(0);




          //this.form.selectedOptions=''
          this.defaultselected.selectedDevice = this.changeDeviceNum;
          //this.defaultselected.num = this.$route.query.selectedNum;
          this.selectedDeviceOption(this.defaultselected);
          this.defaultOption = this.getSelectedOption;
          //this.form.num1 = this.getSelectedNum;
          this.ifNext = false;


        }
      },
      //当改变时触发
      handleChange(value) {
        //获取到选择的哪项
        //this.form.selectedOptions = value;
        if (value) {
          this.ifNext = false;
        }
      },
      //下一步
      next() {
        if (this.active++ > 2) {
          this.active = 0;
        }

        if (this.form.selectedOptions == '') {
          this.params.selectedDevice = this.defaultselected.selectedDevice;
        } else {
          //this.params.selectedDevice = this.form.selectedOptions;
        }
      //  this.params.num = this.form.num1;
        this.selectedDeviceOption(this.params);
//        console.log(this.getSelectedNum);
//         console.log(this.getSelectedOption);


        if (this.getSelectedOption[0] == 'one' && this.getSelectedOption[1] !== 'carbox') {
          if (!this.$route.query.changeDeviceNum) {

            this.$router.push('setApp');
          } else {
            this.$router.push({
              path: 'setApp',
              query: {
                dev_id: this.dev_id,
                dev_name: this.dev_name,
                changeDeviceNum: this.changeDeviceNum,
              //  selectedNum: this.form.num1,
              }
            });
          }

        } else if (this.getSelectedOption[0] == 'two') {

          if (!this.$route.query.changeDeviceNum) {
            this.$router.push('companyApp');
          } else {
            this.$router.push({
              path: 'companyApp',
              query: {
                dev_id: this.dev_id,
                dev_name: this.dev_name,
                changeDeviceNum: this.changeDeviceNum,
              }
            });
          }
        } else if (this.getSelectedOption[1] == 'carbox') {

          if (!this.$route.query.changeDeviceNum) {
            this.$router.push('carboxApp');
          } else {
            this.$router.push({
              path: 'carboxApp',
              query: {
                dev_id: this.dev_id,
                dev_name: this.dev_name,
                changeDeviceNum: this.changeDeviceNum,
               // selectedNum: this.form.num1,
              }
            });
          }
        }


      },


    },
    computed: {
      ...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getSelectedNum",
      ]),
    },

  }

</script>
<style lang="scss" scoped>

</style>
