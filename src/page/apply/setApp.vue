<template>
  <!--按套申请的使用登记表-->
  <div class="setApp">
    <div class="setApp_topbar">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->
      <div class="step" style="width:85%; margin-top:20px;">
        <Steps :current="current">
          <!--<Step title="步骤1" content="填写基本信息"></Step>-->
          <Step title="步骤1" content="填写特种设备使用登记表"></Step>
          <Step title="步骤2" content="预览特种设备使用登记表"></Step>
          <Step title="步骤3" content="提交相关证件"></Step>
          <Step title="步骤4" content="完成申请"></Step>
        </Steps>
      </div>
    </div>

    <div class="setApp_content" style="position:absolute;top:85px;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==1">
          <!--<h2>选择设备种类</h2>-->
          <!--<Select v-model="deviceType" style="width:200px">-->
          <!--<Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
          <!--</Select>-->
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <!--wang-->
            <Form-item label="登记类别" prop="registKind">
              <Select v-model="ruleForm.registKind" >
                <Option v-for="item in registKindList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Row>
              <Col span="11"><!--wang-->
              <!--<label class="form_label_left">设备种类</label>-->
              <Form-item label="设备种类" prop="eqSpecies" class="fontsize">
                <!--wang-->
                <!--<Input v-model="ruleForm.eq_species" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>-->
                <Select v-model="ruleForm.eqSpecies" >
                  <Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              <Form-item label="设备品种" prop="eqVariety">
                <!--<Input v-model="ruleForm.eqVariety" ></Input>-->
                <Poptip trigger="focus" >
                  <div slot="content" style="white-space: normal;font-size:10px;">
                    <p>按照《特种设备目录》填写。没有品种的划“—”</p>
                  </div>
                  <i-input v-model="ruleForm.eqVariety" ></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="设备代码" prop="eqCode">
                <!--<Input v-model="ruleForm.eqCode" ></Input>-->
                <Poptip trigger="focus" >
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>按照产品数据表上的内容填写，该代码具有唯一性。如果该产品还没有编制设 备代码，则使用单位可以不填写，由登记机关按照设备代码的编制要求［见《固定式 压力容器安全技术监察规程》(TSG 21—2016)］填写，其中制造单位代号改为登记 机关的行政区划代码(比制造单位代号多一位)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqCode" ></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="设计使用年限" prop="designUseLimit">
                <Input v-model="ruleForm.designUseLimit" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="设备类别" prop="eqCategory">
                <Input v-model="ruleForm.eqCategory" ></Input>
              </Form-item>
              <Form-item label="产品名称" prop="eqName">
                <Input v-model="ruleForm.eqName" ></Input>
              </Form-item>
              <Form-item label="型号（规格）" prop="model">
                <Input v-model="ruleForm.model" ></Input>
              </Form-item>
              <Form-item label="设计单位名称" prop="designComName">
                <Input v-model="ruleForm.designComName" ></Input>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span='11'>
              <Form-item label="制造单位名称" prop="manufactureComName">
                <Input v-model="ruleForm.manufactureComName" ></Input>
              </Form-item>
              <Form-item label="监督检验机构名称" prop="superviseComName">
                <Input v-model="ruleForm.superviseComName" ></Input>
              </Form-item>
              </Col>

              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="施工单位名称" prop="constructComName">
                <Input v-model="ruleForm.constructComName" ></Input>
              </Form-item>

              <Form-item label="型式试验机构名称" prop="testComName">
                <Input v-model="ruleForm.testComName" ></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName" ></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr" ></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="使用单位统一社会信用代码" prop="useComCode">
                <Input v-model="ruleForm.useComCode" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zipCode">
                <Input v-model="ruleForm.zipCode" ></Input>
              </Form-item>
              </Col>
            </Row><!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="单位内编号" prop="comCode">
                <Input v-model="ruleForm.comCode" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备使用地点" prop="eqUseLocation">
                <Input v-model="ruleForm.eqUseLocation" ></Input>
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
                <Input v-model="ruleForm.safeAdmin" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="单位固定电话" prop="comPhone">
                <Input v-model="ruleForm.comPhone" ></Input>
              </Form-item>
              <Form-item label="移动电话" prop="mobilePhone">
                <Input v-model="ruleForm.mobilePhone" ></Input>
              </Form-item>
              </Col>
            </Row>

            <Form-item label="产权单位名称" prop="propertyComName">
              <Input v-model="ruleForm.propertyComName" ></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="产权单位统一社会信用代码" prop="propertyComCode">
                <Input v-model="ruleForm.propertyComCode" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="联系电话" prop="telephone">
                <Input v-model="ruleForm.telephone" ></Input>
              </Form-item>
              </Col>
            </Row>

          </div>
          <!--</div>-->
          <!--<div class="checkInfo" v-if="this.active==3">-->
          <div class="base-box">
            <h2 class="header_two">设备检验情况</h2>
            <Form-item label="检验机构名称" prop="checkComName">
              <Input v-model="ruleForm.checkComName" ></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="检验类别" prop="checkCategory">
                <Input v-model="ruleForm.checkCategory" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验报告编号" prop="checkReportNum">
                <Input v-model="ruleForm.checkReportNum" ></Input>
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
                <Select v-model="ruleForm.checkConclusion" >
                  <Option v-for="item in checkConclusionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="下次检验日期" prop="nextCheckDate">
              <!--wang-->
              <DatePicker v-model="ruleForm.nextCheckDate"></DatePicker>   <!--wang-->
            </Form-item>
          </div>
          <div class="base-box">
            <h2 class="header_two">其他信息</h2>
            <p>在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特
              种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。
            </p>
            <!--wang-->
            <p>附产品数据表</p>
            <Row>
              <Col span="11">
              <Form-item label="使用单位填表人员" prop="comTablePerson">
                <Input v-model="ruleForm.comTablePerson" ></Input>
              </Form-item>

              <Form-item label="使用单位安全管理人员" prop="comSafePerson">
                <Input v-model="ruleForm.comSafePerson" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="使用单位填表人员日期" prop="comPersonDate">
                <DatePicker v-model="ruleForm.comPersonDate"></DatePicker>
              </Form-item>
              <Form-item label="安全管理人员填表日期" prop="safePersonDate">
                <DatePicker v-model="ruleForm.safePersonDate"></DatePicker>
              </Form-item>
              </Col>
            </Row>
            <Form-item label="加盖公章日期" prop="checkConclusion">
              <DatePicker v-model="ruleForm.beginUseDate"></DatePicker>
            </Form-item>
          </div>
          <!--wang-->
          <div class="base-box">
            <h2 class="header_two">说明</h2>
            <Row>
              <Col span="11">
              <Form-item label="登记机关登记人员" prop="registPerson">
                <Input v-model="ruleForm.registPerson" ></Input>
              </Form-item>

              <Form-item label="使用登记证编号" prop="registCode">
                <Input v-model="ruleForm.registCode" ></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="登记机关登记人员日期" prop="registDate">
                <DatePicker v-model="ruleForm.registDate" ></DatePicker>
              </Form-item>

              <Form-item label="加盖登记机关公章日期" prop="registStampDate">
                <DatePicker v-model="ruleForm.registStampDate" ></DatePicker>
              </Form-item>
              </Col>
            </Row>
          </div>

        </div>


        <div class="setTable" v-if="this.active==2" style="width:900px;top:30px;position:absolute">
          <!--<embed  v-bind:src=this.pdfUrl width="100%" height="700px" id="iFramePdf" />-->
          <!--要这两行-->

          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button  type="warning"  @click="printTrigger('iFramePdf');" >打印</Button>

          <!--<input type="submit"  value="Print"-->
          <!--name="Submit" id="printbtn"-->
          <!--@click="printPDF(this.pdfUrl)" />-->
          <!--<a href="javascript: w=window.open('https://cdn.mozilla.net/pdfjs/tracemonkey.pdf');w.print(); w.close(); ">​​​​​​​​​​​​​​​​​打印pdf</a>-->
          <Button type="primary" @click="next()" v-if="this.active==2">下一步</Button>
          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>


        </div>


        <!--提交pdf 可能需要调一下格式，以后再说吧-->
        <div class="pdfInfo" v-if="this.active==3">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Form-item label="社会信用代码证明" :label-width="300">
            <Upload
              ref="upload"

              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              action="/admin/file/upload?applyId=2&fileTypeId=1"
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
          <h5>上传文件缩略图</h5>
          <div class="demo-upload-list" v-for="(item,index) in uploadList" >
            <template v-if="uploadList">
              <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(index)"></Icon>
              </div>

            </template>
            <!--<img src="/admin/file/thumbnail?fileId=201" ref="verifyImg"  style="width:100px;height:35px;float:right"-->
            <!--alt="缩略图图片" v-on:click="reflushVerify"/>-->


          </div>

          <Modal title="查看图片" v-model="visible">
            <iframe id="iFramePdf" v-bind:src=this.pdfUrlTest style="width:100%;height:1000px;"  v-if="visible"></iframe>

          </Modal>
          <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
          <!--<v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>-->
        </div>


        <div class="setApp_button">


          <!--<Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>-->
          <Button type="primary" @click="confirmForm" v-if="this.active==1">下一步</Button>

          <!--<Button type="primary" @click="before()" v-if="this.active==1">上一步</Button>-->


          <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

          <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
          <Button @click="instance('success')" v-if="this.active==3">确认提交</Button>
          <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">重置</Button>
          <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">保存</Button>

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
         pdfUrl: '/admin/file/preview?fileId=101',
        pdfUrlTest:'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',

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
        //wang
        registKindList:[
          {
            value:'新设备首次启用',
            label:'新设备首次启用'
          },
          {
            value:'停用后启用',
            label:'停用后启用'
          },
          {
            value:'改造',
            label:'改造'
          },
          {
            value:'使用单位更名',
            label:'使用单位更名'
          },
          {
            value:'使用地址变更',
            label:'使用地址变更'
          },
          {
            value:'过户',
            label:'过户'
          },
          {
            value:'移装',
            label:'移装'
          },
          {
            value:'达到设计使用年限',
            label:'达到设计使用年限'
          },
        ],
        //wang
        checkConclusionList: [
          {
            value:'meetRequirement',
            label:'符合要求'
          },
          {
            value:'basicallyMeetRequirement',
            label:'基本符合要求'
          },
          {
            value:'qualified',
            label:'不符合要求'
          },
          {
            value:'qualified',
            label:'合格'
          },
          {
            value:'retestQualified',
            label:'复检合格'
          },
          {
            value:'unqualified',
            label:'不合格'
          },
        ],




        //wang
        rules: {
//          eqSpecies: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          eqVariety: [
//            {required:false, message: '', trigger: 'blur'}
//          ],
//          eqCode: [
//            {required:false, message: '', trigger: 'blur'}
//          ],
//          designUseLimit: [
//            {required:false, message: '', trigger: 'blur'}
//          ],
//          manufactureComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          superviseComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          eqCategory: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          eqName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          model: [
//            {required:false, message: '', trigger: 'blur'}
//          ],
//          designComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          constructComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          testComName: [
//            {required:false, message: '', trigger: 'blur'}
//          ],
//          useComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          useComAddr: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          useComCode: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          beginUseDate: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          safeAdmin: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          comCode: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          zipCode: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          eqUseLocation: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          comPhone: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          mobilePhone: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComCode: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          telephone: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          checkComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          checkCategory: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          checkDate: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          checkReportNum: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          checkConclusion: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          nextCheckDate: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//
//          comTablePerson: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          comPersonDate: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          comSafePerson: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          safePersonDate: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          registPerson: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          registCode: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          registDate: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          comStampDate: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          registStampDate: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          registKind: [
//            {required:true,message:'不能为空',trigger:'blur'}
//          ],

        },
        active: 1,
        //selected: '',
        //imgName: '',
        //visible: false,

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

