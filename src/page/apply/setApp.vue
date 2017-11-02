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
              <!--<Select v-model="ruleForm.registKind">-->
              <!--<Option v-for="item in registKindList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
              <!--</Select>-->
              <Select v-model="ruleForm.registKind">
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>

            </Form-item>
            <Row>
              <Col span="11"><!--wang-->
              <!--<label class="form_label_left">设备种类</label>-->
              <Form-item label="设备种类" prop="eqSpeciesCode" class="fontsize">
                <Select v-model="ruleForm.eqSpeciesCode" filterable @on-change="chosenDeviceCategory"
                        :label-in-value=true>
                  <Option v-for="item in deviceCategoryList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="设备品种" prop="eqVariety">
                <!--<Input v-model="ruleForm.eqVariety" ></Input>-->
                <Select v-model="ruleForm.eqVarietyCode"  filterable @on-change="chosenDeviceType"
                        :disabled=this.ifDisabled :label-in-value=true>
                  <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="设备代码" prop="eqCode">
                <!--<Input v-model="ruleForm.eqCode" ></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
              <Form-item label="设备类别" prop="eqCategory">
                <!--<Input v-model="ruleForm.eqCategory"></Input>-->
                <Select v-model="ruleForm.eqCategoryCode" filterable @on-change="chosenDeviceClass"
                        :label-in-value=true>
                  <Option v-for="item in deviceClassList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="产品名称" prop="eqName">
                <!--<Input v-model="ruleForm.eqName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      按照产品铭牌或者产品合格证、产品数据表的内容填写，也称设备名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              <Form-item label="型号（规格）" prop="model">
                <!--<Input v-model="ruleForm.model"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写登记时最近一次从事安装或者改造、修理的施工单位的名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.constructComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>

              <Form-item label="型式试验机构名称" prop="testComName">
                <!--<Input v-model="ruleForm.testComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写型式试验机构的名称(全称)。安全技术规范未规定型式试验的，划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.testComName" style="width:118.11%"></i-input>
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
              <Input v-model="ruleForm.useComName"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="useComAddr">
              <Input v-model="ruleForm.useComAddr" ></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="使用单位统一社会信用代码" prop="useComCode">
                <!--<Input v-model="ruleForm.useComCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="邮政编码" prop="zipCode">
                <!--<Input v-model="ruleForm.zipCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位所在地的邮政编码。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.zipCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row><!--wang-->
            <Row>
              <Col span="11">
              <Form-item label="单位内编号" prop="comCode">
                <!--<Input v-model="ruleForm.comCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位对设备进行管理自行编制的设备内部编号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备使用地点" prop="eqUseLocation">
                <!--<Input v-model="ruleForm.eqUseLocation"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写设备安装在单位内的固定地点，如某某车间、某某场地等。移动式(流动式) 特种设备，填写“移动”或者“流动”。设备使用地点不在使用单位内的，应当按照所在省(自治区)、市(地、州)、区(县)、街道(镇、乡)、小区(村)、门牌号等填写设备使用地的详细地址。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqUseLocation" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Row><!--wang-->
              <Col span="11">
              <Form-item label="投入使用日期" prop="beginUseDate">
                <!--<Input v-model="ruleForm.begin_use_date" ></Input>-->
                <!--<DatePicker v-model="ruleForm.beginUseDate"></DatePicker> -->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写办理登记的设备正式投入使用的开始日期(包括年、月、日)。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.beginUseDate" style="width:118.11%"></DatePicker>
                </Poptip>
              </Form-item>
              <Form-item label="安全管理员" prop="safeAdmin">
                <!--<Input v-model="ruleForm.safeAdmin"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职的安全管理员姓名。如果聘用专业技术服务机构的人员负责安全管理，则填写该人员的姓名。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.safeAdmin" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="单位固定电话" prop="comPhone">
                <!--<Input v-model="ruleForm.comPhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位特种设备安全管理机构或者主管特种设备机构的联系电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.comPhone" style="width:118.11%"></i-input>
                </Poptip>

              </Form-item>
              <Form-item label="移动电话" prop="mobilePhone">
                <!--<Input v-model="ruleForm.mobilePhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
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
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写产权单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。如果和使用单位为同一单位，则在此栏中划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.propertyComCode" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="联系电话" prop="telephone">
                <!--<Input v-model="ruleForm.telephone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写产权单位特种设备安全管理机构或者主管特种设备机构的联系电话。如果和使用单位为同一单位，则在此栏中划“—”。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.telephone" style="width:118.11%"></i-input>
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
              <Form-item label="检验机构名称" prop="checkComName">
                <!--<Input v-model="ruleForm.checkComName"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写从事检验的检验机构名称。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.checkComName" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验类别" prop="checkCategory">
                <!--<Input v-model="ruleForm.checkCategory"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      根据检验情况，填写使用登记时最后完成的检验类别，如安装监督检验、改造监督检验、重大修理监督检验、首次检验、定期检验、达到设计使用年限检验或者安全评估、基于风险检验、事故检验等。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.checkCategory" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="11">
              <Form-item label="检验报告编号" prop="checkReportNum">
                <!--<Input v-model="ruleForm.checkReportNum"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写检验机构出具的检验报告的编号或者安全评估机构出具的安全评估报告编号，没有要求出具检验报告的，只填写监检证书编号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.checkReportNum" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="检验日期" prop="checkDate">
                <!--wang-->
                <!--<DatePicker v-model="ruleForm.checkDate"></DatePicker>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写进行检验的日期，一般是检验完成的日期，即报告出具日期(年、月、日)。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.checkDate" style="width:118.11%"></DatePicker>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
            <Row><!--wang-->
              <Col span="11">
              <Form-item label="检验结论" prop="checkConclusion">
                <!--wang-->
                <Select v-model="ruleForm.checkConclusion">
                  <Option v-for="item in checkConclusionList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="下次检验日期" prop="nextCheckDate">
                <!--wang-->
                <!--<DatePicker v-model="ruleForm.nextCheckDate"></DatePicker>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      首次定期检验日期由使用单位在首次登记时根据本规则和相关安全技术规范的规定填写，登记机关进行审核；对已经实施检验的，使用单位按照检验报告确定的下次检验日期填写；由于结构原因，设计文件规定无法实施定期检验的特种设备，使用单位填写“设计规定不实施定期检验”。
                    </p>
                  </div>
                  <DatePicker v-model="ruleForm.nextCheckDate" style="width:118.11%"></DatePicker>
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
              <Form-item label="日期" prop="comPersonDate">
                <!--wang-->
                <!--<DatePicker v-model="ruleForm.nextCheckDate"></DatePicker>-->
                <DatePicker v-model="ruleForm.comPersonDate"></DatePicker>
              </Form-item>
              </Col>
            </Row>
          </div>
          <!--<div class="base-box">-->
          <!--<h2 class="header_two">其他信息</h2>-->
          <!--<p>在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。-->
          <!--</p>-->
          <!--&lt;!&ndash;wang&ndash;&gt;-->
          <!--<p>附产品数据表</p>-->
          <!---->
          <!--</div>-->
          <!--wang-->
          <!--<div class="base-box">-->
          <!--<h2 class="header_two">说明</h2>-->
          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<Form-item label="登记机关登记人员" prop="registPerson">-->
          <!--<Input v-model="ruleForm.registPerson"></Input>-->
          <!--</Form-item>-->

          <!--<Form-item label="使用登记证编号" prop="registCode">-->
          <!--<Input v-model="ruleForm.registCode"></Input>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<Form-item label="登记机关登记人员日期" prop="registDate">-->
          <!--<DatePicker v-model="ruleForm.registDate"></DatePicker>-->
          <!--</Form-item>-->

          <!--<Form-item label="加盖登记机关公章日期" prop="registStampDate">-->
          <!--<DatePicker v-model="ruleForm.registStampDate"></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--</div>-->

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
          <Button type="primary" @click="next()" v-if="this.active==2">下一步</Button>
          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>


        </div>

        <!--提交pdf 可能需要调一下格式，以后再说吧-->

        <div class="pdfInfo" v-if="this.active==3">
          <h2>相关证明</h2>
          <!--这个接口是尝试过成功的-->
          <Row style="width:1000px;">
            <Col span="10">
            <Form-item label="社会信用代码证明" :label-width="200">
              <Upload
                ref="upload1"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :before-upload="handleBeforeUpload"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="个人身份证明" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Form-item>
            </Col>
          </Row>
          <h5>特种设备产品合格证</h5>
          <Row>
            <Col span="10">

            <Form-item label="产品数据表" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="车用气瓶安装合格证" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
          </Row>
          <Form-item label="特种设备监督检验证明" :label-width="200">
            <Upload
              ref="upload2"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
              :before-upload="handleBeforeUpload"
              with-credentials>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

            </Upload>

          </Form-item>
          <Row>
            <Col span="10">
            <Form-item label="机动车行驶证" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
            <Col span="10" offset="4">
            <Form-item label="机动车登记证书" :label-width="200">
              <Upload
                ref="upload2"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
                :before-upload="handleBeforeUpload"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

            </Form-item>
            </Col>
          </Row>

          <Form-item label="锅炉能效证明文件" :label-width="200">
            <Upload
              ref="upload2"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :default-file-list="defaultPdfList1"
              :action="'/admin/file/upload?applyId='+this.applyId+'&fileTypeId=1'"
              :before-upload="handleBeforeUpload"
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
          <Button @click="instance('success')" v-if="this.active==3">确认提交</Button>


          <!--<Button type="primary" @click="beSure('ruleForm')" v-if="this.active==2">确定</Button>-->

          <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
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
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        //设备种类
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
        //设备类别
        deviceClassList: [],
        //设备品种列表
        deviceTypeList: [],
        deviceType: '',
        ruleForm: {
          registKind: '新设备首次启用',
          eqSpecies: '',
          eqSpeciesCode: '',
          eqCategory: '',
          eqCategoryCode: '',
          eqVariety: '',
          eqVarietyCode: '',
          eqName: '',
          eqCode: '',
          model: '',
          designUseLimit: '',
          designComName: '',
          manufactureComName: '',
          constructComName: '',
          superviseComName: '',
          testComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipCode: '',
          comCode: '',
          eqUseLocation: '',
          beginUseDate: '',
          comPhone: '',
          safeAdmin: '',
          mobilePhone: '',
          propertyComName: '',
          propertyComCode: '',
          telephone: '',
          checkComName: '',
          checkCategory: '',
          checkReportNum: '',
          checkDate: '',
          checkConclusion: '',
          nextCheckDate: '',
          comTablePerson:'',
          comPersonDate:'',

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
//          eqSpeciesCode: [
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


      };
    },
    components: {
      VBreadCrumb,
      'v-regist_one': regist_one,
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
        "getRegistOne",
        "getSelectedNum",
        "getterUserData",
      ]),
    },

    mounted(){
      this.initData();
    },

    methods: {
      ...mapActions(
        ['clearRegistOneForm', 'setRegistOneForm', 'getUserData'],
      ),

      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },

      setUserDetailData(){
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        this.ruleForm.useComCode = localStorage.getItem('useComCode');
        this.ruleForm.zipCode = localStorage.getItem('zipCode');
        this.ruleForm.comPhone = localStorage.getItem('comPhone');
        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.propertyComName = localStorage.getItem('propertyComName');
        this.ruleForm.propertyComCode = localStorage.getItem('propertyComCode');
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

        //如果是第一次填写
        if (!(this.$route.query.ifold)) {
          this.clearRuleForm();
          this.defaultPdfList1 = [];
          this.deviceClassList = [];
          this.deviceTypeList = [];
          this.setUserDetailData();
          if (this.$route.query.device_type < 3) {
            this.ruleForm.eqSpeciesCode = this.deviceCategoryList[parseInt(this.device_type) - 1].value + "";
          } else if (2 < this.$route.query.device_type < 7) {
            this.ruleForm.eqSpeciesCode = this.deviceCategoryList[parseInt(this.device_type) + 1].value + "";

          }
          let params = 'code=' + this.ruleForm.eqSpeciesCode;
          if (this.deviceClassList !== '' && this.ruleForm.eqSpeciesCode) {
            setAppService.getDeviceClass(params).then(res => {
              this.deviceClassList = [];
              for (let i = 0, len = res.length; i < len; i++) {
                this.deviceClassList.push({value: res[i].code, label: res[i].name});
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
          this.ruleForm = res.data.form1;
          this.acceptCom = res.data.acceptorAgencyId;
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
      chosenDeviceType(value){
        this.deviceClassTypeId = value.label;
      },

      clearRuleForm(){
        this.ruleForm = {
          registKind: '新设备首次启用',
          eqSpecies: '',
          eqSpeciesCode: '',
          eqCategory: '',
          eqCategoryCode: '',
          eqVariety: '',
          eqVarietyCode: '',
          eqName: '',
          eqCode: '',
          model: '',
          designUseLimit: '',
          designComName: '',
          manufactureComName: '',
          constructComName: '',
          superviseComName: '',
          testComName: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipCode: '',
          comCode: '',
          eqUseLocation: '',
          beginUseDate: '',
          comPhone: '',
          safeAdmin: '',
          mobilePhone: '',
          propertyComName: '',
          propertyComCode: '',
          telephone: '',
          checkComName: '',
          checkCategory: '',
          checkReportNum: '',
          checkDate: '',
          checkConclusion: '',
          nextCheckDate: '',
          comTablePerson:'',
          comPersonDate:'',
        }
      },

      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {

          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];

            // this.fileId = res.data.forms[1];
            this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
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
            let form1 = Object.assign({}, this.ruleForm);
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
        //提交表单1
        this.ruleForm.eqSpecies = this.deviceCategoryId;
        this.ruleForm.eqCategory = this.deviceClassId;
        this.ruleForm.eqVariety = this.deviceClassTypeId;

        submitParam.form1 = this.ruleForm;
        //受理机关名称
        submitParam.acceptorAgencyId = 1;
        //设备类别
        if (this.device_type) {
          submitParam.deviceType = parseInt(this.device_type);
        } else {
          submitParam.deviceType = parseInt(this.$route.query.device_type);
        }
        //首次申请
        submitParam.applyType = 1;
        //提交设备类别等
        submitParam.deviceCategory = this.deviceCategoryId;
        submitParam.deviceClass = this.deviceClassId;
        submitParam.deviceKind = this.deviceClassTypeId;
        submitParam.deivceCode = this.ruleForm.eqCode;
        submitParam.deivceName = this.ruleForm.eqName;
        return submitParam;
      },
      //更新表单
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            let form1 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            // let submitParam=this.makeParams();
            let submitParam = {};
            this.ruleForm.eqSpecies = this.deviceCategoryId;
            this.ruleForm.eqCategory = this.deviceClassId;
            this.ruleForm.eqVariety = this.deviceClassTypeId;
            submitParam.form1 = this.ruleForm;
            submitParam.id = this.$route.query.applyId;
            submitParam.deviceClass = this.deviceClassId;
            submitParam.deviceKind = this.deviceClassTypeId;
            setAppService.updateSetInfo(submitParam).then(res => {

              if (res.status == 200) {
                this.applyId = res.data.applyId;
                this.fileId = res.data.forms.split("=")[1].split("}")[0];
                this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
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

        let form1 = Object.assign({}, this.ruleForm);
        //把选择的哪一项带进去
        let submitParam = this.makeParams();
        this.$Modal.confirm({
          title: '保存登记表信息',
          content: '<p>确认保存已经填写信息？</p>',
          onOk: () => {
            setAppService.submitSetInfo(submitParam).then(res => {
              this.$Message.info('您已保存信息');
              this.modalCertain = false;
              if (res.status == true) {
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
        this.creatOrUpdate = true;
      },

      confirmForm () {
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
        //res是移除的 file剩下的
        console.log(res);
        console.log(file);
        this.uploadList.pop();
        console.log(this.uploadList);

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

      //打印按钮

      //这里参数要改
      instance (type) {
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
            this.$router.push('home');
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

  .base-box {
    margin-left: 140px;
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

</style>
