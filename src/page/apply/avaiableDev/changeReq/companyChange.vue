<template>
  <!--按套申请的使用登记表-->
  <div class="companyChange">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
      <h2></h2>
      <div class="statusInfo" v-if="this.active==1">
        <h2>改造变更</h2>
        <h2>设备基本情况</h2>
        <Form-item label="设备种类" prop="eq_species">
          <Input v-model="ruleForm.eq_species" placeholder="请输入设备种类"></Input>
        </Form-item>
        <Form-item label="设备类别" prop="eq_category">
          <Input v-model="ruleForm.eq_category" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="eq_variety">
          <Input v-model="ruleForm.eq_variety" placeholder="请输入设备品种"></Input>
        </Form-item>
        <Form-item label="产品名称" prop="eq_name">
          <Input v-model="ruleForm.eq_name" placeholder="请输入产品名称"></Input>
        </Form-item>
        <Form-item label="设备代码" prop="eq_code">
          <Input v-model="ruleForm.eq_code" placeholder="请输入设备代码"></Input>
        </Form-item>
        <Form-item label="型号（规格）" prop="model">
          <Input v-model="ruleForm.model" placeholder="请输入型号（规格）"></Input>
        </Form-item>
        <Form-item label="设计使用年限" prop="design_use_limit">
          <Input v-model="ruleForm.design_use_limit" placeholder="请输入设计使用年限"></Input>
        </Form-item>
        <Form-item label="设计单位名称" prop="design_com_name">
          <Input v-model="ruleForm.design_com_name" placeholder="请输入设计单位名称"></Input>
        </Form-item>
        <Form-item label="制造单位名称" prop="manufacture_com_name">
          <Input v-model="ruleForm.manufacture_com_name" placeholder="请输入制造单位名称"></Input>
        </Form-item>
        <Form-item label="施工单位名称" prop="construct_com_name">
          <Input v-model="ruleForm.construct_com_name" placeholder="请输入施工单位名称"></Input>
        </Form-item>
        <Form-item label="监督检验机构名称" prop="supervise_com_name">
          <Input v-model="ruleForm.supervise_com_name" placeholder="请输入监督检验机构名称"></Input>
        </Form-item>
        <Form-item label="型式试验机构名称" prop="test_com_name">
          <Input v-model="ruleForm.test_com_name" placeholder="请输入型式试验机构名称"></Input>
        </Form-item>
        <!--</div>-->
        <!--<div class="useInfo" v-if="this.active==2">-->
        <h2>设备使用情况</h2>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位地址" prop="use_com_addr">
          <Input v-model="ruleForm.use_com_addr" placeholder="请输入使用单位地址"></Input>
        </Form-item>
        <Form-item label="使用单位统一社会信用代码" prop="use_com_code">
          <Input v-model="ruleForm.use_com_code" placeholder="请输入使用单位统一社会信用代码"></Input>
        </Form-item>
        <Form-item label="邮政编码" prop="zip_code">
          <Input v-model="ruleForm.zip_code" placeholder="请输入邮政编码"></Input>
        </Form-item>
        <Form-item label="单位内编号" prop="com_code">
          <Input v-model="ruleForm.com_code" placeholder="请输入单位内编号"></Input>
        </Form-item>
        <Form-item label="设备使用地点" prop="eq_use_location">
          <Input v-model="ruleForm.eq_use_location" placeholder="请输入设备使用地点"></Input>
        </Form-item>
        <Form-item label="投入使用日期" prop="begin_use_date">
          <Input v-model="ruleForm.begin_use_date" placeholder="请输入投入使用日期"></Input>
        </Form-item>
        <Form-item label="单位固定电话" prop="com_phone">
          <Input v-model="ruleForm.com_phone" placeholder="请输入单位固定电话"></Input>
        </Form-item>
        <Form-item label="安全管理员" prop="safe_admin">
          <Input v-model="ruleForm.safe_admin" placeholder="请输入安全管理员"></Input>
        </Form-item>
        <Form-item label="移动电话" prop="mobile_phone">
          <Input v-model="ruleForm.mobile_phone" placeholder="请输入移动电话"></Input>
        </Form-item>
        <Form-item label="产权单位名称" prop="property_com_name">
          <Input v-model="ruleForm.property_com_name" placeholder="请输入产权单位名称"></Input>
        </Form-item>
        <Form-item label="产权单位统一社会信用代码" prop="property_com_code">
          <Input v-model="ruleForm.property_com_code" placeholder="请输入产权单位统一社会信用代码"></Input>
        </Form-item>
        <Form-item label="联系电话" prop="telephone">
          <Input v-model="ruleForm.telephone" placeholder="请输入联系电话"></Input>
        </Form-item>
        <!--</div>-->
        <!--<div class="checkInfo" v-if="this.active==3">-->
        <h2>设备检验情况</h2>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验类别" prop="check_category">
          <Input v-model="ruleForm.check_category" placeholder="请输入检验类别"></Input>
        </Form-item>
        <Form-item label="检验报告编号" prop="check_report_num">
          <Input v-model="ruleForm.check_report_num" placeholder="请输入检验报告编号"></Input>
        </Form-item>
        <Form-item label="检验日期" prop="check_date">
          <Input v-model="ruleForm.check_date" placeholder="请输入检验日期"></Input>
        </Form-item>
        <Form-item label="检验结论" prop="check_conclusion">
          <Input v-model="ruleForm.check_conclusion" placeholder="请输入检验结论"></Input>
        </Form-item>
        <Form-item label="下次检验日期" prop="next_check_date">
          <Input v-model="ruleForm.next_check_date" placeholder="请输入下次检验日期"></Input>
        </Form-item>
      </div>

      <!--让用户确认信息的表格-->
      <div class="setTable" v-if="this.active==1">
        <Alert closable>请确认表格信息是否全部正确</Alert>
        <Collapse v-model="value1">
          <Panel name="1">
            <span class="panel_content">特种设备使用登记表</span>
            <div slot="content">
              <v-regist_one :ruleForm="ruleForm"></v-regist_one>
              <Button @click="addElecSeal()" v-if="this.active==1">添加</Button>

            </div>
          </Panel>
        </Collapse>

        <!--<v-regist_one :ruleForm="ruleForm"></v-regist_one>-->


      </div>


      <!--提交pdf 可能需要调一下格式，以后再说吧-->
      <div class="pdfInfo" v-if="this.active==2">
        <h2>相关证明</h2>

        <Form-item label="原使用登记证" :label-width="300">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  :on-success="handleSuccess"
                  with-credentials>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </Form-item>
        <Form-item label="改造质量证明资料" :label-width="300">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  :on-success="handleSuccess"
                  with-credentials>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </Form-item>
        <Form-item label="改造监督检验证书" :label-width="300">
          <Upload action="//jsonplaceholder.typicode.com/posts/"
                  :on-success="handleSuccess"
                  with-credentials>
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </Form-item>
        <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
        <!--<v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>-->
      </div>

      <!--<Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>-->
      <Button type="primary" @click="next('ruleForm')" v-if="this.active<2">下一步</Button>
      <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

      <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
      <Button @click="instance('success')" v-if="this.active==2">确认提交</Button>
      <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active<2">重置</Button>
      <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active<2">保存</Button>
    </Form>
  </div>
