<template>
  <!--按套申请的使用登记表-->
  <div class="companyApp">
    <div class="setApp_topbar">
      <!--<div class="bread">-->
      <!--<v-bread-crumb :bread_choose="bread_choose"></v-bread-crumb>-->
      <!--</div>-->
      <div class="step" style="width:94%; margin-top:20px;">
        <Steps :current="current">
          <Step title="步骤1" content="填写特种设备使用登记表"></Step>
          <Step title="步骤2" content="预览特种设备使用登记表"></Step>
          <Step title="步骤3" content="提交气瓶或压力管道基本信息汇总表"></Step>

          <Step title="步骤4" content="提交相关证件"></Step>
          <Step title="步骤5" content="完成申请"></Step>
        </Steps>
      </div>
    </div>
    <div style="position:absolute;top:85px;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <!--<h2>按单位申请</h2>-->
        <div class="statusInfo" v-if="this.active==1">
          <div class="base-box">
            <h2 class="header_one">特种设备使用登记表(按单位申请)</h2>

            <Form-item label="登记类别" prop="registKind">
              <Select v-model="ruleForm.registKind">
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>

            <h2 class="header_two">设备基本情况</h2>
            <Row>
              <Col span="11">
              <Form-item label="设备类别" prop="eqVarietyCode">
                <!--<Input v-model="ruleForm.equipmentCategory"></Input>-->
                <Select v-model="ruleForm.eqVarietyCode" filterable @on-change="chosenDeviceClass"
                        :label-in-value=true>
                  <Option v-for="item in deviceClassList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>

              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备品种" prop="eqCategoryCode">
                <!--<Input v-model="ruleForm.equipmentVariety"></Input>-->
                <Select v-model="ruleForm.eqCategoryCode" filterable @on-change="chosenDeviceType"
                        :label-in-value=true>
                  <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="11">
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
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备数量" prop="equipmentNum">
                <!--<Input v-model="ruleForm.equipmentNum"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      压力管道填写本次登记时的压力管道长度(单位为“米”)，气瓶填写本次登记时的数量(单位为“只”)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.equipmentNum" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>
          </div>
          <!--</div>-->
          <!--<div class="useInfo" v-if="this.active==2">-->
          <div class="base-box">
            <h2 class="header_two">设备使用情况</h2>
            <Form-item label="使用单位名称" prop="usingCompanyName">
              <Input v-model="ruleForm.usingCompanyName"></Input>
            </Form-item>
            <Form-item label="使用单位地址" prop="usingCompanyAddr">
              <Input v-model="ruleForm.usingCompanyAddr"></Input>
            </Form-item>
            <Row>
              <Col span="11">
              <Form-item label="设备使用地点" prop="eqUseLoc">
                <!--<Input v-model="ruleForm.eqUseLoc"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写设备安装在单位内的固定地点，如某某车间、某某场地等。移动式(流动式) 特种设备，填写“移动”或者“流动”。设备使用地点不在使用单位内的，应当按照所在省(自治区)、市(地、州)、区(县)、街道(镇、乡)、小区(村)、门牌号等填写设备使用地的详细地址。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.eqUseLoc" style="width:118.11%"></i-input>
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
              </Col>
            </Row>

            <Row>
              <Col span="11">
              <Form-item label="使用单位统一社会信用代码" prop="usingCompanyCode">
                <!--<Input v-model="ruleForm.usingCompanyCode"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位的统一社会信用代码。如果属于公民个人，则填写个人身份证号。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.usingCompanyCode" style="width:118.11%"></i-input>
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
            </Row>

            <Row>
              <Col span="11">
              <Form-item label="安全管理员" prop="safetyAdministrator">
                <!--<Input v-model="ruleForm.safetyAdministrator"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职的安全管理员姓名。如果聘用专业技术服务机构的人员负责安全管理，则填写该人员的姓名。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.safetyAdministrator" style="width:118.11%"></i-input>
                </Poptip>
              </Form-item>
              </Col>

              <Col span="11" offset="2">
              <Form-item label="移动电话" prop="mobileNumber">
                <!--<Input v-model="ruleForm.mobileNumber"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;font-size:2px;">
                    <p>
                      填写使用单位负责该台特种设备的专职或者兼职、聘用的安全管理员的移动电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.mobileNumber" style="width:118.11%"></i-input>
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
          <!--<p>在此申明：所申报的内容真实；在使用过程中，将严格执行《中华人民共和国特-->
          <!--种设备安全法》及相关规定，并且接受特种设备安全监督管理部门的监督管理。-->
          <!--</p>-->
          <!--</br>-->
          <!--<p>附：压力管道(气瓶)基本信息汇总表-->
          <!--</p>-->
          <!--</br>-->

          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<Form-item label="使用单位填表人员" prop="comTablePerson">-->
          <!--<Input v-model="ruleForm.comTablePerson" ></Input>-->
          <!--</Form-item>-->

          <!--<Form-item label="使用单位安全管理人员" prop="comSafePerson">-->
          <!--<Input v-model="ruleForm.comSafePerson" ></Input>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<Form-item label="使用单位填表人员日期" prop="comDate1">-->
          <!--<DatePicker v-model="ruleForm.comDate1" ></DatePicker>-->
          <!--</Form-item>-->
          <!--<Form-item label="安全管理人员填表日期" prop="comDate2">-->
          <!--<DatePicker v-model="ruleForm.comDate2" ></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->

          <!--<Row>-->
          <!--<Col span="11" offset="13">-->
          <!--<Form-item label="加盖使用单位公章日期" prop="comDate3">-->
          <!--<DatePicker v-model="ruleForm.comDate3" ></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->

          <!--</div>-->

          <!--<div class="base-box">-->
          <!--<h2 class="header_two">其他信息</h2>-->
          <!--<Form-item label="说明" prop="explanation">-->
          <!--<Input v-model="ruleForm.explanation" ></Input>-->
          <!--</Form-item>-->

          <!--<Row>-->
          <!--<Col span="11">-->
          <!--<Form-item label="登记机关登记人员" prop="registPerson">-->
          <!--<Input v-model="ruleForm.registPerson" ></Input>-->
          <!--</Form-item>-->

          <!--<Form-item label="使用登记证编号" prop="registCode">-->
          <!--<Input v-model="ruleForm.registCode" ></Input>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--<Col span="11" offset="2">-->
          <!--<Form-item label="登记机关登记人员日期" prop="registDate">-->
          <!--<DatePicker v-model="ruleForm.registDate" ></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->
          <!--<Row>-->
          <!--<Col span="11" offset="13">-->
          <!--<Form-item label="加盖登记机关公章日期" prop="comDate4">-->
          <!--<DatePicker v-model="ruleForm.comDate4" ></DatePicker>-->
          <!--</Form-item>-->
          <!--</Col>-->
          <!--</Row>-->

          <!--</div>-->

        </div>


        <!--让用户确认信息的表格-->
        <div class="setTable" v-if="this.active==2" style="width:900px;top:30px;position:absolute">
          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>
          <Button type="primary" @click="next()" v-if="this.active==2">下一步</Button>
          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>
        </div>

        <!--提交pdf 可能需要调一下格式，以后再说吧-->
        <div class="pdfInfo" v-if="this.active==4">
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

            </Col>
          </Row>
          <div v-if="this.device_type==9">
            <h5>气瓶监督检验证明</h5>
            <Row>
              <Col span="10">

              <Form-item label="监督检验证明" :label-width="200">
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
              <Form-item label="定期检验证明" :label-width="200">
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
          </div>
          <div v-if="this.device_type==10">
            <h5>压力管道监督检验证明</h5>
            <Row>
              <Col span="10">

              <Form-item label="监督检验证明" :label-width="200">
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
              <Form-item label="定期检验证明" :label-width="200">
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
          </div>


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
        <!--<Button type="primary" @click="before()" v-if="this.active<6">上一步</Button>-->
        <Button type="primary" @click="confirmForm"  v-if="this.active==1">下一步</Button>
        <!--<Button type="primary" @click="beSure" v-if="this.active==2">确定</Button>-->
        <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
        <Button @click="instance('success')" v-if="this.active==4">确认提交</Button>
        <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">重置</Button>
        <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">保存</Button>

      </Form>
      <div v-if="this.active==3">
        <!--<h2>气瓶基本信息汇总</h2>-->
        <!--<div class="base-box">-->
        <!--<h2 class="header_one">气瓶基本信息汇总</h2>-->
        <!--<Form ref="formDynamicGas" :model="formDynamicGas" :label-width="80"-->
        <!--v-for="(item, index,key) in formDynamicGas.items"-->
        <!--:key="item.id" inline>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'设备品种'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value0" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'产品编号'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value1" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'充装介质'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value2" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'制造单位'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value3" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'公称工作压力'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value4" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->
        <!--<FormItem-->
        <!--:key="index"-->
        <!--:label="'容积'"-->
        <!--:prop="'items.' + index + '.value'"-->
        <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
        <!--<Input type="text" v-model="item.value5" placeholder="请输入..."></Input>-->
        <!--</FormItem>-->

        <!--<FormItem>-->

        <!--<Button type="dashed" long @click="handleAddGas" icon="plus-round">新增</Button>-->
        <!--</FormItem>-->
        <!--<FormItem>-->

        <!--<Button type="ghost" @click="handleRemoveGas(index)">删除</Button>-->
        <!--</FormItem>-->
        <!--<br>-->

        <!--&lt;!&ndash;<FormItem>&ndash;&gt;-->
        <!--&lt;!&ndash;<Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>&ndash;&gt;-->
        <!--&lt;!&ndash;<Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>&ndash;&gt;-->
        <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->
        <!--</Form>-->
        <!--</div>-->
        <div v-if="this.device_type==9">
          <Row>
            <Col span="12">
            <div class="first_upload">
              <div>
                <h2 class="firstHead">首次提交气瓶基本信息</h2>
                <h3 class="firstHead2">一、下载标准气瓶基本信息汇总表</h3>
                <a v-bind:href="'/file/download?fileId=7801'" download="标准气瓶基本信息汇总表.txt" class="detail_a">标准气瓶基本信息汇总表</a>
                <h3 class="firstHead2">二、上传气瓶基本信息汇总表</h3>
                <Upload
                  ref="upload1"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList1"
                  :before-upload="handleBeforeUpload"
                  :action="'/admin/file/upload?applyId='+2+'&fileTypeId=1'"
                  with-credentials>
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                </Upload>
              </div>
            </div>
            </Col>
            <Col span="12" >
            <div class="second_upload">
              <div class="second_content">


                <!--<Button type="primary" @click="addGas()">批量新增</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">停用</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">注销</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">报废</Button>-->
                <div class="add-gas">

                  <h2 class="firstHead">新增气瓶基本信息</h2>
                  <h3 class="firstHead2">一、下载标准气瓶基本信息汇总表</h3>
                  <a v-bind:href="'/file/download?fileId=7801'" download="标准气瓶基本信息汇总表.txt" class="detail_a">标准气瓶基本信息汇总表</a>
                  <h3 class="firstHead2">二、上传气瓶基本信息汇总表</h3>
                  <Upload
                    ref="upload1"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :default-file-list="defaultPdfList1"
                    :before-upload="handleBeforeUpload"
                    :action="'/admin/file/upload?applyId='+2+'&fileTypeId=1'"
                    with-credentials>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                  </Upload>
                </div>


              </div>
            </div>
            </Col>
          </Row>
          <div class="changeGas" >
            <h2>停用、注销、报废</h2>
            <div class="innerBox">
              <Row>
                <Col>
                <label>申请id精准搜索</label>
                <!--<Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>-->
                <!--<Button type="primary" class="query" @click="exactSearch">搜索</Button>-->
                <Input  placeholder="请输入申请id" style="width: 180px"></Input>

                <Button type="primary" class="query">搜索</Button>

                </Col>
              </Row>
            </div>
            <div class="list-box">
              <Table border :columns="columns5" :data="data5"></Table>
              <Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"
                    :page-size="10"></Page>

            </div>

          </div>
          <Button type="primary" @click="handleSubmitGas('formDynamicGas')">下一步</Button>
        </div>
        <div v-if="this.device_type==10">
          <Row>
            <Col span="12">
            <div class="first_upload">
              <div>
                <h2 class="firstHead">首次提交压力管道基本信息</h2>
                <h3 class="firstHead2">一、下载标准压力管道基本信息汇总表</h3>
                <a v-bind:href="'/file/download?fileId=7801'" download="标准压力管道基本信息汇总表.txt" class="detail_a">标准气瓶基本信息汇总表</a>
                <h3 class="firstHead2">二、上传压力管道基本信息汇总表</h3>
                <Upload
                  ref="upload1"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList1"
                  :before-upload="handleBeforeUpload"
                  :action="'/admin/file/upload?applyId='+2+'&fileTypeId=1'"
                  with-credentials>
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                </Upload>
              </div>
            </div>
            </Col>
            <Col span="12" >
            <div class="second_upload">
              <div class="second_content">


                <!--<Button type="primary" @click="addGas()">批量新增</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">停用</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">注销</Button>-->
                <!--<Button type="primary" @click="handleSubmitGas('formDynamicGas')">报废</Button>-->
                <div class="add-gas">

                  <h2 class="firstHead">新增压力管道基本信息</h2>
                  <h3 class="firstHead2">一、下载标准压力管道基本信息汇总表</h3>
                  <a v-bind:href="'/file/download?fileId=7801'" download="标准压力管道基本信息汇总表.txt" class="detail_a">标准气瓶基本信息汇总表</a>
                  <h3 class="firstHead2">二、上传压力管道基本信息汇总表</h3>
                  <Upload
                    ref="upload1"
                    :on-success="handleSuccess"
                    :on-remove="handleRemove"
                    :default-file-list="defaultPdfList1"
                    :before-upload="handleBeforeUpload"
                    :action="'/admin/file/upload?applyId='+2+'&fileTypeId=1'"
                    with-credentials>
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                  </Upload>
                </div>


              </div>
            </div>
            </Col>
          </Row>
          <div class="changeGas" >
            <h2>停用、注销、报废</h2>
            <div class="innerBox">
              <Row>
                <Col>
                <label>申请id精准搜索</label>
                <!--<Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>-->
                <!--<Button type="primary" class="query" @click="exactSearch">搜索</Button>-->
                <Input  placeholder="请输入申请id" style="width: 180px"></Input>

                <Button type="primary" class="query">搜索</Button>

                </Col>
              </Row>
            </div>
            <div class="list-box">
              <Table border :columns="columns5" :data="data5"></Table>
              <Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"
                    :page-size="10"></Page>

            </div>

          </div>
          <Button type="primary" @click="handleSubmitGas('formDynamicGas')">下一步</Button>
        </div>


      </div>
      <!--<div v-if="this.active==3">-->
      <!--<h2>压力管道基本信息汇总</h2>-->
      <!--<div class="base-box">-->
      <!--<h2 class="header_one">压力管道基本信息汇总</h2>-->
      <!--<Form ref="formDynamicPres" :model="formDynamicPres" :label-width="80"-->
      <!--v-for="(item, index) in formDynamicPres.items"-->
      <!--:key="item.id" inline>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'设备品种'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value0" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'产品编号'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value1" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'充装介质'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value2" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'制造单位'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value3" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'公称工作压力'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value4" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->
      <!--<FormItem-->
      <!--:key="index"-->
      <!--:label="'容积'"-->
      <!--:prop="'items.' + index + '.value'"-->
      <!--:rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">-->
      <!--<Input type="text" v-model="item.value5" placeholder="请输入..."></Input>-->
      <!--</FormItem>-->

      <!--<FormItem>-->

      <!--<Button type="dashed" long @click="handleAddPres" icon="plus-round">新增</Button>-->
      <!--</FormItem>-->
      <!--<FormItem>-->

      <!--<Button type="ghost" @click="handleRemovePres(index)">删除</Button>-->
      <!--</FormItem>-->
      <!--<br>-->

      <!--&lt;!&ndash;<FormItem>&ndash;&gt;-->
      <!--&lt;!&ndash;<Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>&ndash;&gt;-->
      <!--&lt;!&ndash;<Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>&ndash;&gt;-->
      <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->
      <!--</Form>-->
      <!--</div>-->
      <!--<div class="setTable" v-if="this.active==3">-->


      <!--</div>-->
      <!--<Button type="primary" @click="handleSubmitPres('formDynamicPres')">下一步</Button>-->


      <!--</div>-->

    </div>


  </div>
