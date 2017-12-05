<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="appDetail">
    <div class="appDetail_topbar">
      <h1 style="margin:10px;" v-if="this.showPrintCard==false">申请详情：</h1>
    </div>
    <div class="setApp_content demo-spin-article" style="position:absolute;top:85px;" v-if="this.showPrintCard==false">
      <div class="comp_name">
        <h2 class="detailHeadTop">一、基本信息：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <Row style="width:100%;">
          <Col span="12">
          <p class="deviceContentHead">使用单位名称 :<span class="content">{{this.useComName}}</span></p>
          <p class="deviceContentHead">设备种类 :<span class="content">{{this.deviceCategory}}</span></p>


          </Col>
          <Col span="11">
          <p class="deviceContentHead">设备代码 :<span class="content">{{this.eqCode}}</span></p>
          <p class="deviceContentHead">单位内编号 :<span class="content">{{this.eqComCode}}</span></p>

          </Col>

        </Row>
      </div>
      <div class="apply_type">
        <h2 class="detailHeadTop">二、申请信息：</h2>
        <Row style="width:100%;">
          <Col span="12">
          <p class="deviceContentHead">申请类别 :<span class="content">{{this.applyType}}</span></p>
          <p class="deviceContentHead">登记类别 :<span class="content">{{this.registKind}}</span></p>


          </Col>
          <Col span="11">
          <p class="deviceContentHead">申请日期 :<span class="content">{{this.applyDate}}</span></p>
          <p class="deviceContentHead">登记记关 :<span class="content">{{this.acceptorAgencyName}}</span></p>

          </Col>

        </Row>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <!--<span class="comp_name_content">{{this.applyType}}</span>-->
      </div>

      <div class="setTable">
        <h2 class="detailHead" style="font-size:29px;">三、特种设备使用登记表：</h2>
        <!--<iframe id="iFramePdf" v-bind:src=this.registPdfUrl style="width:800px;height:1000px;"></iframe>-->
        <ul class="detail_ul">
          <li v-for="(item,key,index) in this.registPdfUrl" class="detail_li" style="width:800px;height:1000px;">
            <a v-bind:href="'/file/download?fileId='+item" download="key" class="detail_a">{{key}}.pdf</a>
            <embed  v-bind:src="'/file/preview?fileId='+item" width="100%" height="1000px"/>
          </li>
        </ul>

      </div>
      <div class="pdfdownload">
        <h2 class="detailHead">四、提交的资料：</h2>
        <v-detailPdf :pdfUrl="pdfUrl" :pdfNum="pdfNum"></v-detailPdf>
      </div>
      <div class="accpeterControl">
        <Button type="primary" @click="accPass" v-if="orderState=='waitAccept'" :disabled="ifConnected">受理通过</Button>
        <Button @click="accRej" v-if="orderState=='waitAccept'" type="success" :disabled="ifConnected">受理驳回</Button>
      </div>

      <div class="acceptReason" v-if="orderState=='waitApproval'||orderState=='approvaled'||orderState=='accepted'||this.accStatus!==''">
        <h2 class="detailHead">五、受理决定：</h2>
        <span class="content" v-if="this.accStatus==true">{{this.accReason}}
          </br>时间：{{this.acceptTellDate}}</span>
        <span class="content" v-if="this.accStatus==false">受理驳回</br>原因：{{this.accReason}}</br>
          详细：{{this.accDetailReason}}
          </br>时间：{{this.unAcceptTellDate}}
        </span>
      </div>

      <div class="approvalControl">
        <Button type="primary" @click="approvalPass" :disabled="ifConnected"  v-if="orderState=='waitApproval'&& approvalStatus==false">审批通过
        </Button>
        <Button @click="approvalRej" v-if="orderState=='waitApproval'&& approvalStatus==false"  :disabled="ifConnected" type="success">审批驳回</Button>
      </div>
      <div class="acceptReason" v-if="orderState=='approvaled'||this.approvalStatus!==''">
        <h2 class="detailHead">六、审批决定：</h2>
        <span class="content" v-if="this.approvalStatus==true">{{this.approvalReason}}
          </br>时间：{{this.approvalDate}}</span>
        <span class="content" v-if="this.approvalStatus==false">审批驳回</br>原因：{{this.approvalReason}}</br>
          详细：{{this.approvalDetailReason}}
          </br>时间：{{this.unApprovalDate}}
        </span>
        <h2 class="detailHead"  v-if="this.approvalStatus==true">七、发证状态：</h2>
        <span class="content" v-if="this.approvalStatus==true && this.sendRegist==false">使用登记证尚未领取</span>
        <span class="content" v-if="this.approvalStatus==true && this.sendRegist==true">使用登记证已领取
          </br>领取时间：{{this.sendRegistDate}}</span>


      </div>
      <Button type="warning"  v-if="this.approvalStatus==true && this.author_key!=='1'" @click="printVerified()">打印使用登记证</Button>




    </div>
    <!--<div class="appro_form" v-if="this.showPrintCard==true" style="position:absolute;top:85px;">-->
      <!--<div class="print_page">-->
        <!--<h2>签发使用登记证</h2>-->

        <!--&lt;!&ndash;<iframe id="iFramePdf" v-bind:src="this.registPdfUrl" style="width:800px;height:1000px;"></iframe>&ndash;&gt;-->

        <!--&lt;!&ndash;</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->

        <!--</br>-->
        <!--<Button type="warning" @click="printTrigger('iFramePdf');">打印使用登记证</Button>-->
        <!--<Button @click="instance('success')" v-if="this.active==0">打印完成</Button>-->


      <!--</div>-->


    <!--</div>-->
    <!--<Spin size="large" fix v-if="spinShow"></Spin>-->
  </div>

