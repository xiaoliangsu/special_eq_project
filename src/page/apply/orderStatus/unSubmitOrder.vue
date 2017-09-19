<template>
  <div class="unSubmitOrder">
    <div class="filter-box">
      <Row>
        <Col span="12">
        <label>订单时间</label>
        <Date-picker @on-change="changeTime" type="daterange" placeholder="选择日期"
                     style="width: 200px" v-model="time"></Date-picker>
        </Col>

        <!--<Col span="8">-->
        <!--<label>订单状态</label>-->
        <!--<Select v-model="model1" style="width:200px" placeholder="请选择" @on-change="changeState">-->
        <!--<Option v-for="item in List" :value="item.value" :key="item.value"> {{ item.label }}</Option>-->
        <!--</Select>-->
        <!--</Col>-->
        <Col span="12">
        <label>申请类别</label>
        <Select v-model="model2" style="width:200px" @on-change="changeSort">
          <Option v-for="item in sort" :value="item.value" :key="item.value"> {{ item.label }}</Option>
        </Select>
        </Col>
        <Button type="primary" class="query" @click="query">查询</Button>
      </Row>
    </div>
    <div class="list-box">
      <Table border :columns="columns5" :data="data5"></Table>
      <Page class="page" :total="this.num" size="small" show-elevator @on-change="initSize"></Page>

    </div>

  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as orderStatusService from '../../../services/orderStatus'
  export default {
    data() {
      return {
        List: [
          {
            value: '0',
            label: '待处理'
          },
          {
            value: '1',
            label: '已通过'
          },
          {
            value: '2',
            label: '已驳回'
          },

        ],
        sort: [
          {
            value: '1',
            label: '首次申请'
          },
          {
            value: '2',
            label: '改造变更'
          },
          {
            value: '3',
            label: '移装变更'
          },
          {
            value: '4',
            label: '单位变更'
          },
          {
            value: '5',
            label: '更名变更'
          },
          {
            value: '6',
            label: '达到设计年限变更'
          },
          {
            value: '7',
            label: '停用申请'
          },
          {
            value: '8',
            label: '报废申请'
          },
        ],
        model1: '',
        model2: '',
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
        state: {
          '0': '待处理',
          '1': '已通过',
          '2': '已驳回',
        },
        params: {
          time: '',
          sort: '',
          state: '',
          page: 1,
        },
        time: '',
        //订单总数
        num: 200,


      }
    },

    methods: {
      ...mapActions({selectedDeviceOption: 'selectedDeviceOption'}),
      //获取申请列表信息
      getOrders(page){
        orderStatusService.GetUnSubmitOrders(page).then(res => {
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

      changeTime(value){
        console.log(value);
        orderStatusService.ChangeTime().then(res => {
          if (res.success) {
            this.data5 = res.success;

          }

        }).catch(error => {
          console.log(error);
        })
      },
      changeState(value){
        //console.log(value)
        orderStatusService.ChangeState(value).then(res => {
          if (res.success) {
            this.data5 = res.success;
          }

        }).catch(error => {
          console.log(error);
        })

      },
      changeSort(value){
        orderStatusService.ChangeSort(value).then(res => {
          if (res.success) {
            this.data5 = res.success;
          }

        }).catch(error => {
          console.log(error);
        })
      },

      query(){
        this.params.time = this.time;
        this.params.sort = this.model1;
        this.params.state = this.model2;
        console.log(this.params.state);
        orderStatusService.Query(this.params).then(res => {
          if (res.success) {
            this.data5 = res.success;

          }

        }).catch(error => {
          console.log(error);
        })

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
//            appDetail(value){
//                // console.log(value);
//                this.$router.push({path:'appDetail',query: {dev_id: this.data5[value].id,dev_name:this.data5[value].device}});
//            }
      continueApp(value){
        console.log(this.data5[value].changeDeviceNum);
        switch (this.data5[value].changeApplyNum) {
          case 1:
            //首次申请
            this.$router.push({
              path: 'firstApp',
              query: {
                dev_id: this.data5[value].id,
                dev_name: this.data5[value].device,
                //选择的设备种类
                changeDeviceNum: this.data5[value].changeDeviceNum,
                //selectedNum:2
              }
            });
            //let temp = this.data5[value].changeDeviceNum;
//            if (temp[0] == 'one' && temp[1] !== 'carbox') {
//              this.$router.push({
//                path: 'setApp',
//                query: {
//                  dev_id: this.data5[value].id,
//                  dev_name: this.data5[value].device,
//                  //选择的设备种类
//                  changeDeviceNum: this.data5[value].changeDeviceNum,
//                }
//              });
//            } else if (temp[0] == 'two') {
//              this.$router.push({
//                path: 'companyApp',
//                query: {
//                  dev_id: this.data5[value].id,
//                  dev_name: this.data5[value].device,
//                  //选择的设备种类
//                  changeDeviceNum: this.data5[value].changeDeviceNum,
//                }
//              });
//            } else if (temp[1] == 'carbox') {
//              this.$router.push({
//                path: 'carboxApp',
//                query: {
//                  dev_id: this.data5[value].id,
//                  dev_name: this.data5[value].device,
//                  //选择的设备种类
//                  changeDeviceNum: this.data5[value].changeDeviceNum,
//                }
//              });
//            }

            break;
          /////需要改
          case 2:
            //改造变更
            this.$router.push({
              path: 'appDetail',
              query: {
                dev_id: this.data5[value].id,
                dev_name: this.data5[value].device,
                orderState: this.orderState
              }
            });
            break;
          case 3:
            //移装变更
            this.$router.push({
              path: 'appDetail',
              query: {
                dev_id: this.data5[value].id,
                dev_name: this.data5[value].device,
                orderState: this.orderState
              }
            });
            break;
          case 4:
            //单位变更
            this.$router.push({
              path: 'appDetail',
              query: {
                dev_id: this.data5[value].id,
                dev_name: this.data5[value].device,
                orderState: this.orderState
              }
            });
            break;
          ////等等


        }


      }


    },
    computed: {
      ...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
      ]),
    },
    mounted(){
      this.getOrders(this.params.page);
    }


  }

</script>
<style lang="scss" scoped>
  .filter-box {
    display: block;
    border: 1px solid rgb(229, 229, 229);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 10px;
    box-sizing: border-box;

    .query {
      float: right;
      margin-right: 60px;
      margin-top: 10px;
    }

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
