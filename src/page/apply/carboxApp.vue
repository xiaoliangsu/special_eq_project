<template>
  <!--按套申请的使用登记表-->
  <div class="carboxApp">
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

      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">  <!--qiu-->
        <!--<h2>车用气瓶申请</h2>-->
        <div class="statusInfo" v-if="this.active==1">
          <div class="chooseAccept">
            <h3 class="header_one" style="margin-bottom:10px;">登记机关</h3>
            <FormItem label="登记机关" class="ivu-form-item-required">
              <Select v-model="acceptCom" filterable @on-change="chosenAccept" :label-in-value="true">
                <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </div>

          <div class="base-box" style="margin-top:10px;">
            <h2 class="header_one">特种设备使用登记表(车用气瓶)</h2>
            <Form-item label="登记类别" prop="registKind">
              <Select v-model="ruleForm.registKind" :disabled="true">
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>
            <h2 class="header_two">设备基本情况</h2>
            <Row>     <!--qiu-->
              <Col span="11">   <!--qiu-->
              <Form-item label="设备品种" prop="deviceKindCode">
                <!--<Input v-model="ruleForm.eqKind" ></Input>-->
                <Select v-model="ruleForm.deviceKindCode" filterable @on-change="chosenDeviceType" :label-in-value=true>
                  <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="气瓶数量" prop="deviceNum">
                <!--<Input v-model="ruleForm.deviceNum" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      气瓶填写本次登记时的数量(单位为“只”)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.deviceNum" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="气瓶公称工作压力" prop="workPressure">
                <Input v-model="ruleForm.workPressure"></Input>
              </Form-item>
              </Col>   <!--qiu-->
              <!--qiu-->
              <Col span="11" offset="2">
              <Form-item label="产品名称" prop="deviceName">
                <!--<Input v-model="ruleForm.deviceName" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品铭牌或者产品合格证、产品数据表的内容填写，也称设备名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.deviceName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="充装介质" prop="fillMedia">
                <Input v-model="ruleForm.fillMedia"></Input>
              </Form-item>
              <Form-item label="气瓶容积" prop="model">
                <Input v-model="ruleForm.model"></Input>
              </Form-item>
              </Col>
            </Row>

            <Form ref="formDynamicPres" :model="formDynamicPres" :label-width="100"
                  v-for="(item, index) in formDynamicPres.items"
                  :key="item.id" inline class="formDynamicPres">
              <Row>
                <Col span="11">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'制造单位名称'"
                  :prop="'items.' + index + '.value'">
                  <Poptip trigger="focus">
                    <div slot="content" style="white-space: normal;">
                      <p>
                        填写产品的制造单位名称，其名称与产品合格证和产品铭牌表述应当一致。
                      </p>
                    </div>
                    <i-input type="text" v-model="item.manufactureComName" style="width:122%;"></i-input>
                  </Poptip>
                  <!--<Input type="text" v-model="item.manufactureComName" placeholder="请输入..."></Input>-->
                </FormItem>
                </Col>
                <Col span="11" offset="2">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'制造日期'"
                  :prop="'items.' + index + '.value'">
                  <!--<Input type="text" v-model="item.eqCreateDate"></Input>-->
                  <DatePicker v-model="item.eqCreateDate" style="width:122%"></DatePicker>
                </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="11">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'产品编号'"
                  :prop="'items.' + index + '.value'">
                  <Input type="text" v-model="item.productCode" style="width:122%"></Input>
                </FormItem>
                </Col>
                <Col span="11" offset="2">
                <FormItem
                  class="ivu-form-item-required"
                  :key="index"
                  :label="'单位内编号'"
                  :prop="'items.' + index + '.value'">
                  <Poptip trigger="focus">
                    <div slot="content" style="white-space: normal;">
                      <p>
                        填写使用单位对设备进行管理自行编制的设备内部编号。
                      </p>
                    </div>
                    <i-input type="text" v-model="item.eqComCode" style="width:122%"></i-input>
                  </Poptip>
                  <!--<Input type="text" v-model="item.eqComCode" placeholder="请输入..."></Input>-->
                </FormItem>
                </Col>
              </Row>

              <FormItem>

                <Button type="warning" @click="handleRemovePres(index)" style="margin-left:430%;">删除</Button>
              </FormItem>
              <br>
            </Form>
            <Button type="primary" long @click="handleAddPres" icon="plus-round" style="margin:5px;">新增</Button>


            <Row>
              <Col span="11">
              <Form-item label="施工单位名称" prop="constructComName">
                <!--<Input v-model="ruleForm.constructComName" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写登记时最近一次从事安装或者改造、修理的施工单位的名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.constructComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="监督检验机构名称" prop="superviseComName">
                <!--<Input v-model="ruleForm.superviseComName" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写负责该设备制造、安装、改造、重大修理监督检验(以下简称监检)的特种设备检验机构名称，没有实施监检的设备，注明“不实施监检”，如该设备登记前进行了不同阶段的监检(如制造监检，安装、改造监检等)，则填写最近一次监检的特种设备检验机构名称，并且与设备检验情况要求相协调(除制造监检外，优先满足设备检验情况填写要求)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.superviseComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName" disabled></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr" disabled></Input>
            </Form-item>

            <Row>     <!--qiu-->
              <Col span="11">   <!--qiu-->
              <Form-item label="使用单位统一社会信用代码" prop="useComCode">
                <!--<Input v-model="ruleForm.useComCode" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>

              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zipcode">
                <!--<Input v-model="ruleForm.zipcode" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位所在地的邮政编码。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.zipcode" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Row>     <!--qiu-->
              <Col span="11">   <!--qiu-->
              <Form-item label="车牌号" prop="carNum">
                <Input v-model="ruleForm.carNum"></Input>
              </Form-item>
              <Form-item label="投入使用日期" prop="eqUseDate">
                <!--<DatePicker v-model="ruleForm.eqUseDate" ></DatePicker>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写办理登记的设备正式投入使用的开始日期(包括年、月、日)。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.eqUseDate" style="width:118.11%"></DatePicker>
                </Poptip>
              </Form-item>
              <Form-item label="安全管理员" prop="safeAdministrator">
                <!--<Input v-model="ruleForm.safeAdministrator" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职的安全管理员姓名。如果聘用专业技术服务机构的人员负责安全管理，则填写该人员的姓名。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.safeAdministrator" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>   <!--qiu-->
              <!--qiu-->
              <Col span="11" offset="2">
              <Form-item label="车辆VIN码" prop="carVin">
                <Input v-model="ruleForm.carVin"></Input>
              </Form-item>
              <Form-item label="单位固定电话" prop="staticPhone">
                <!--<Input v-model="ruleForm.staticPhone" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位特种设备安全管理机构或者主管特种设备机构的联系电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.staticPhone" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="移动电话" prop="mobilePhone">
                <!--<Input v-model="ruleForm.mobilePhone" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职、聘用的安全管理员的移动电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.mobilePhone" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <!--qiu-->
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

              </Col>
            </Row>
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
          <Button type="success" @click="next()" v-if="this.active==2">下一步</Button>



        </div>

        <!--提交pdf 可能需要调一下格式，以后再说吧-->
        <div class="pdfInfo" v-if="this.active==3">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Row style="width:1000px;">
            <Col span="10">
            <Form-item label="社会信用代码证明" :label-width="200" v-if="this.isCompany==true">
              <Upload
                ref="upload1"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :before-upload="handleBeforeUpload2"
                :show-upload-list="true"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'社会信用代码证明'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10">
            <Form-item label="个人身份证明" :label-width="200" v-if="this.isCompany==false">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'个人身份证明'"
                :before-upload="handleBeforeUpload2"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>
          <h5>特种设备产品合格证</h5>
          <Row>
            <Col span="10">

            <Form-item label="产品合格证" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'产品合格证'+this.fileList[1]"
                :before-upload="handleBeforeUpload3"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="产品数据表" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'产品数据表'+this.fileList[2]"
                :before-upload="handleBeforeUpload4"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>

          </Row>
          <Form-item label="安装合格证明" :label-width="200">
            <Upload
              ref="upload2"
              :format="['pdf']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'安装合格证明'+this.fileList[3]"
              :before-upload="handleBeforeUpload11"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

            </Upload>

          </Form-item>
          <h5>特种设备监督检验证明</h5>

          <Row>
            <Col span="10">

            <Form-item label="制造监督检验证书" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'制造监督检验证书'+this.fileList[4]"
                :before-upload="handleBeforeUpload5"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="安装监督检验证书" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'安装监督检验证书'+this.fileList[5]"
                :before-upload="handleBeforeUpload6"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>

          </Row>
          <h5>要求进行使用前首次检验的特种设备</h5>
          <Form-item label="首次检验报告" :label-width="200">
            <Upload
              ref="upload2"
              :format="['pdf']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'首次检验报告'+this.fileList[6]"
              :before-upload="handleBeforeUpload7"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

            </Upload>

          </Form-item>
          <h5>机动车行驶证</h5>
          <Row>
            <Col span="10">
            <Form-item label="机动车行驶证" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'机动车行驶证'+this.fileList[7]"
                :before-upload="handleBeforeUpload8"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="机动车登记证书" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'机动车登记证书'+this.fileList[8]"
                :before-upload="handleBeforeUpload9"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
          </Row>
          <h5 v-if="this.device_type==1">锅炉能效证明文件</h5>
          <Form-item label="锅炉能效证明文件" :label-width="200" v-if="this.device_type==1">
            <Upload
              ref="upload2"
              :format="['pdf']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'锅炉能效证明文件'+this.fileList[9]"
              :before-upload="handleBeforeUpload10"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

            </Upload>

          </Form-item>


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

          <!--<Button type="primary" @click="before()" v-if="this.active==1">上一步</Button>-->


          <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

          <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
          <Button @click="instance('success')" v-if="this.active==3"  type="success">确认提交</Button>
          <!--<Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">重置</Button>-->
          <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">保存</Button>

        </div>
      </Form>
    </div>
  </div>
