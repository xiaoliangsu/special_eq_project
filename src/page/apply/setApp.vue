<template>
  <!--按套申请的使用登记表-->
  <div class="setApp">
    <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
      <div class="statusInfo" v-if="this.active==1">
        <h2>设备基本情况</h2>
        <Form-item label="设备种类" prop="kind1">
          <Input v-model="ruleForm.kind1" placeholder="请输入设备种类"></Input>
        </Form-item>
        <Form-item label="设备类别" prop="kind2">
          <Input v-model="ruleForm.kind2" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="kind3">
          <Input v-model="ruleForm.kind3" placeholder="请输入设备品种"></Input>
        </Form-item>
        <Form-item label="设备种类" prop="kind1">
          <Input v-model="ruleForm.kind1" placeholder="请输入设备种类"></Input>
        </Form-item>
        <Form-item label="设备类别" prop="kind2">
          <Input v-model="ruleForm.kind2" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="kind3">
          <Input v-model="ruleForm.kind3" placeholder="请输入设备品种"></Input>
        </Form-item>
        <Form-item label="设备种类" prop="kind1">
          <Input v-model="ruleForm.kind1" placeholder="请输入设备种类"></Input>
        </Form-item>
        <Form-item label="设备类别" prop="kind2">
          <Input v-model="ruleForm.kind2" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="kind3">
          <Input v-model="ruleForm.kind3" placeholder="请输入设备品种"></Input>
        </Form-item>
        <Form-item label="设备种类" prop="kind1">
          <Input v-model="ruleForm.kind1" placeholder="请输入设备种类"></Input>
        </Form-item>
        <Form-item label="设备类别" prop="kind2">
          <Input v-model="ruleForm.kind2" placeholder="请输入设备类别"></Input>
        </Form-item>
        <Form-item label="设备品种" prop="kind3">
          <Input v-model="ruleForm.kind3" placeholder="请输入设备品种"></Input>
        </Form-item>
      </div>
      <div class="useInfo" v-if="this.active==2">
        <h2>设备使用情况</h2>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
        <Form-item label="使用单位名称" prop="use_com_name">
          <Input v-model="ruleForm.use_com_name" placeholder="请输入使用单位名称"></Input>
        </Form-item>
      </div>
      <div class="checkInfo" v-if="this.active==3">
        <h2>设备检验情况</h2>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
        <Form-item label="检验机构名称" prop="check_com_name">
          <Input v-model="ruleForm.check_com_name" placeholder="请输入检验机构名称"></Input>
        </Form-item>
      </div>


      <Form-item>

        <Button type="primary" @click="before()" v-if="this.active<6">上一步</Button>
        <Button type="primary" @click="next('ruleForm')" v-if="this.active<4">下一步</Button>
        <Button type="primary" @click="beSure" v-if="this.active==4||this.active==6">确定</Button>
        <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
        <Button @click="instance('success')" v-if="this.active==5">确认提交</Button>

        <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active<4">重置
        </Button>
      </Form-item>
    </Form>
    <div class="pdfInfo" v-if="this.active==5">
      <h2>相关证明</h2>
      <Form-item label="社会信用代码证明" :label-width="130" >
        <Upload
          ref="upload"
          :before-upload="handleBeforeUpload"
          action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>

      </Form-item>
      <Form-item label="产品合格证" :label-width="120">
        <Upload action="//jsonplaceholder.typicode.com/posts/" with-credentials>
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form-item>
      <Form-item label="特种设备监督检验证明" :label-width="120" with-credentials>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form-item>
      <Form-item label="锅炉能效证明" :label-width="120" v-if="this.selected[1]=='boiler'" with-credentials>
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
      </Form-item>
      <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
      <v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>
    </div>
    <div class="setTable" v-if="this.active==4">
      <Alert closable>请确认表格信息是否全部正确</Alert>
      <!--<table>-->
      <!--<tr>-->
      <!--<td rowspan="6" class="rowsText"><span>设备基本情况</span></td>-->
      <!--<td>设备种类</td>-->
      <!--<td>{{this.ruleForm.kind1}}</td>-->
      <!--<td>设备类别</td>-->
      <!--<td>{{this.ruleForm.kind2}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>2.1</td>&ndash;&gt;-->
      <!--<td>设备品种</td>-->
      <!--<td>{{this.ruleForm.kind3}}</td>-->
      <!--<td>产品名称</td>-->
      <!--<td>{{this.ruleForm.device_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设备代码</td>-->
      <!--<td>{{this.ruleForm.device_code}}</td>-->
      <!--<td>型号(规格)</td>-->
      <!--<td>{{this.ruleForm.device_type}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设计使用年限</td>-->
      <!--<td>{{this.ruleForm.design_year}}</td>-->
      <!--<td>设计单位名称</td>-->
      <!--<td>{{this.ruleForm.design_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>制造单位名称</td>-->
      <!--<td>{{this.ruleForm.make_com_name}}</td>-->
      <!--<td>施工单位名称</td>-->
      <!--<td>{{this.ruleForm.const_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>监督检验机构名称</td>-->
      <!--<td>{{this.ruleForm.inspect_com_name}}</td>-->
      <!--<td>型式试验机构名称</td>-->
      <!--<td>{{this.ruleForm.test_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td rowspan="6" class="rowsText"><span>设备基本情况</span></td>-->
      <!--<td>设备种类</td>-->
      <!--<td>{{this.ruleForm.kind1}}</td>-->
      <!--<td>设备类别</td>-->
      <!--<td>{{this.ruleForm.kind2}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>2.1</td>&ndash;&gt;-->
      <!--<td>设备品种</td>-->
      <!--<td>{{this.ruleForm.kind3}}</td>-->
      <!--<td>产品名称</td>-->
      <!--<td>{{this.ruleForm.device_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设备代码</td>-->
      <!--<td>{{this.ruleForm.device_code}}</td>-->
      <!--<td>型号(规格)</td>-->
      <!--<td>{{this.ruleForm.device_type}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设计使用年限</td>-->
      <!--<td>{{this.ruleForm.design_year}}</td>-->
      <!--<td>设计单位名称</td>-->
      <!--<td>{{this.ruleForm.design_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>制造单位名称</td>-->
      <!--<td>{{this.ruleForm.make_com_name}}</td>-->
      <!--<td>施工单位名称</td>-->
      <!--<td>{{this.ruleForm.const_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>监督检验机构名称</td>-->
      <!--<td>{{this.ruleForm.inspect_com_name}}</td>-->
      <!--<td>型式试验机构名称</td>-->
      <!--<td>{{this.ruleForm.test_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td rowspan="6" class="rowsText"><span>设备基本情况</span></td>-->
      <!--<td>设备种类</td>-->
      <!--<td>{{this.ruleForm.kind1}}</td>-->
      <!--<td>设备类别</td>-->
      <!--<td>{{this.ruleForm.kind2}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>2.1</td>&ndash;&gt;-->
      <!--<td>设备品种</td>-->
      <!--<td>{{this.ruleForm.kind3}}</td>-->
      <!--<td>产品名称</td>-->
      <!--<td>{{this.ruleForm.device_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设备代码</td>-->
      <!--<td>{{this.ruleForm.device_code}}</td>-->
      <!--<td>型号(规格)</td>-->
      <!--<td>{{this.ruleForm.device_type}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>设计使用年限</td>-->
      <!--<td>{{this.ruleForm.design_year}}</td>-->
      <!--<td>设计单位名称</td>-->
      <!--<td>{{this.ruleForm.design_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>制造单位名称</td>-->
      <!--<td>{{this.ruleForm.make_com_name}}</td>-->
      <!--<td>施工单位名称</td>-->
      <!--<td>{{this.ruleForm.const_com_name}}</td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--&lt;!&ndash;<td>3.1</td>&ndash;&gt;-->
      <!--<td>监督检验机构名称</td>-->
      <!--<td>{{this.ruleForm.inspect_com_name}}</td>-->
      <!--<td>型式试验机构名称</td>-->
      <!--<td>{{this.ruleForm.test_com_name}}</td>-->
      <!--</tr>-->
      <!--</table>-->



      <Collapse v-model="value1">
        <Panel name="1">
          特种设备使用登记表
          <div slot="content">
            <v-regist_one :ruleForm="ruleForm"></v-regist_one>
          </div>
        </Panel>
      </Collapse>


    </div>

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
        ruleForm: {
          kind1: '',
          kind2: '',
          kind3: '',
          device_name: '',
          device_code: '',
          device_type: '',
          design_year: '',
          design_com_name: '',
          make_com_name: '',
          const_com_name: '',
          inspect_com_name: '',
          test_com_name: '',
          use_com_name: '',
          check_com_name: '',
        },


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
        value1:'',
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
      'v-detailPdf':detailPdf,

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
      ]),
    },
    methods: {
      initData(){
        this.active = 1;
        this.selected = this.getSelectedOption;
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param = Object.assign({}, this.ruleForm);
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
        if (this.active == 4) {
          this.submitForm('ruleForm');
        }
        if (this.active == 6) {
          this.active++;
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
      createPdf() {
//                let newWindow = window.open("_blank");   //打开新窗口
//                let codestr = document.getElementById("pdf-wrap").innerHTML;   //获取需要生成pdf页面的div代码
//                newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
//                newWindow.document.close();     //关闭document的输出流, 显示选定的数据
//                newWindow.print();   //打印当前窗口
//                return true;

        window.print();
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

//        created(){
//            this.initData();
//
//        }


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


</style>