</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import detailPdf from '../../../components/detailpdf/detailPdf.vue'
  import * as appDetailService from '../../../services/appDetailService'
 // import getWs from '../../../config/ws.js'
  //import Stomp from 'stomp-client';


  //import * as avaiableService from '../../../services/avaiableDev.js'
  import * as registService from '../../../services/registService'
  import * as acceptService from '../../../services/accept.js'
  import * as approvalService from '../../../services/approval.js'

  export default {
    data() {
      return {
     //   spinShow: true,
        ruleForm: [],
        dev_id: '',
        dev_name: '',
        deviceSortNum: '',
        value1: '',
//        pdfUrl: {
//          锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
//          水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
//          水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
//          水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
//          水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
//        },
        pdfUrl: {},
        pdfNum: 0,
        accStatus: '',
        accReason: '',
        accDetailReason:'',
        approvalDetailReason:'',

        approvalStatus: '',
        showPrintCard: false,

        approvalRejValue: '',
        approvalReason: '',
        orderState: '',
        ruleForms: [],
        useComName: '',
        registPdfUrl: '',
        ruleForm: {},
        current: 0,
        applyId: '',
        //受理驳回原因
        unAcceptedReason: ["",""],
        //受理驳回详情
        unAcceptedContent: '',
        //受理驳回原因
        unApprovalReason: ["",""],
        //受理驳回详情
        unApprovalContent: '',
        //申请类别
        applyType: '',
        active: 0,
        deviceCategory: '',
        eqCode: '',
        eqComCode: '',
        registKind: '',
        applyDate: '',
        acceptorAgencyName:'',
        stompClient:null,
        target:0,
        author_key:'',
        sendRegist:false,
        sendRegistDate:null,
        acceptTellDate:null,
        unAcceptTellDate:null,
        approvalDate:null,
        unApprovalDate:null,
        ifConnected:true,

      }
    },
//    mounted(){
//      //获取表格信息
//      this.initData();
//
//    },
//    watch: {
//      // 如果路由有变化，会再次执行该方法
//      '$route': 'initData'
//    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path !== '/appDetail') {
          if(this.orderState=='waitApproval'||this.orderState=='waitAccept'){
            if(this.stompClient != null) {
//              this.stompClient.disconnect(function() {
//                  console.log("长链接结束");
//                }
//              );
              this.stompClient.disconnect();
              console.log("Disconnected");

            }

          }

        }

      }
    },
    activated() {
      const _this = this;
      _this.initData();
      //建立长链接

      if(_this.orderState=='waitApproval'||_this.orderState=='waitAccept'){
        let socket = new SockJS('/processing');
        //    var from = document.getElementById('from').value;
        _this.stompClient = Stomp.over(socket);
        _this.stompClient.connect({}, function(frame) {
          console.log(" long connected");
          _this.ifConnected=false;

        });

      }


    },
    methods: {
      ...mapActions({}),
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },
      changeTime(time){
        let newDate = new Date(time);
        let Y = newDate.getFullYear() + '-';
        let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
        let D = newDate.getDate() + ' ';
       return   Y + M + D;
      },

      initData(){
       // this.spinShow=true;
        this.ifConnected=true;
        this.transparam();
        this.current = 0;
        this.active = 0;
        this.approvalStatus = '';
        this.unAcceptedReason = ["",""];
        this.unAcceptedContent = '';
        this.unApprovalReason = ["",""];
        this.unApprovalContent = '';
        this.showPrintCard = false;
        this.author_key = localStorage.getItem('author_key');

        // var socket = new SockJS('http://10.103.91.48:8080/processing');

        let params = 'applyId=' + this.$route.query.applyId;
        appDetailService.getAppDetail(params).then(res => {

          this.applyType = res.data.applyType + "/" + res.data.deviceType;

          if (res.data.forms["特种设备使用登记表二"]) {
            this.fileId = res.data.forms["特种设备使用登记表二"];
          } else if (res.data.forms["特种设备使用登记表一"]) {
            this.fileId = res.data.forms["特种设备使用登记表一"];

          } else if (res.data.forms["特种设备使用登记表三"]) {
            this.fileId = res.data.forms["特种设备使用登记表三"];
          }else if(res.data.forms["特种设备停用注销报废登记表"]){
            this.fileId = res.data.forms["特种设备停用注销报废登记表"];

          }
          this.sendRegist=res.data.status.sendRegist;
          this.sendRegistDate=this.changeTime(res.data.status.sendRegistDate);
          this.acceptTellDate=this.changeTime(res.data.status.acceptTellDate);
          this.unAcceptTellDate=this.changeTime(res.data.status.unAcceptTellDate);
          this.approvalDate=this.changeTime(res.data.status.approvalDate);
          this.unApprovalDate=this.changeTime(res.data.status.unApprovalDate);


//          this.registPdfUrl = '/admin/file/preview?fileId=' + this.fileId;
          this.registPdfUrl=res.data.forms;
          this.pdfUrl = res.data.files;
          if(res.data.status.states == "已提交待受理"){
            this.accStatus='';
          }else if(res.data.status.states == "已受理待审批") {
            this.accStatus = true;
            this.accReason = "已受理通过";
          } else if (res.data.status.states === "受理驳回") {
            this.accStatus = false;
            this.accReason = res.data.status.unAcceptedReason || "受理驳回";
            this.accDetailReason=res.data.status.unAcceptedDetailReason||"无";
          }
          if (res.data.status.states === "已审批通过") {
            this.approvalStatus = true;
            this.approvalReason = "已审批通过";
            this.accStatus = true;
            this.accReason = "已受理通过";
          } else if (res.data.status.states === "审批驳回") {
            this.approvalStatus = false;
            this.approvalReason = res.data.status.unApprovalReason || "审批驳回";
            this.approvalDetailReason=res.data.status.unApprovalDetailReason||"无";
            this.accStatus = true;
            this.accReason = "已受理通过";
          }

          if (res.data.formList[0].useComName) {
            this.useComName = res.data.formList[0].useComName;
          }
          this.deviceCategory = res.data.deviceCategory||"无";
          this.eqCode = res.data.formList[0].eqCode||"无";
          this.eqComCode = res.data.formList[0].eqComCode||"无";
          this.registKind = res.data.registKind||res.data.applyType;
          let newDate = new Date(res.data.createTime);
          let Y = newDate.getFullYear() + '-';
          let M = (newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1) + '-';
          let D = newDate.getDate() + ' ';
          this.applyDate = Y + M + D;
          if( res.data.acceptorAgencyName){
            this.acceptorAgencyName = res.data.acceptorAgencyName||"无";
          }


        }).catch(error => {
          console.log(error)
        })

        this.unAcceptedContent = '';
        this.approvalRejValue = '';

      },
