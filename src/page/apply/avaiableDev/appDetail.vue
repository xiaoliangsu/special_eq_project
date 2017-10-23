<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="appDetail">
    <div class="appDetail_topbar">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->

    </div>
    <div class="appDetail_topbar">
      <h1 style="margin:10px;" v-if="this.showPrintCard==false">申请详情：</h1>
      <div class="step" style="width:94%; margin-top:20px;" v-if="this.showPrintCard==true">
        <Steps :current="current">
          <Step title="步骤1" content="检查申请信息"></Step>
          <Step title="步骤2" content="签发使用登记证"></Step>
          <Step title="步骤3" content="完成"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;" v-if="this.showPrintCard==false">
      <div class="comp_name">
        <h2 class="detailHeadTop">一、申请单位名称：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <span class="comp_name_content">{{this.appComName}}</span>
      </div>
      <div class="apply_type">
        <h2 class="detailHeadTop">二、申请类别：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <span class="comp_name_content">{{this.applyType}}</span>
      </div>

      <div class="setTable">
        <h2 class="detailHead">三、特种设备使用登记表(按套申请)：</h2>
        <iframe id="iFramePdf" v-bind:src=this.registPdfUrl style="width:800px;height:1000px;"></iframe>
      </div>
      <div class="pdfdownload">
        <h2 class="detailHead">四、提交的资料：</h2>
        <v-detailPdf :pdfUrl="pdfUrl" :pdfNum="pdfNum"></v-detailPdf>
      </div>
      <div class="accpeterControl">
        <Button type="primary" @click="accPass" v-if="orderState=='waitAccept'">受理通过</Button>
        <Button @click="accRej" v-if="orderState=='waitAccept'">受理驳回</Button>
      </div>

      <div class="acceptReason" v-if="orderState=='waitApproval'||orderState=='approvaled'||orderState=='accepted'">
        <h2 class="detailHead">五、受理结果：</h2>
        <span class="content" v-if="this.accStatus==true">{{this.accReason}}</span>
        <span class="content" v-if="this.accStatus==false">{{this.accReason}}</span>
      </div>

      <div class="approvalControl">
        <Button type="primary" @click="approvalPass" v-if="orderState=='waitApproval'&& approvalStatus==false">审批通过
        </Button>
        <Button @click="approvalRej" v-if="orderState=='waitApproval'&& approvalStatus==false">审批驳回</Button>
      </div>
      <div class="acceptReason" v-if="orderState=='approvaled'">
        <h2 class="detailHead">五、审批结果：</h2>
        <span class="content" v-if="this.approvalStatus==true">{{this.approvalReason}}</span>
        <span class="content" v-if="this.approvalStatus==false">{{this.approvalReason}}</span>
      </div>


    </div>
    <div class="appro_form" v-if="this.showPrintCard==true" style="position:absolute;top:85px;">
      <div class="print_page">
        <h2>签发使用登记证</h2>
        <iframe id="iFramePdf" v-bind:src=this.registPdfUrl style="width:800px;height:1000px;"></iframe>
        </br>
        <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>
        <Button @click="instance('success')" v-if="this.active==0">完成</Button>


      </div>


    </div>
  </div>
