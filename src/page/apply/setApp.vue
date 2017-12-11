<template>
  <!--按套申请的使用登记表-->
  <div class="setApp" style="background-color:transparent">



    <div class="setApp_topbar">
      <div class="step" style="width:85%; margin-top:20px;">
        <Steps :current="current">
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
              <!--<Select v-model="ruleForm.registKind">-->
              <!--<Option v-for="item in registKindList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
              <!--</Select>-->
              <Select v-model="ruleForm.registKind" :disabled="true">
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>

            </Form-item>
            <Row>
              <Col span="11"><!--wang-->
              <!--<label class="form_label_left">设备种类</label>-->
              <Form-item label="设备种类" prop="deviceCategoryCode" class="fontsize">
                <Select v-model="ruleForm.deviceCategoryCode" filterable @on-change="chosenDeviceCategory"
                        :label-in-value=true :disabled="true">
                  <Option v-for="item in deviceCategoryList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="设备品种" prop="deviceKind">
                <!--<Input v-model="ruleForm.deviceKind" ></Input>-->
                <Select v-model="ruleForm.deviceKindCode" filterable @on-change="chosenDeviceType"
                        :disabled=this.ifDisabled :label-in-value=true clearable>
                  <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="设备代码" prop="eqCode">
                <!--<Input v-model="ruleForm.eqCode" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      按照产品数据表上的内容填写，该代码具有唯一性。如果该产品还没有编制设 备代码，则使用单位可以不填写，由登记机关按照设备代码的编制要求［见《固定式 压力容器安全技术监察规程》(TSG 21—2016)］填写，其中制造单位代号改为登记机关的行政区划代码(比制造单位代号多一位)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqCode" style="width:118.11%"></i-input>
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
              <!--<label class="form_label_right">设备类别</label>-->
              <Form-item label="设备类别" prop="deviceClass" class="ivu-form-item-required">
                <!--<Input v-model="ruleForm.deviceClass"></Input>-->
                <Select v-model="ruleForm.deviceClassCode" filterable @on-change="chosenDeviceClass"
                        :label-in-value=true clearable>
                  <Option v-for="item in deviceClassList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
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
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="useComName">
              <Input v-model="ruleForm.useComName" :disabled="true"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr" :disabled="true"></Input>
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
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%" :disabled="true"></i-input>
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
                  <i-input v-model="ruleForm.zipcode" style="width:118.11%" :disabled="true"></i-input>
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
                <!--<Input v-model="ruleForm.begin_use_date" ></Input>-->
                <!--<DatePicker v-model="ruleForm.eqUseDate"></DatePicker> -->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写办理登记的设备正式投入使用的开始日期(包括年、月、日)。
                    </p>
                  </div>
                  <DatePicker type="date"  format="yyyy年MM月dd日" v-model="ruleForm.eqUseDate" style="width:118.11%"></DatePicker>
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
                  <i-input v-model="ruleForm.safeAdministrator" style="width:118.11%" ></i-input>
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
                  <i-input v-model="ruleForm.staticPhone" style="width:118.11%" :disabled="true"></i-input>
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
                  <i-input v-model="ruleForm.mobilePhone" style="width:118.11%" ></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Form-item label="产权单位名称" prop="propertyComName">
              <Input v-model="ruleForm.propertyComName" :disabled="true"></Input>
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
                  <i-input v-model="ruleForm.propertyComCode" style="width:118.11%;" disabled></i-input>
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
          <!--</div>-->
          <!--<div class="checkInfo" v-if="this.active==3">-->
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
                  <DatePicker   type="date"  format="yyyy年MM月dd日" v-model="ruleForm.testDate" style="width:118.11%"></DatePicker>
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
                  <DatePicker  type="month"  format="yyyy年MM月" v-model="ruleForm.nextTestDate" style="width:118.11%"></DatePicker>
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
                <Input v-model="ruleForm.comTablePerson"></Input>
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


        <div class="setTable" v-if="this.active==2" style="width:900px;top:30px;position:absolute">
          <!--<embed  v-bind:src=this.pdfUrl width="100%" height="700px" id="iFramePdf" />-->
          <!--要这两行-->

          <iframe allowtransparency="true" id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList2"
                :before-upload="handleBeforeUpload2"
                :show-upload-list="true"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'社会信用代码证明'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10">
            <Form-item label="个人身份证明" :label-width="200" v-if="this.isCompany==false">
              <Upload
                ref="upload2"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList2"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'个人身份证明'"
                :before-upload="handleBeforeUpload2"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>

          <h5>特种设备监督检验证明</h5>

          <Row>
            <Col span="10">

            <Form-item label="制造监督检验证书" :label-width="200">
              <Upload
                ref="upload2"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList5"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'制造监督检验证书'+this.fileList[3]"
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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList6"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'安装监督检验证书'+this.fileList[4]"
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
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList7"
              :action="'/file/upload?applyId='+this.applyId+'&fileName='+'首次检验报告'+this.fileList[5]"
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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList8"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'机动车行驶证'+this.fileList[6]"
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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList9"
                :action="'/file/upload?applyId='+this.applyId+'&fileName='+'机动车登记证书'+this.fileList[7]"
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
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList10"
              :action="'/file/upload?applyId='+this.applyId+'&fileName='+'锅炉能效证明文件'+this.fileList[8]"
              :before-upload="handleBeforeUpload10"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

            </Upload>

          </Form-item>
          <h5>特种设备产品合格证</h5>
          <Row>
            <Col span="10">

            <Form-item label="产品合格证" :label-width="200">
              <Upload
                ref="upload2"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList3"
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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList4"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'产品数据表'+this.fileList[2]"
                :before-upload="handleBeforeUpload4"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
              <h5 style="color:red">注意⚠：如果没有产品数据表，可以下载下列标准模版，填写后上传。</h5>
              <a v-bind:href="'                                                    admin/static/file/cylinder.xlsx'" download="标准气瓶基本信息汇总表.xlsx"
                 class="detail_a">标准锅炉数据表</a></br>
              <a v-bind:href="'                                                    admin/static/file/cylinder.xlsx'" download="标准气瓶基本信息汇总表.xlsx"
                 class="detail_a">标准压力管道数据表</a>

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


          <!--<Button type="primary" @click="next()" v-if="this.active==1">下一步</Button>-->
          <Button type="primary" @click="confirmForm" v-if="this.active==1">下一步</Button>

          <!--<Button type="primary" @click="before()" v-if="this.active==1">上一步</Button>-->
          <Button @click="instance('success')" v-if="this.active==3" type="success" >确认提交</Button>


          <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

          <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
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
  //import breadCrumb from '../../components/breadCrumb/breadCrumb.vue'
  //  import VBreadCrumb from "../../components/breadCrumb/breadCrumb";
  export default {
    data() {
      return {
        fileList:[1,1,1,1,1,1,1,1,1],

        acceptCom: '',
        acceptComList: [],
        //等调的时候再拼接口
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        addressCode: '',
        //设备种类
        ifDisabled:'',
        //设备类别
        deviceClassList: [],
        //设备品种列表
        deviceTypeList: [],
        deviceType: '',
        deviceCategoryList: [
          {
            value: "1000",
            label: "锅炉"
          },
          {
            value: "2000",
            label: "压力容器"
          },
          {
            value: "8000",
            label: "压力管道"
          },
          {
            value: "7000",
            label: "压力管道元件"
          },
          {
            value: "3000",
            label: "电梯"
          },

          {
            value: "4000",
            label: "起重机械"
          },
          {
            value: "9000",
            label: "客运索道"
          },
          {
            value: "6000",
            label: "大型游乐设施"
          },
          {
            value: "5000",
            label: "场（厂）内专用机动车辆"
          },
          {
            value: "F000",
            label: "安全附件"
          },
        ],
        ruleForm: {
          registKind: '新设备首次启用',
          deviceCategory: '',
          deviceCategoryCode: '',
          deviceClass: '',
          deviceClassCode: '',
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          eqCode: '',
          model: '',
          designUseLimit: '',
          designComName: '',
          manufactureComName: '',
          constructComName: '',
          superviseComName: '',
          modelTestComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipcode: '',
          eqComCode: '',
          eqUseAddr: '',
          eqUseDate: '',
          staticPhone: '',
          safeAdministrator: '',
          mobilePhone: '',
          propertyComName: '',
          propertyComCode: '',
          propertyComPhone: '',
          testComName: '',
          testType: '',
          testReportCode: '',
          testDate: '',
          testResult: '',
          nextTestDate: '',
          comTablePerson: '',
          comPersonDate: '',

        },
        //wang
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
        //wang
        checkConclusionList: [
          {
            value: 'meetRequirement',
            label: '符合要求'
          },
          {
            value: 'basicallyMeetRequirement',
            label: '基本符合要求'
          },
          {
            value: 'qualified',
            label: '不符合要求'
          },
          {
            value: 'qualified',
            label: '合格'
          },
          {
            value: 'retestQualified',
            label: '复检合格'
          },
          {
            value: 'unqualified',
            label: '不合格'
          },
        ],
        //wang
        rules: {
          deviceCategoryCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceKindCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          eqCode: [
            {required: false, message: '', trigger: 'blur'}
          ],
          designUseLimit: [
            {required: false, message: '', trigger: 'blur'}
          ],
          manufactureComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          superviseComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deviceClassCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          model: [
            {required: false, message: '', trigger: 'blur'}
          ],
          designComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          constructComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          modelTestComName: [
            {required: false, message: '', trigger: 'blur'}
          ],
//          useComName: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          useComAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          useComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqUseDate: [
            {required: true, message: '不能为空', type: 'date', trigger: 'change'}
          ],
//          safeAdministrator: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          eqComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqUseAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          staticPhone: [
//            {required:true, message: '不能为空', trigger: 'blur'}
//          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
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
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          testType: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          testDate: [
            {required: true, message: '不能为空', type: 'date', trigger: 'change'}
          ],
          testReportCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          testResult: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          nextTestDate: [
            {required: true, message: '不能为空', type: 'date', trigger: 'change'}
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
          registPerson: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          registCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          registDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          comStampDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          registStampDate: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          registKind: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],

        },
        active: 1,
        modalCertain: false,
        author_key: '',
//        pdfUrl: {
//          锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//          水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
//        },
        defaultPdfList2: [],
        defaultPdfList3:[],
        defaultPdfList4: [],
        defaultPdfList5:[],
        defaultPdfList6: [],
        defaultPdfList7:[],
        defaultPdfList8: [],
        defaultPdfList9:[],
        defaultPdfList10: [],
//        bread_choose_value: '',
//        bread_choose: '',
        current: 0,
        device_type: '',
        ifold: 0,
        uploadList: [
          {"url": ''}
        ],

        visible: false,
        applyId: '',
        //设备类别id
        deviceCategoryId: '',
        deviceClassId: '',
        deviceClassTypeId: '',

        ifDisabled: false,

        fileId: '',
        //用户基本信息
        userDetailData: {},
        //点击上一步的标志
        creatOrUpdate: false,
        isCompany: false,
        //确认提交是否禁用
        ifSureSubmit:true,
        acceptorAgencyId:'',
        acceptorAgencyName:'',



      };
    },
    components: {

//      'v-regist_one': regist_one,
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {
        if (this.$route.path == '/setApp') {
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
    },

    methods: {
      ...mapActions(
        ['getUserData', 'changeInputTime'],
      ),

      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },

      setUserDetailData(){
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        this.ruleForm.zipcode = localStorage.getItem('zipcode');
        this.ruleForm.staticPhone = localStorage.getItem('staticPhone');
//        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.propertyComName = localStorage.getItem('propertyComName');
        this.ruleForm.propertyComCode = localStorage.getItem('propertyComCode');

        if (localStorage.getItem('company') == 'true') {
//          this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
          this.ruleForm.useComCode = localStorage.getItem('useComCode');
          this.isCompany = true;
        } else {
//          this.ruleForm.safeAdministrator = localStorage.getItem('name');
          this.ruleForm.useComCode = localStorage.getItem('verifyId');
          this.isCompany = false;

        }
        this.addressCode = localStorage.getItem('addressCode');

      },

      initData(){
        this.active = 1;
        this.current = 0;
        //this.resetForm('ruleForm');
        this.uploadList = [
          {"url": ''}
        ];
        this.creatOrUpdate = false;

        this.device_type = this.$route.query.device_type;
        this.ifold = this.$route.query.ifold;
        this.fileList=[1,1,1,1,1,1,1,1,1];
        this.ifDisabled = false;
        this.defaultPdfList2 = [];
        this.defaultPdfList3=[];
        this.defaultPdfList4 = [];
        this.defaultPdfList5=[];
        this.defaultPdfList6= [];
        this.defaultPdfList7=[];
        this.defaultPdfList8 = [];
        this.defaultPdfList9=[];
        this.defaultPdfList10=[];
        this.applyId='';

        //如果是第一次填写
        if (!(this.$route.query.ifold)) {
          this.clearRuleForm();
          this.deviceClassList = [];
          this.deviceTypeList = [];
          this.setUserDetailData();

          if (this.$route.query.device_type < 3) {
            this.ruleForm.deviceCategoryCode = this.deviceCategoryList[parseInt(this.device_type) - 1].value + "";
          } else if (2 < this.$route.query.device_type < 7) {
            this.ruleForm.deviceCategoryCode = this.deviceCategoryList[parseInt(this.device_type) + 1].value + "";
          }
          let params = 'code=' + this.ruleForm.deviceCategoryCode;
          if (this.deviceClassList !== '' && this.ruleForm.deviceCategoryCode) {
            setAppService.getDeviceClass(params).then(res => {
              this.deviceClassList = [];
              for (let i = 0, len = res.length; i < len; i++) {
                this.deviceClassList.push({value: res[i].code, label: res[i].name});
              }
            }).catch(error => {
              console.log(error);
            })
            params = 'addressCode=' + this.addressCode;
            setAppService.getAccpeter(params).then(res => {
              this.acceptComList = [];
              for (let i = 0, len = res.length; i < len; i++) {
                this.acceptComList.push({value: res[i].id, label: res[i].name});
              }
            }).catch(error => {
              console.log(error);
            })
          }
        } else {
          // 获取已经保存的信息
          this.getOldInfo();
        }

      },
      getOldInfo(){
        let params = 'applyId=' + this.$route.query.applyId;
        setAppService.getUnsubmitApp(params).then(res => {

          this.clearRuleForm();
          //this.defaultPdfList1 = res.pdfUrlDefault;
//          this.setUserDetailData();
          this.ruleForm = res.data.formList[0];
          this.acceptCom = res.data.acceptorAgencyId;
          if(res.data.deviceType=='锅炉'){
            this.device_type=1;
          }
          this.setUserDetailData();

          for(let valueName  in  res.data.files){
            if(valueName.replace(/\d+/g,'')=="社会信用代码证明"){
              this.defaultPdfList2=[{
                'name':'社会信用代码证明',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              }];
              this.fileList[0]++;
              this.uploadList[0].url = "/file/thumbnail?fileId="+res.data.files[valueName];
              this.pdfList.push("/file/preview?fileId="+res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="个人身份证明"){
              this.defaultPdfList2=[{
                'name':'个人身份证明',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              }]
              this.fileList[0]++;
              this.uploadList[0].url = "/file/thumbnail?fileId="+res.data.files[valueName];
              this.pdfList.push("/file/preview?fileId="+res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="产品合格证"){
              this.defaultPdfList3.push({
                'name':'产品合格证',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[1]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="产品数据表"){
              this.defaultPdfList4.push({
                'name':'产品数据表',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[2]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="制造监督检验证书"){
              this.defaultPdfList5.push({
                'name':'制造监督检验证书',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[3]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="安装监督检验证书"){
              this.defaultPdfList6.push({
                'name':'安装监督检验证书',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[4]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="首次检验报告"){
              this.defaultPdfList7.push({
                'name':'首次检验报告',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[5]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="机动车行驶证"){
              this.defaultPdfList8.push({
                'name':'机动车行驶证',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[6]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="机动车登记证书"){
              this.defaultPdfList9.push({
                'name':'机动车登记证书',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[7]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="锅炉能效证明文件"){
              this.defaultPdfList10.push({
                'name':'锅炉能效证明文件',
                'url':'/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[8]++;
              this.uploadList.push({"url": "/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/file/preview?fileId=" + res.data.files[valueName])
            }

          }
          let params = 'addressCode=' + this.addressCode;
          setAppService.getAccpeter(params).then(res => {
            this.acceptComList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.acceptComList.push({value: res[i].id, label: res[i].name});
            }
            this.acceptorAgencyName = this.acceptComList[this.acceptCom].label;
          }).catch(error => {
            console.log(error);
          })

        }).catch(error => {
          console.log(error)
        })


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
      //
      chosenDeviceType(value){
        this.deviceClassTypeId = value.label;
      },
      //选择受理机关
      chosenAccept(value){
        this.acceptorAgencyId = value.value;
        this.acceptorAgencyName = value.label;
      },

      //清空表单
      clearRuleForm(){
        this.ruleForm = {
          registKind: '新设备首次启用',
          deviceCategory: '',
          deviceCategoryCode: '',
          deviceClass: '',
          deviceClassCode: '',
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          eqCode: '',
          model: '',
          designUseLimit: '',
          designComName: '',
          manufactureComName: '',
          constructComName: '',
          superviseComName: '',
          modelTestComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipcode: '',
          eqComCode: '',
          eqUseAddr: '',
          eqUseDate: '',
          staticPhone: '',
          safeAdministrator: '',
          mobilePhone: '',
          propertyComName: '',
          propertyComCode: '',
          propertyComPhone: '',
          testComName: '',
          testType: '',
          testReportCode: '',
          testDate: '',
          testResult: '',
          nextTestDate: '',
          comTablePerson: '',
        }
      },

      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];
            this.pdfUrl = '/file/preview?fileId=' + this.fileId;
//            this.pdfUrl = '/admin/file/preview?fileId='+ res.data.forms['特种设备使用登记表一'];

            this.$Message.info('您已提交信息，请预览结果');
            this.modalCertain = false;
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
      changeTime(time){
        let newTime = new Date(time)
        return newTime.getFullYear() + "年" + (parseInt(newTime.getMonth()) + 1) + "月" + newTime.getDate() + "日"

      },
      makeParams(){
        let submitParam = {};
        //提交表单1
        this.ruleForm.deviceCategory = this.deviceCategoryId;
        this.ruleForm.deviceClass = this.deviceClassId;
        this.ruleForm.deviceKind = this.deviceClassTypeId;
        submitParam.formList = [];
        submitParam.formList.push(this.ruleForm);
        submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
        submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
        submitParam.formList[0].formType = 1;
        //设备类别
        if (this.device_type) {
          submitParam.deviceType = parseInt(this.device_type);
        } else {
          submitParam.deviceType = parseInt(this.$route.query.device_type);
        }
        //首次申请
        submitParam.applyType = 1;
        submitParam.eqComCode = this.ruleForm.eqComCode;
        //登记证编号
        submitParam.registCode = '';
        //提交设备类别等
        submitParam.deviceCategory = this.deviceCategoryId;
        submitParam.deviceClass = this.deviceClassId;
        submitParam.deviceKind = this.deviceClassTypeId;
        submitParam.eqCode = this.ruleForm.eqCode;
        return submitParam;
      },
      //更新表单
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            let formList = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            // let submitParam=this.makeParams();
            let submitParam = {};
            if(this.deviceCategoryId!==""){
              this.ruleForm.deviceCategory = this.deviceCategoryId;
            }
            if(this.deviceClassId!==""){
              this.ruleForm.deviceClass = this.deviceClassId;
            }
            if(this.deviceClassTypeId!==""){
              this.ruleForm.deviceKind = this.deviceClassTypeId;
            }
            submitParam.formList = [];
            submitParam.formList.push(this.ruleForm);
            submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
            submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
            submitParam.formList[0].formType = 1;
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
              this.ruleForm.deviceCategory = this.deviceCategoryId;
              this.ruleForm.deviceClass = this.deviceClassId;
              this.ruleForm.deviceKind = this.deviceClassTypeId;
//              this.changeInputTime(this.ruleForm.eqUseDate);
//              this.ruleForm.eqUseDate = this.getInputTime;
//              this.changeInputTime(this.ruleForm.testDate);
//              this.ruleForm.testDate = this.getInputTime;
//              this.changeInputTime(this.ruleForm.nextTestDate);
//              this.ruleForm.nextTestDate = this.getInputTime;
              submitParam.formList = [];
              submitParam.formList.push(this.ruleForm);
              submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
              submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
              submitParam.formList[0].formType = 1;
              submitParam.id = parseInt(this.applyId)||parseInt(this.$route.query.applyId);
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
        this.creatOrUpdate = true;
      },

      confirmForm () {
        if (this.acceptCom == '') {
          this.$Notice.error({
            title: '这是通知标题',
            desc: '请选择登记机关'
          });
          return
        }
        if (this.ruleForm.deviceClassCode == '') {
          this.$Notice.error({
            title: '这是通知标题',
            desc: '请选择设备类别'
          });
          return
        }
        if (this.ruleForm.testDate >this.ruleForm.nextTestDate ) {
          this.$Notice.error({
            title: '这是通知标题',
            desc: '下次检验日期需在检验日期之后'
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
        if (this.uploadList[0].url === '') {
          this.uploadList[0].url =  res.data.thumbnail;
          this.pdfList.push(res.data.preview)
        } else {
          this.uploadList.push({"url": res.data.thumbnail});
          this.pdfList.push( res.data.preview)
        }
      },
      handleRemove(res, file) {
        for (let i = 0; i < this.uploadList.length; i++) {
          if(res.response){
            if (this.uploadList[i].url == res.response.data.thumbnail) {
              this.uploadList.splice(i, 1);
            }
          }
          if( res.url){
            if (this.uploadList[i].url.split("=")[1] == res.url.split("=")[1]) {

              this.uploadList.splice(i, 1);
            }
          }

        }
        if (this.uploadList.length == '') {
          this.uploadList = [
            {"url": ''}
          ];
        }



      },
      handleBeforeUpload (index) {
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

      //打印按钮

      //这里参数要改
      instance (type) {
        console.log(this.fileList);
        if(this.device_type==1){
          for(let i=0;i<this.fileList.length;i++){
            if(this.fileList[i]<=1){
              this.$Notice.warning({
                title: '通知',
                desc: '请上传全部pdf文件'
              });
              return
            }
          }

        }else{
          for(let i=0;i<this.fileList.length-1;i++){
            if(this.fileList[i]<=1){
              this.$Notice.warning({
                title: '通知',
                desc: '请上传全部pdf文件'
              });
              return
            }
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
//      changeBasic(){
//        this.ifold = 0;
//      }
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

  .chooseAccept {
    padding-bottom: 10px;
    margin-bottom: 10px;
  }


</style>
