<template>
  <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
  <div class="appDetail">
    <div class="appDetail_topbar" v-if="orderState=='waitApproval'">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->
      <div class="step" style="width:94%; margin-top:20px;">
        <Steps :current="current">
          <Step title="步骤1" content="检查申请信息"></Step>
          <Step title="步骤2" content="填写审批信息"></Step>
          <Step title="步骤3" content="预览、打印相关证件"></Step>
          <Step title="步骤4" content="完成"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;" v-if="this.approvalStatus ==false">
      <div class="comp_name">
        <h2 class="detailHeadTop">一、单位名称：</h2>
        <!--<span class="content"> {{this.dev_id}}</span>-->
        <span class="comp_name_content">{{this.appComName}}</span>
      </div>

      <div class="setTable">
        <h2 class="detailHead">二、特种设备使用登记表(按套申请)：</h2>
        <!--<Collapse v-model="value1" v-for="(item,index) in ruleForms" :key="item.id">-->
        <!--<Panel :name="''+index">-->
        <!--<span class="panel_content">特种设备使用登记表</span>-->
        <!--<div slot="content">-->
        <!--<v_regist_one :ruleForm="item"></v_regist_one>-->
        <!--<Button type="primary" @click="toblanck(index)">打印预览</Button>-->

        <!--</div>-->
        <!--</Panel>-->
        <!--</Collapse>-->

        <iframe id="iFramePdf" v-bind:src=this.registPdfUrl style="width:100%;height:1000px;"></iframe>


      </div>
      <div class="pdfdownload">
        <h2 class="detailHead">三、提交的资料：</h2>
        <v-detailPdf :pdfUrl="pdfUrl" :pdfNum="pdfNum"></v-detailPdf>
      </div>
      <div class="accpeterControl">
        <Button type="primary" @click="accPass" v-if="orderState=='waitAccept'">受理通过</Button>
        <Button @click="accRej" v-if="orderState=='waitAccept'">受理驳回</Button>
      </div>

      <div class="acceptReason" v-if="orderState=='waitApproval'||orderState=='approvaled'||orderState=='accepted'">
        <h2 class="detailHead">四、受理结果：</h2>
        <span class="content" v-if="this.accStatus==true">{{this.accReason}}</span>
        <span class="content" v-if="this.accStatus==false">{{this.accReason}}</span>
      </div>

      <div class="approvalControl">
        <Button type="primary" @click="approvalPass" v-if="orderState=='waitApproval'&& approvalStatus==false">审批通过
        </Button>
        <Button @click="approvalRej" v-if="orderState=='waitApproval'&& approvalStatus==false">审批驳回</Button>
      </div>
      <div class="acceptReason" v-if="orderState=='approvaled'">
        <h2 class="detailHead">四、审批结果：</h2>
        <span class="content" v-if="this.approvalStatus==true">{{this.approvalReason}}</span>
        <span class="content" v-if="this.approvalStatus==false">{{this.approvalReason}}</span>
      </div>


    </div>
    <div class="appro_form" v-if="this.approvalStatus ==true" style="position:absolute;top:85px;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left" v-if="this.current==1">
        <div class="statusInfo" >
          <!--<h2>选择设备种类</h2>-->
          <!--<Select v-model="deviceType" style="width:200px">-->
          <!--<Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
          <h2 class="detailHead">审批通过说明</h2>
          <div class="base-box">
            <Row>
              <Col span="11">
              <Form-item label="说明" prop="eq_variety">
                <Input v-model="ruleForm.eq_variety" placeholder="请输入设备品种"></Input>
              </Form-item>
              <Form-item label="登记机关登记人员" prop="eq_code">
                <Input v-model="ruleForm.eq_code" placeholder="请输入设备代码"></Input>
              </Form-item>
              <Form-item label="日期" prop="design_use_limit">
                <Input v-model="ruleForm.design_use_limit" placeholder="请输入设计使用年限"></Input>
              </Form-item>
              </Col>
              <Col span="11"  offset="2">
              <Form-item label="使用登记证编号" prop="manufacture_com_name">
                <Input v-model="ruleForm.manufacture_com_name" placeholder="请输入制造单位名称"></Input>
              </Form-item>
              <Form-item label="日期" prop="design_use_limit">
                <Input v-model="ruleForm.design_use_limit" placeholder="请输入设计使用年限"></Input>
              </Form-item>
              </Col>
            </Row>
          </div>

        </div>
      </Form>
      <Button type="primary" @click="next()" v-if="this.current==1">下一步</Button>
      <div class="print_page" v-if="this.current==2">
        打印页面
        <Button type="primary" @click="next()">完成</Button>
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
//              value2:'',
//              ruleForm2: '',
        pdfUrl: {
//                    锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
//                    水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
//                    水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
//                    水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
//                    水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
        },
        pdfNum: 0,
        accStatus: '',
        accRejValue: '',
        accReason: '',

        approvalStatus: '',
        approvalRejValue: '',
        approvalReason: '',
        orderState: '',
        ruleForms: [],
        appComName: '',
        registPdfUrl: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
        ruleForm: {},
        current: 0,


        rules: {
          eq_species: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//                    use_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
//                    check_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
        },