//        province: '',
//        city: '',
//        defaultPro:'',
//        provinceList: [],
//        cityList: [],
//        area: '',
//        areaList: [],
//        acceptCom: '',
//        acceptComList: [],
//        checkCom: '',
//        checkComList: [],
        device_type:'',
        ifold:0,
        uploadList:[
      ],

      visible:false,



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
    '$route.query':function(){
      console.log(this.$route.path);
      if(this.$route.path=='/setApp'){
          this.initData();
      }
    }
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
     // this.initData();
      this.ifold=this.$route.query.ifold;
      if(this.ifold==1){
        let params = 'applyId=' + this.$route.query.applyId;
        setAppService.getUnsubmitApp(params).then(res => {
          this.clearRegistOneForm();
        //  this.setRegistOneForm(res.success.ruleForm[0]);
          this.ruleForm = this.getRegistOne;
          this.ruleForm.eqVariety="设备类别";
          this.defaultPdfList1 = res.pdfUrlDefault;
        }).catch(error => {
          console.log(error)
        })
      }else{

      }


      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions(
        ['clearRegistOneForm', 'setRegistOneForm'],
      ),
      handleView(index){
          console.log(index);
        this.visible = true;
      },
      reflushVerify() {
          console.log(1);
        this.$refs.verifyImg.src="/admin/file/thumbnail?fileId=201";
      },
      //打印按钮
      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },

      initData(){
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.device_type=this.$route.query.device_type;
        this.ifold=this.$route.query.ifold;

        //如果是第一次填写
        if (this.$route.query.ifold !== 1) {
          this.clearRegistOneForm();
          this.ruleForm = this.getRegistOne;
          this.defaultPdfList1 = [];
        } else {
          // 获取已经保存的信息
          this.getOldInfo();
        }

      },
      getOldInfo(){
        let params = 'applyId=' + this.$route.query.applyId;
        setAppService.getUnsubmitApp(params).then(res => {
          this.acceptCom=res.data.acceptorAgencyId;
          this.clearRegistOneForm();
          //this.setRegistOneForm(res.success.ruleForm[0]);
          this.ruleForm = this.getRegistOne;
          this.ruleForm.eqVariety="设备类别";


          this.defaultPdfList1 = res.pdfUrlDefault;
        }).catch(error => {
          console.log(error)
        })
      },
      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {
          this.$Message.info('您已提交信息，请预览结果');
          this.modalCertain = false;
          console.log(this.modalCertain);
          if(res.status==true){
          }

        }).catch(error => {
          console.log(error);

        })
      },