</template>
<script>
//  import regist_one from '../../../../components/register/registerOne.vue'
  import detailPdf from '../../../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../../../services/setApp'
  export default {
    data() {
      return {
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
        previousNum: 0,
        value1:'',


      };
    },
    components: {
      'v-regist_one': regist_one,
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
      ...mapActions({clearRegistOneForm: 'clearRegistOneForm'}),
      initData(){
        this.deviceNum=1;
        this.active = 1;
        this.selected = this.getSelectedOption;
        this.selectedNum = this.getSelectedNum;
        //如果是第一次填写
        if (!this.$route.query.changeDeviceNum) {
          this.clearRegistOneForm();
          this.ruleForm = this.getRegistOne;
          this.defaultPdfList1 = [];

        } else {
          // 获取已经保存的信息
          registService.getRegistOne(this.$route.query.dev_id).then(res => {
            this.ruleForms = res.success;
            this.ruleForm = this.ruleForms.ruleForm[0];
            this.defaultPdfList1 = res.pdfUrlDefault;
            console.log(res);
          }).catch(error => {
            console.log(error)
          })
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            param.selected = this.selected;
            this.ifNext = false;
            setAppService.submitSetInfo(param).then(res => {

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
      saveForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            param.selected = this.selected;
            console.log(param);
            this.ifNext = false;
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
      next(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
//            this.active++;
//            console.log(this.active);
          }
        })
        if (this.active == 1) {
          this.submitForm('ruleForm');
        }
        this.beSure();

      },
      before() {
        if (this.active == 1) {
          if (!this.$route.query.changeDeviceNum) {
            this.$router.push({
              path: 'firstApp',
              query: {
                changeDeviceNum: this.getSelectedOption,
                selectedNum: this.getSelectedNum,
              }
            });
          } else {
            this.$router.push({
              path: 'firstApp',
              query: {
                dev_id: this.$route.query.dev_id,
                dev_name: this.$route.query.dev_name,
                changeDeviceNum: this.$route.query.changeDeviceNum,
                selectedNum: this.getSelectedNum,

              }
            });
          }
        } else {

          this.active--;

        }
      },
      beSure() {
          //deviceNum用来计数
        if (this.deviceNum < this.selectedNum) {
          //如果未提交订单更改了套数
          if (this.ruleForms && this.selectedNum > this.ruleForms.ruleForm.length) {
            let len = this.ruleForms.ruleForm.length;

            for (let i = 0; i < this.selectedNum - len; i++) {
              this.ruleForms.ruleForm[this.ruleForms.ruleForm.length] = {};
            }
          }
          this.deviceNum++;
          this.active = 1;
          this.$Modal.success({
            content: "请继续填写下一台(套)的登记表"
          });
          if (!this.ruleForms) {
            this.clearRegistOneForm();

            this.ruleForm = this.getRegistOne;
          } else {
            this.ruleForm = this.ruleForms.ruleForm[(this.deviceNum - 1)];

          }
        } else {
          this.active=2;
        }

      },
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
  .setApp{
    color:#495060;
  }



</style>

