<template>
  <!--按套申请的使用登记表-->
  <div class="carboxApp">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
      <h2>车用气瓶申请</h2>
      <div class="statusInfo" v-if="this.active==1">

        <h2>设备基本情况</h2>
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
        <!--</div>-->
        <!--<div class="useInfo" v-if="this.active==2">-->
        <h2>设备使用情况</h2>
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

      <!--让用户确认信息的表格-->
      <div class="setTable" v-if="this.active==2">
        <Alert closable>请确认表格信息是否全部正确</Alert>

        <v-regist_one :ruleForm="ruleForm"></v-regist_one>


      </div>

      <!--提交pdf 可能需要调一下格式，以后再说吧-->
      <div class="pdfInfo" v-if="this.active==3">
        <h2>相关证明</h2>
        <Form-item label="社会信用代码证明" :label-width="300">
          <Upload
            ref="upload"
            :before-upload="handleBeforeUpload"
            :on-success="handleSuccess"
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

    </Form>

  </div>
</template>
<script>
  import regist_one from '../../components/register/registerOne.vue'
  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
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
        }


      };
    },
    components: {
      'v-regist_one': regist_one,
      'v-detailPdf': detailPdf,

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
      ]),
    },
    mounted(){
      this.selected = this.getSelectedOption;
      this.clearRegistOneForm();
      this.ruleForm = this.getRegistOne;
      this.active = 1;
      this.author_key=localStorage.getItem('author_key');

    },
    methods: {
      ...mapActions({clearRegistOneForm: 'clearRegistOneForm'}),
      initData(){
        this.active = 1;
        this.selected = this.getSelectedOption;
        this.active = 1;
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
            // console.log(param);
            this.ifNext = false;
            setAppService.submitSetInfo(param).then(res => {
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
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
      before() {
        if (this.active == 1) {
          this.$router.push('firstApp');
        } else {
          this.active--;
        }
      },
      beSure() {
        this.active++;
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
