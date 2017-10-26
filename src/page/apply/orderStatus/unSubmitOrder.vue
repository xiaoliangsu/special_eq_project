<template>
  <div class="unSubmitOrder">
    <div class="filter-box">
      <Row>
        <Col span="9">
        <label>订单时间</label>
        <Date-picker type="daterange" placeholder="选择日期"
                     format="yyyy/MM/dd" style="width: 220px;display:inline-block;" v-model="time"></Date-picker>
        </Col>


        <Col span="8">
        <label>申请类别</label>
        <Select v-model="applyType" style="width:180px">
          <Option v-for="item in sort" :value="item.value" :key="item.value"> {{ item.label }}</Option>
        </Select>
        </Col>
        <!--<Col span="7">-->
        <!--<label>申请状态</label>-->
        <!--<Select v-model="applyState" style="width:180px" placeholder="请选择">-->
        <!--<Option v-for="item in List" :value="item.value" :key="item.value"> {{ item.label }}</Option>-->
        <!--</Select>-->
        <!--&lt;!&ndash;<label>申请id</label>&ndash;&gt;-->
        <!--&lt;!&ndash;<Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>&ndash;&gt;-->
        <!--</Col>-->
        <Button type="primary" class="query" @click="query">查询</Button>
      </Row>
      <div class="innerBox">
        <Row>
          <Col>
          <label>申请id精准搜索</label>
          <Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>
          <Button type="primary" class="query" @click="exactSearch">搜索</Button>

          </Col>
        </Row>
      </div>
    </div>
    <div class="list-box">
      <Table border :columns="columns5" :data="data5"></Table>
      <Page class="page" ref="pages" :current.sync="currentPage" :total="this.num" size="small" show-elevator
            @on-change="initSize"
            :page-size="10"></Page>

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
            label: '未提交'
          },
          {
            value: '1',
            label: '提交未受理'
          },
          {
            value: '2',
            label: '受理通过未审批'
          },
          {
            value: '3',
            label: '审批通过'
          },
          {
            value: '4',
            label: '驳回'
          },

        ],
        sort: [
          {
            value: '0',
            label: '首次申请'
          },
          {
            value: '1',
            label: '改造变更'
          },
          {
            value: '1',
            label: '移装变更'
          },
          {
            value: '1',
            label: '单位变更'
          },
          {
            value: '1',
            label: '更名变更'
          },
          {
            value: '1',
            label: '达到设计年限变更'
          },
          {
            value: '3',
            label: '停用申请'
          },
          {
            value: '4',
            label: '报废申请'
          },
        ],
        //申请状态
        applyState: '',
        applyType: '',
        columns5: [
          {
            title: '设备代码',
            key: 'id'
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

          {
            title: '申请状态',
            key: 'state',
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
                    marginRight: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.appDetail(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginleft: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.deleteApp(params.index)
                    }
                  }
                }, '删除'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginleft: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.modifyApp(params.index)
                    }
                  }
                }, '修改'),

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
        num: 0,
        //申请id
        applyId: '',
        //当前页面
        currentPage: 1,


      }
    },
