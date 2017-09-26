<template>
  <!--按套申请的使用登记表-->
  <div class="setApp">
    <div class="setApp_topbar">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->
      <div class="step" style="width:85%; margin-top:20px;">
        <Steps :current="current">
          <Step title="步骤1" content="填写基本信息"></Step>
          <Step title="步骤2" content="填写特种设备使用登记表"></Step>
          <Step title="步骤3" content="预览特种设备使用登记表"></Step>
          <Step title="步骤4" content="提交相关证件"></Step>
          <Step title="步骤5" content="完成申请"></Step>
        </Steps>
      </div>
    </div>

    <div class="setApp_content" style="position:absolute;top:85px;">
      <div class="city_select_app" v-if="this.active==1">
        <h2 class="header_one">基本信息</h2>

        <label>选择城市：</label>
        <Row>
          <Col span="8" style="padding-right:10px">
          <Select v-model="province" filterable @on-change="chosenPro">
            <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="8" style="padding-right:10px">
          <Select v-model="city" filterable @on-change="chosenCity">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="8">
          <Select v-model="area" filterable>
            <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <label>选择受理单位：</label>
        <Select v-model="acceptCom" filterable>
          <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <label>选择审批单位：</label>
        <Select v-model="checkCom" filterable>
          <Option v-for="item in checkComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==2">
          <!--<h2>选择设备种类</h2>-->
          <!--<Select v-model="deviceType" style="width:200px">-->
          <!--<Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <Row>
              <Col span="11">
              <!--<label class="form_label_left">设备种类</label>-->
              <Form-item label="设备种类" prop="eq_species" class="fontsize">
                <Input v-model="ruleForm.eq_species" placeholder="请输入设备种类"></Input>
                <!--<Input v-model="ruleForm.eq_species" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>-->
              </Form-item>
              <Form-item label="设备品种" prop="eq_variety">
                <Input v-model="ruleForm.eq_variety" placeholder="请输入设备品种"></Input>
              </Form-item>
              <Form-item label="设备代码" prop="eq_code">
                <Input v-model="ruleForm.eq_code" placeholder="请输入设备代码"></Input>
              </Form-item>
              <Form-item label="设计使用年限" prop="design_use_limit">
                <Input v-model="ruleForm.design_use_limit" placeholder="请输入设计使用年限"></Input>
              </Form-item>
              <Form-item label="制造单位名称" prop="manufacture_com_name">
                <Input v-model="ruleForm.manufacture_com_name" placeholder="请输入制造单位名称"></Input>
              </Form-item>
              <Form-item label="监督检验机构名称" prop="supervise_com_name">
                <Input v-model="ruleForm.supervise_com_name" placeholder="请输入监督检验机构名称"></Input>
              </Form-item>
              </Col>

              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="设备类别" prop="eq_category">
                <Input v-model="ruleForm.eq_category" placeholder="请输入设备类别"></Input>
              </Form-item>
              <Form-item label="产品名称" prop="eq_name">
                <Input v-model="ruleForm.eq_name" placeholder="请输入产品名称"></Input>
              </Form-item>
              <Form-item label="型号（规格）" prop="model">
                <Input v-model="ruleForm.model" placeholder="请输入型号（规格）"></Input>
              </Form-item>
              <Form-item label="设计单位名称" prop="design_com_name">
                <Input v-model="ruleForm.design_com_name" placeholder="请输入设计单位名称"></Input>
              </Form-item>
              <Form-item label="施工单位名称" prop="construct_com_name">
                <Input v-model="ruleForm.construct_com_name" placeholder="请输入施工单位名称"></Input>
              </Form-item>

              <Form-item label="型式试验机构名称" prop="test_com_name">
                <Input v-model="ruleForm.test_com_name" placeholder="请输入型式试验机构名称"></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="use_com_name">
              <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="use_com_addr">
              <Input v-model="ruleForm.use_com_addr" placeholder="请输入使用单位地址"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="使用单位统一社会信用代码" prop="use_com_code">
                <Input v-model="ruleForm.use_com_code" placeholder="请输入使用单位统一社会信用代码"></Input>
              </Form-item>
              <Form-item label="单位内编号" prop="com_code">
                <Input v-model="ruleForm.com_code" placeholder="请输入单位内编号"></Input>
              </Form-item>
              <Form-item label="投入使用日期" prop="begin_use_date">
                <Input v-model="ruleForm.begin_use_date" placeholder="请输入投入使用日期"></Input>
              </Form-item>
              <Form-item label="安全管理员" prop="safe_admin">
                <Input v-model="ruleForm.safe_admin" placeholder="请输入安全管理员"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zip_code">
                <Input v-model="ruleForm.zip_code" placeholder="请输入邮政编码"></Input>
              </Form-item>
              <Form-item label="设备使用地点" prop="eq_use_location">
                <Input v-model="ruleForm.eq_use_location" placeholder="请输入设备使用地点"></Input>
              </Form-item>
              <Form-item label="单位固定电话" prop="com_phone">
                <Input v-model="ruleForm.com_phone" placeholder="请输入单位固定电话"></Input>
              </Form-item>
              <Form-item label="移动电话" prop="mobile_phone">
                <Input v-model="ruleForm.mobile_phone" placeholder="请输入移动电话"></Input>
              </Form-item>
              </Col>
            </Row>

            <Form-item label="产权单位名称" prop="property_com_name">
              <Input v-model="ruleForm.property_com_name" placeholder="请输入产权单位名称"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="产权单位统一社会信用代码" prop="property_com_code">
                <Input v-model="ruleForm.property_com_code" placeholder="请输入产权单位统一社会信用代码"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="联系电话" prop="telephone">
                <Input v-model="ruleForm.telephone" placeholder="请输入联系电话"></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="checkInfo" v-if="this.active==3">-->
          <div class="base-box">
            <h2 class="header_two">设备检验情况</h2>
            <Form-item label="检验机构名称" prop="check_com_name">
              <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="检验类别" prop="check_category">
                <Input v-model="ruleForm.check_category" placeholder="请输入检验类别"></Input>
              </Form-item>
              <Form-item label="检验日期" prop="check_date">
                <Input v-model="ruleForm.check_date" placeholder="请输入检验日期"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验报告编号" prop="check_report_num">
                <Input v-model="ruleForm.check_report_num" placeholder="请输入检验报告编号"></Input>
              </Form-item>
              <Form-item label="检验结论" prop="check_conclusion">
                <Input v-model="ruleForm.check_conclusion" placeholder="请输入检验结论"></Input>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="下次检验日期" prop="next_check_date">
              <Input v-model="ruleForm.next_check_date" placeholder="请输入下次检验日期"></Input>
            </Form-item>
          </div>
          <div class="base-box">
            <h2 class="header_two">其他信息</h2>
            <p>在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特
              种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。
            </p>

            <Row>
              <Col span="11">
              <Form-item label="使用单位填表人员" prop="check_com_name">
                <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
              </Form-item>

              <Form-item label="使用单位安全管理人员" prop="check_date">
                <Input v-model="ruleForm.check_date" placeholder="请输入检验日期"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="使用单位填表人员日期" prop="check_category">
                <Input v-model="ruleForm.check_category" placeholder="请输入检验类别"></Input>
              </Form-item>
              <Form-item label="安全管理人员填表日期" prop="check_report_num">
                <Input v-model="ruleForm.check_report_num" placeholder="请输入检验报告编号"></Input>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="加盖公章日期" prop="check_conclusion">
              <Input v-model="ruleForm.check_conclusion" placeholder="请输入检验结论"></Input>
            </Form-item>
          </div>
        </div>

        <!--让用户确认信息的表格-->
        <!--<div class="setTable" v-if="this.active==1">-->
        <!--<Alert closable>请确认表格信息是否全部正确</Alert>-->
        <!--<Collapse v-model="value1">-->
        <!--<Panel name="1">-->
        <!--<span class="panel_content">特种设备使用登记表</span>-->
        <!--<div slot="content">-->
        <!--<v-regist_one :ruleForm="ruleForm"></v-regist_one>-->
        <!--<Button @click="addElecSeal()" v-if="this.active==1">添加</Button>-->

        <!--</div>-->
        <!--</Panel>-->
        <!--</Collapse>-->
        <!--&lt;!&ndash;<embed  v-bind:src=this.pdfUrl width="100%" height="1000px"/>&ndash;&gt;-->
        <!--&lt;!&ndash;<iframe v-bind:src=this.pdfUrl  style="width:718px; height:700px;" frameborder="0"></iframe>&ndash;&gt;-->
        <!--&lt;!&ndash;<v-regist_one :ruleForm="ruleForm"></v-regist_one>&ndash;&gt;-->
        <!--</div>-->
        <!--让用户预览信息的表格-->
        <div class="setTable" v-if="this.active==3" style="width:900px;top:30px;position:absolute">
          <!--<embed  v-bind:src=this.pdfUrl width="100%" height="700px" id="iFramePdf" />-->
          <!--要这两行-->

          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <input type="button"  value="打印" @click="printTrigger('iFramePdf');" />

          <!--<input type="submit"  value="Print"-->
          <!--name="Submit" id="printbtn"-->
          <!--@click="printPDF(this.pdfUrl)" />-->
          <!--<a href="javascript: w=window.open('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');w.print(); w.close(); ">​​​​​​​​​​​​​​​​​打印pdf</a>-->
          <Button type="primary" @click="next()" v-if="this.active==3">下一步</Button>

        </div>


        <!--提交pdf 可能需要调一下格式，以后再说吧-->
        <div class="pdfInfo" v-if="this.active==4">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Form-item label="社会信用代码证明" :label-width="300">
            <Upload
              ref="upload"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              action="/admin/upload?applyId=1&fileTypeId=1"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>

          </Form-item>
          <Form-item label="产品合格证" :label-width="300">
            <Upload action="//jsonplaceholder.typicode.com/posts/"
                    :on-success="handleSuccess"
                    with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Form-item>
          <Form-item label="监督检验证明" :label-width="300">
            <Upload action="//jsonplaceholder.typicode.com/posts/"
                    :on-success="handleSuccess"
                    with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Form-item>
          <Form-item label="锅炉能效证明" :label-width="300" v-if="this.deviceType=='boiler'">
            <Upload action="//jsonplaceholder.typicode.com/posts/"
                    :on-success="handleSuccess"
                    with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
          </Form-item>
          <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
          <!--<v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>-->
        </div>


        <div class="setApp_button">


          <Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>
          <Button type="primary" @click="confirmForm" v-if="this.active==2">下一步</Button>

          <!--<Button type="primary" @click="before()" v-if="this.active==3">上一步</Button>-->


          <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

          <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
          <Button @click="instance('success')" v-if="this.active==4">确认提交</Button>
          <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active==2">重置</Button>
          <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active==2">保存</Button>

        </div>

      </Form>
    </div>

  </div>
