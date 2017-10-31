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
          <Step title="步骤1" content="填写《特种设备停用报废注销登记表》"></Step>
          <Step title="步骤2" content="预览《特种设备停用报废注销登记表》"></Step>
          <Step title="步骤3" content="提交相关证件"></Step>
          <Step title="步骤4" content="完成申请"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==1">
          <div class="base-box">
            <h2 class="header_one">特种设备停用报废注销登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="申报种类" prop="declarationType">
                <Select v-model="ruleForm.declarationType">
                  <Option v-for="item in declarationTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="台数" prop="noUseNum">
                <Input v-model="ruleForm.noUseNum"></Input>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="安全管理员" prop="safeAdmin">
                <Input v-model="ruleForm.safeAdmin"></Input>
              </Form-item>
              <Form-item label="产权单位名称" prop="propertyComName">
                <Input v-model="ruleForm.propertyComName"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="安全管理员联系电话" prop="safeAdminTelephone">
                <Input v-model="ruleForm.safeAdminTelephone"></Input>
              </Form-item>
              <Form-item label="产权单位联系电话" prop="propertyComTelephone">
                <Input v-model="ruleForm.propertyComTelephone"></Input>
              </Form-item>
              </Col>
            </Row>
            <Form ref="formDynamicPres" :model="formDynamicPres" :label-width="140"
                  v-for="(item, index) in formDynamicPres.items"
                  :key="item.id" inline>
              <Row>
                <Col span="8">
                <FormItem
                  :key="index"
                  :label="'序号' + (index + 1)+'  '+'设备品种（名称）'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.eqVariety" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
                <Col span="8">

                <FormItem
                  :key="index"
                  :label="'使用登记证编号'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.registCode" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem
                  :key="index"
                  :label="'设备代码'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.eqCode" placeholder="请输入..."></Input>
                </FormItem>
                </Col>

              </Row>
              <Row>
                <Col span="8">
                <FormItem
                  :key="index"
                  :label="'设备使用地点'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.eqUseLocation" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem
                  :key="index"
                  :label="'产品编号'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.productNum" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
                <Col span="8">
                <FormItem
                  :key="index"
                  :label="'停用注销报废原因'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.noUseReason" placeholder="请输入..."></Input>
                </FormItem>
                </Col>
              </Row>
              <FormItem>

                <Button type="dashed" long @click="handleAddPres" icon="plus-round">新增</Button>
              </FormItem>
              <FormItem>

                <Button type="ghost" @click="handleRemovePres(index)">删除</Button>
              </FormItem>
              <br>
            </Form>


          </div>

        </div>


        <div class="setTable" v-if="this.active==2" style="width:900px;top:30px;position:absolute">
          <!--<embed  v-bind:src=this.pdfUrl width="100%" height="700px" id="iFramePdf" />-->
          <!--要这两行-->

          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>

          <!--<input type="submit"  value="Print"-->
          <!--name="Submit" id="printbtn"-->
          <!--@click="printPDF(this.pdfUrl)" />-->
          <!--<a href="javascript: w=window.open('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');w.print(); w.close(); ">​​​​​​​​​​​​​​​​​打印pdf</a>-->

          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>
          <Button type="primary" @click="next()" v-if="this.active==2">下一步</Button>

        </div>
        <div class="pdfInfo" v-if="this.active==3">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Row style="width:1000px;">
            <Col span="10">
            <Form-item label="社会信用代码证明" :label-width="200">
              <Upload
                ref="upload1"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :before-upload="handleBeforeUpload"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="个人身份证明" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
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
          <Button type="primary" @click="confirmForm" v-if="this.active==1">下一步</Button>

          <Button @click="instance('success')" v-if="this.active==3">确认提交</Button>

        </div>

      </Form>

    </div>


  </div>
