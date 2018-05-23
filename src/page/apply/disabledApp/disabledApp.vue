<template>
  <!--按套申请的使用登记表-->
  <div class="disableApp">

    <div class="setApp_topbar">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->
      <div class="step" style="width:85%; margin-top:20px;">
        <Steps :current="current">
          <!--<Step title="步骤1" content="填写基本信息"></Step>-->
          <Step title="步骤1" content="选择要报废的设备"></Step>
          <Step title="步骤2" content="填写《特种设备停用报废注销登记表》"></Step>
          <Step title="步骤3" content="预览《特种设备停用报废注销登记表》"></Step>
          <Step title="步骤4" content="提交相关证件"></Step>
          <Step title="步骤5" content="完成申请"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;">
      <div v-if="this.active==1"   class="statusInfo" style="margin-bottom:20px;">
        <div class="list-box">
          <h3 class="header_one" style="margin:10px;">选择要报废的设备</h3>
          <Table border ref="selection" :columns="columnsCanStopUse" :data="canStopUseDeviceList"
                 @on-select="selectDevice" @on-select-all="selectDeviceAll" width="800px"></Table>
          <Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>
        </div>





      </div>
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==2">
          <div class="chooseAccept">
            <h3 class="header_one" style="margin-bottom:10px;">登记机关</h3>
            <FormItem label="登记机关" class="ivu-form-item-required">
              <Select v-model="acceptCom" filterable @on-change="chosenAccept" :label-in-value="true">
                <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </div>
          <div class="base-box">
            <h2 class="header_one">特种设备停用报废注销登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="申报种类" prop="registKind">
                <Select v-model="ruleForm.registKind">
                  <Option v-for="item in declarationTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="台数" prop="deviceNum" class="ivu-form-item-required" >
                <Input v-model="ruleForm.deviceNum" disabled ></Input>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName" disabled></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr" disabled></Input>
            </Form-item>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="安全管理员" prop="safeAdministrator">
                <Input v-model="ruleForm.safeAdministrator" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="安全管理员联系电话" prop="mobilePhone">
                <Input v-model="ruleForm.mobilePhone" ></Input>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="11">
              <Form-item label="产权单位名称" prop="propertyComName">
                <Input v-model="ruleForm.propertyComName" disabled></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="产权单位联系电话" prop="propertyComPhone">
                <Input v-model="ruleForm.propertyComPhone"></Input>
              </Form-item>
              </Col>
            </Row>

            <Form ref="formDynamicPres" :model="formDynamicPres" :label-width="140"
                  v-for="(item, index) in formDynamicPres.items"
                  :key="item.id" inline class="formDynamicPres"><!--wang-->
              <Row>
                <Col span="11">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'序号' + (index + 1)+'  '+'设备品种（名称）'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.deviceKind" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
                <Col span="11" offset="2">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'使用登记证编号'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.registCode" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'设备代码'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.eqCode" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'产品编号'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.productCode" placeholder="请输入..."></Input>
                </FormItem>
                </Col>

                <Col span="11" offset="2">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'设备使用地点'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.eqUseAddr" placeholder="请输入..."></Input>
                </FormItem>
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'停用注销报废原因'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.reasons" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
              </Row>

              <!--<FormItem>-->

                <!--<Button type="warning"  style="margin-left:500%;"  @click="handleRemovePres(index)">删除</Button>-->
              <!--</FormItem>-->
              <br>
            </Form>
            <!--<Button type="primary" long @click="handleAddPres" icon="plus-round" >新增</Button>-->



          </div>
          <div class="base-box">
            <h2 class="header_two">其他信息</h2>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="使用单位填表人员" prop="comTablePerson">
                <!--wang-->
                <Input v-model="ruleForm.comTablePerson"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <!--<Form-item label="日期" prop="comPersonDate">-->
              <!--&lt;!&ndash;wang&ndash;&gt;-->
              <!--&lt;!&ndash;<DatePicker v-model="ruleForm.nextTestDate"></DatePicker>&ndash;&gt;-->
              <!--<DatePicker v-model="ruleForm.comPersonDate"></DatePicker>-->
              <!--</Form-item>-->
              </Col>
            </Row>
          </div>

        </div>


        <div class="setTable" v-if="this.active==3" style="width:900px;top:30px;position:absolute">
          <!--<embed  v-bind:src=this.pdfUrl width="100%" height="700px" id="iFramePdf" />-->
          <!--要这两行-->

          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>

          <!--<input type="submit"  value="Print"-->
          <!--name="Submit" id="printbtn"-->
          <!--@click="printPDF(this.pdfUrl)" />-->
          <!--<a href="javascript: w=window.open('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');w.print(); w.close(); ">​​​​​​​​​​​​​​​​​打印pdf</a>-->

          <Button type="primary" @click="before()" v-if="this.active==3">上一步</Button>
          <Button type="success" @click="next()" v-if="this.active==3">下一步</Button>

        </div>
        <div class="pdfInfo" v-if="this.active==4">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Row style="width:1000px;">
            <Col span="10">
            <Form-item label="产权单位的书面委托" :label-width="200">
              <Upload
                ref="upload1"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :before-upload="handleBeforeUpload1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'产权单位的书面委托'+this.fileList[8]"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="产权单位的授权文件" :label-width="200">
              <Upload
                ref="upload2"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'产权单位的授权文件'+this.fileList[1]"
                :before-upload="handleBeforeUpload2"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>

          <h5>上传文件缩略图</h5>
          <div class="demo-upload-list" v-for="(item,index) in uploadList">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
            </div>

          </div>
          <!--<img src="/admin/file/thumbnail?fileId=201" ref="verify"  style="width:300px;height:300px;float:right"-->
          <!--alt="缩略图图片" v-on:click="reflushVerify"/>-->

          <Modal title="查看图片" v-model="visible">
            <iframe id="iFramePdf" v-bind:src=this.pdf style="width:100%;height:1000px;" v-if="visible"></iframe>

          </Modal>

          <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
          <!--<v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>-->
        </div>


        <div class="setApp_button">


          <!--<Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>-->
          <Button type="primary" @click="confirmForm" v-if="this.active==2">下一步</Button>

          <Button @click="instance('success')" v-if="this.active==4">确认提交</Button>

        </div>

      </Form>

    </div>


  </div>