</template>
<script>
  import regist_one from '../../components/register/registerOne.vue'
  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'
  //import breadCrumb from '../../components/breadCrumb/breadCrumb.vue'
  import VBreadCrumb from "../../components/breadCrumb/breadCrumb";
  export default {
    data() {
      return {
        //等调的时候再拼接口
        //pdfUrl: '/admin/download?fileId=101',
         pdfUrl: '/admin/file/preview?fileId=101',
        deviceList: [
          {
            value: 'boiler',
            label: '锅炉',
          }, {
            value: 'pressure',
            label: '压力容器（气瓶除外）'
          }, {
            value: 'elevator',
            label: '电梯'
          }, {
            value: 'hoisting',
            label: '起重机械'
          }, {
            value: 'cableway',
            label: '客运索道'
          }, {
            value: 'play',
            label: '大型游乐设施'
          }, {
            value: 'factorycar',
            label: '场 (厂)内专用机动车辆'
          },
        ],
        deviceType: '',
        ruleForm: {},


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
        active: 1,
        //selected: '',
        //imgName: '',
        //visible: false,
        uploadList: [],
        //modal1: false,
        modalCertain: false,
        author_key: '',
//        pdfUrl: {
//          锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//        },
        defaultPdfList1: [],
        //selectedNum: '',
        //deviceNum: 1,
        ruleForms: '',
        //previousNum: 0,
        value1: '',
        bread_choose_value: '',
        bread_choose: '',
        current: 0,

        province: '',
        city: '',
        provinceList: [],
        cityList: [],
        area: '',
        areaList: [],
        acceptCom: '',
        acceptComList: [],
        checkCom: '',
        checkComList: [],


      };
    },
    components: {
      VBreadCrumb,
      'v-regist_one': regist_one,
      //'v-breadCrumb':breadCrumb,
      // 'v-detailPdf': detailPdf,

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getRegistOne",
        "getSelectedNum",
      ]),
    },
    mounted(){
      this.initData();
      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions(
        ['clearRegistOneForm', 'setRegistOneForm'],
      ),
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },
      chosenPro(value){
        let params = 'provinceCode=' + value;
        setAppService.getCities(params).then(res => {
          console.log(res);
          for (let i = 0, len = res.length; i < len; i++) {
            this.cityList.push({value: res[i].code, label: res[i].id});
          }
        }).catch(error => {
          console.log(error);

        })

      },
      chosenCity(value){
        let params = 'cityCode=' + value;
        setAppService.getArea(params).then(res => {
          console.log(res);
          for (let i = 0, len = res.length; i < len; i++) {
            this.areaList.push({value: res[i].code, label: res[i].id});
          }
        }).catch(error => {
          console.log(error);

        })
      },


      initData(){
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.bread_choose_value = this.$route.query.device_detail;
        for (let i = 0; i < this.deviceList.length; i++) {
          if (this.deviceList[i].value == this.bread_choose_value) {
            this.bread_choose = this.deviceList[i].label;
          }
        }
        setAppService.getProvinces().then(res => {
          console.log(res);
          for (let i = 0, len = res.length; i < len; i++) {
            this.provinceList.push({value: res[i].code, label: res[i].id});
          }
        }).catch(error => {
          console.log(error);

        })
        //如果是第一次填写
        if (this.$route.query.ifold !== 1) {
          this.clearRegistOneForm();
          this.ruleForm = this.getRegistOne;
          this.defaultPdfList1 = [];
        } else {
          // 获取已经保存的信息
          registService.getRegistOne(this.$route.query.dev_id).then(res => {

            // this.ruleForm = res.success.ruleForm[0];
            this.clearRegistOneForm();
            this.setRegistOneForm(res.success.ruleForm[0]);

            // console.log(this.getRegistOne)
            this.ruleForm = this.getRegistOne;
            this.defaultPdfList1 = res.pdfUrlDefault;

          }).catch(error => {
            console.log(error)
          })

        }

      },
