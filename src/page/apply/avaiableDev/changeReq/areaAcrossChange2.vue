<template>
  <div class="areaAcrossChange2">

    <div class="setApp_topbar">
      <div class="step" style="width:85%; margin-top:20px;">
        <Steps :current="current">
          <Step title="步骤1" content="选择变更单位"></Step>
          <Step title="步骤2" content="选择要变更的设备"></Step>
          <Step title="步骤3" content="填写《特种设备使用登记表》"></Step>
          <Step title="步骤4" content="预览《特种设备使用登记表》"></Step>
          <Step title="步骤5" content="提交相关证件"></Step>
          <Step title="步骤6" content="完成变更"></Step>
        </Steps>
      </div>
    </div>
    <div class="setApp_content" style="position:absolute;top:85px;">
      <div v-if="this.active==2" class="statusInfo" style="margin-bottom:20px;">
        <div class="list-box">
          <h3 class="header_one" style="margin:10px;">选择要变更的设备</h3>
          <Table border ref="selection" :columns="columnsCanStopUse" :data="canStopUseDeviceList"
                 @on-select="selectDevice"></Table>
        </div>





      </div>
      <Form ref="ruleForm" style="width: 135%;" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <div class="statusInfo" v-if="this.active==3">
          <div class="chooseAccept">
            <h3 class="header_one" style="margin-bottom:10px;">登记机关</h3>
            <FormItem label="登记机关" class="ivu-form-item-required">
              <Select v-model="acceptCom" filterable @on-change="chosenAccept" :label-in-value="true">
                <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </div>
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表</h2>
            <h2 class="header_two">设备基本情况</h2>
            <!--wang-->
            <Form-item label="登记类别" prop="registKind">
              <Select v-model="ruleForm.registKind"
                      :disabled="true">
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>

            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="设备种类" prop="deviceCategory">
                <i-input v-model="ruleForm.deviceCategory" style="width:107%"
                            :disabled="true"></i-input>
              </Form-item>
              <Form-item label="设备品种" prop="deviceKind">
                <i-input v-model="ruleForm.deviceKind" style="width:107%":disabled="true"></i-input>
              </Form-item>
              <Form-item label="设备代码" prop="eqCode">
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品数据表上的内容填写，该代码具有唯一性。如果该产品还没有编制设 备代码，则使用单位可以不填写，由登记机关按照设备代码的编制要求［见《固定式 压力容器安全技术监察规程》(TSG 21—2016)］填写，其中制造单位代号改为登记机关的行政区划代码(比制造单位代号多一位)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqCode" style="width:118.11%":disabled="true"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="设计使用年限" prop="designUseLimit">
                <!--<Input v-model="ruleForm.designUseLimit"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品数据表提供的数据填写。技术资料中未提供的，划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.designUseLimit" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备类别" prop="deviceClass">
                <i-input v-model="ruleForm.deviceClass" style="width:107%"
                            :disabled="true"></i-input>
              </Form-item>
              <Form-item label="产品名称" prop="deviceName">
                <!--<Input v-model="ruleForm.deviceName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品铭牌或者产品合格证、产品数据表的内容填写，也称设备名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.deviceName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="型号（规格）" prop="model">
                <!--<Input v-model="ruleForm.model"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品数据表或者相应的设计文件填写，有型号的填写型号，没有型号有规格的填写规格，没有型号、规格的，划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.model" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="设计单位名称" prop="designComName">
                <!--<Input v-model="ruleForm.designComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写产品的设计单位名称，其名称与产品合格证和产品铭牌(设计图纸)表述应当一致。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.designComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span='11'>
              <Form-item label="制造单位名称" prop="manufactureComName">
                <!--<Input v-model="ruleForm.manufactureComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写产品的制造单位名称，其名称与产品合格证和产品铭牌表述应当一致.
                    </p>
                  </div>
                  <i-input v-model="ruleForm.manufactureComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="监督检验机构名称" prop="superviseComName">
                <!--<Input v-model="ruleForm.superviseComName"></Input>-->
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

              <Col span="11" offset="2">
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="施工单位名称" prop="constructComName">
                <!--<Input v-model="ruleForm.constructComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写登记时最近一次从事安装或者改造、修理的施工单位的名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.constructComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>

              <Form-item label="型式试验机构名称" prop="modelTestComName">
                <!--<Input v-model="ruleForm.modelTestComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写型式试验机构的名称(全称)。安全技术规范未规定型式试验的，划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.modelTestComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

          </div>
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
                <!--<Input v-model="ruleForm.useComCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zipcode">
                <!--<Input v-model="ruleForm.zipcode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位所在地的邮政编码。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.zipcode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row><!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="单位内编号" prop="eqComCode">
                <!--<Input v-model="ruleForm.eqComCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位对设备进行管理自行编制的设备内部编号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqComCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备使用地点" prop="eqUseAddr">
                <!--<Input v-model="ruleForm.eqUseAddr"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写设备安装在单位内的固定地点，如某某车间、某某场地等。移动式(流动式) 特种设备，填写“移动”或者“流动”。设备使用地点不在使用单位内的，应当按照所在省(自治区)、市(地、州)、区(县)、街道(镇、乡)、小区(村)、门牌号等填写设备使用地的详细地址。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqUseAddr" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Row><!--wang-->
              <Col span="11">
              <Form-item label="投入使用日期" prop="eqUseDate">
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
                <!--<Input v-model="ruleForm.safeAdministrator"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职的安全管理员姓名。如果聘用专业技术服务机构的人员负责安全管理，则填写该人员的姓名。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.safeAdministrator" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="单位固定电话" prop="staticPhone">
                <!--<Input v-model="ruleForm.staticPhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位特种设备安全管理机构或者主管特种设备机构的联系电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.staticPhone" style="width:118.11%"></i-input>
                </Poptip>

              </Form-item>
              <Form-item label="移动电话" prop="mobilePhone">
                <!--<Input v-model="ruleForm.mobilePhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职、聘用的安全管理员的移动电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.mobilePhone" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Form-item label="产权单位名称" prop="propertyComName">
              <Input v-model="ruleForm.propertyComName"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="产权单位统一社会信用代码" prop="propertyComCode">
                <!--<Input v-model="ruleForm.propertyComCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写产权单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。如果和使用单位为同一单位，则在此栏中划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.propertyComCode" style="width:118.11%;"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="联系电话" prop="propertyComPhone">
                <!--<Input v-model="ruleForm.propertyComPhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写产权单位特种设备安全管理机构或者主管特种设备机构的联系电话。如果和使用单位为同一单位，则在此栏中划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.propertyComPhone" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

          </div>
          <div class="base-box">
            <h2 class="header_two">设备检验情况</h2>
            <Row>
              <Col span="11">
              <Form-item label="检验机构名称" prop="testComName">
                <!--<Input v-model="ruleForm.testComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写从事检验的检验机构名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.testComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验类别" prop="testType">
                <!--<Input v-model="ruleForm.testType"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      根据检验情况，填写使用登记时最后完成的检验类别，如安装监督检验、改造监督检验、重大修理监督检验、首次检验、定期检验、达到设计使用年限检验或者安全评估、基于风险检验、事故检验等。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.testType" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="11">
              <Form-item label="检验报告编号" prop="testReportCode">
                <!--<Input v-model="ruleForm.testReportCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写检验机构出具的检验报告的编号或者安全评估机构出具的安全评估报告编号，没有要求出具检验报告的，只填写监检证书编号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.testReportCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验日期" prop="testDate">
                <!--wang-->
                <!--<DatePicker v-model="ruleForm.testDate"></DatePicker>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写进行检验的日期，一般是检验完成的日期，即报告出具日期(年、月、日)。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.testDate" style="width:118.11%"></DatePicker>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="检验结论" prop="testResult">
                <!--wang-->
                <!--<Select v-model="ruleForm.testResult">-->
                <!--<Option v-for="item in checkConclusionList" :value="item.value" :key="item.value">{{ item.label }}-->
                <!--</Option>-->
                <!--</Select>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照有关检验规则的要求填写，如符合要求、基本符合要求、不符合要求，合 格、复检合格、不合格等。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.testResult" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="下次检验日期" prop="nextTestDate">
                <!--wang-->
                <!--<DatePicker v-model="ruleForm.nextTestDate"></DatePicker>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      首次定期检验日期由使用单位在首次登记时根据本规则和相关安全技术规范的规定填写，登记机关进行审核；对已经实施检验的，使用单位按照检验报告确定的下次检验日期填写；由于结构原因，设计文件规定无法实施定期检验的特种设备，使用单位填写“设计规定不实施定期检验”。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.nextTestDate" style="width:118.11%"></DatePicker>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
          </div>
          <div class="base-box">
            <h2 class="header_two">其他信息</h2>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="使用单位填表人员" prop="comTablePerson">
                <!--wang-->
                <Input v-model="ruleForm.comTablePerson" style="width:118.11%"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <!--<Form-item label="日期" prop="comPersonDate">-->
              <!--&lt;!&ndash;wang&ndash;&gt;-->
              <!--&lt;!&ndash;<DatePicker v-model="ruleForm.nextTestDate"></DatePicker>&ndash;&gt;-->
              <!--<DatePicker v-model="ruleForm.comPersonDate"></DatePicker>-->
              <!--</Form-item>-->
              </Col>
            </Row>
          </div>

        </div>


        <div class="setTable" v-if="this.active==4" style="width:900px;top:30px;position:absolute">
          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>
          <Button type="primary" @click="before()" v-if="this.active==4">上一步</Button>
          <Button type="success" @click="next()" v-if="this.active==4">下一步</Button>

        </div>
        <div class="pdfInfo" v-if="this.active==5">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Row style="width:1000px;">
            <Col span="10">
            <Form-item label="特种设备使用登记证变更证明" :label-width="200">
              <Upload
                ref="upload1"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'特种设备使用登记证变更证明'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10">
            <Form-item label="标有注销标记的原使用登记表" :label-width="200">
              <Upload
                ref="upload2"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'标有注销标记的原使用登记表'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10">
            <Form-item label="移装后的检验报告" :label-width="200">
              <Upload
                ref="upload3"
                :format="['pdf']"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'移装后的检验报告'"
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

          <Button type="primary" @click="confirmForm" v-if="this.active==3">下一步</Button>
          <Button @click="instance('success')" v-if="this.active==5">确认提交</Button>

        </div>

      </Form>

    </div>


  </div>