</template>
<script>
  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'
//  import VBreadCrumb from "../../components/breadCrumb/breadCrumb";

  export default {
    data() {
      return {
        fileList:[1,1,1,1,1,1,1,1,1],
        isCompany: false,
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        acceptCom: '',
        acceptComList: [],
        addressCode: '',
        formDynamicPres: {
          items: [
            {
              manufactureComName: '',
              eqCreateDate: '',
              productCode: '',
              eqComCode: '',
            }
          ]
        },
        pdfUrl: '',

        ruleForm: {
          subList: [],
          registKind: '新设备首次启用',
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          deviceNum: '',
          fillMedia: '',
          workPressure: '',
          model: '',
//          manufactureComName: '',
//          eqCreateDate: '',
//          productCode: '',
//          eqComCode: '',
          constructComName: '',
          superviseComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipcode: '',
          carNum: '',
          carVin: '',
          eqUseDate: '',
          staticPhone: '',
          safeAdministrator: '',
          mobilePhone: '',
          comTablePerson: '',

        },

        //设备品种
        deviceTypeList: [
          {
            value: "2210",
            label: "铁路罐车"
          },
          {
            value: "2220",
            label: "汽车罐车"
          },
          {
            value: "2230",
            label: "长管拖车"
          },
          {
            value: "2240",
            label: "罐式集装箱"
          },
          {
            value: "2250",
            label: "管束式集装箱"
          },
        ],

        //登记类别
        registKindList: [
          {
            value: '新设备首次启用',
            label: '新设备首次启用'
          },
          {
            value: '停用后启用',
            label: '停用后启用'
          },
          {
            value: '改造',
            label: '改造'
          },
          {
            value: '使用单位更名',
            label: '使用单位更名'
          },
          {
            value: '使用地址变更',
            label: '使用地址变更'
          },
          {
            value: '过户',
            label: '过户'
          },
          {
            value: '移装',
            label: '移装'
          },
          {
            value: '达到设计使用年限',
            label: '达到设计使用年限'
          },
        ],
        //设备品种名称
        deviceKindTypeId: '',
        rules: {
          registKind: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deviceKindCode: [
            {required: false, message: '', trigger: 'blur'}
          ],
          deviceName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deviceNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          fillMedia: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          workPressure: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          model: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          manufactureComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqCreateDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          productCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          constructComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          superviseComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          useComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          useComAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          useComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          carNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          carVin: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqUseDate: [
            {required: true, message: '不能为空', type: 'date', trigger: 'change'}
          ],
//          staticPhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          safeAdministrator: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          comTablePerson: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          comPersonDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          comSafePerson: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          safePersonDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          explanation: [
            {required: false, message: '', trigger: 'blur'}
          ],
          registPerson: [
            {required: false, message: '', trigger: 'blur'}
          ],
          registCode: [
            {required: false, message: '', trigger: 'blur'}
          ],
          registDate: [
            {required: false, message: '', trigger: 'blur'}
          ],
          comStampDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          registStampDate: [
            {required: false, message: '', trigger: 'blur'}
          ],


        },
        //ifNext: true,
        active: 1,
        //  selected: '',
        // imgName: '',
        visible: false,
        uploadList: [],
        // modal1: false,
        author_key: '',
//        pdfUrl: {
//          锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//        },
        defaultPdfList1: [],
        //  selectedNum: '',
        // deviceNum: 1,
        // ruleForms: '',
        // value1: '',
        current: 0,
        device_type: '',
        ifold: 0,
        uploadList: [
          {"url": ''}
        ],
        visible: false,
        applyId: '',
        creatOrUpdate: false,

      };
    },
    components: {
//      'v-regist_three': regist_three,
      //'v-detailPdf': detailPdf,

    },