</template>
<script>
  import regist_two from '../../components/register/registerTwo.vue'
  import cylinders_form from '../../components/register/cylindersForm.vue'
  import pressure_form from '../../components/register/pressureForm.vue'


  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'

  export default {
    data() {
      return {
        //设备类别
        deviceClassList: [
          {
            value: "2300",
            label: "气瓶"
          },
          {
            value: "8300",
            label: "工业管道"
          },

        ],
        deviceClassId:'',
        //设备品种列表
        deviceTypeList: [],
        deviceClassTypeId:'',

        ruleForm: {
          registKind: '新设备首次启用',
          eqVariety: '',
          eqVarietyCode: '',
          eqCategory: '',
          eqCategoryCode: '',
          eqName: '',
          equipmentNum: '',
          usingCompanyName: '',
          usingCompanyAddr: '',
          eqUseLoc: '',
          comPhone: '',
          zipCode: '',
          usingCompanyCode: '',
          zipCode: '',
          safetyAdministrator: '',
          mobileNumber: '',
          comTablePerson:'',
          comPersonDate:'',
        },
        formDynamicGas: {
          items: [
            {
              value0: '',
              value1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
            }
          ]
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
        formDynamicPres: {
          items: [
            {
              value0: '',
              value1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
            }
          ]
        },
        num:10,
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
        value1: '',
        value2: '',
        value3: '',
        ruleForms: '',
        current: 0,
        columns5: [
          {
            title: '设备品种',
            key: 'id'
          },
          {
            title: '产品编号',
            key: 'device'
          },
          {
            title: '单位内编号',
            key: 'createTime',
            sortable: true
          },
          {
            title: '变更或者停用情况',
            key: 'deviceType',

          },
          {
            title: '信息化管理情况',
            key: 'applyType',

          },
          {
            title: '操作',
            key: 'state',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.appDetail(params.index)
                    }
                  }
                }, '停用'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    marginleft: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.deleteApp(params.index)
                    }
                  }
                }, '注销'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginleft: '5px',
                    fontSize: '5px',
                  },
                  on: {
                    click: () => {
                      this.modifyApp(params.index)
                    }
                  }
                }, '报废'),

              ]);
            }

          }
        ],
        data5: [],
        pdfUrl: '/admin/file/preview?fileId=101',
        uploadList: [
          {"url": ''}
        ],
        ifold: 0,
        device_type:9,
        creatOrUpdate:false,



      };
    },
    components: {
      'v-regist-two': regist_two,
      'v-cylinders-form': cylinders_form,
      'v-pressure-form': pressure_form,
      //'v-detailPdf': detailPdf,

    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route.query': function () {

        if (this.$route.path == '/companyApp') {
          this.initData();
        }
      }
    },
    computed: {
      //...mapState(['selectedOption']),
      ...mapGetters([
        "getSelectedOption",
        "getRegistTwo",
        "getterUserData",
      ]),
    },
    mounted(){
      this.initData();
      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions({clearRegistTwoForm: 'clearRegistTwoForm'}),

      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
      },
      //气瓶新增
      handleAddGas () {
        this.formDynamicGas.items.push({
          value0: '',
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value5: '',
        });
        console.log(this.formDynamicGas)
      },

      //气瓶删除
      handleRemoveGas (index) {
        this.formDynamicGas.items.splice(index, 1);
      },
      //提交气瓶
      handleSubmitGas (name) {

        this.active++;
        this.current++;
      },

      handleAddPres () {
        this.formDynamicPres.items.push({
          value0: '',
          value1: '',
          value2: '',
          value3: '',
          value4: '',
          value5: '',
        });
        console.log(this.formDynamicGas)
      },
      handleRemovePres (index) {
        this.formDynamicPres.items.splice(index, 1);
      },
      //提交气瓶
      handleSubmitPres (name) {
        this.active++;

      },