</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../../services/setApp'
  import * as avaivbleService from '../../../services/avaiableDev'



  //import breadCrumb from '../../components/breadCrumb/breadCrumb.vue'
  //import VBreadCrumb from "../../components/breadCrumb/breadCrumb";
  export default {
    data() {
      return {
        fileList:[1,1],
        canStopUseDeviceList: [],
        columnsCanStopUse: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            type: 'index',
            key: 'id',
            width: 60,

          },
          {
            title: '设备品种',
            key: 'deviceKind',
            width:120,
          },
          {
            title: '使用登记证编号',
            key: 'registCode'
          },
          {
            title: '设备代码',
            key: 'eqCode'
          },
          {
            title: '设备使用地点',
            key: 'eqUseAddr'
          },
          {
            title: '产品编号',
            key: 'productCode'
          }
        ],
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        addressCode: '',
        registCode:'',
        deviceType:'',
        acceptCom: '',
        acceptComList: [],
        current: 0,
        ruleForm: {
          registKind: '',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          safeAdministrator: '',
          propertyComPhone: '',
          subList: [],
          comTablePerson: '',
          mobilePhone:'',
        },
        formDynamicPres: {
          items: [
            {
              deviceKind: '',
              registCode: '',
              eqCode: '',
              eqUseAddr: '',
              productCode: '',
              reasons: '',
            }
          ]
        },
        declarationTypeList: [
          {
            value: '停用',
            label: '停用'
          },
          {
            value: '报废',
            label: '报废'
          },
          {
            value: '注销',
            label: '注销'
          },
        ],
        active: 1,
        pdfUrl: '',
        rules: {
          registKind: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
//          deviceNum: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          comTablePerson: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          useComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          useComAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          propertyComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComPhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
        },
        //点击上一步的标志
        creatOrUpdate: false,
        defaultPdfList1: [],
        uploadList: [
          {"url": ''}
        ],
        visible: false,
        applyId: '',
        acceptorAgencyId:'',
        acceptorAgencyName:'',


      }
    },
    components: {},
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getRegistOne",
        "getSelectedNum",
        "getterUserData",
      ]),
    },
    mounted(){
      this.initData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/disabledApp') {
          this.initData();
        }
      }
    },
    methods: {
      ...mapActions(
        [ 'getUserData'],
      ),
      handleAddPres () {
        this.formDynamicPres.items.push({
          deviceKind: '',
          registCode: '',
          eqCode: '',
          eqUseAddr: '',
          productCode: '',
          reasons: '',
        });
        this.ruleForm.subList = this.formDynamicPres.items;

      },
      handleRemovePres (index) {
        this.formDynamicPres.items.splice(index, 1);
        this.ruleForm.subList = this.formDynamicPres.items;
      },
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },
      chosenAccept(value){
        this.acceptorAgencyId = value.value;
        this.acceptorAgencyName = value.label;
      },
      setUserDetailData(){
        this.addressCode = localStorage.getItem('addressCode');
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
//        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.propertyComName = localStorage.getItem('propertyComName');

        if (localStorage.getItem('company') == 'true') {
//          this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
          this.isCompany = true;
//          console.log( this.ruleForm.safeAdministrator)
        } else {
//          this.ruleForm.safeAdministrator = localStorage.getItem('name');
          this.isCompany = false;
        }

      },
      initData(){
        this.fileList=[1,1];
        this.active = 1;
        this.current = 0;
        this.creatOrUpdate = false;
        this.defaultPdfList1 = [];
        this.deviceCode=this.$route.query.deviceCode;
        this.registCode=this.$route.query.registCode;
        this.deviceType=this.$route.query.deviceType;
        this.uploadList = [
          {"url": ''}
        ];
        this.canStopUseDeviceList=[];
        //如果是第一次填写
        this.clearRuleForm();
        this.formDynamicPres.items = [
          {
            deviceKind: '',
            registCode: '',
            eqCode: '',
            eqUseAddr: '',
            productCode: '',
            reasons: '',
          }
        ];
        this.setUserDetailData();
        let params = 'addressCode=' + this.addressCode;
        setAppService.getAccpeter(params).then(res => {
          this.acceptComList = [];
          for (let i = 0, len = res.length; i < len; i++) {
            this.acceptComList.push({value: res[i].id, label: res[i].name});
          }
        }).catch(error => {
          console.log(error);
        })
        params = {
          size: 10,
          processing:false,
          states:[0,1],
        }
        this.getCanStopUseDevice(params);
      },
      getCanStopUseDevice(waitAccparams){
        avaivbleService.GetDevOrders(waitAccparams).then(res => {
            if (res.status === 200) {
              for(let i=0;i<res.data.content.length;i++){
                let canStopUse={
                  deviceKind:res.data.content[i].deviceKind,
                  registCode:res.data.content[i].registCode,
                  eqCode:res.data.content[i].eqCode,
                  eqUseAddr:res.data.content[i].eqUseAddr,
                  productCode:res.data.content[i].productCode,
                  deviceId:res.data.content[i].id,
                }
                this.canStopUseDeviceList.push(canStopUse);

              }

            } else {

            }
          }
        ).catch(error => {
          console.log(error);
        })
      },
      clearRuleForm(){
        this.ruleForm = {
          registKind: '',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          safeAdministrator: '',
          propertyComPhone: '',
          subList: [],
          mobilePhone:'',
          comTablePerson: '',
        }
      },
      submit(submitParam){
        setAppService.submitDisabledInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];

            // this.fileId = res.data.forms[1];
            //this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
            if(this.fileId==0) {
              this.$Modal.remove();
              this.$Message.info('表单已保存，但无法预览，请稍后再试');
            }
            else {
              this.current++;
              this.active++;
              this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
              this.$Modal.remove();
              this.$Message.info('您已提交信息，请预览结果');
            }
            this.modalCertain = false;
          }

        }).catch(error => {
          console.log(error);
          this.$Modal.remove();
          this.$Message.info('提交超时，请稍后再试');

        })
      },
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form5 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam = this.makeParams();
            this.submit(submitParam);
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });
      },
      makeParams(){
        let submitParam = {};
        submitParam.formList = [];
        submitParam.formList.push(this.ruleForm);
        submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
        submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
        submitParam.formList[0].formType = 5;
//        submitParam.deviceId=parseInt(this.deviceCode);
//        submitParam.deviceType=parseInt(this.deviceType);
//        submitParam.eqCodeList=[];
//        for(let i=0;i<this.ruleForm.subList.length;i++){
//          submitParam.eqCodeList.push(this.ruleForm.subList[i].eqCode)
//        }
        submitParam.deviceId = [];
        for (let i = 0; i < this.ruleForm.subList.length; i++) {
          submitParam.deviceId.push(this.ruleForm.subList[i].deviceId)
        }

        //报废申请
        submitParam.applyType = 4;
//        //登记证编号
//        submitParam.registCode =this.registCode;
        //提交设备类别等
        return submitParam;
      },
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let form5 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            // let submitParam=this.makeParams();
            let submitParam = {};
            submitParam.formList = [];
            submitParam.formList.push(this.ruleForm);
            submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
            submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
            submitParam.formList[0].formType = 5;
