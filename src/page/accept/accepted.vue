<template>
  <div class="Accepted">
    <div class="filter-box">
      <Row>
        <Col :xs="8" :sm="8" :md="8" :lg="8">

        <label>订单时间</label>
        <Date-picker type="daterange" placeholder="选择日期"
                     format="yyyy/MM/dd" style="width: 220px;display:inline-block;" v-model="time"></Date-picker>
        </Col>

        <Col :xs="8" :sm="8" :md="8" :lg="8">
        <label>设备类别</label>
        <!--<Select v-model="model1" style="width:200px" placeholder="请选择" @on-change="changeState">-->
        <!--<Option v-for="item in List" :value="item.value" :key="item.value"> {{ item.label }}</Option>-->
        <!--</Select>-->
        <Cascader :data="options" v-model="deviceType" trigger="hover"
                  style="width:200px;display:inline-block;"></Cascader>
        </Col>
        <Col :xs="8" :sm="8" :md="8" :lg="8">
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
      <Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"
            :page-size="10"></Page>

    </div>

  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as orderStatusService from '../../services/orderStatus'
  import * as acceptService from '../../services/accept'

  export default {
    data() {
      return {
        options: [{
          value: 'one',
          label: '按台（套）申请',
          children: [{
            value: '1',
            label: '锅炉',
          }, {
            value: '2',
            label: '压力容器（气瓶除外）'
          }, {
            value: '3',
            label: '电梯'
          }, {
            value: '4',
            label: '起重机械'
          }, {
            value: '5',
            label: '客运索道'
          }, {
            value: '6',
            label: '大型游乐设施'
          }, {
            value: '7',
            label: '场 (厂)内专用机动车辆'
          }, {
            value: '8',
            label: '车用气瓶'
          },]

        }, {
          value: 'two',
          label: '按单位申请',
          children: [{
            value: '9',
            label: '气瓶(车用气瓶除外)',
          }, {
            value: '10',
            label: '工业管道'
          },]
        }
        ],
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
            label: '受理驳回'
          },
          {
            value: '5',
            label: '审批驳回'
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
        //applyState: '',
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

//          {
//            title: '登记机关',
//            key: 'acceptorAgencyName',
//          },
          {
            title: '受理状态',
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
        currentPage: 1,
        //申请id
        applyId: '',
        deviceType: [],


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

        let waitAccparams = {
          page: 0,
          size: 10,
        }
        this.getOrders(waitAccparams);
      },

      //获取申请列表信息

      getOrders(waitAccparams){
        acceptService.GetAcceptedOrders(waitAccparams).then(res => {
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
//      getInitOrders(page){
//        let waitAccparams = {
//          page: 0,
//          size: 10,
//        }
//        if (this.applyState !== '') {
//          waitAccparams.states = this.applyState;
//        }
//        this.getOrders(waitAccparams);
//      },
      exactSearch(){
        if (this.applyId) {
          this.time = ['', ''];
          this.applyType = '';
          this.deviceType = [];
          this.deviceTypeId = '';
//       if(this.$route.query.apply_state){
//           this.applyState=parseInt(this.$route.query.apply_state);
//       }
          // this.applyState = '';
          let waitAccparams = 'applyId=' + this.applyId;
          acceptService.getDetailOrder(waitAccparams).then(res => {
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
      makeParams(page,size,time,deviceTypeId,applyType){
        let params={};
        params.page=page;
        params.size=size;
        if(time!==''&& time[0]!==''&&time[1]!==''){
          params.time=this.changeTime(time);;
        }
        if(deviceTypeId!==""){
          params.deviceTypeId=parseInt(deviceTypeId);
        }
        if(applyType!==""){
          params.applyTypeId=parseInt(applyType);
        }
        return params;

      },

      query(){
        this.$refs['pages'].currentPage = 1;
        this.applyId = '';
        let params=this.makeParams(0,10,this.time,this.deviceType[1],this.applyType);
        this.getOrders(params);
      },
      initSize(value){
        let params=this.makeParams(value-1,10,this.time,this.deviceType[1],this.applyType);
        this.getOrders(params);

      },


      appDetail(value){
//    switch (this.data5[value].changeApplyNum) {
        console.log(this.data5[value].applyType);
        switch (this.data5[value].applyType) {

          case "首次申请":
            //首次申请
            this.$router.push({
              path: 'appDetail',
              query: {
                applyId: this.data5[value].id,
                orderState:'accepted'
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