//提交表单
      submitContent(formName) {
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
              this.submit(submitParam);
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });
        // this.active++;



      },
      saveForm(formName){

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
        this.$Modal.confirm({
          title: '保存登记表信息',
          content: '<p>确认保存已经填写信息？</p>',
          onOk: () => {
            setAppService.submitSetInfo(submitParam).then(res => {
              this.$Message.info('您已保存信息');
              this.modalCertain = false;
              console.log(this.modalCertain);
              if(res.status==true){
              }
            }).catch(error => {
              console.log(error);

            })
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      next() {
        if (this.current == 3) {
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
          content: '<p>请确认全部填写信息</p>',
          onOk: () => {

            this.submitContent('ruleForm');

          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });
      },

      handleSuccess (res, file) {
        //需要沟通一下，成功给我返回什么然后判断

       // this.uploadList = this.$refs.upload.fileList;
        //this.uploadList[0].name="缩略图";
        this.uploadList.push({"url":res.data.thumbnail});
        console.log(this.uploadList)

      },
      handleRemove(res, file) {
        //res是移除的 file剩下的
        console.log(res);
        console.log(file);

      },

      //这里参数要改
      instance (type) {
        let params = 'applyId=' + 1;
        setAppService.confrimApp(params).then(res => {
          if(res){
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
      changeBasic(){
          this.ifold=0;
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
  .city_select_app_exit{
    width:700px;
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
    .city_select_content{
      border-bottom:1px solid #dddee1;
      margin-bottom:5px;
      padding-bottom:5px;
    }
  }
  .pdfInfo{
    margin:15px;
  }

  /*.ivu-form-item {*/
  /*margin-bottom: 10px;*/
  /*}*/
  .demo-upload-list{
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
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

</style>