//    mounted(){
//      this.initData();
//      console.log(111);
//    },
//    watch: {
//      '$route': 'initData'
//    },
//    watch: {
//      // 如果路由有变化，会再次执行该方法
//      '$route.query':function(){
//       // console.log(this.$route.path);
//        if(this.$route.path=='/applyerList'){
//          this.initData();
//        }
//      }
//    },
    activated() {
      const _this = this;
      _this.initData();
    },

    methods: {
      ...mapActions({selectedDeviceOption: 'selectedDeviceOption'}),
      initData(){
        this.time = ['', ''];
        this.applyType = '';
        this.currentPage = 1;

        this.applyState = '';
        let waitAccparams = {
          page: 0,
          size: 10,
        }

        waitAccparams.states = [0, 0];
        this.getOrders(waitAccparams);
      },
      //获取申请列表信息

      getOrders(waitAccparams){
        orderStatusService.GetOrders(waitAccparams).then(res => {
            if (res.status === 200) {
              //this.data5.device = res.data.content[0].id;
              this.data5 = res.data.content;
              this.num = res.data.totalElements;
              //  this.data5.state=res.data.content.status.state;
              for (var i = 0; i < res.data.content.length; i++) {
                this.data5[i].state = res.data.content[i].status.states;
                let newDate = new Date(res.data.content[i].createTime);
                let Y = newDate.getFullYear() + '-';
                let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
                let D = newDate.getDate() + ' ';
                this.data5[i].createTime = Y + M + D;
              }

            } else {
              this.data5 = [];
            }
          }
        ).catch(error => {
          console.log(error);
        })
      },

      exactSearch(){
        if (this.applyId) {
          this.time = ['', ''];
          this.applyType = '';
//       if(this.$route.query.apply_state){
//           this.applyState=parseInt(this.$route.query.apply_state);
//       }
          this.applyState = '';
          let waitAccparams = 'applyId=' + this.applyId;
          orderStatusService.getDetailOrder(waitAccparams).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.data5 = [res.data];
                this.data5[0].state = res.data.status.states;
                let newDate = new Date(res.data.createTime);
                let Y = newDate.getFullYear() + '-';
                let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
                let D = newDate.getDate() + ' ';
                this.data5[0].createTime = Y + M + D;
                this.num=res.data.length;
              }
            }
          ).catch(error => {
            console.log(error);
          })
        }
      },
      changeTime(time){
        return [time[0].getFullYear() + "-" + (parseInt(time[0].getMonth()) + 1) + "-" + time[0].getDate(),
          time[1].getFullYear() + "-" + (parseInt(time[1].getMonth()) + 1) + "-" + time[1].getDate()]
      },
      makeParams(page, size, time, applyState, applyType){
        let params = {};
        params.page = page;
        params.size = size;
        if (time !== '' && time[0] !== '' && time[1] !== '') {
          params.time = this.changeTime(time);
          ;
        }
        if (applyState !== "") {
          params.states = [parseInt(applyState), parseInt(applyState)];
        }
        if (applyType !== "") {
          params.applyTypeId = parseInt(applyType);
        }
        return params;

      },
      query(){
        this.$refs['pages'].currentPage = 1;
        console.log(this.currentPage);
        this.applyId = '';
        let params = this.makeParams(0, 10, this.time, this.applyState, this.applyType);
        params.states = [0, 0];
        this.getOrders(params);
      },
      initSize(value){
        let params = this.makeParams(value - 1, 10, this.time, this.applyState, this.applyType);
        params.states = [0, 0];
        this.getOrders(params);

      },
      deleteApp(value){
        this.$Modal.confirm({
          title: '确认对话框标题',
          content: '<p>确认删除该条申请？</p>',
          onOk: () => {
            let waitAccparams = 'applyId=' + this.data5[value].id;
            orderStatusService.deleteApp(waitAccparams).then(res => {
                if (res.status == 200) {
                  let params = this.makeParams(0, 10, this.time, this.applyState, this.applyType);
                  params.states = [0, 0];
                  this.getOrders(params);
                }
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

      //      modifyApp(value){
      //        console.log(1111);
      //        console.log(this.data5[value].changeApplyNum);
      //        switch (this.data5[value].changeApplyNum) {
      //          case 1:
      //            //按套首次申请
      //            this.$router.push({
      //              path: 'setApp',
      //              query: {
      //                dev_id: this.data5[value].id,
      //                dev_name: this.data5[value].device,
      //                //是保存之后的
      //                ifold: 1,
      //                //selectedNum:2
      //              }
      //            });
      //            //let temp = this.data5[value].changeDeviceNum;
      //            break;
      //
      //          case 2:
      //            //单位首次申请
      //            this.$router.push({
      //              path: 'companyApp',
      //              query: {
      //                dev_id: this.data5[value].id,
      //                dev_name: this.data5[value].device,
      //                //是保存之后的
      //                ifold: 1,
      //                //changeDeviceNum: this.data5[value].changeDeviceNum,
      //
      //              }
      //            });
      //            break;
      //          case 3:
      //            //车瓶首次申请
      //            this.$router.push({
      //              path: 'carboxApp',
      //              query: {
      //                dev_id: this.data5[value].id,
      //                dev_name: this.data5[value].device,
      //                //是保存之后的
      //                ifold: 1,
      //              }
      //            });
      //            break;
      //          case 4:
      //            //单位变更
      //            this.$router.push({
      //              path: 'appDetail',
      //              query: {
      //                dev_id: this.data5[value].id,
      //                dev_name: this.data5[value].device,
      //                orderState: this.orderState
      //              }
      //            });
      //            break;
      //          ////等等
      //
      //
      //        }
      //
      //
      //      },

      //            appDetail(value){
      //                // console.log(value);
      //                this.$router.push({path:'appDetail',query: {dev_id: this.data5[value].id,dev_name:this.data5[value].device}});
      //            }
      appDetail(value)
      {
//    switch (this.data5[value].changeApplyNum) {
        console.log(this.data5[value].applyType);
        switch (this.data5[value].applyType) {

          case "首次申请":
            //首次申请
            this.$router.push({
              path: 'appDetail',
              query: {
                applyId: this.data5[value].id,
              }
            });
            break;
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
      ...
        mapState(['selectedOption']),
      ...
        mapGetters([
          "getSelectedOption",
        ]),
    }
    ,


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
    margin-top: 10px;
    box-sizing: border-box;

    .query {
      float: right;
      margin-right: 60px;
      margin-top: 10px;
    }

  }

  .innerBox {
    border-top: 1px solid rgb(229, 229, 229);
    padding-top: 10px;
    margin-top: 10px;
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
