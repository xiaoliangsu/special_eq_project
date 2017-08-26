<template>
    <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
    <div class="appDetail">
        <div class="comp_name">
            <h2 class="detailHeadTop">一、单位名称：</h2>
            <!--<span class="content"> {{this.dev_id}}</span>-->
            <span class="content">申请单位的名字</span>
        </div>

        <div class="setTable">
            <h2 class="detailHead">二、特种设备使用登记表：</h2>
            <Collapse v-model="value1">
                <Panel name="1">
                    <span class="panel_content">特种设备使用登记表</span>
                    <div slot="content">
                        <v_regist_one :ruleForm="ruleForm"></v_regist_one>
                        <Button type="primary" @click="toblanck">打印预览</Button>
                    </div>
                </Panel>
            </Collapse>


          <!--<Button type="primary" @click="test">受理通过</Button>-->
          <!--<pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf>-->
          <!--<embed v-if="this.testTrue==true" src="https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/freeculture.pdf"width="100%"   height="1000px" />-->
          <!--<iframe name="resource" src="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" width="100%"   height="100%" scrolling="yes" frameborder="0"></iframe>-->


        </div>
        <div class="pdfdownload">
            <h2 class="detailHead">三、提交的资料：</h2>
            <v-detailPdf :pdfUrl="pdfUrl" ></v-detailPdf>
        </div>
        <div class="accpeterControl">
            <Button type="primary" @click="accPass" v-if="orderState=='waitAccept'">受理通过</Button>
            <Button @click="accRej"  v-if="orderState=='waitAccept'">受理驳回</Button>
        </div>

      <div class="acceptReason" v-if="orderState=='waitApproval'||orderState=='approvaled'||orderState=='accepted'">
        <h2 class="detailHead">四、受理结果：</h2>
        <span class="content" v-if="this.accStatus==true">{{this.accReason}}</span>
        <span class="content" v-if="this.accStatus==false">{{this.accReason}}</span>
      </div>

      <div class="approvalControl">
        <Button type="primary" @click="approvalPass" v-if="orderState=='waitApproval'">审批通过</Button>
        <Button @click="approvalRej"  v-if="orderState=='waitApproval'">审批驳回</Button>
      </div>
      <div class="acceptReason" v-if="orderState=='approvaled'">
        <h2 class="detailHead">四、审批结果：</h2>
        <span class="content" v-if="this.approvalStatus==true">{{this.approvalReason}}</span>
        <span class="content" v-if="this.approvalStatus==false">{{this.approvalReason}}</span>
      </div>

    </div>
</template>
<script>

    import {mapActions, mapState, mapGetters} from 'vuex'
    import regist_one from '../../../components/register/registerOne.vue'
    import detailPdf from '../../../components/detailpdf/detailPdf.vue'

    //import * as avaiableService from '../../../services/avaiableDev.js'
    //import * as registService from '../../../services/registService'
    import * as acceptService from '../../../services/accept.js'
    import * as approvalService from '../../../services/approval.js'

    export default {
        data() {
            return {
                ruleForm: '',
                dev_id: '',
                dev_name: '',
                value1: '',
                pdfUrl: {
                    锅炉能效证明: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
                    水壶: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
                    水壶2: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf',
                    水壶3: 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/annotation-link-text-popup.pdf',
                    水壶4: 'https://cdn.rawgit.com/sayanee/angularjs-pdf/68066e85/example/pdf/relativity.protected.pdf',
                },
                accStatus: '',
                accRejValue: '',
                accReason:'',

                approvalStatus:'',
                approvalRejValue:'',
                approvalReason:'',
                orderState:'',
//                testTrue:[],



            }
        },
        mounted(){
            //获取表格信息
            this.ruleForm = this.getRegistOne;
            this.getRegistOneForm(this.dev_id);
            this.ruleForm = this.getRegistOne;
            //获取路由上的信息
            this.transparam();
            this.getAccReason(this.dev_id);
            this.getApprovalReason(this.dev_id);
            //获取状态  还需要改
            this.accRejValue='';
            this.approvalRejValue='';

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
                this.getRegistOneForm(this.dev_id);
                this.ruleForm = this.getRegistOne;
                this.accRejValue='';
                this.approvalRejValue='';
                this.transparam();
                this.getAccReason(this.dev_id);
                this.getApprovalReason(this.dev_id);

            },
            transparam(){
                if (this.$route.query.dev_id) {
                    this.dev_id = this.$route.query.dev_id;
                }
                if (this.$route.query.dev_name) {
                    this.dev_name = this.$route.query.dev_name;
                    console.log(this.dev_name);
                }
                if(this.$route.query.orderState){
                    this.orderState = this.$route.query.orderState;
                     console.log(this.orderState);
                }
            },
            toblanck(){
                this.$router.push('regist_one');
            },
          //受理通过
            accPass(){
                this.accStatus = true;
                this.$Modal.confirm({
                    title: '确认信息',
                    content: '<p>确认通过该申请订单？</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                        acceptService.AccPass(this.accStatus).then(res => {
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
                        this.$router.push('waitAccept');
                    },
                    onCancel: () => {
                      this.accRejValue = '';
                        this.$Message.info('点击了取消');
                    }
                })
            },
          //获取受理结果
          getAccReason(){
            acceptService.getAccReason(this.dev_id ).then(res =>{
              this.accStatus=res.state;
              this.accReason=res.reason;
            }).catch(error =>{
              console.log(error);
            })
          },
          //审批通过
          approvalPass(){
            this.approvalStatus = true;
            this.$Modal.confirm({
              title: '确认信息',
              content: '<p>确认审批通过该申请订单？</p>',
              onOk: () => {
                this.$Message.info('点击了确定');
                approvalService.ApprovalPass(this.approvalStatus).then(res => {
                  this.$router.push('waitApproval');

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
                this.$router.push('waitApproval');
              },
              onCancel: () => {
                this.approvalRejValue = '';
                this.$Message.info('点击了取消');
              }
            })
          },
          //获取审批结果
          getApprovalReason(){
            approvalService.getApprovalReason(this.dev_id ).then(res =>{
              this.approvalStatus=res.state;
              this.approvalReason=res.reason;
            }).catch(error =>{
              console.log(error);
            })
          }
        },

        computed: {
            ...mapState(['registOne']),
            ...mapGetters([
                "getRegistOne",
            ]),
//          TestTrue:function(){
//            for(let i=0; i<Object.keys(this.pdfUrl).length;i++){
//              console.log(Object.keys(this.pdfUrl).length)
//              this.testTrue[i]=false;
//              console.log(this.testTrue);
//
//            }
//            return this.testTrue;
//          }
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
  .acceptReason{
    margin-bottom: 20px;
  }



</style>
