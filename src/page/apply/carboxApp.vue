<template>
  <!--按套申请的使用登记表-->
  <div class="carboxApp">
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

      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
        <!--<h2>车用气瓶申请</h2>-->
        <div class="statusInfo" v-if="this.active==2">
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表(车用气瓶)</h2>
            <h2 class="header_two">设备基本情况</h2>
            <Form-item label="设备品种" prop="eq_kind">
              <Input v-model="ruleForm.eq_kind" placeholder="请输入设备品种"></Input>
            </Form-item>
            <Form-item label="产品名称" prop="product_name">
              <Input v-model="ruleForm.product_name" placeholder="请输入产品名称"></Input>
            </Form-item>
            <Form-item label="气瓶数量" prop="cylinder_num">
              <Input v-model="ruleForm.cylinder_num" placeholder="请输入设备代码"></Input>
            </Form-item>
            <Form-item label="充装介质" prop="fill_medium">
              <Input v-model="ruleForm.fill_medium" placeholder="请输入型号（规格）"></Input>
            </Form-item>
            <Form-item label="气瓶公称工作压力" prop="cylinder_work_pressure">
              <Input v-model="ruleForm.cylinder_work_pressure" placeholder="请输入设计使用年限"></Input>
            </Form-item>
            <Form-item label="气瓶容积" prop="cylinder_volume">
              <Input v-model="ruleForm.cylinder_volume" placeholder="请输入设计单位名称"></Input>
            </Form-item>
            <Form-item label="制造单位名称" prop="manu_com_name">
              <Input v-model="ruleForm.manu_com_name" placeholder="请输入制造单位名称"></Input>
            </Form-item>
            <Form-item label="制造日期" prop="manufacture_date">
              <Input v-model="ruleForm.manufacture_date" placeholder="请输入制造单位名称"></Input>
            </Form-item>
            <Form-item label="产品编号" prop="product_num">
              <Input v-model="ruleForm.product_num" placeholder="请输入制造单位名称"></Input>
            </Form-item>
            <Form-item label="单位内编号" prop="company_code">
              <Input v-model="ruleForm.company_code" placeholder="请输入制造单位名称"></Input>
            </Form-item>
            <Form-item label="施工单位名称" prop="constr_com_name">
              <Input v-model="ruleForm.constr_com_name" placeholder="请输入施工单位名称"></Input>
            </Form-item>
            <Form-item label="监督检验机构名称" prop="inspect_com_name">
              <Input v-model="ruleForm.inspect_com_name" placeholder="请输入监督检验机构名称"></Input>
            </Form-item>
          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="use_company_name">
              <Input v-model="ruleForm.use_company_name" placeholder="请输入使用单位名称"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="use_company_addr">
              <Input v-model="ruleForm.use_company_addr" placeholder="请输入使用单位地址"></Input>
            </Form-item>
            <Form-item label="使用单位统一社会信用代码" prop="use_company_code">
              <Input v-model="ruleForm.use_company_code" placeholder="请输入使用单位统一社会信用代码"></Input>
            </Form-item>
            <Form-item label="邮政编码" prop="zipcode">
              <Input v-model="ruleForm.zipcode" placeholder="请输入邮政编码"></Input>
            </Form-item>
            <Form-item label="车牌号" prop="license">
              <Input v-model="ruleForm.license" placeholder="请输入单位内编号"></Input>
            </Form-item>
            <Form-item label="车辆VIN码" prop="vin">
              <Input v-model="ruleForm.vin" placeholder="请输入设备使用地点"></Input>
            </Form-item>
            <Form-item label="投入使用日期" prop="begin_to_use_date">
              <Input v-model="ruleForm.begin_to_use_date" placeholder="请输入投入使用日期"></Input>
            </Form-item>
            <Form-item label="单位固定电话" prop="company_phone">
              <Input v-model="ruleForm.company_phone" placeholder="请输入单位固定电话"></Input>
            </Form-item>
            <Form-item label="安全管理员" prop="safe_administrator">
              <Input v-model="ruleForm.safe_administrator" placeholder="请输入安全管理员"></Input>
            </Form-item>
            <Form-item label="移动电话" prop="mobilePhone">
              <Input v-model="ruleForm.mobilePhone" placeholder="请输入移动电话"></Input>
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
        <!--<v-regist_three :ruleForm="ruleForm"></v-regist_three>-->
        <!--</div>-->
        <!--</Panel>-->
        <!--</Collapse>-->
        <!--</div>-->
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
          <Button type="primary" @click="before()" v-if="this.active==3">上一步</Button>


        </div>

        <!--提交pdf 可能需要调一下格式，以后再说吧-->
        <div class="pdfInfo" v-if="this.active==4">
          <h2 >相关证明</h2>
          <Form-item label="社会信用代码证明" :label-width="300">
            <Upload
              ref="upload"
              :before-upload="handleBeforeUpload"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              action="//jsonplaceholder.typicode.com/posts/"
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
          <Form-item label="锅炉能效证明" :label-width="300" v-if="this.selected[1]=='boiler'">
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

          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>


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
  import regist_three from '../../components/register/registerThree.vue'
  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'
  import VBreadCrumb from "../../components/breadCrumb/breadCrumb";

  export default {
    data() {
      return {
        pdfUrl: 'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',

        ruleForm: {},


        rules: {
//                    kind1: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
//                    use_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
//                    check_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
        },
        ifNext: true,
        active: 1,
        selected: '',
        imgName: '',
        visible: false,
        uploadList: [],
        modal1: false,
        author_key: '',
//        pdfUrl: {
//          锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//        },
        defaultPdfList1: [],
        selectedNum: '',
        deviceNum: 1,
        ruleForms: '',
        value1: '',
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
        device_type:'',

      };
    },
    components: {
      VBreadCrumb,
      'v-regist_three': regist_three,
      //'v-detailPdf': detailPdf,

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getRegistThree",
        "getSelectedNum",
      ]),
    },
    mounted(){
      this.initData();
      setAppService.getProvinces().then(res => {
        //  console.log(res);
        for (let i = 0, len = res.length; i < len; i++) {
          this.provinceList.push({value: res[i].code, label: res[i].name});
        }
      }).catch(error => {
        console.log(error);

      })
      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions(
        ['clearRegistThreeForm', 'setRegistThreeForm'],
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
            this.cityList.push({value: res[i].code, label: res[i].name});
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
            this.areaList.push({value: res[i].code, label: res[i].name});
          }
        }).catch(error => {
          console.log(error);

        })
      },


      initData(){
        this.deviceNum = 1;
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.selected = this.getSelectedOption;
        this.selectedNum = this.getSelectedNum;

        if (this.$route.query.ifold !== 1) {
          // console.log(this.selectedNum);
          this.clearRegistThreeForm();
          this.ruleForm = this.getRegistThree;
          this.defaultPdfList1 = [];
        } else {
          // 获取已经保存的信息
          registService.getRegistThree(this.$route.query.dev_id).then(res => {
//            this.ruleForms = res.success;
//            this.ruleForm = this.ruleForms.ruleForm[0];
//            this.defaultPdfList1 = res.pdfUrl;
//            console.log(res);
//            // this.ruleForm = res.success.ruleForm[0];
            console.log(res);

            this.clearRegistThreeForm();
            this.setRegistThreeForm(res.success.ruleForm[0]);
            console.log(res.success.ruleForm[0]);

            // console.log(this.getRegistOne)
            this.ruleForm = this.getRegistThree;
            console.log(this.getRegistThree);

            console.log(this.ruleForm)
            this.defaultPdfList1 = res.pdfUrlDefault;
          }).catch(error => {
            console.log(error)
          })
        }
      },

