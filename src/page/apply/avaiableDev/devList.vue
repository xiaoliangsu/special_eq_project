<template>
  <div class="devList">
    <div class="filter-box">
      <Row>
        <Col span="9">
        <label>订单时间</label>
        <Date-picker type="daterange" placeholder="选择日期"
                     format="yyyy/MM/dd" style="width: 220px;display:inline-block;" v-model="time"></Date-picker>
        </Col>


        <Col span="8">
        <label>设备类别</label>
        <Cascader :data="options" v-model="deviceType" trigger="hover"
                  style="width:200px;display:inline-block;"></Cascader>
        </Col>
        </Col>
        <Col span="7">
        <!--<label>申请状态</label>-->
        <!--<Select v-model="applyState" style="width:180px" placeholder="请选择">-->
          <!--<Option v-for="item in List" :value="item.value" :key="item.value"> {{ item.label }}</Option>-->
        <!--</Select>-->
        </Col>
        <Button type="primary" class="query" @click="query">查询</Button>
      </Row>
      <div class="innerBox">
        <Row>
          <Col>
          <label>申请id精准搜索</label>
          <Input v-model="deviceCode" placeholder="请输入申请id" style="width: 180px"></Input>
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
  import * as avaivbleService from '../../../services/avaiableDev'

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
        deviceType: [],
        List: [
//          {
//            value: '0',
//            label: '未提交'
//          },
          {
            value: '1',
            label: '提交未受理'
          },
          {
            value: '2',
            label: '受理通过未审批'
          },
//          {
//            value: '3',
//            label: '审批通过'
//          },
//          {
//            value: '4',
//            label: '驳回'
//          },

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
       // applyState: '',

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
            title: '设备代码',
            key: 'deviceCode',

          },
