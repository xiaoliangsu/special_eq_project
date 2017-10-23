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
          <Step title="步骤3" content="完成申请"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==1">
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <!--wang-->
            <Form-item label="登记类别" prop="registKind">
              <!--<Select v-model="ruleForm.registKind">-->
                <!--<Option v-for="item in registKindList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
              <!--</Select>-->
            </Form-item>
            <Row>
              <Col span="11"><!--wang-->
              <!--<label class="form_label_left">设备种类</label>-->
              <Form-item label="设备种类" prop="eqSpecies" class="fontsize">
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>设备种类、设备类别、设备品种三者联动</p>
                  </div>
                  <!--<Select v-model="ruleForm.eqSpecies" filterable @on-change="chosenDeviceCategory" :placeholder=this.deviceCategoryPlace>-->
                    <!--<Option v-for="item in deviceCategoryList" :value="item.value" :key="item.value">{{ item.label }}-->
                    <!--</Option>-->
                  <!--</Select>-->
                </Poptip>
              </Form-item>
              <Form-item label="设备品种" prop="eqVariety">
                <!--<Input v-model="ruleForm.eqVariety" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>按照《特种设备目录》填写。没有品种的划“—”</p>
                  </div>
                  <!--<i-input v-model="ruleForm.eqVariety"></i-input>-->
                  <!--<Select v-model="ruleForm.eqVariety" filterable @on-change="chosenDeviceType" :disabled=this.ifDisabled  :placeholder=this.deviceTypePlace>-->
                    <!--<Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}-->
                    <!--</Option>-->
                  <!--</Select>-->
                </Poptip>
              </Form-item>
              <Form-item label="设备代码" prop="eqCode">
                <!--<Input v-model="ruleForm.eqCode" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      按照产品数据表上的内容填写，该代码具有唯一性。如果该产品还没有编制设 备代码，则使用单位可以不填写，由登记机关按照设备代码的编制要求［见《固定式 压力容器安全技术监察规程》(TSG 21—2016)］填写，其中制造单位代号改为登记 机关的行政区划代码(比制造单位代号多一位)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqCode"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="设计使用年限" prop="designUseLimit">
                <Input v-model="ruleForm.designUseLimit"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="设备类别" prop="eqCategory">
                <!--<Input v-model="ruleForm.eqCategory"></Input>-->
                <!--<Select v-model="ruleForm.eqCategory" filterable @on-change="chosenDeviceClass" :placeholder=this.deviceTypePlace>-->
                  <!--<Option v-for="item in deviceClassList" :value="item.value" :key="item.value">{{ item.label }}-->
                  <!--</Option>-->
                <!--</Select>-->
              </Form-item>
              <Form-item label="产品名称" prop="eqName">
                <Input v-model="ruleForm.eqName"></Input>
              </Form-item>
              <Form-item label="型号（规格）" prop="model">
                <Input v-model="ruleForm.model"></Input>
              </Form-item>
              <Form-item label="设计单位名称" prop="designComName">
                <Input v-model="ruleForm.designComName"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span='11'>
              <Form-item label="制造单位名称" prop="manufactureComName">
                <Input v-model="ruleForm.manufactureComName"></Input>
              </Form-item>
              <Form-item label="监督检验机构名称" prop="superviseComName">
                <Input v-model="ruleForm.superviseComName"></Input>
              </Form-item>
              </Col>

              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="施工单位名称" prop="constructComName">
                <Input v-model="ruleForm.constructComName"></Input>
              </Form-item>

              <Form-item label="型式试验机构名称" prop="testComName">
                <Input v-model="ruleForm.testComName"></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="使用单位统一社会信用代码" prop="useComCode">
                <Input v-model="ruleForm.useComCode"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zipCode">
                <Input v-model="ruleForm.zipCode"></Input>
              </Form-item>
              </Col>
            </Row><!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="单位内编号" prop="comCode">
                <Input v-model="ruleForm.comCode"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备使用地点" prop="eqUseLocation">
                <Input v-model="ruleForm.eqUseLocation"></Input>
              </Form-item>
              </Col>
            </Row>

            <Row><!--wang-->
              <Col span="11">
              <Form-item label="投入使用日期" prop="beginUseDate">
                <!--<Input v-model="ruleForm.begin_use_date" ></Input>-->
                <DatePicker v-model="ruleForm.beginUseDate"></DatePicker>  <!--wang-->
              </Form-item>
              <Form-item label="安全管理员" prop="safeAdmin">
                <Input v-model="ruleForm.safeAdmin"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="单位固定电话" prop="comPhone">
                <Input v-model="ruleForm.comPhone"></Input>
              </Form-item>
              <Form-item label="移动电话" prop="mobilePhone">
                <Input v-model="ruleForm.mobilePhone"></Input>
              </Form-item>
              </Col>
            </Row>

            <Form-item label="产权单位名称" prop="propertyComName">
              <Input v-model="ruleForm.propertyComName"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="产权单位统一社会信用代码" prop="propertyComCode">
                <Input v-model="ruleForm.propertyComCode"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="联系电话" prop="telephone">
                <Input v-model="ruleForm.telephone"></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="checkInfo" v-if="this.active==3">-->
          <div class="base-box">
            <h2 class="header_two">设备检验情况</h2>
            <Form-item label="检验机构名称" prop="checkComName">
              <Input v-model="ruleForm.checkComName"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="检验类别" prop="checkCategory">
                <Input v-model="ruleForm.checkCategory"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验报告编号" prop="checkReportNum">
                <Input v-model="ruleForm.checkReportNum"></Input>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="检验日期" prop="checkDate">
                <!--wang-->
                <DatePicker v-model="ruleForm.checkDate"></DatePicker>  <!--wang-->
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验结论" prop="checkConclusion">
                <!--wang-->
                <!--<Select v-model="ruleForm.checkConclusion">-->
                  <!--<Option v-for="item in checkConclusionList" :value="item.value" :key="item.value">{{ item.label }}-->
                  <!--</Option>-->
                <!--</Select>-->
              </Form-item>
              </Col>
            </Row>
            <Form-item label="下次检验日期" prop="nextCheckDate">
              <!--wang-->
              <DatePicker v-model="ruleForm.nextCheckDate"></DatePicker>   <!--wang-->
            </Form-item>
          </div>
          <!--<div class="base-box">-->
          <!--<h2 class="header_two">其他信息</h2>-->
          <!--<p>在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。-->
          <!--</p>-->
          <!--&lt;!&ndash;wang&ndash;&gt;-->
          <!--<p>附产品数据表</p>-->
          <!---->
          <!--</div>-->
          <!--wang-->
          <!--<div class="base-box">-->
          <!--<h2 class="header_two">说明</h2>-->
          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<Form-item label="登记机关登记人员" prop="registPerson">-->
          <!--<Input v-model="ruleForm.registPerson"></Input>-->
          <!--</Form-item>-->

          <!--<Form-item label="使用登记证编号" prop="registCode">-->
          <!--<Input v-model="ruleForm.registCode"></Input>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<Form-item label="登记机关登记人员日期" prop="registDate">-->
          <!--<DatePicker v-model="ruleForm.registDate"></DatePicker>-->
          <!--</Form-item>-->

          <!--<Form-item label="加盖登记机关公章日期" prop="registStampDate">-->
          <!--<DatePicker v-model="ruleForm.registStampDate"></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</div>-->

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
          <Button @click="instance('success')" v-if="this.active==2">确认提交</Button>



        </div>


        <div class="setApp_button">


          <!--<Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>-->
          <Button type="primary" @click="confirmForm" v-if="this.active==1">下一步</Button>

          <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">重置</Button>

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
        current:0,
        ruleForm: {
          registKind: '',
          eqSpecies: '',
          eqCategory: '',
          eqVariety: '',
          eqName: '',
          eqCode: '',
          model: '',
          designUseLimit: '',
          designComName: '',
          manufactureComName: '',
          constructComName: '',
          superviseComName: '',
          testComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipCode: '',
          comCode: '',
          eqUseLocation: '',
          beginUseDate: '',
          comPhone: '',
          safeAdmin: '',
          mobilePhone: '',
          propertyComName: '',
          propertyComCode: '',
          telephone: '',
          checkComName: '',
          checkCategory: '',
          checkReportNum: '',
          checkDate: '',
          checkConclusion: '',
          nextCheckDate: '',

        },
        active: 1,
        pdfUrl: '',
        rules: {},

      }
    },
    components: {



    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/setApp') {
          this.initData();
        }
      }
    },
    methods:{
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            console.log(valid);
            console.log(this.active);
            let form1 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam = {};
            submitParam.form1 = this.ruleForm;
            submitParam.address = this.area || this.city;
            // submitParam.agencies=["12","13"];
            submitParam.approverAgencyId = 12;
            submitParam.acceptorAgencyId = 13;
            submitParam.deviceTypeId = this.device_type;
            submitParam.applyTypeId = 1;
            submitParam.hasFiles = true;
            console.log(submitParam);
            this.submit(submitParam);
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });
        // this.active++;


      },
      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {
          this.applyId = res.data.applyId;
          this.fileId=res.data.files;
          this.pdfUrl='/admin/file/preview?fileId='+this.fileId;
          console.log(this.pdfUrl);
          this.$Message.info('您已提交信息，请预览结果');
          this.modalCertain = false;
          console.log(this.modalCertain);
          if (res.status == true) {
          }

        }).catch(error => {
          console.log(error);

        })
      },
      confirmForm () {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      before() {
        this.current--;
        this.active--;
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
  .setApp_button {
    margin: 10px;
  }





</style>