//      submitForm(formName) {
//        this.$refs[formName].validate((valid) => {
//          if (valid) {
//            let param = Object.assign({}, this.ruleForm);
//            // console.log(param);
//            this.ifNext = false;
//            setAppService.submitCarboxInfo(param).then(res => {
//              //console.log(res);
//              if (res) {
//                console.log(res.success);
//              }
//              this.active++;
//              this.current++;
//              this.$Message.info('您已提交信息，请预览结果');
//              this.modalCertain = false;
//              console.log(this.modalCertain);
//            })
//              .catch(error => {
//                console.log(error)
//              })
//          } else {
//            console.log('error submit!!');
//            this.$Message.info('尚有信息不符合要求，请检查');
//            return false;
//
//          }
//        });
//      },
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
            submitParam.deviceTypeId=this.device_type;
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
            param.selected = this.selected;
            console.log(param);
            this.ifNext = false;
            setAppService.saveCarboxInfo(param).then(res => {
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
      next(name) {
//        this.$refs[name].validate((valid) => {
//          if (valid) {
////            this.active++;
////            console.log(this.active);
//          }
//        })
//        if (this.active == 1) {
//          this.submitForm('ruleForm');
//        }
//        this.beSure();
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
//      beSure() {
//
//        if(this.deviceNum<this.selectedNum){
//          if(this.selectedNum>this.ruleForms.ruleForm.length)
//          {
//            let len=this.ruleForms.ruleForm.length;
//
//            for(let i=0;i<this.selectedNum-len;i++){
//              this.ruleForms.ruleForm[this.ruleForms.ruleForm.length]={};
//            }
//
//          }
//
//
//          this.deviceNum++;
//          this.active=1;
//          if(!this.ruleForms){
//            this.clearRegistThreeForm();
//            this.ruleForm = this.getRegistThree;
//          }else{
//            this.ruleForm=this.ruleForms.ruleForm[(this.deviceNum-1)];
//
//          }
//
//
//        }else{
//          this.active=2;
//        }
//
//      },
//      beSure() {
//
//        if (this.deviceNum < this.selectedNum) {
//
//          if (this.ruleForms && this.selectedNum > this.ruleForms.ruleForm.length) {
//            let len = this.ruleForms.ruleForm.length;
//
//            for (let i = 0; i < this.selectedNum - len; i++) {
//              this.ruleForms.ruleForm[this.ruleForms.ruleForm.length] = {};
//            }
//
//          }
//
//          this.deviceNum++;
//          this.active = 1;
//          if (!this.ruleForms) {
//            this.clearRegistThreeForm();
//            this.ruleForm = this.getRegistThree;
//          } else {
//            this.$Modal.success({
//
//              content: "请继续填写下一台(套)的登记表"
//            });
//            this.ruleForm = this.ruleForms.ruleForm[(this.deviceNum - 1)];
//
//          }
//
//
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
    border: 1px solid #dddee1;
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
    margin-left: -100px;
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
</style>