//          {
//            title: '申请类别',
//            key: 'applyType',
//
//          },
          {
            title: '发证日期',
            key: 'createAt',
            sortable: true
          },
          {
            title: '更新日期',
            key: 'updateAt',
            sortable: true
          },

          {
            title: '登记机关',
            key: 'acceptorAgencyName',
          },
          {
            title: '设备状态',
            key: 'deviceStates',
          },
          {
            title: '操作',
            key: 'opera',
            render: (h, params) => {
              if (this.$route.query.apply_state == 2) {
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
                        // this.appDetail(params.index)
                        //  console.log(params.index)
                        this.$router.push({
                          path: 'stopUseApp',
                          query: {
                            deviceCode: this.data5[params.index].id,
                          }
                        });
                      }
                    }
                  }, '停用申请'),
                ]);
              } else if(this.$route.query.apply_state == 3){
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
                        // this.appDetail(params.index)
                        //  console.log(params.index)
                        this.$router.push({
                          path: 'disabledApp',
                          query: {
                            deviceCode: this.data5[params.index].id,
                          }
                        });
                      }
                    }
                  }, '报废申请'),
                ]);

              }else if(this.$route.query.apply_state == 4){
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
                        // this.appDetail(params.index)
                        //  console.log(params.index)
                        this.$router.push({
                          path: 'stopUseApp',
                          query: {
                            deviceCode: this.data5[params.index].id,
                          }
                        });
                      }
                    }
                  }, '停用后启用申请'),
                ]);
              }else if(!this.$route.query.apply_state){
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
                  }, '设备详情'),
                ]);
              }


            }

          }
        ],
        data5: [],
        state: {
          '0': '待处理',
          '1': '已通过',
          '2': '已驳回',
        }
        ,
        params: {
          time: '',
          sort: '',
          state: '',
          page: 1,
        }
        ,
        time: '',
        //订单总数
        num: 0,
        currentPage: 1,
        //申请id
        deviceCode: '',


      }
    },
    created()
    {
      this.initData();
    },

    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/devList') {
          this.initData();
        }
      }
    }
    ,

    methods: {
      ...
        mapActions(
          ['selectedDeviceOption', 'setApplyType'],
        ),
      initData()
      {
        this.time = ['', ''];
        this.setApplyType(this.$route.query.apply_state);
        console.log(this.getApplyTypeName);
        this.apply_state=this.$route.query.apply_state;
        if(!this.apply_state){
          let waitAccparams = {
            page: 0,
            size: 10,
          }
          this.getOrders(waitAccparams);
        }else if(this.apply_state==="2"||this.apply_state==="3"){
          let params=this.makeParams(0,10, this.time,'',false,'');
          this.getOrders(params);
        }else if(this.apply_state==="4"){
          let params=this.makeParams(0,10, this.time,'','','1');
          this.getOrders(params);
        }
//       if(this.$route.query.apply_state){
//           this.applyState=parseInt(this.$route.query.apply_state);
//       }
       // this.applyState = '';

      },
      //获取申请列表信息

      getOrders(waitAccparams){
        avaivbleService.GetDevOrders(waitAccparams).then(res => {
            if (res.status === 200) {
              //this.data5.device = res.data.content[0].id;
              this.data5 = res.data.content;
              this.num = res.data.totalElements;
              //  this.data5.state=res.data.content.status.state;
              for (var i = 0; i < res.data.content.length; i++) {
               // this.data5[i].state = res.data.content[i].status.states;
                let newDate = new Date(res.data.content[i].createAt);
                let Y = newDate.getFullYear() + '-';
                let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
                let D = newDate.getDate() + ' ';
                this.data5[i].createAt = Y + M + D;
                if(res.data.content[i].updateAt!==0){
                  let newUpDate = new Date(res.data.content[i].upateAt);
                  let UY = newUpDate.getFullYear() + '-';
                  let UM = (newUpDate.getMonth() + 1 < 10 ? '0' + (newUpDate.getMonth() + 1) : newUpDate.getMonth() + 1) + '-';
                  let UD = newUpDate.getDate() + ' ';
                  this.data5[i].updateAt = UY + UM + UD;
                }
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
        if (this.deviceCode) {
          this.time = ['', ''];
          this.deviceType = [];
          this.deviceTypeId = '';
//       if(this.$route.query.apply_state){
//           this.applyState=parseInt(this.$route.query.apply_state);
//       }
        //  this.applyState = '';
          let waitAccparams = 'deviceCode=' + this.deviceCode;
          avaivbleService.getDetailOrder(waitAccparams).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.data5 = [res.data];
               // this.data5[0].state = res.data.status.states;
                let newDate = new Date(res.data.createAt);
                let Y = newDate.getFullYear() + '-';
                let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
                let D = newDate.getDate() + ' ';
                this.data5[0].createAt = Y + M + D;
                if(res.data.content[i].updateAt!==0) {
                  let newUpDate = new Date(res.data.content[i].updateAt);
                  let UY = newUpDate.getFullYear() + '-';
                  let UM = (newUpDate.getMonth() + 1 < 10 ? '0' + (newUpDate.getMonth() + 1) : newUpDate.getMonth() + 1) + '-';
                  let UD = newUpDate.getDate() + ' ';
                  this.data5[i].updateAt = UY + UM + UD;
                }
                this.num=res.data.length;

              }
            }
          ).catch(error => {
            console.log(error);
          })
        }
      },
      changeTime(time)
      {
        return [time[0].getFullYear() + "-" + (parseInt(time[0].getMonth()) + 1) + "-" + time[0].getDate(),
          time[1].getFullYear() + "-" + (parseInt(time[1].getMonth()) + 1) + "-" + time[1].getDate()]
      },

      makeParams(page,size,time,deviceTypeId,processing,states){
        let params={};
        params.page=page;
        params.size=size;
        if(time!==''&& time[0]!==''&&time[1]!==''){
          params.time=this.changeTime(time);;
        }
       // console.log(deviceTypeId)
        if(deviceTypeId!==''){
          params.deviceTypeId=parseInt(deviceTypeId);
        }
        if(processing!==""){
          params.processing=processing;
        }
        if(states!==""){
          params.states=parseInt(states);
        }

        return params;

      },

      query()
      {
        this.$refs['pages'].currentPage = 1;
        console.log(this.currentPage);
        this.deviceCode = '';
        if(!this.apply_state){
          let params=this.makeParams(0,10,this.time,this.deviceType[1],'','');
          this.getOrders(params);
        }else if(this.apply_state==="2"||this.apply_state==="3"){
          let params=this.makeParams(0,10,this.time,this.deviceType[1],false,'');
          this.getOrders(params);
        }else if(this.apply_state==="4"){
          let params=this.makeParams(0,10,this.time,this.deviceType[1],'','1');
          this.getOrders(params);
        }

      }
      ,
      initSize(value)
      {
//        console.log(value);
//        let params=this.makeParams(value-1,10,this.time,this.deviceType[1]);
//        this.getOrders(params);
        if(!this.apply_state){
          let params=this.makeParams(value-1,10,this.time,this.deviceType[1],'','');
          this.getOrders(params);
        }else if(this.apply_state==="2"||this.apply_state==="3"){
          let params=this.makeParams(value-1,10,this.time,this.deviceType[1],false,'');
          this.getOrders(params);
        }else if(this.apply_state==="4"){
          let params=this.makeParams(value-1,10,this.time,this.deviceType[1],'','1');
          this.getOrders(params);
        }

      },


      appDetail(value)
      {
//    switch (this.data5[value].changeApplyNum) {
        this.$router.push({
          path: 'deviceDetail',
          query: {
            deviceCode: this.data5[value].id,
          }
        });

      }


    }
    ,
    computed: {
      ...
        mapState(['selectedOption']),
      ...
        mapGetters([
          "getSelectedOption",
          "getApplyTypeName"
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
