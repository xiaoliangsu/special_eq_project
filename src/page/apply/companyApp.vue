<template>
  <!--按套申请的使用登记表-->
  <div class="companyApp">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
      <h2>按单位申请</h2>
      <div class="statusInfo" v-if="this.active==1">

        <h2>设备基本情况</h2>
        <Form-item label="设备类别" prop="equipment_category">
          <Input v-model="ruleForm.equipment_category" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="equipment_variety">
          <Input v-model="ruleForm.equipment_variety" placeholder="请输入设备品种"></Input>
        </Form-item>
        <Form-item label="产品名称" prop="equipment_name">
          <Input v-model="ruleForm.equipment_name" placeholder="请输入产品名称"></Input>
        </Form-item>
        <Form-item label="设备数量" prop="equipment_num">
          <Input v-model="ruleForm.equipment_num" placeholder="请输入产品名称"></Input>
        </Form-item>
        <!--</div>-->
        <!--<div class="useInfo" v-if="this.active==2">-->
        <h2>设备使用情况</h2>
        <Form-item label="使用单位名称" prop="using_company_name">
          <Input v-model="ruleForm.using_company_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位地址" prop="using_company_addr">
          <Input v-model="ruleForm.using_company_addr" placeholder="请输入使用单位地址"></Input>
        </Form-item>
        <Form-item label="设备使用地点" prop="eq_use_loc">
          <Input v-model="ruleForm.eq_use_loc" placeholder="请输入使用单位统一社会信用代码"></Input>
        </Form-item>
        <Form-item label="单位固定电话" prop="com_phone">
          <Input v-model="ruleForm.com_phone" placeholder="请输入单位固定电话"></Input>
        </Form-item>
        <Form-item label="使用单位统一社会信用代码" prop="using_company_code">
          <Input v-model="ruleForm.using_company_code" placeholder="请输入使用单位统一社会信用代码"></Input>
        </Form-item>
        <Form-item label="邮政编码" prop="zipCode">
          <Input v-model="ruleForm.zipCode" placeholder="请输入邮政编码"></Input>
        </Form-item>
        <Form-item label="安全管理员" prop="safety_administrator">
          <Input v-model="ruleForm.safety_administrator" placeholder="请输入安全管理员"></Input>
        </Form-item>
        <Form-item label="移动电话" prop="mobile_number">
          <Input v-model="ruleForm.mobile_number" placeholder="请输入移动电话"></Input>
        </Form-item>

      </div>

      <!--让用户确认信息的表格-->
      <div class="setTable" v-if="this.active==2">
        <Alert closable>请确认表格信息是否全部正确</Alert>

        <v-regist_two :ruleForm="ruleForm"></v-regist_two>


      </div>

      <!--提交pdf 可能需要调一下格式，以后再说吧-->
      <div class="pdfInfo" v-if="this.active==3">
        <h2>相关证明</h2>
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

      <Button type="primary" @click="before()" v-if="this.active<6">上一步</Button>
      <Button type="primary" @click="next('ruleForm')" v-if="this.active<2">下一步</Button>
      <Button type="primary" @click="beSure" v-if="this.active==2">确定</Button>
      <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
      <Button @click="instance('success')" v-if="this.active==3">确认提交</Button>
      <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active<2">重置</Button>
      <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active<2">保存</Button>

    </Form>

  </div>
</template>
<script>
  import regist_two from '../../components/register/registerTwo.vue'
  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'

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
        author_key:'',
        pdfUrl: {
          锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
          水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
        },
        defaultPdfList1:[],


      };
    },
    components: {
      'v-regist_two': regist_two,
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
        "getRegistTwo",
      ]),
    },
    mounted(){
      this.initData();
      this.author_key=localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions({clearRegistTwoForm: 'clearRegistTwoForm'}),
      //初始化数据
      initData(){
        if(!this.$route.query.changeDeviceNum){
          this.active = 1;
          this.selected = this.getSelectedOption;
          this.clearRegistTwoForm();
          this.ruleForm = this.getRegistTwo;
          this.defaultPdfList1 = [];
        }else{
          this.active = 1;
          this.selected = this.getSelectedOption;
          // 获取已经保存的信息
          registService.getRegistTwo(this.$route.query.dev_id).then(res => {
            this.ruleForm=res.success;
            this.defaultPdfList1=res.pdfUrl;
            console.log(res);
          }).catch(error => {
            console.log(error)
          })
        }
      },

      //提交表格信息
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            // console.log(param);
            this.ifNext = false;
            setAppService.submitCompanyInfo(param).then(res => {
              //console.log(res);
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
      //保存
      saveForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            param.selected=this.selected;
            console.log(param);
            this.ifNext = false;
            setAppService.saveCompanyInfo(param).then(res => {
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
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //下一步
      next(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.active++;
            console.log(this.active);
          }
        })
        if (this.active == 2) {
          this.submitForm('ruleForm');
        }

      },
      //上一步
//      before() {
//        if (this.active == 1) {
//          this.$router.push('firstApp');
//        } else {
//          this.active--;
//        }
//      },
      before() {
        if (this.active == 1) {
          if(!this.$route.query.changeDeviceNum){
            this.$router.push({
              path: 'firstApp',
              query: {
                changeDeviceNum: this.getSelectedOption,
              }
            });
          }else{
            this.$router.push({
              path: 'firstApp',
              query: {
                dev_id: this.$route.query.dev_id,
                dev_name: this.$route.query.dev_name,
                changeDeviceNum: this.$route.query.changeDeviceNum,
              }
            });
          }
        } else {
          this.active--;
        }
      },
      //确定
      beSure() {
        this.active++;
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

       //确认全部
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