//    watch: {
//      // 如果路由有变化，会再次执行该方法
//      '$route': 'initData'
//    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/carboxApp') {
          this.initData();
        }
      }
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getSelectedNum",
        "getterUserData",
        "getInputTime"
      ]),
    },
    mounted(){
      this.initData();
      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions(
        ['changeInputTime'],
      ),
      handleAddPres () {
        this.formDynamicPres.items.push({
          manufactureComName: '',
          eqCreateDate: '',
          productCode: '',
          eqComCode: '',
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
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        //  this.ruleForm.useComCode=localStorage.getItem('useComCode');
        this.ruleForm.zipcode = localStorage.getItem('zipcode');
        this.ruleForm.staticPhone = localStorage.getItem('staticPhone');
        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');

        if (localStorage.getItem('company') == 'true') {
          this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
          this.ruleForm.useComCode = localStorage.getItem('useComCode');
          this.isCompany = true;
        } else {
          this.ruleForm.safeAdministrator = localStorage.getItem('name');
          this.ruleForm.useComCode = localStorage.getItem('verifyId');
          this.isCompany = false;

        }
        this.addressCode = localStorage.getItem('addressCode');


      },
      initData(){
        // this.deviceNum = 1;
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.uploadList = [
          {"url": ''}
        ];
        this.creatOrUpdate = false;
        fileList:[1,1,1,1,1,1,1,1,1],


        //   this.selected = this.getSelectedOption;
        //  this.selectedNum = this.getSelectedNum;
        this.device_type = this.$route.query.device_type;
        this.ifold = this.$route.query.ifold;
        if (!(this.$route.query.ifold)) {
          this.clearRuleForm();
          // this.ruleForm.subList=[];
          this.formDynamicPres.items = [
            {
              manufactureComName: '',
              eqCreateDate: '',
              productCode: '',
              eqComCode: '',
            }
          ];
          this.defaultPdfList1 = [];
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
        } else {
          // 获取已经保存的信息
          this.getOldInfo();
        }
      },
      getOldInfo(){
        let params = 'applyId=' + this.$route.query.applyId;
        setAppService.getUnsubmitApp(params).then(res => {
          this.clearRuleForm();
          this.ruleForm = res.data.formList[0];
          this.formDynamicPres.items = this.ruleForm.subList;
          this.acceptCom = res.data.acceptorAgencyId;
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
        }).catch(error => {
          console.log(error)
        })
      },

      clearRuleForm(){
        this.ruleForm = {
          subList: [],
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          deviceNum: '',
          fillMedia: '',
          workPressure: '',
          model: '',
          constructComName: '',
          superviseComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipcode: '',
          carNum: '',
          carVin: '',
          eqUseDate: '',
          staticPhone: '',
          safeAdministrator: '',
          mobilePhone: '',
          registKind: '新设备首次启用',
          comTablePerson: '',
          //comPersonDate:'',
        }
      },
      //选择的设备品种
      chosenDeviceType(value){
        this.deviceKindTypeId = value.label;
      },
      //选择受理机关
      chosenAccept(value){
        this.propertyComCode = value.value;
        this.propertyComName = value.label;
      },


      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];
            this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
//            this.pdfUrl = '/admin/file/preview?fileId='+ res.data.forms['特种设备使用登记表二'];

            this.$Message.info('您已提交信息，请预览结果');
            this.modalCertain = false;
          }

        }).catch(error => {
          console.log(error);

        })
      },
      makeParams(){
        let submitParam = {};
        //提交表单1
        this.ruleForm.deviceKind = this.deviceKindTypeId;
//        for(let i=0;i<this.formDynamicPres.items.length;i++){
//          this.changeInputTime(this.formDynamicPres.items[i].eqCreateDate);
//          this.formDynamicPres.items[i].eqCreateDate=this.getInputTime;
//        }
        this.ruleForm.subList = this.formDynamicPres.items;
//        this.changeInputTime(this.ruleForm.eqUseDate);
//        this.ruleForm.eqUseDate = this.getInputTime;
        submitParam.formList = [];
        submitParam.formList.push(this.ruleForm);
        submitParam.formList[0].acceptorAgencyId = this.propertyComCode;
        submitParam.formList[0].acceptorAgencyName = this.propertyComName;
        submitParam.formList[0].formType = 2;

        //设备类别
        if (this.device_type) {
          submitParam.deviceType = parseInt(this.device_type);
        } else {
          submitParam.deviceType = parseInt(this.$route.query.device_type);
        }
        //首次申请
        submitParam.applyType = 1;
        submitParam.comCode = this.ruleForm.comCode;
        //登记证编号
        submitParam.registCode = '';

        //提交设备类别等
        submitParam.deviceCategory = "压力容器";
        submitParam.deviceClass = "移动式压力容器";
        submitParam.deviceKind = this.deviceKindTypeId;
        submitParam.eqCode = '';

        return submitParam;
      },
      //提交表单
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            let formList = Object.assign({}, this.ruleForm);
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
      //更新表单
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let formList = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam = {};
            this.ruleForm.deviceKind = this.deviceKindTypeId;
