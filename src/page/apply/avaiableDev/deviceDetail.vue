<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="deviceDetail">

    <div class="appDetail_topbar">
      <h1 style="margin:10px;">设备详情：</h1>

    </div>
    <div class="setApp_content" style="position:absolute;top:85px;">
      <div class="comp_name" style="width:800px;">
        <h2 class="deviceDetailHead">一、设备详细信息：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <Row style="width:100%;">
          <Col span="12">
          <p class="deviceContentHead">设备种类 :<span class="content">{{this.deviceCategory}}</span></p>
          <p class="deviceContentHead">设备品种 :<span class="content">{{this.deviceKind}}</span></p>
          <p class="deviceContentHead">单位内编号 :<span class="content">{{this.eqComCode}}</span></p>
          <p class="deviceContentHead">登记机关 :<span class="content">{{this.acceptorAgencyName}}</span></p>

          </Col>
          <Col span="11">
          <p class="deviceContentHead">设备类别 :<span class="content">{{this.deviceClass}}</span></p>
          <p class="deviceContentHead">设备代码 :<span class="content">{{this.eqCode}}</span></p>
          <p class="deviceContentHead">使用单位填表人员 :<span class="content">{{this.comTablePerson}}</span></p>
          <p class="deviceContentHead">使用登记证编号 :<span class="content">{{this.registCode}}</span></p>

          </Col>

        </Row>

      </div>
      <div class="apply_type">
        <h2 class="applyDetailHead">二、已有申请详细信息：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <ul>
        <li v-for="(item,key,index) in this.logs" style="margin-bottom:10px;">
          <p class="applyTypeHead">{{key+1}}、 {{item.applyType}}</p>
          <p class="applyTypeContent"> 申请时间:{{item.applyType}}</p>
          <Button type="primary" style="margin:10px;" @click="appDetail(item.applyId)">查看{{item.applyType}}详情</Button>


        </li>
        </ul>

      </div>


    </div>
  </div>
</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import regist_one from '../../../components/register/registerOne.vue'
  import detailPdf from '../../../components/detailpdf/detailPdf.vue'
  import * as avaivbleService from '../../../services/avaiableDev.js'


  export default {
    data() {
      return {
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

        approvalStatus: '',


        approvalRejValue: '',
        approvalReason: '',
        orderState: '',
        ruleForms: [],
        appComName: '',
        registPdfUrl: '',
        ruleForm: {},
        current: 0,
        applyId: '',

        //申请类别
        applyType: '',
        active: 0,
        deviceCategory: '',
        deviceClass: '',
        deviceKind: '',
        eqCode: '',
        eqComCode: '',
        acceptorAgencyName: '',
        comTablePerson: '',
        registCode: '',
        logs:[{applyType:'首次申请',applyId:'1073'},{applyType:"变更申请",applyId:'1073'}],

      }
    },

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

        let params = 'deviceCode=' + this.$route.query.deviceCode;
        avaivbleService.getDetailOrder(params).then(res => {
          if (res.data.formList[0].useComName) {
            this.useComName = res.data.formList[0].useComName;
          }
          this.deviceCategory = res.data.formList[0].deviceCategory;
          this.deviceClass = res.data.formList[0].deviceClass;
          this.deviceKind = res.data.formList[0].deviceKind;
          this.eqCode = res.data.formList[0].eqCode;
          this.eqComCode = res.data.formList[0].eqComCode;
          this.registCode = res.data.formList[0].registCode;
          this.acceptorAgencyName = res.data.formList[0].acceptorAgencyName;
          this.eqComCode = res.data.formList[0].eqComCode;

          this.applyType = res.data.applyType + "/" + res.data.deviceType;

          if (res.data.forms["特种设备使用登记表二"]) {
            this.fileId = res.data.forms["特种设备使用登记表二"];
          } else if (res.data.forms["特种设备使用登记表一"]) {
            this.fileId = res.data.forms["特种设备使用登记表一"];

          } else {
            this.fileId = res.data.forms["特种设备使用登记表三"];

          }

          this.registPdfUrl = '/admin/file/preview?fileId=' + this.fileId;

          this.pdfUrl = res.data.forms;

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

      transparam(){
        if (this.$route.query.applyId) {
          this.applyId = this.$route.query.applyId;
        }
        if (this.$route.query.orderState) {
          this.orderState = this.$route.query.orderState;
          //console.log(this.orderState);
        }

      },
      appDetail(value){

          this.$router.push({
            path: 'appDetail',
            query: {
              applyId: value,
            }
          });

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

  .deviceDetail {
    margin: 15px;
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

  .deviceDetailHead {
    margin-bottom: 15px;
    color: #1c2438;
  }

  .deviceContentHead {
    margin: 20px;
    color: #495060;
    font-size: 19px;

  }

  .applyDetailHead {
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
    height: 60px;
    z-index: 10;
    background-color: white;
  }
  .applyTypeHead{
    margin-bottom: 15px;
    color: #1c2438;
    font-size:23px;
  }
  .applyTypeContent{
    color: #1c2438;
    font-size:19px;

  }

</style>