</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import regist_one from '../../../components/register/registerOne.vue'
  import detailPdf from '../../../components/detailpdf/detailPdf.vue'
  import * as appDetailService from '../../../services/appDetailService'

  //import * as avaiableService from '../../../services/avaiableDev.js'
  import * as registService from '../../../services/registService'
  import * as acceptService from '../../../services/accept.js'
  import * as approvalService from '../../../services/approval.js'

  export default {
    data() {
      return {
        ruleForm: [],
        dev_id: '',
        dev_name: '',
        deviceSortNum: '',
        value1: '',
        pdfUrl: {
          锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
          水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
          水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
          水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
          水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
        },
        pdfNum: 0,
        accStatus: '',
        accReason: '',

        approvalStatus: '',
       showPrintCard :false,

      approvalRejValue: '',
        approvalReason: '',
        orderState: '',
        ruleForms: [],
        appComName: '',
        registPdfUrl: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
        ruleForm: {},
        current: 0,
        applyId: '',
        //受理驳回原因
        unAcceptedReason: [],
        //受理驳回详情
        unAcceptedContent: '',
        //受理驳回原因
        unApprovalReason: [],
        //受理驳回详情
        unApprovalContent: '',
        //申请类别
        applyType: '',
        active: 0,

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
    activated() {
      const _this = this;
      _this.initData();
    },
    methods: {
      ...mapActions({getRegistOneForm: 'getRegistOneForm'}),
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },

      initData(){
        this.transparam();
        this.current = 0;
        this.active = 0;
        this.approvalStatus = '';
        this.unAcceptedReason = [];
        this.unAcceptedContent = '';
        this.unApprovalReason = [];
        this.unApprovalContent = '';
        let params = 'applyId=' + this.$route.query.applyId;
        appDetailService.getAppDetail(params).then(res => {
          this.appComName = res.data.acceptorAgencyId;
          this.applyType = res.data.applyType + "/" + res.data.deviceType;
          if (res.data.status.states === "已受理待审批") {
            this.accStatus = true;
            this.accReason = "已受理通过";
          } else if (res.data.status.states === "受理驳回") {
            this.accStatus = false;
            this.accReason = res.data.status.acceptedComments || "受理驳回";
          }
          if (res.data.status.states === "已审批通过") {
            this.approvalStatus = true;
            this.approvalReason = "已审批通过";
            this.accStatus = true;
            this.accReason = "已受理通过";
          } else if (res.data.status.states === "审批驳回") {
            this.approvalStatus = false;
            this.approvalReason = res.data.status.approveComments || "审批驳回";
            this.accStatus = true;
            this.accReason = "已受理通过";
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
      toblanck(index){
        //this.$router.push('regist_one');
        this.$router.push({
          path: 'regist_one',
          query: {
            index: index,
//            selectedNum: this.getSelectedNum,
          }
        });
      },
      //受理通过
      accPass(){
        this.$Modal.confirm({
          title: '确认信息',
          content: '<p>确认通过该申请订单？</p>',
          onOk: () => {
            this.$Message.info('点击了确定');
            let params = {
              applyId: this.applyId,
              isPass: true,
            }
            appDetailService.AccPass(params).then(res => {
              if (res.status === 200) {
                this.$router.push('waitAccept');
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
                  input: (val) => {
                    this.unAcceptedReason.push('申请资料不齐');
                  }
                },
              }, '申请资料不齐'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (val) => {
                    this.unAcceptedReason.push('不符合规定');
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
              isPass: false,
              comments: this.unAcceptedContent,
              rejectReasons: this.unAcceptedReason[0] + this.unAcceptedReason[1],
            }
            appDetailService.AccRej(params).then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$router.push('waitAccept');
              }
            }).catch(error => {
              console.log(error);
            })
            this.$router.push('waitAccept');
          },
          onCancel: () => {
            this.unAcceptedContent = '';
            this.unAcceptedReason = [];
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
              isPass: true,
            }
            appDetailService.ApprovalPass(params).then(res => {
              if (res.status === 200) {
                this.approvalStatus = true;
                this.showPrintCard = true;
                this.$router.push('waitApproval');
              }
            }).catch(error => {
              console.log(error);
            })
            this.current++;
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
                  input: (val) => {
                    this.unApprovalReason.push('不予登记');
                  }
                },
              }, '不予登记'),
              h('checkbox', {
                props: {
                  value: this.value,
                },
                on: {
                  input: (val) => {
                    this.unApprovalReason.push('对申请资料有疑问，需要进行现场核查');
                  }
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
              isPass: false,
              comments: this.unApprovalContent,
              rejectReasons: this.unApprovalReason[0] + this.unApprovalReason[1],
            }
            appDetailService.ApprovalRej(params).then(res => {
              if (res.status === 200) {
                this.$router.push('waitApproval');
              }
            }).catch(error => {
              console.log(error);
            })
          },
          onCancel: () => {
            this.unApprovalContent = '';
            this.unApprovalReason = [];
            this.$Message.info('点击了取消');
          }
        })
      },

      instance (type) {
        let params = 'applyId=' + this.applyId;
        setAppService.confrimApp(params).then(res => {
          if (res) {
            const title = '通知';
            const content = '<p>您已经成功提交申请</p><p>请耐心等待受理结果</p>';
            switch (type) {
              case 'success':
                this.$Modal.success({
                  title: title,
                  content: content
                });
                this.current++;
                break;
            }
            this.$router.push('home');
          }
        }).catch(error => {
          console.log(error);

        })


      },

    },

    computed: {
      ...mapState(['registOne']),
      ...mapGetters([
        "getRegistOne",
      ]),
    },
    components: {
      'v_regist_one': regist_one,
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

</style>