</template>
<script>

  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../../../services/setApp'
  import * as avaivbleService from '../../../../services/avaiableDev'
   import * as appDetailService from '../../../../services/appDetailService'



  //import breadCrumb from '../../components/breadCrumb/breadCrumb.vue'
  //import VBreadCrumb from "../../components/breadCrumb/breadCrumb";
  export default {
    data() {
      return {
        canStopUseDeviceList: [],
        deviceTypeList: [],
        //  deviceCategoryList: [
        //   {
        //     value: "1000",
        //     label: "锅炉"
        //   },
        //   {
        //     value: "2000",
        //     label: "压力容器"
        //   },
        //   {
        //     value: "8000",
        //     label: "压力管道"
        //   },
        //   {
        //     value: "7000",
        //     label: "压力管道元件"
        //   },
        //   {
        //     value: "3000",
        //     label: "电梯"
        //   },

        //   {
        //     value: "4000",
        //     label: "起重机械"
        //   },
        //   {
        //     value: "9000",
        //     label: "客运索道"
        //   },
        //   {
        //     value: "6000",
        //     label: "大型游乐设施"
        //   },
        //   {
        //     value: "5000",
        //     label: "场（厂）内专用机动车辆"
        //   },
        //   {
        //     value: "F000",
        //     label: "安全附件"
        //   },
        // ],
        deviceId:'',
        deviceClassList: [],
        columnsCanStopUse: [
          // {
          //   type: 'selection',
          //   width: 60,
          //   align: 'center'
          // },
          {
            type: 'index',
            key: 'id',
            width: 60,

          },
          {
            title: '设备品种',
            key: 'deviceKind',
            width:120,
          },
          {
            title: '使用登记证编号',
            key: 'registCode'
          },
          {
            title: '设备代码',
            key: 'eqCode'
          },
          {
            title: '设备使用地点',
            key: 'eqUseAddr'
          },
          {
            title: '产品编号',
            key: 'productCode'
          },

          {
            title: '操作',
            key: 'state',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.current = 2;
                      this.active = 3;
                      this.selectDevice(params.row);
                      // this.continueApp(params.index)
                    }
                  }
                }, '变更'),
              ]);
            }

          }
        ],
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        addressCode: '',
        registCode:'',
        deviceType:'',
        ifold: 0,
        acceptCom: '',
        acceptComList: [],
        current: 0,
        ruleForm: {
          registKind: '',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          safeAdministrator: '',
          propertyComPhone: '',
          subList: [],
          comTablePerson: '',
          mobilePhone:'',
        },

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
        ifDisabled:'',
        formDynamicPres: {
          items: [
            {
              deviceKind: '',
              registCode: '',
              eqCode: '',
              eqUseAddr: '',
              productCode: '',
              reasons: '',
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
        rules: {
          deviceCategoryCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceKindCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          // eqCode: [
          //   {required: true, message: '不能为空', trigger: 'change'}
          // ],
          designUseLimit: [
            {required: false, message: '', trigger: 'change'}
          ],
          manufactureComName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          superviseComName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceClassCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          model: [
            {required: false, message: '', trigger: 'change'}
          ],
          designComName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          constructComName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          modelTestComName: [
            {required: false, message: '', trigger: 'change'}
          ],
//          useComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          useComAddr: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          useComCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          eqUseDate: [
            {required: true, message: '请选择日期', type: 'date', trigger: 'change'}
          ],
//          safeAdministrator: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          eqComCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          zipcode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          eqUseAddr: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
//          staticPhone: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
//          propertyComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComCode: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComPhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          testComName: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          testType: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          testDate: [
            {required: true, message: '请选择日期', type: 'date', trigger: 'change'}
          ],
          testReportCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          testResult: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          nextTestDate: [
            {required: true, message: '请选择日期', type: 'date', trigger: 'change'}
          ],

          comTablePerson: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          comPersonDate: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          comSafePerson: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          safePersonDate: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          registPerson: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          registCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          registDate: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          comStampDate: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          registStampDate: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          registKind: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],

        },
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
    mounted(){
      this.initData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/areaAcrossChange') {
          this.initData();
        }
      }
    },
    methods: {
      ...mapActions(
        [ 'getUserData'],
      ),
      handleAddPres () {
        this.formDynamicPres.items.push({
          deviceKind: '',
          registCode: '',
          eqCode: '',
          eqUseAddr: '',
          productCode: '',
          reasons: '',
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
      chosenAccept(value){
        this.propertyComCode = value.value;
        this.propertyComName = value.label;
      },
      setUserDetailData(){
        this.addressCode = localStorage.getItem('addressCode');
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.propertyComName = localStorage.getItem('propertyComName');

        if (localStorage.getItem('company') == 'true') {
          this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
          this.isCompany = true;
          console.log( this.ruleForm.safeAdministrator)
        } else {
          this.ruleForm.safeAdministrator = localStorage.getItem('name');
          this.isCompany = false;
        }

      },
      initData(){
        this.active = 2;
        this.current = 1;
        this.creatOrUpdate = false;
        this.ifold = this.$route.query.ifold;
        this.defaultPdfList1 = [];
        this.deviceCode=this.$route.query.deviceCode;
        this.registCode=this.$route.query.registCode;
        this.deviceType=this.$route.query.deviceType;
        this.uploadList = [
          {"url": ''}
        ];
        this.canStopUseDeviceList=[];
        //如果是第一次填写
        this.clearRuleForm();
        this.formDynamicPres.items = [
          {
            deviceKind: '',
            registCode: '',
            eqCode: '',
            eqUseAddr: '',
            productCode: '',
            reasons: '',
          }
        ];
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
        params = {
          size: 10,
          processing:false,
          states:[3],
        }
        this.getCanStopUseDevice(params);
      },
      getCanStopUseDevice(waitAccparams){
        avaivbleService.GetDevOrders(waitAccparams).then(res => {
            if (res.status === 200) {
              for(let i=0;i<res.data.content.length;i++){
                // let canStopUse={
                //   deviceKind:res.data.content[i].deviceKind,
                //   registCode:res.data.content[i].registCode,
                //   eqCode:res.data.content[i].eqCode,
                //   eqUseAddr:res.data.content[i].eqUseAddr,
                //   productCode:res.data.content[i].productCode,
                //   deviceId:res.data.content[i].id,
                // }
                // this.canStopUseDeviceList.push(canStopUse);
                 this.canStopUseDeviceList=res.data.content;

              }

            } else {

            }
          }
        ).catch(error => {
          console.log(error);
        })
      },
      clearRuleForm(){
        this.ruleForm = {
          registKind: '移装',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          safeAdministrator: '',
          propertyComPhone: '',
          subList: [],
          mobilePhone:'',
          comTablePerson: '',
        }
      },
     chosenDeviceType(value){
        this.deviceClassTypeId = value.label;
      },

      submit(submitParam){
        setAppService.submitChangeInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];

            // this.fileId = res.data.forms[1];
            this.pdfUrl = '/file/preview?fileId=' + this.fileId;
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
        submitParam.formList = [];
        submitParam.formList.push(this.ruleForm);
        submitParam.formList[0].acceptorAgencyId = this.propertyComCode;
        submitParam.formList[0].acceptorAgencyName = this.propertyComName;
        submitParam.formList[0].formType = 1;
//        submitParam.deviceId=parseInt(this.deviceCode);
//        submitParam.deviceType=parseInt(this.deviceType);
//        submitParam.eqCodeList=[];
//        for(let i=0;i<this.ruleForm.subList.length;i++){
//          submitParam.eqCodeList.push(this.ruleForm.subList[i].eqCode)
//        }
         submitParam.deviceId = this.deviceId;
        //报废申请
        submitParam.applyType = "跨区域变更申请";
//        //登记证编号
//        submitParam.registCode =this.registCode;
        //提交设备类别等
        return submitParam;
      },
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let formList = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            // let submitParam=this.makeParams();
            let submitParam = {};
            submitParam.formList = [];
            submitParam.formList.push(this.ruleForm);
            submitParam.formList[0].acceptorAgencyId = this.propertyComCode;
            submitParam.formList[0].acceptorAgencyName = this.propertyComName;
            submitParam.formList[0].formType = 1;
            submitParam.applyType = "跨区域变更申请";
            submitParam.id = parseInt(this.applyId)||parseInt(this.$route.query.applyId);
            setAppService.updateSetInfo(submitParam).then(res => {
              if (res.status == 200) {
                this.current++;
                this.active++;
                this.applyId = res.data.applyId;
                this.pdfUrl = '/file/preview?fileId='+ res.data.forms['特种设备使用登记表一'];
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
        //选择设备种类、类别、品种
      chosenDeviceCategory(value){
        let params = 'code=' + value.value;
        this.deviceCategoryId = value.label;
        if (value.value !== '' && this.deviceClassList !== '') {
          setAppService.getDeviceClass(params).then(res => {
            this.deviceClassList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.deviceClassList.push({value: res[i].code, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })
        }

      },
      next() {
        // if(this.ruleForm.subList.length==0){
        //   this.$Message.info('请选择要变更的设备');
        //   return
        // }
        if (this.current == 5) {
          this.current = 0;
        } else {
          this.current += 1;
        }
        this.active++;

      },
      before() {
        this.current--;
        this.active--;
        if(this.active==3){
          this.creatOrUpdate = true;
        }
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
          this.uploadList[0].url = res.data.thumbnail;
          this.pdfList.push(res.data.preview)
        } else {
          this.uploadList.push({"url": res.data.thumbnail});
          this.pdfList.push(res.data.preview)

        }

      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc: '请上传pdf格式文件'
        });
      },
      handleRemove(res, file) {
        for (let i = 0; i < this.uploadList.length; i++) {
          if (this.uploadList[i].url == res.response.data.thumbnail) {
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
      chosenDeviceClass(value){
        let params = 'code=' + value.value;
        this.deviceClassId = value.label;
        if (value.value !== '' && this.deviceTypeList !== []) {
          setAppService.getDeviceType(params).then(res => {
            this.deviceTypeList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.deviceTypeList.push({value: res[i].code, label: res[i].name});
            }
            if (this.deviceTypeList.length === 0) {
              this.ifDisabled = true;
              this.deviceTypePlace = '-';
            } else {
              this.ifDisabled = false;
            }
          }).catch(error => {
            console.log(error);
          })
        }

      },
      instance (type) {
        let params = 'applyId=' + this.applyId;
        setAppService.confrimApp(params).then(res => {
          if (res) {
            this.$Modal.confirm({
              title: '通知',
              content: '<p>您已经成功提交申请</p><p>请耐心等待受理结果</p>',
              onOk: () => {
                this.$router.go(0);
              },
              onCancel: () => {
                this.$Message.info('点击了取消');
              }
            });
//            this.$router.push({
//              path: 'devList',
//            });
          }
        }).catch(error => {
          console.log(error);

        })
      },
      selectDevice(row){
        console.log(row)

        // this.formDynamicPres.items=selection;
        // this.ruleForm.subList=selection;
        // this.ruleForm.deviceNum=selection.length;
        this.ruleForm.registCode=row.registCode;
        this.ruleForm.deviceCategory=row.deviceCategory;
        this.ruleForm.deviceClass=row.deviceClass;
        this.ruleForm.deviceKind=row.deviceKind;
        this.ruleForm.eqCode=row.eqCode;
        this.deviceId=row.id;
        console.log(this.deviceId);
//         let params = 'applyId=' + row.id;
        appDetailService.getAppDetail(params).then(res => {
          this.ruleForm=res.data.formList[0];



        }).catch(error => {
          console.log(error)
        })

      },
      selectDeviceAll(selection){
        this.formDynamicPres.items=selection;
        this.ruleForm.subList=selection;
        this.ruleForm.deviceNum=selection.length;
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
  /*wang*/
  .base-box,
  .chooseAccept{
    margin-left: 8%;
    display: block;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    //padding: 3px;
    width: 83.881%;
    padding-left: 100px;
    padding-right: 100px;
    box-sizing: border-box;
    background-color: white;

  }
  .chooseAccept {
    padding-bottom: 10px;
    margin-bottom: 10px;
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
  .formDynamicPres{
    border: 1px solid rgba(0, 0, 0, .2);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-bottom:5px;
    padding-left:5%;
    padding-top:3%;
  }
  .list-box {
    display: block;
    height: auto;
    //border: 1 px solid rgb(229, 229, 229);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;

  }
  .taishu :before{
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 16px;
    color: #f30;

  }

</style>
