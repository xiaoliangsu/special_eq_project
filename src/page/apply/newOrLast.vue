<template>
  <div class="newOrLast">
    <!--<div class="bread">-->
    <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
    <!--</div>-->


    <div class="list-box">
      <h2 class="list-box-head">未提交申请</h2>
      <Table border :columns="columns5" :data="data5"></Table>
      <!--<Page class="page" :total="this.num" size="small" show-elevator @on-change="initSize"></Page>-->
      <Page class="page" ref="pages" :current="currentPage" :total="this.num" size="small" show-elevator @on-change="initSize"
            :page-size="10"></Page>

    </div>

    <Button type="primary" shape="circle" @click="toNewApp()" class="newButton">
      <Icon type="plus-round"></Icon>
      新建申请
    </Button>


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
          }, {
            value: 'carbox',
            label: '车用气瓶'
          }
        ],
        bread_choose_value: '',
        bread_choose: '',
        columns5: [
          {
            title: '设备代码',
            key: 'eqCode'
          },
          {
            title: '产品名称',
            key: 'deviceName'
          },
          {
            title: '提交日期',
            key: 'createTime',
            sortable: true
          },
          {
            title: '设备种类',
            key: 'deviceCategory',

          },
          {
            title: '设备类别',
            key: 'deviceClass',

          },
          {
            title: '设备品种',
            key: 'deviceKind',

          },
          {
            title: '申请类别',
            key: 'applyType',

          },

          {
            title: '登记机关',
            key: 'acceptorAgencyName',
          },
//          {
//            title: '审批机关',
//            key: 'checker'
//          },
//          {
//            title: '监管机关',
//            key: 'acceptorAgencyName'
//          },
          {
            title: '申请状态',
            key: 'state'
          },

          {
            title: '操作',
            key: 'state',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.continueApp(params.index)
                    }
                  }
                }, '继续填写'),
                h('Button', {
                  props: {
                    type: 'error',
                  },
                  style: {
                    marginRight: '5px',
                    marginTop:'4px',
                  },
                  on: {
                    click: () => {
                      this.deleteApp(params.index)
                    }
                  }
                }, '删除申请'),

              ]);
            }

          }
        ],
        data5: [],
        //订单总数
        num: 0,
        params: {
          time: '',
          sort: '',
          state: '',
          page: 1,
        },
        device_detail: '',
        device_type: '',
        //当前页数
        currentPage:1,
      }
    },
    components: {
      VBreadCrumb,

    },
//    activated() {
//      const _this = this;
//      _this.initData();
//    },
    mounted(){
      this.initData();
    },

    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        console.log(this.$route.path);
       if (this.$route.path == '/newOrLast') {
          this.initData();
       }

      }
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getDeviceType",
        "getDeviceTypeName"
      ]),
    },
    methods: {
      ...mapActions(
        ['setDeviceType'],
      ),
      initData(){
        this.$refs['pages'].currentPage = 1;
        this.device_type = this.$route.query.device_type;
        this.setDeviceType(this.$route.query.device_type);
//        this.$refs["pages"].current=1;
//        console.log(this.currentPage)
        let params = {
          // device_detail:this.device_detail,
          deviceTypeId: parseInt(this.device_type),
          applyTypeId: 1,
          states: [0, 0],
          page:0,
          size:10,
        }
        this.getInitOrders(params);


      },
      getOrders(params){
        orderStatusService.GetOrders(params).then(res => {
            if (res.data.content) {
              this.data5 = res.data.content;
              this.num = res.data.totalElements;

              //  this.data5.state=res.data.content.status.state;
              for (var i = 0; i < res.data.content.length; i++) {
                this.data5[i].state = res.data.content[i].status.states;
                //this.data5[i].state = res.data.content[i].status.states;
                let newDate = new Date(res.data.content[i].createTime);
                let Y = newDate.getFullYear() + '-';
                let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
                let D = newDate.getDate() + ' ';
                this.data5[i].createTime = Y + M + D;
              }
            } else {
              this.data5 = '';
            }

          }
        ).catch(error => {
          console.log(error);
        })
      },
      //获取申请列表信息
      getInitOrders(params){
        this.getOrders(params);
      },
      toNewApp(){
//        if(this.device_type=='one'&& this.device_detail!=='carbox'){
        if (this.device_type < 8) {

          this.$router.push({
            path: "setApp",
            query: {
              device_type: this.device_type,
              //  device_detail: this.device_detail
            }
          });
        } else if (this.device_type == 9 || this.device_type == 10) {
          // }else if(this.device_type=='two'){

          this.$router.push({
            path: "companyApp",
            query: {
              device_type: this.device_type,
              //  device_detail: this.device_detail
            }
          });
        } else {
          this.$router.push({
            path: "carboxApp",
            query: {
              device_type: this.device_type,
              //    device_detail: this.device_detail
            }
          });
        }

      },
      initSize(value){
        let params = {
          // device_detail:this.device_detail,
          deviceTypeId: parseInt(this.device_type),
          applyTypeId: 1,
          states: [0, 0],
          page:value-1,
          size:10,
        }

        this.getOrders(params);

      },
      deleteApp(value){
        this.$Modal.confirm({
          title: '确认对话框标题',
          content: '<p>确认删除该条申请？</p>',
          onOk: () => {
            let waitAccparams = 'applyId=' + this.data5[value].id;
            orderStatusService.deleteApp(waitAccparams).then(res => {
              let params = {
                // device_detail:this.device_detail,
                deviceTypeId: parseInt(this.device_type),
                applyTypeId: 1,
                states: [0, 0],
                page:0,
                size:10,
              }
              this.getInitOrders(params);
              }
            ).catch(error => {
              console.log(error);
            })
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });


      },
      continueApp(value){
        this.modifyApp(value, this.device_type)
      },
    }
  }

</script>
<style lang="scss" scoped>
  .bread {
    margin-bottom: 5px;
  }

  .newButton {
    margin: 10px;
  }

  .list-box {
    display: block;
    height: auto;
    padding: 0 10px 50px 10px;
    border: 1px solid rgb(229, 229, 229);
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

  .list-box-head {
    margin: 5px;
  }

</style>