//            for(let i=0;i<this.formDynamicPres.items.length;i++){
//              this.changeInputTime(this.formDynamicPres.items[i].eqCreateDate);
//              this.formDynamicPres.items[i].eqCreateDate=this.getInputTime;
//            }
            this.ruleForm.subList = this.formDynamicPres.items;
//            console.log( this.ruleForm.subList )
//            this.changeInputTime(this.ruleForm.eqUseDate);
//            this.ruleForm.eqUseDate = this.getInputTime;
            console.log(this.ruleForm.eqUseDate )
            console.log(this.ruleForm)
            submitParam.formList = [];
            submitParam.formList.push(this.ruleForm);
            submitParam.formList[0].acceptorAgencyId = this.propertyComCode;
            submitParam.formList[0].acceptorAgencyName = this.propertyComName;
            submitParam.formList[0].formType = 2;
            submitParam.id = parseInt(this.applyId)||parseInt(this.$route.query.applyId);
            // submitParam.deviceKind = this.deviceKindTypeId;
            setAppService.updateSetInfo(submitParam).then(res => {
              if (res.status == 200) {
                this.current++;
                this.active++;
                this.applyId = res.data.applyId;
//                this.fileId = res.data.forms.split("=")[1].split("}")[0];
//                this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
                this.pdfUrl = '/admin/file/preview?fileId='+ res.data.forms['特种设备使用登记表二'];

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
      saveForm(formName){
        let formList = Object.assign({}, this.ruleForm);
        //把选择的哪一项带进去
        let submitParam = this.makeParams();
        this.$Modal.confirm({
          title: '保存登记表信息',
          content: '<p>确认保存已经填写信息？</p>',
          onOk: () => {

            if (this.$route.query.ifold == 1 || (this.creatOrUpdate === true)) {
              let submitParam = {};
              this.ruleForm.deviceKind = this.deviceKindTypeId;
//              for(let i=0;i<this.formDynamicPres.items.length;i++){
//                this.changeInputTime(this.formDynamicPres.items[i].eqCreateDate);
//                this.formDynamicPres.items[i].eqCreateDate=this.getInputTime;
//              }

              this.ruleForm.subList = this.formDynamicPres.items;
//              this.changeInputTime(this.ruleForm.eqUseDate);
//              this.ruleForm.eqUseDate = this.getInputTime;
              submitParam.formList = [];
              submitParam.formList.push(this.ruleForm);
              submitParam.formList[0].acceptorAgencyId = this.propertyComCode;
              submitParam.formList[0].acceptorAgencyName = this.propertyComName;
              submitParam.formList[0].formType = 2;
              submitParam.id = parseInt(this.applyId)||parseInt(this.$route.query.applyId);
              // submitParam.deviceKind = this.deviceKindTypeId;
              setAppService.updateSetInfo(submitParam).then(res => {
                if (res.status == 200) {
                  this.$Message.info('您已保存信息');
                  this.modalCertain = false;
                }

              }).catch(error => {
                console.log(error);

              })
            } else {
              setAppService.submitSetInfo(submitParam).then(res => {
                this.$Message.info('您已保存信息');
                this.modalCertain = false;
                console.log(this.modalCertain);
                if (res.status == true) {
                }
              }).catch(error => {
                console.log(error);

              })

            }
          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });

      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      next(name) {
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
        this.creatOrUpdate = true;
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
      handleBeforeUpload () {

      },
      handleBeforeUpload2 () {
        //this.file3NameNum++;
        this.fileList[0]++;
      },
      handleBeforeUpload3 () {
        //this.file3NameNum++;
        this.fileList[1]++;
      },
      handleBeforeUpload4 () {
        // this.file4NameNum++;
        this.fileList[2]++;
      },
      handleBeforeUpload5 () {
        // this.file5NameNum++;
        this.fileList[3]++;
      },
      handleBeforeUpload6 () {
        //this.file6NameNum++;
        this.fileList[4]++;
      },
      handleBeforeUpload7 () {
        //this.file7NameNum++;
        this.fileList[5]++;
      },
      handleBeforeUpload8 () {
        //
        // this.file8NameNum++;
        this.fileList[6]++;

      },
      handleBeforeUpload9 () {
        // this.file9NameNum++;
        this.fileList[7]++;

      },
      handleBeforeUpload10 () {
        //   this.file10NameNum++;
        this.fileList[8]++;
      },
      handleBeforeUpload11 () {
        //   this.file10NameNum++;
        this.fileList[9]++;

      },
      handleView(index){
        console.log(index);
        this.visible = true;
        this.pdf = this.pdfList[index];
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc: '请上传pdf格式文件'
        });
      },
      instance (type) {
          console.log(this.fileList);
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
            this.$router.push('applyerList');
          }
        }).catch(error => {
          console.log(error);

        })


      },

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

  .base-box,
  .chooseAccept {
    margin-left: 20%;
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
    margin-left: -50px; /*qiu*/
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
    border:1px solid rgba(0, 0, 0, .2);
  }
</style>