</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../../services/setApp'


  //import breadCrumb from '../../components/breadCrumb/breadCrumb.vue'
  //import VBreadCrumb from "../../components/breadCrumb/breadCrumb";
  export default {
    data() {
      return {
        current: 0,
        ruleForm: {
          declarationType: '',
          noUseNum: '',
          useComName: '',
          useComAddr: '',
          safeAdmin: '',
          propertyComTelephone: '',
          subList: [],

        },
        formDynamicPres: {
          items: [
            {
              eqVariety: '',
              registCode: '',
              eqCode: '',
              eqUseLocation: '',
              productNum: '',
              noUseReason: '',
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
        rules: {},
        //点击上一步的标志
        creatOrUpdate: false,
        defaultPdfList1: [],
        uploadList: [
          {"url": ''}
        ],
        visible: false,
        applyId: '',


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
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/stopUseApp') {
          this.initData();
        }
      }
    },
    methods: {
      ...mapActions(
        ['clearRegistOneForm', 'setRegistOneForm', 'getUserData'],
      ),
      handleAddPres () {
        this.formDynamicPres.items.push({
          eqVariety: '',
          registCode: '',
          eqCode: '',
          eqUseLocation: '',
          productNum: '',
          noUseReason: '',
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
      setUserDetailData(){
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        console.log(this.ruleForm.useComName);
      },
      initData(){
        this.active = 1;
        this.current = 0;
        this.creatOrUpdate = false;
        this.defaultPdfList1 = [];
        this.device_type = this.$route.query.device_type;
        this.uploadList = [
          {"url": ''}
        ];
        //如果是第一次填写
        this.clearRuleForm();
        this.formDynamicPres.items = [
          {
            eqVariety: '',
            registCode: '',
            eqCode: '',
            eqUseLocation: '',
            productNum: '',
            noUseReason: '',
          }
        ];
        this.setUserDetailData();
      },
      clearRuleForm(){
        this.ruleForm = {
          declarationType: '',
          noUseNum: '',
          useComName: '',
          useComAddr: '',
          safeAdmin: '',
          propertyComTelephone: '',
          subList: [],
        }
      },
      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];

            // this.fileId = res.data.forms[1];
            this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
            this.$Message.info('您已提交信息，请预览结果');
            this.modalCertain = false;
          }

        }).catch(error => {
          console.log(error);

        })
      },
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
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
        //提交表单1
        this.ruleForm.eqSpecies = this.deviceCategoryId;
        this.ruleForm.eqCategory = this.deviceClassId;
        this.ruleForm.eqVariety = this.deviceClassTypeId;

        submitParam.form5 = this.ruleForm;
        //受理机关名称
        submitParam.acceptorAgencyId = 1;
        //设备类别
        if (this.device_type) {
          submitParam.deviceType = parseInt(this.device_type);
        } else {
          submitParam.deviceType = parseInt(this.$route.query.device_type);
        }
        //报废申请
        submitParam.applyType = 3;
        //提交设备类别等
        submitParam.deviceCategory = this.deviceCategoryId;
        submitParam.deviceClass = this.deviceClassId;
        submitParam.deviceKind = this.deviceClassTypeId;
        submitParam.deivceCode = this.ruleForm.eqCode;
        submitParam.deivceName = this.ruleForm.eqName;
        return submitParam;
      },
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            let form5 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            // let submitParam=this.makeParams();
            let submitParam = {};
            this.ruleForm.eqSpecies = this.deviceCategoryId;
            this.ruleForm.eqCategory = this.deviceClassId;
            this.ruleForm.eqVariety = this.deviceClassTypeId;
            submitParam.form5 = this.ruleForm;
            submitParam.id = this.$route.query.applyId;
            submitParam.deviceClass = this.deviceClassId;
            submitParam.deviceKind = this.deviceClassTypeId;
            setAppService.updateSetInfo(submitParam).then(res => {

              if (res.status == 200) {
                this.applyId = res.data.applyId;
                this.fileId = res.data.forms.split("=")[1].split("}")[0];
                this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
                this.$Message.info('您已提交信息，请预览结果');
                this.modalCertain = false;
              }

            }).catch(error => {
              console.log(error);

            })
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });


      },
      next() {
        if (this.current == 4) {
          this.current = 0;
        } else {
          this.current += 1;
        }
        this.active++;

      },
      before() {
        this.current--;
        this.active--;
        this.creatOrUpdate = true;
      },
      confirmForm () {
        if (this.$route.query.ifold == 1 || (this.creatOrUpdate === true)) {
          this.$Modal.confirm({
            title: '确认登记表信息',
            content: '<p>请确认全部填写信息</p>',
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
            onOk: () => {

              this.submitContent('ruleForm');

            },
            onCancel: () => {
              this.$Message.info('点击了取消');
            }
          });
        }

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
      handleRemove(res, file) {
        //res是移除的 file剩下的
        console.log(res);
        console.log(file);
        this.uploadList.pop();
        console.log(this.uploadList);

      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 2;
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 2 张图片。'
          });
        }
        return check;
      },
      handleView(index){
        console.log(index);
        this.visible = true;
        this.pdf = this.pdfList[index];
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

  .base-box {
    margin-left: 140px;
    display: block;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    //padding: 3px;
    width: 100%;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: border-box;
    background-color: white;

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

</style>