//            submitParam.deviceId=parseInt(this.deviceCode);
//            submitParam.deviceType=parseInt(this.deviceType);
//            submitParam.eqCodeList=[];
//            for(let i=0;i<this.ruleForm.subList.length;i++){
//              submitParam.eqCodeList.push(this.ruleForm.subList[i].eqCode)
//            }
            submitParam.deviceId = [];
            for (let i = 0; i < this.ruleForm.subList.length; i++) {
              submitParam.deviceId.push(this.ruleForm.subList[i].deviceId)
            }

            //报废申请
            submitParam.applyType = 4;
            //登记证编号
//            submitParam.registCode = this.registCode;
            setAppService.updateSetInfo(submitParam).then(res => {
              if (res.status == 200) {
                this.applyId = res.data.applyId;
                this.fileId = res.data.forms.split("=")[1].split("}")[0];
                //this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
                if(this.fileId==0) {
                  this.$Modal.remove();
                  this.$Message.info('表单已保存，但无法预览，请稍后再试');

                }
                else {
                  this.current++;
                  this.active++;
                  this.pdfUrl = '/admin/file/preview?fileId='+ this.fileId;
                  this.$Modal.remove();
                  this.$Message.info('您已提交信息，请预览结果');
                }
                this.modalCertain = false;
              }

            }).catch(error => {
              console.log(error);
              this.$Modal.remove();
              this.$Message.info('提交超时，请稍后再试');

            })
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });


      },
      next() {
        if(this.ruleForm.subList.length==0){
          this.$Message.info('请选择要报废的设备');
          return
        }
        if (this.current == 5) {
          this.current = 0;
        } else {
          this.current += 1;
        }
        this.active++;

      },
      before() {
        this.current--;
        this.active--;
        if(this.active==2){
          this.creatOrUpdate = true;
        }
      },
      confirmForm () {
        if(this.acceptCom=='' ){
          this.$Notice.error({
            title: '这是通知标题',
            desc: '请选择登记机关'
          });
          return
        }
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            if (this.$route.query.ifold == 1 || (this.creatOrUpdate === true)) {
              this.$Modal.confirm({
                title: '确认登记表信息',
                content: '<p>请确认全部填写信息</p>',
                loading: true,
                onOk: () => {

                  this.updateContent('ruleForm');

                },
                onCancel: () => {
                  this.$Message.info('点击了取消');
                }
              });

            } else {
              this.$Modal.confirm({
                title: '确认登记表信息',
                content: '<p>请确认全部填写信息</p>',
                loading: true,
                onOk: () => {

                  this.submitContent('ruleForm');

                },
                onCancel: () => {
                  this.$Message.info('点击了取消');
                }
              });
            }


          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });

      },

      handleSuccess (res, file) {
        //需要沟通一下，成功给我返回什么然后判断

        // this.uploadList = this.$refs.upload.fileList;
        //this.uploadList[0].name="缩略图";
        if (this.uploadList[0].url === '') {
          this.uploadList[0].url = "/admin" + res.data.thumbnail;
          this.pdfList.push("/admin" + res.data.preview)
        } else {
          this.uploadList.push({"url": "/admin" + res.data.thumbnail});
          this.pdfList.push("/admin" + res.data.preview)

        }

      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc: '请上传pdf格式文件'
        });
      },
      handleRemove(res, file) {
        for (let i = 0; i < this.uploadList.length; i++) {
          if (this.uploadList[i].url == "/admin" + res.response.data.thumbnail) {
            this.uploadList.splice(i, 1);
          }
        }
        if(this.uploadList.length==''){
          this.uploadList = [
            {"url": ''}
          ];
        }

      },
      handleBeforeUpload1 () {
        this.fileList[0]++;
      },
      handleBeforeUpload2 () {
        this.fileList[1]++;
      },
      handleView(index){
        console.log(index);
        this.visible = true;
        this.pdf = this.pdfList[index];
      },
      instance (type) {
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i]<=1){
            this.$Notice.warning({
              title: '通知',
              desc: '请上传全部pdf文件'
            });
            return
          }
        }
        let params = 'applyId=' + this.applyId;
        setAppService.confrimApp(params).then(res => {
          if (res) {
            this.$Modal.confirm({
              title: '通知',
              content: '<p>您已经成功提交申请</p><p>请耐心等待受理结果</p>',
              onOk: () => {
                this.$router.go(0);
              },
              onCancel: () => {
                this.$Message.info('点击了取消');
              }
            });
//            this.$router.push({
//              path: 'devList',
//            });
          }
        }).catch(error => {
          console.log(error);

        })
      },
      selectDevice(selection,row){
        this.formDynamicPres.items=selection;
        this.ruleForm.subList=selection;
        this.ruleForm.deviceNum=selection.length;
      },
      selectDeviceAll(selection){
        this.formDynamicPres.items=selection;
        this.ruleForm.subList=selection;
        this.ruleForm.deviceNum=selection.length;
      },

    }

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

  .setApp {
    color: #495060;
    position: relative;
  }

  .setApp_topbar {
    position: fixed;
    width: 100%;
    margin: 0px;
    padding: 0px;
    height: 80px;
    z-index: 10;
    background-color: white;
  }
  /*wang*/
  .base-box,
  .chooseAccept{
    margin-left: 8%;
    display: block;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    //padding: 3px;
    width: 83.881%;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: border-box;
    background-color: white;

  }
  .chooseAccept {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }


  .header_one {
    text-align: center;
    margin-left: -50px;
    margin-top: 20px;
    font-size: 25px;
  }

  .header_two {
    margin-left: -30px;
    margin-top: 10px;
    font-size: 19px;
  }

  .ivu-form .ivu-form-item-label {
    font-size: 18px;
    background-color: red;
    display: inline-block;

  }

  .bread {
    margin-bottom: 5px;
    margin-top: 10px;
  }

  .setApp_button {
    margin: 10px;
  }

  .city_select_app {

    margin: 0 auto;
    display: block;
    width: 80%;
    padding: 10px;
    background-color: white;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-left: 200px;
    margin-bottom: 10px;

  }

  .city_select_app_exit {
    width: 700px;
    display: block;
    padding: 10px;
    background-color: white;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-left: 200px;
    margin-bottom: 10px;
    .city_select_content {
      border-bottom: 1px solid #dddee1;
      margin-bottom: 5px;
      padding-bottom: 5px;
    }
  }

  .pdfInfo {
    margin: 15px;
  }

  /*.ivu-form-item {*/
  /*margin-bottom: 10px;*/
  /*}*/
  .demo-upload-list {
    display: inline-block;
    width: 150px;
    height: 200px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .formDynamicPres{
    border: 1px solid rgba(0, 0, 0, .2);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-bottom:5px;
    padding-left:5%;
    padding-top:3%;
  }
  .list-box {
    display: block;
    height: auto;
    //border: 1 px solid rgb(229, 229, 229);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;

  }
  .taishu :before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 16px;
    color: #f30;

  }

</style>
