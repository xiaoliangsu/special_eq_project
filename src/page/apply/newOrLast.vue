<template>
  <div class="newOrLast">
    <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
    <!--</div>-->

    <Button type="primary" shape="circle" @click="toNewApp()" class="newButton">
      <Icon type="plus-round"></Icon>
      新建申请
    </Button>
    <div class="list-box">
      <Table border :columns="columns5" :data="data5"></Table>
      <Page class="page" :total="this.num" size="small" show-elevator @on-change="initSize"></Page>

    </div>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as orderStatusService from '../../services/orderStatus'
  import VBreadCrumb from "../../components/breadCrumb/breadCrumb";


  export default {
    data() {
      return {
        deviceList: [
          {
            value: 'boiler',
            label: '锅炉',
          }, {
            value: 'pressure',
            label: '压力容器（气瓶除外）'
          }, {
            value: 'elevator',
            label: '电梯'
          }, {
            value: 'hoisting',
            label: '起重机械'
          }, {
            value: 'cableway',
            label: '客运索道'
          }, {
            value: 'play',
            label: '大型游乐设施'
          }, {
            value: 'factorycar',
            label: '场 (厂)内专用机动车辆'
          },
          {
            value: 'cylinders',
            label: '气瓶(车用气瓶除外)',
          }, {
            value: 'pipeline',
            label: '工业管道'
          },{
            value: 'carbox',
            label: '车用气瓶'
          }
        ],
        bread_choose_value: '',
        bread_choose: '',
        columns5: [
          {
            title: '设备名称',
            key: 'device'
          },
          {
            title: '日期',
            key: 'time',
            sortable: true
          },
          {
            title: '设备类别',
            key: 'changeDevice',

          },
          {
            title: '申请类别',
            key: 'changeApply',

          },

          {
            title: '受理机关',
            key: 'accepter',
          },
          {
            title: '审批机关',
            key: 'checker'
          },
          {
            title: '监管机关',
            key: 'watcher'
          },

          {
            title: '操作',
            key: 'state',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.continueApp(params.index)
                    }
                  }
                }, '继续填写'),

              ]);
            }

          }
        ],
        data5: [],
        //订单总数
        num: 200,
        params: {
          time: '',
          sort: '',
          state: '',
          page: 1,
        },
        device_detail:'',
        device_type:'',
      }
    },
    components: {
      VBreadCrumb,

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },

    mounted(){
      this.initData();



    },
    methods: {
      initData(){
        //this.active = 1;
        this.bread_choose_value = this.$route.query.device_detail;
        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].value == this.bread_choose_value) {
            this.bread_choose = this.deviceList[i].label;
          }
        }
        this.device_detail=this.$route.query.device_detail;
        this.device_type=this.$route.query.device_type;
        let params={
          device_detail:this.device_detail,
          device_type:this.device_type,
        }
        this.getOrders(params);


      },
      //获取申请列表信息
      getOrders(page){
        orderStatusService.GetUnSubmitOrders(page).then(res => {
           // console.log(res);
          if (res.success) {
            this.data5 = res.success;
//            for (var i = 0; i < this.data5.length; i++) {
//              this.data5[i].state = this.state[this.data5[i].state];
//            }
          }
        })
          .catch(error => {
            console.log(error);
          })
      },
      toNewApp(){
        if(this.device_type=='one'&& this.device_detail!=='carbox'){
          this.$router.push({
            path:"setApp" ,
            query: {
              device_type: this.device_type,
              device_detail: this.device_detail
            }
          });
        }else if(this.device_type=='two'){
          this.$router.push({
            path:"companyApp" ,
            query: {
              device_type: this.device_type,
              device_detail: this.device_detail
            }
          });
        }else{
          this.$router.push({
            path:"carboxApp" ,
            query: {
              device_type: this.device_type,
              device_detail: this.device_detail
            }
          });
        }

      },
      initSize(value){
        orderStatusService.GetOrders(value).then(res => {
          if (res.success) {
            this.data5 = res.success;
            for (var i = 0; i < this.data5.length; i++) {
              this.data5[i].state = this.state[this.data5[i].state];
            }
          }
        })
          .catch(error => {
            console.log(error);
          })

      },
      continueApp(value){
          this.modifyApp(value)
      },
    }
  }

</script>
<style lang="scss" scoped>
  .bread {
    margin-bottom: 5px;
  }
  .newButton{
    margin:10px;
  }
  .list-box {
    display: block;
    height: 400px;
    //border: 1 px solid rgb(229, 229, 229);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;

    .page {
      float: right;
      margin: 10px;
    }
  }

</style>