//提交表单
      submitForm(formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            let param = Object.assign({}, this.ruleForm);
//            //把选择的哪一项带进去
//            param.selected = this.deviceType;
//            console.log(this.deviceType);
//            setAppService.submitSetInfo(param).then(res => {
//
//              if (res) {
//                console.log(res.success);
//              }
//              this.active++;
//              this.modalCertain=false;
//              console.log(this.modalCertain);
//            })
//              .catch(error => {
//                console.log(error)
//              })
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            console.log(valid);
            console.log(this.active);
            let form1 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam={};
            submitParam.form1=this.ruleForm;
            submitParam.address=this.area||this.city;
           // submitParam.agencies=["12","13"];
            submitParam.approverAgencyId=12;
            submitParam.acceptorAgencyId=13;
            submitParam.deviceTypeId=1;
            submitParam.applyTypeId=1;
            submitParam.hasFiles=true;
            console.log(submitParam);
            setAppService.submitSetInfo(submitParam).then(res => {
//              console.log(res);
//              this.active++;
//              this.current++;
              this.$Message.info('您已提交信息，请预览结果');
              this.modalCertain = false;
              console.log(this.modalCertain);
              if(res.status==true){

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
        // this.active++;


//        setAppService.getRegistOne("fileId=101").then(res => {
//
//          //pdf信息
//          console.log(res);
//          this.pdfUrl = res.data;
//          //获取对象长度
//         // this.pdfNum = Object.keys(this.pdfUrl).length;
//
//
//        }).catch(error => {
//          console.log(error)
//        })
      },
      saveForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            param.selected = this.deviceType;
            console.log(param);
            setAppService.saveSetInfo(param).then(res => {
              if (res) {
                console.log(res.success);
              }
            })
              .catch(error => {
                console.log(error)
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
        if (this.current == 4) {
          this.current = 0;
        } else {
          this.current += 1;
        }
        this.active++;

      },
      before() {
        this.active--;
      },

      confirmForm () {
        this.$Modal.confirm({
          title: '确认登记表信息',
          content: '<p>请确认全部填写信息</p><p>点击"确认"后不可更改</p>',
          onOk: () => {

            this.submitForm('ruleForm');

          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });
      },
      remoteMethod1 (query) {
        if (query !== '') {
          this.loading1 = true;
          setAppService.getProvinces().then(res => {
            console.log(res);
          }).catch(error => {
            console.log(error);

          })


//          setTimeout(() => {
//            this.loading1 = false;
//            const list = this.list.map(item => {
//              return {
//                value: item,
//                label: item
//              };
//            });
//            this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
//          }, 200);

        } else {
          this.options1 = [];
        }
      },
      remoteMethod2 (query) {
        if (query !== '') {
          this.loading2 = true;
          setTimeout(() => {
            this.loading2 = false;
            const list = this.list.map(item => {
              return {
                value: item,
                label: item
              };
            });
            this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
          }, 200);
        } else {
          this.options2 = [];
        }
      },
      handleBeforeUpload () {
        this.uploadList = this.$refs.upload.fileList;
        const check = this.uploadList.length < 1;

        if (!check) {
          this.$Notice.warning({
            title: '最多上传 1 张图片。'
          });
        }
        return check;
      },
      handleSuccess (res, file) {
        //需要沟通一下，成功给我返回什么然后判断
        console.log(res);
        console.log(file);

      },
      handleRemove(res, file) {
        //res是移除的 file剩下的
        console.log(res);
        console.log(file);

      },

      instance (type) {
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
    },


//      beSure() {
//        //deviceNum用来计数
//        if (this.deviceNum < this.selectedNum) {
//          //如果未提交订单更改了套数
//          if (this.ruleForms && this.selectedNum > this.ruleForms.ruleForm.length) {
//            let len = this.ruleForms.ruleForm.length;
//
//            for (let i = 0; i < this.selectedNum - len; i++) {
//              this.ruleForms.ruleForm[this.ruleForms.ruleForm.length] = {};
//            }
//          }
//          this.deviceNum++;
//          this.active = 1;
//          this.$Modal.success({
//            content: "请继续填写下一台(套)的登记表"
//          });
//          if (!this.ruleForms) {
//            this.clearRegistOneForm();
//
//            this.ruleForm = this.getRegistOne;
//          } else {
//            this.ruleForm = this.ruleForms.ruleForm[(this.deviceNum - 1)];
//
//          }
//        } else {
//          this.active = 2;
//        }
//
//      },
//      createPdf() {
////                let newWindow = window.open("_blank");   //打开新窗口
////                let codestr = document.getElementById("pdf-wrap").innerHTML;   //获取需要生成pdf页面的div代码
////                newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
////                newWindow.document.close();     //关闭document的输出流, 显示选定的数据
////                newWindow.print();   //打印当前窗口
////                return true;
//
//        window.print();
//      },


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
    margin: 0 auto;
    display: block;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    //padding: 3px;
    width: 80%;
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

  /*.ivu-form-item {*/
  /*margin-bottom: 10px;*/
  /*}*/


</style>