//      //重置气瓶
//      handleResetGas (name) {
//         this.formDynamic.items="";
//      },
      //初始化数据
      setUserDetailData(){
//        this.userDetailData=this.getterUserData;
//        this.ruleForm.usingCompanyName=this.userDetailData.useComName;
//        this.ruleForm.usingCompanyAddr=this.userDetailData.useComAddr;
//        this.ruleForm.usingCompanyCode=this.userDetailData.useComCode
//        this.ruleForm.zipCode=this.userDetailData.zipcode;
//        //单位固定电话
//        this.ruleForm.comPhone= this.userDetailData.comPhone;
//        this.ruleForm.mobileNumber=this.userDetailData.comMobilePhone;

        this.ruleForm.usingCompanyName=localStorage.getItem('useComName');
        this.ruleForm.usingCompanyAddr=localStorage.getItem('useComAddr');
        this.ruleForm.usingCompanyCode=localStorage.getItem('useComCode');
        this.ruleForm.zipCode=localStorage.getItem('zipCode');
        this.ruleForm.comPhone=localStorage.getItem('comPhone');
        this.ruleForm.mobileNumber=localStorage.getItem('mobilePhone');
      },
      initData(){
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.uploadList=[
          {"url": ''}
        ];
        this.creatOrUpdate=false;

        this.device_type = this.$route.query.device_type;
        this.ifold = this.$route.query.ifold;

        //如果是第一次填写
        if (!(this.$route.query.ifold)) {
          this.clearRuleForm();
          this.defaultPdfList1 = [];
          this.deviceTypeList=[];
          this.setUserDetailData();


          if(this.$route.query.device_type==9){
            this.ruleForm.eqVarietyCode="2300";
          }else if(this.$route.query.device_type==10){
            this.ruleForm.eqVarietyCode="8300";
          }
          let params = 'code=' + this.ruleForm.eqVarietyCode;
          if (this.deviceTypeList !== '' && this.ruleForm.eqVarietyCode) {
            setAppService.getDeviceType(params).then(res => {
              this.deviceTypeList = [];
              for (let i = 0, len = res.length; i < len; i++) {
                this.deviceTypeList.push({value: res[i].code, label: res[i].name});
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
          //this.acceptCom = res.data.acceptorAgencyId;
          this.clearRuleForm();
          this.ruleForm= res.data.form3;
          this.acceptCom = res.data.acceptorAgencyId;
        }).catch(error => {
          console.log(error)
        })
      },
      clearRuleForm(){
        this.ruleForm={
          registKind: '新设备首次启用',
          eqVariety: '',
          eqVarietyCode: '',
          eqCategory: '',
          eqCategoryCode: '',
          eqName: '',
          equipmentNum: '',
          usingCompanyName: '',
          usingCompanyAddr: '',
          eqUseLoc: '',
          comPhone: '',
          zipCode: '',
          usingCompanyCode: '',
          zipCode: '',
          safetyAdministrator: '',
          mobileNumber: '',
          comTablePerson:'',
          comPersonDate:'',
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


      //提交表格信息
      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {
          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];
            this.pdfUrl = '/admin/file/preview?fileId='+this.fileId;
            this.$Message.info('您已提交信息，请预览结果');
            this.modalCertain = false;
          }

        }).catch(error => {
          console.log(error);

        })
      },
      makeParams(){
        let submitParam = {};
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
        if(submitParam.deviceType===9){
          submitParam.deviceCategory = "压力容器";
          submitParam.deviceClass = "气瓶";
          submitParam.deviceKind = this.deviceClassTypeId;
          this.ruleForm.eqCategory = "气瓶";
          this.ruleForm.eqVariety = this.deviceClassTypeId;
        }else if(submitParam.deviceType===10){
          submitParam.deviceCategory = "压力管道";
          submitParam.deviceClass = "工业管道";
          submitParam.deviceKind = this.deviceClassTypeId;
          this.ruleForm.eqCategory = "工业管道";
          this.ruleForm.eqVariety = this.deviceClassTypeId;
        }
        submitParam.deivceName = this.ruleForm.eqName;
        submitParam.form3 = this.ruleForm;

        return submitParam;

      },
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            // console.log(valid);
            // console.log(this.active);
            let form3 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam=this.makeParams();

            //submitParam.deivceCode = this.ruleForm.eqCode;
            this.submit(submitParam);
          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });
        // this.active++;


      },
      //更新表单
      updateContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            let form3 = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam={};
            if(submitParam.deviceType===9){
              submitParam.deviceKind = this.deviceClassTypeId;
              this.ruleForm.eqCategory = "气瓶";
              this.ruleForm.eqVariety = this.deviceClassTypeId;
            }else if(submitParam.deviceType===10){
              submitParam.deviceKind = this.deviceClassTypeId;
              this.ruleForm.eqCategory = "工业管道";
              this.ruleForm.eqVariety = this.deviceClassTypeId;
            }
            submitParam.form3 = this.ruleForm;
            submitParam.id=this.$route.query.applyId;
            setAppService.updateSetInfo(submitParam).then(res => {

              if (res.status == 200) {
                this.applyId = res.data.applyId;
                this.fileId = res.data.forms.split("=")[1].split("}")[0];
                this.pdfUrl = '/admin/file/preview?fileId='+this.fileId;
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

      //保存
      saveForm(formName){

        let form3 = Object.assign({}, this.ruleForm);
        //把选择的哪一项带进去
        let submitParam=this.makeParams();
        this.$Modal.confirm({
          title: '保存登记表信息',
          content: '<p>确认保存已经填写信息？</p>',
          onOk: () => {
            setAppService.submitSetInfo(submitParam).then(res => {
              this.$Message.info('您已保存信息');
              this.modalCertain = false;
              console.log(this.modalCertain);
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
      //重置
      resetForm(formName) {
        //  console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
      },
      //下一步
      next(name) {
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
        this.creatOrUpdate=true;
      },

      confirmForm () {
        if(this.$route.query.ifold==1||(this.creatOrUpdate===true)){
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

        }else{
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
      //确定
      beSure() {
        this.active++;
      },
      initSize(value){
        console.log(value);

        let waitAccparams = {
          page: value,
          size: 10,

        }
        if (this.time[0] !== '') {
          waitAccparams.time = this.time;
        }
        if (this.applyState !== '') {
          waitAccparams.states = [this.applyState,this.applyState];

        }
        if (this.applyType !== '') {
          waitAccparams.applyTypeId = this.applyType;
        }
        this.getOrders(waitAccparams);

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

      //确认全部
      instance (type) {
        let params = 'applyId=' + 1;
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
    margin-left: 140px;
    display: block;
    border: 1px solid #dddee1;
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

  .label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 18px;
    font-weight: bold;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
  }

  .first_upload {
    display: block;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;
    padding:10px;
    //background-color: red;
    // margin-left:300px;
  }
  .second_upload {
    float:right;
    display: block;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 100%;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;
    padding:10px;
    //background-color: red;
    // margin-left:300px;
  }




  .firstHead {
    margin: 10px;
  }

  .firstHead2 {
    margin: 10px;
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

    .page {
      float: right;
      margin: 10px;
    }
  }
  .innerBox {
    border-top: 1px solid rgb(229, 229, 229);
    padding-top: 10px;
    margin-top: 10px;
  }
  .changeGas{
    float:right;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;
    padding:10px;

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



</style>