//      next() {
//        if (this.current == 2) {
//          this.current = 0;
//        } else {
//          this.current += 1;
//        }
//        this.active++;
//
//      },
      transparam(){
        if (this.$route.query.applyId) {
          this.applyId = this.$route.query.applyId;
        }
        if (this.$route.query.orderState) {
          this.orderState = this.$route.query.orderState;
          //console.log(this.orderState);
        }

      },
//      toblanck(index){
//        //this.$router.push('regist_one');
//        this.$router.push({
//          path: 'regist_one',
//          query: {
//            index: index,
////            selectedNum: this.getSelectedNum,
//          }
//        });
//      },
      //受理通过
      accPass(){
        this.$Modal.confirm({
          title: '确认信息',
          content: '<p>确认通过该申请订单？</p>',
          onOk: () => {
            this.$Message.info('点击了确定');
            let params = {
              applyId: this.applyId,
              pass: true,
            }
            appDetailService.AccPass(params).then(res => {
              if (res.status === 200) {
//                stompClient.onclose = function(){
//                  showMessageOutput2("close");
//                }
                this.stompClient.disconnect(function() {
                  console.log("长链接结束");
                  }
                );
                this.$router.push('waitAccept');
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              console.log(error);
            })
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });

      },
      //受理驳回
      accRej () {
        this.$Modal.confirm({
          title: '受理驳回',
          render: (h) => {
            return h('div', [
              h('h4', {
                props: {
                  value: this.value,
                },
                style: {
                  marginLeft: '-40px',
                },

              }, '原因：'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (event) => {
                      console.log(event);
                    if (event == true) {
                      this.unAcceptedReason[0]="申请资料不齐";
                    } else {
                      this.unAcceptedReason[0] = "";
                    }
                  }
                },
              }, '申请资料不齐'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (event) => {
                    console.log(event);
                    if (event == true) {
                      this.unAcceptedReason[1]="不符合规定";
                    } else {
                      this.unAcceptedReason[1] = "";
                    }
                  }
                },
              }, '不符合规定'),
              h('h4', {
                props: {
                  value: this.value,
                },
                style: {
                  marginLeft: '-40px',
                },
              }, '详情：'),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: '请输入驳回理由详情',
                  type: 'textarea',
                  rows: 5,
                },
                on: {
                  input: (val) => {
                    this.unAcceptedContent = val;
                  }
                },
              }),

            ])

          },
          onOk: () => {
            this.$Message.info('点击了确定');

            let params = {
              applyId: this.applyId,
              pass: false,
              detailReason: this.unAcceptedContent,
              reason: this.unAcceptedReason[0] + '/'+this.unAcceptedReason[1],
            }

            appDetailService.AccRej(params).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.stompClient.disconnect(function() {
                    console.log("长链接结束");
                  }
                );
                this.$router.push('waitAccept');
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              console.log(error);
            })