//                testTrue:[],


      }
    },
    mounted(){
      //获取表格信息
      this.initData();

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    methods: {
      ...mapActions({getRegistOneForm: 'getRegistOneForm'}),
//          test(){
//                this.testTrue=!this.testTrue;
//          },
      initData(){
        this.transparam();
        this.current=0;
        appDetailService.getRegistOne(1).then(res => {
          //表格信息
          this.ruleForms = res.success.ruleForm;
          //pdf信息
          this.pdfUrl = res.pdfUrl;
          //获取对象长度
          this.pdfNum = Object.keys(this.pdfUrl).length;
          //受理驳回理由
          this.accStatus = res.accState;
          this.accReason = res.accReason;
          //审批驳回理由
          this.approvalStatus = res.approvalState;
          this.approvalReason = res.approvalReason;
          //单位名称
          this.appComName = res.appComName;

        }).catch(error => {
          console.log(error)
        })
        this.accRejValue = '';
        this.approvalRejValue = '';

        //  this.getAccReason(this.dev_id);
        // this.getApprovalReason(this.dev_id);

      },
      next() {
//        this.$refs[name].validate((valid) => {
//          if (valid) {
//
//          }
//        })
//        if (this.active == 1) {
//          this.submitForm('ruleForm');
//        }
//        this.active = 2;
        if (this.current == 3) {
          this.current = 0;
        } else {
          this.current += 1;
        }
        this.active++;

      },
      transparam(){
        if (this.$route.query.dev_id) {
          this.dev_id = this.$route.query.dev_id;
        }
        if (this.$route.query.dev_name) {
          this.dev_name = this.$route.query.dev_name;
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
        this.accStatus = true;
        this.$Modal.confirm({
          title: '确认信息',
          content: '<p>确认通过该申请订单？</p>',
          onOk: () => {
            this.$Message.info('点击了确定');
            let data = {
              accStatus: this.accStatus,
            }
            appDetailService.AccPass(data).then(res => {
              console.log(res.success);
              this.$router.push('waitAccept');

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
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '请输入驳回理由',
                type: 'textarea',
                rows: 5,
              },
              on: {
                input: (val) => {
                  this.accRejValue = val;
                }
              },
            })
          },
          onOk: () => {
            this.$Message.info('点击了确定');
            let data = {
              accRejValue: this.accRejValue,
            }
            appDetailService.AccRej(data).then(res => {
              console.log(res.success);
              this.$router.push('waitAccept');

            }).catch(error => {
              console.log(error);
            })
            this.$router.push('waitAccept');
          },
          onCancel: () => {
            this.accRejValue = '';
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
            this.approvalStatus = true;
            this.current++;
            this.$Message.info('点击了确定');
            let data = {
              approvalStatus: this.approvalStatus,
            }
//            appDetailService.ApprovalPass(data).then(res => {
//              console.log(res.success);
//              this.$router.push('waitApproval');
//
//            }).catch(error => {
//              console.log(error);
//            })
          },
          onCancel: () => {

            this.$Message.info('点击了取消');
          }
        });

      },
      //审批驳回
      approvalRej () {
        this.$Modal.confirm({
          render: (h) => {
            return h('Input', {
              props: {
                value: this.value,
                autofocus: true,
                placeholder: '请输入审批驳回理由',
                type: 'textarea',
                rows: 5,
              },
              on: {
                input: (val) => {
                  this.approvalRejValue = val;
                }
              },
            })
          },
          onOk: () => {
            this.$Message.info('点击了确定');
            let data = {
              approvalRejValue: this.approvalRejValue,
            }
            appDetailService.AccRej(data).then(res => {
              console.log(res.success);
              this.$router.push('waitApproval');

            }).catch(error => {
              console.log(error);
            })
            this.$router.push('waitApproval');
          },
          onCancel: () => {
            this.approvalRejValue = '';
            this.$Message.info('点击了取消');
          }
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
    font-size: small;
  }

  .panel_content {
    font-size: small;
    color: #495060;
  }

  .acceptReason {
    margin-bottom: 20px;
  }

  .comp_name_content {
    font-size: 16px;
  }

  .base-box {
    margin:0 auto;
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