//            this.$router.push('waitAccept');
          },
          onCancel: () => {
            this.unAcceptedContent = '';
            this.unAcceptedReason = ["",""];
            this.$Message.info('点击了取消');
          }
        })
      },
      //审批通过
      approvalPass(){
        this.$Modal.confirm({
          title: '确认信息',
          content: '<p>确认审批通过该申请订单？</p>',
          onOk: () => {
            let params = {
              applyId: this.applyId,
              pass: true,
            }
            appDetailService.ApprovalPass(params).then(res => {
              if (res.status === 200) {
                this.stompClient.disconnect(function() {
                    console.log("长链接结束");
                  }
                );
                this.approvalStatus = true;
                this.showPrintCard = true;
                this.$router.push('waitApproval');

               // this.$router.push('waitApproval');
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              console.log(error);
            })
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });

      },
      //审批驳回
      approvalRej () {
        this.$Modal.confirm({
          title: '审批驳回',
          render: (h) => {
            return h('div', [
              h('h4', {
                props: {
                  value: this.value,
                },
                style: {
                  marginLeft: '-40px',
                },

              }, '原因：'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (event) => {
                    if (event == true) {
                      this.unApprovalReason[0]="不予登记";
                    } else {
                      this.unApprovalReason[0] = "";
                    }
                  }
//                  input: (val) => {
//                    this.unApprovalReason.push('不予登记');
//                  }
                },
              }, '不予登记'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (event) => {
                    if (event == true) {
                      this.unApprovalReason[1]="对申请资料有疑问，需要进行现场核查";
                    } else {
                      this.unApprovalReason[1] = "";
                    }
                  }
//                  input: (val) => {
//                    this.unApprovalReason.push('对申请资料有疑问，需要进行现场核查');
//                  }
                },
              }, '对申请资料有疑问，需要进行现场核查'),
              h('h4', {
                props: {
                  value: this.value,
                },
                style: {
                  marginLeft: '-40px',
                },
              }, '详情：'),
              h('Input', {
                props: {
                  value: this.value,
                  autofocus: true,
                  placeholder: '请输入驳回理由详情',
                  type: 'textarea',
                  rows: 5,
                },
                on: {
                  input: (val) => {
                    this.unApprovalContent = val;
                  }
                },
              }),

            ])

          },
          onOk: () => {
            this.$Message.info('点击了确定');
            let params = {
              applyId: this.applyId,
              pass: false,
              detailReason: this.unApprovalContent,
              reason: this.unApprovalReason[0] + "/"+this.unApprovalReason[1],
            }
            appDetailService.ApprovalRej(params).then(res => {
              if (res.status === 200) {
                this.stompClient.disconnect(function() {
                    console.log("长链接结束");
                  }
                );
                this.$router.push('waitApproval');
              } else {
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              console.log(error);
            })
          },
          onCancel: () => {
            this.unApprovalContent = '';
            this.unApprovalReason = ["",""];
            this.$Message.info('点击了取消');
          }
        })
      },
      printVerified(){
        let params = 'applyId=' + this.$route.query.applyId;
        appDetailService.sendVerified(params).then(res => {
          if (res.status === 200) {
            this.$Message.info('发证成功');
            this.$router.push('waitVerified');
          } else {
            this.$Message.info(res.msg);
          }
        }).catch(error => {
          console.log(error);
        })

      },

      instance (type) {
          this.current++;
        this.$Message.info('您已完成审批、发证');
        this.$router.push('waitApproval');
      },

    },

    computed: {
      ...mapState(['registOne']),
      ...mapGetters([
      ]),
    },
    components: {
//      'v_regist_one': regist_one,
      'v-detailPdf': detailPdf,

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
  .appDetail{
    font-size:19px;
  }

  .comp_name {
    margin-bottom: 30px;
  }

  .setTable {
    margin-bottom: 30px;
    font-size: 16px;
  }

  .pdfdownload {
    margin-bottom: 30px;
  }

  .detailHeadTop {
    margin-bottom: 15px;
    color: #1c2438;
  }

  .detailHead {
    margin: 20px 0;
    color: #1c2438;

  }

  .content {
    color: #495060;
    font-size: 17px;
  }

  .panel_content {
    font-size: small;
    color: #495060;
  }

  .acceptReason {
    margin-bottom: 20px;
  }

  .comp_name_content {
    font-size: 17px;
  }

  .base-box {
    margin: 0 auto;
    width: 100%;
    display: block;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    //padding: 3px;

    padding-left: 10px;
    padding-right: 10px;
    padding-top: 10px;
    box-sizing: border-box;
    background-color: white;

  }

  .appDetail_topbar {
    position: fixed;
    width: 100%;
    margin: 0px;
    padding: 0px;
    height: 80px;
    z-index: 10;
    background-color: white;
  }
  .demo-spin-container{
    display: inline-block;
    width: auto;
    height:auto;
    position: relative;
    border: 1px solid #eee;
  }
  /*.demo-spin-article{*/
    /*width:800px;*/
    /*height:600px;*/
  /*}*/

</style>
