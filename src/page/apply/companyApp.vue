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
    <div style="position:absolute;top:85px;width:100%;">
      <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="110" label-position="left">
        <!--<h2>按单位申请</h2>-->
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
            <h2 class="header_one">特种设备使用登记表(按单位申请)</h2>

            <Form-item label="登记类别" prop="registKind">
              <Select v-model="ruleForm.registKind" disabled>
                <Option v-for="item in registKindList" :value="item.label" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Form-item>

            <h2 class="header_two">设备基本情况</h2>
            <Row>
              <Col span="11">
              <Form-item label="设备类别" prop="deviceClassCode">
                <!--<Input v-model="ruleForm.equipmentCategory"></Input>-->
                <Select v-model="ruleForm.deviceClassCode" filterable @on-change="chosenDeviceClass"
                        :label-in-value=true disabled>
                  <Option v-for="item in deviceClassList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>

              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备品种" prop="deviceKindCode">
                <!--<Input v-model="ruleForm.equipmentVariety"></Input>-->
                <Select v-model="ruleForm.deviceKindCode" filterable @on-change="chosenDeviceType"
                        :label-in-value=true>
                  <Option v-for="item in deviceTypeList" :value="item.value" :key="item.value">{{ item.label }}
                  </Option>
                </Select>
              </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="11">
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
              </Col>
              <Col span="11" offset="2">
              <Form-item label="设备数量" prop="deviceNum">
                <!--<Input v-model="ruleForm.deviceNum"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      压力管道填写本次登记时的压力管道长度(单位为“米”)，气瓶填写本次登记时的数量(单位为“只”)。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.deviceNum" style="width:118.11%"></i-input>
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
            <Row>
              <Col span="11">
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

              <Col span="11" offset="2">
              <Form-item label="单位固定电话" prop="staticPhone">
                <!--<Input v-model="ruleForm.staticPhone"></Input>-->
                <Poptip trigger="focus">
                  <div slot="content" style="white-space: normal;">
                    <p>
                      填写使用单位特种设备安全管理机构或者主管特种设备机构的联系电话。
                    </p>
                  </div>
                  <i-input v-model="ruleForm.staticPhone" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

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
                  <i-input v-model="ruleForm.useComCode" style="width:118.11%" disabled></i-input>
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
                  <i-input v-model="ruleForm.zipcode" style="width:118.11%" disabled></i-input>
                </Poptip>
              </Form-item>
              </Col>
            </Row>

            <Row>
              <Col span="11">
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
              <Form-item label="安全管理部门" prop="superviseComName">
                <!--wang-->
                <Input v-model="ruleForm.superviseComName"></Input>
              </Form-item>
              </Col>
              <Col span="11">
              <Form-item label="工程(装置)名称" prop="deviceName">
                <!--wang-->
                <Input v-model="ruleForm.deviceName"></Input>
              </Form-item>
              </Col>
              <Col span="11" offset="2">
              <Form-item label="电子邮箱" prop="email">
                <!--wang-->
                <Input v-model="ruleForm.email" disabled></Input>
              </Form-item>
              </Col>
            </Row>
          </div>
        </div>


        <!--让用户确认信息的表格-->
        <div class="setTable" v-if="this.active==2" style="width:900px;top:30px;position:absolute">
          <iframe id="iFramePdf" v-bind:src=this.pdfUrl style="width:100%;height:1000px;"></iframe>
          <Button type="warning" @click="printTrigger('iFramePdf');">打印</Button>
          <Button type="primary" @click="before()" v-if="this.active==2">上一步</Button>
          <Button type="success" @click="next()" v-if="this.active==2">下一步</Button>

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
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-remove="handleRemove"
                :default-file-list="defaultPdfList1"
                :before-upload="handleBeforeUpload1"
                :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'社会信用代码证明'+this.fileList[0]"
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
                  :on-format-error="handleFormatError"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList2"
                  :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'监督检验证明'+this.fileList[1]"
                  :before-upload="handleBeforeUpload2"
                  with-credentials>
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                </Upload>

              </Form-item>
              </Col>
              <Col span="10" offset="4">
              <Form-item label="定期检验证明" :label-width="200">
                <Upload
                  ref="upload2"
                  :on-format-error="handleFormatError"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList3"
                  :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'定期检验证明'+this.fileList[2]"
                  :before-upload="handleBeforeUpload3"
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
                  :on-format-error="handleFormatError"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList2"
                  :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'监督检验证明'+this.fileList[1]"
                  :before-upload="handleBeforeUpload2"
                  with-credentials>
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

                </Upload>

              </Form-item>
              </Col>
              <Col span="10" offset="4">
              <Form-item label="定期检验证明" :label-width="200">
                <Upload
                  ref="upload2"
                  :on-format-error="handleFormatError"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :default-file-list="defaultPdfList3"
                  :action="'/admin/file/upload?applyId='+this.applyId+'&fileName='+'定期检验证明'+this.fileList[2]"
                  :before-upload="handleBeforeUpload3"
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
        <Button type="primary" @click="confirmForm" v-if="this.active==1">下一步</Button>
        <Button @click="instance('success')" v-if="this.active==4" type="success">确认提交</Button>
        <Button @click="save('success')"  v-if="this.active==4" type="primary">存入档案</Button>
        <Button type="ghost" @click="saveForm('ruleForm')" style="margin-left: 8px" v-if="this.active==1">保存</Button>

      </Form>
      <div v-if="this.active==3">
        <div v-if="this.device_type==9">
          <div class="first_upload">
            <div style="width:150%;padding-left:100px;">
              <h2 class="firstHead">首次提交气瓶基本信息</h2>
              <h3 class="firstHead2">一、下载标准气瓶基本信息汇总表</h3>
              <a v-bind:href="'                                                    admin/static/file/cylinder.xlsx'" download="标准气瓶基本信息汇总表.xlsx"
                 class="detail_a">标准气瓶基本信息汇总表</a>
              <h3 class="firstHead2">二、上传气瓶基本信息汇总表</h3>
              <Upload
                ref="upload1"
                :format="['xlsx']"
                :on-format-error="handleFormatError1"
                :action="'/admin/apply/uploadData?applyId='+(this.$route.query.applyId)"
                :on-success="handleGasFirstSuccess"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
              <h5>文件缩略图</h5>
              <div class="demo-upload-list" v-for="(item,index) in gasfirstUploadList">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleGasFirstView(index)"></Icon>
                </div>

              </div>
              <Modal title="查看图片" v-model="gasFirstvisible">
                <iframe id="iFramePdf" v-bind:src=this.gasFirstPdf style="width:100%;height:1000px;" v-if="gasFirstvisible"></iframe>
              </Modal>
            </div>
            <Steps :current="2" direction="vertical">
              <Step title="步骤1" content="下载标准气瓶基本信息汇总表"></Step>
              <Step title="步骤2" content="上传气瓶基本信息汇总表"></Step>
              <Step title="步骤3" content="预览标准气瓶基本信息汇总表"></Step>
            </Steps>
          </div>
          <div class="first_upload">
            <div style="width:150%;padding-left:100px;">
              <h2 class="firstHead" style="margin-left:45%;">新增气瓶基本信息(非首次)</h2>
              <h3 class="firstHead2">一、下载标准气瓶基本信息汇总表</h3>
              <a v-bind:href="'                                                    admin/static/file/cylinder.xlsx'" download="标准气瓶基本信息汇总表.xlsx"
                 class="detail_a">标准气瓶基本信息汇总表</a>
              <h3 class="firstHead2">二、上传气瓶基本信息汇总表</h3>
              <Upload
                ref="upload1"
                :format="['xlsx']"
                :on-format-error="handleFormatError1"
                :action="'/admin/apply/uploadData?applyId='+(this.$route.query.applyId)"
                :on-success="handleGasAddSuccess"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>
              <h5>文件缩略图</h5>
              <div class="demo-upload-list" v-for="(item,index) in gasAddUploadList">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleGasAddView(index)"></Icon>
                </div>
              </div>
              <Modal title="查看图片" v-model="gasAddvisible">
                <iframe id="iFramePdf" v-bind:src=this.gasAddPdf style="width:100%;height:1000px;" v-if="gasAddvisible"></iframe>
              </Modal>
            </div>
            <Steps :current="2" direction="vertical">
              <Step title="步骤1" content="下载标准气瓶基本信息汇总表(excel版)"></Step>
              <Step title="步骤2" content="上传气瓶基本信息汇总表"></Step>
              <Step title="步骤3" content="预览标准气瓶基本信息汇总表"></Step>

            </Steps>
          </div>
          <div class="changeGas" >
            <Steps :current="current" style="margin-left:15%;">
              <Step title="步骤1" content="按id搜索气瓶信息"></Step>
              <Step title="步骤2" content="点击相应停用、注销、报废按钮对已有气瓶进行操作"></Step>

            </Steps>
            <h2 style="margin-left:30%;">停用、注销、报废已有气瓶（非首次）</h2>

            <div class="innerBox" style="margin-left:30%;">
              <Row>
                <Col>
                <label>产品编号精准搜索</label>
                <!--<Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>-->
                <!--<Button type="primary" class="query" @click="exactSearch">搜索</Button>-->
                <Input placeholder="请输入申请id" style="width: 180px" v-model="cylinderEqCode"></Input>

                <Button type="primary" class="query" @click="exactSearch">搜索</Button>
                <Button type="warning"><a v-bind:href=this.gasDownloadPdf download="标准气瓶基本信息汇总表.pdf"
                                          class="detail_a" style="color:white;">下载已提交气瓶基本信息表</a></Button>

                </Col>
              </Row>
            </div>
            <div class="list-box" >
              <div class="edittable-table-height-con">
              <can-edit-table refs="table2" v-model="editCylinderData" :columns-list="editCylinderColumns"  :saveEdit="saveCylinderInline" ></can-edit-table>
              </div>

            </div>

          </div>
          <Button type="primary" @click="handleSubmitGas('formDynamicGas')">下一步</Button>
        </div>
        <div v-if="this.device_type==10">
          <div class="first_upload">
            <div style="width:150%;padding-left:100px;">
              <h2 class="firstHead">首次提交压力管道基本信息</h2>
              <h3 class="firstHead2">一、下载标准压力管道基本信息汇总表</h3>
              <a v-bind:href="'                                                    admin/static/file/pipe.xlsx'" download="标准压力管道基本信息汇总表.xlsx"
                 class="detail_a">标准压力管道基本信息汇总表</a>
              <h3 class="firstHead2">二、上传压力管道基本信息汇总表</h3>
              <Upload
                ref="upload1"
                :format="['xlsx']"
                :on-format-error="handleFormatError1"
                :on-success="handlePipeFirstSuccess"
                :action="'/admin/apply/uploadData?applyId='+(this.$route.query.applyId)"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
              <h5>文件缩略图</h5>
              <div class="demo-upload-list" v-for="(item,index) in pipeFirstUploadList">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handlePipeFirstView(index)"></Icon>
                </div>

              </div>
              <Modal title="查看图片" v-model="pipeFirstvisible">
                <iframe id="iFramePdf" v-bind:src=this.pipeFirstPdf style="width:100%;height:1000px;" v-if="pipeFirstvisible"></iframe>

              </Modal>

            </div>
            <Steps :current="3" direction="vertical">
              <Step title="步骤1" content="下载标准压力管道基本信息汇总表"></Step>
              <Step title="步骤2" content="上传压力管道基本信息汇总表"></Step>
              <Step title="步骤3" content="预览压力管道基本信息汇总表"></Step>
            </Steps>

          </div>
          <div class="first_upload">
            <div style="width:150%;padding-left:100px;">


              <h2 class="firstHead" style="margin-left:40%;">新增压力管道基本信息(非首次)</h2>
              <h3 class="firstHead2">一、下载标准压力管道基本信息汇总表</h3>
              <a v-bind:href="'                                                    admin/static/file/pipe.xlsx'" download="标准压力管道基本信息汇总表.xlsx"
                 class="detail_a">标准压力管道基本信息汇总表</a>
              <h3 class="firstHead2">二、上传压力管道基本信息汇总表</h3>
              <Upload
                ref="upload1"
                :format="['xlsx']"
                :on-format-error="handleFormatError1"
                :on-success="handlePipeAddSuccess"
                :action="'/admin/apply/uploadData?applyId='+(this.$route.query.applyId)"
                with-credentials>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>

              </Upload>

              <h5>文件缩略图</h5>
              <div class="demo-upload-list" v-for="(item,index) in pipeAddUploadList">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handlePipeAddView(index)"></Icon>
                </div>
              </div>
              <Modal title="查看图片" v-model="pipeAddvisible">
                <iframe id="iFramePdf" v-bind:src=this.pipeAddPdf style="width:100%;height:1000px;" v-if="pipeAddvisible"></iframe>

              </Modal>

            </div>
            <Steps :current="3" direction="vertical">
              <Step title="步骤1" content="下载标准压力管道基本信息汇总表"></Step>
              <Step title="步骤2" content="上传压力管道基本信息汇总表"></Step>
              <Step title="步骤3" content="预览压力管道基本信息汇总表"></Step>

            </Steps>
          </div>
          <div class="changeGas">

            <Steps :current="current" style="margin-left:15%;">
              <Step title="步骤1" content="按id搜索压力管道信息"></Step>
              <Step title="步骤2" content="点击相应停用、注销、报废按钮对已有压力管道进行操作"></Step>

            </Steps>
            <h2 style="margin-left:30%;">停用、注销、报废已有压力管道（非首次）</h2>

            <div class="innerBox" style="margin-left:30%;">
              <Row>
                <Col>
                <label>管道编号精准搜索</label>
                <!--<Input v-model="applyId" placeholder="请输入申请id" style="width: 180px"></Input>-->
                <!--<Button type="primary" class="query" @click="exactSearch">搜索</Button>-->
                <Input placeholder="请输入申请id" style="width: 180px" v-model="pipeEqCode"></Input>

                <Button type="primary" class="query" @click="exactSearchPipe">搜索</Button>
                <Button type="warning"><a v-bind:href=this.pipeDownloadPdf download="标准压力管道基本信息汇总表.pdf"
                                          class="detail_a" style="color:white;">下载已提交压力管道基本信息表</a></Button>

                </Col>
              </Row>
            </div>
            <div class="list-box">
              <!--<Table border :columns="columns5" :data="data5"></Table>-->
              <!--<Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"-->
                    <!--:page-size="10"></Page>-->
              <div class="edittable-table-height-con">
              <can-edit-table refs="table2" v-model="editPipeData" :columns-list="editPipeColumns"  :saveEdit="savePipeInline" ></can-edit-table>
              </div>


            </div>

          </div>
          <Button type="primary" @click="handleSubmitGas('formDynamicGas')"
                  style="margin-left:10%;margin-top:10px;margin-bottom:10px;">下一步
          </Button>

        </div>


      </div>
    </div>


  </div>
</template>
<script>


  import detailPdf from '../../components/detailpdf/detailPdf.vue'
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as registService from '../../services/registService'
  import canEditTable from '../../components/canEditTable/canEditTable.vue';

  export default {
//    components: {
//      canEditTable
//    },
    data() {
      return {
        file1NameNum: 1,
        file2NameNum: 1,
        file3NameNum: 1,
        file4NameNum: 1,
        file5NameNum: 1,
        fileList:[1,1,1],

        acceptCom: '',
        acceptComList: [],
        addressCode: '',
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
        deviceClassId: '',
        //设备品种列表
        deviceTypeList: [],
        deviceClassTypeId: '',
        gasAddpdf:'',
        acceptorAgencyId:'',
        acceptorAgencyName:'',

        ruleForm: {
          registKind: '新设备首次启用',
          deviceClass: '',
          deviceClassCode: '',
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          eqUseAddr: '',
          staticPhone: '',
          zipcode: '',
          useComCode: '',
          safeAdministrator: '',
          mobilePhone: '',
          comTablePerson: '',
          superviseComName:'',
          deviceName:'',
          email:'',
          //comPersonDate:'',
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
        num: 10,
        rules: {
          registKind: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceClassCode: [
            {required: true, message: '不能为空', trigger: 'change'}
          ],
          deviceName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deviceNum: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          useComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          useComAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          staticPhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          zipcode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          useComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          eqUseAddr: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          safeAdministrator: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          comTablePerson: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          superviseComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          deviceName:[
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          email:[
            {required: true, message: '不能为空', trigger: 'blur'}
          ],

        },
        ifNext: true,
        active: 1,
        selected: '',
        imgName: '',
        visible: false,

        uploadList: [
          {"url": ''}
        ],

        gasfirstUploadList:[
          {"url": ''}
        ],
        gasFirstPdfList: [],
        gasFirstPdf:'',
        gasFirstvisible:false,


        gasAddUploadList:[
          {"url": ''}
        ],
        gasAddPdfList: [],
        gasAddPdf:'',
        gasAddvisible:false,
        gasDownloadPdf:'',

        pipeFirstUploadList:[
          {"url": ''}
        ],
        pipeFirstPdfList: [],
        pipeFirstPdf:'',
        pipeFirstvisible:false,

        pipeAddUploadList:[
          {"url": ''}
        ],
        pipeAddPdfList: [],
        pipeAddPdf:'',
        pipeAddvisible:false,
        pipeDownloadPdf:'',

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
        defaultPdfList2: [],
        defaultPdfList3:[],
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
            key: 'comCode',
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
        pdfUrl: '',
        uploadList: [
          {"url": ''}
        ],
        ifold: 0,
        device_type: 9,
        creatOrUpdate: false,
        pdfUrl: '',
        pdfList: [],
        pdf: '',
        cylinderEqCode:'',
        pipeEqCode:'',
        editCylinderData:[],
        editPipeData:[],
        editCylinderColumns:[
          {
            title: '序号',
            type: 'index',
            align: 'center'
          },
          {
            title: '设备品种',
            align: 'center',
            key: 'deviceKind',
            editable: true
          },
          {
            title: '产品编号',
            align: 'center',
            key: 'eqCode',
            editable: true
          },
          {
            title: '充装介质',
            align: 'center',
            key: 'fillMedia',
            editable: true
          },
          {
            title: '制造单位名称',
            align: 'center',
            key: 'manufactureComName',
            editable: true
          },
          {
            title: '制造年月',
            align: 'center',
            key: 'eqCreateDate',
            editable: true,
            width:150,
          },
          {
            title: '公称工作压力(MPa)',
            align: 'center',
            key: 'workPressure',
            editable: true
          },
          {
            title: '容积(L)',
            align: 'center',
            key: 'volume',
            editable: true
          },
          {
            title: '最近一次检验日期',
            align: 'center',
            key: 'testDate',
            editable: true
          },
          {
            title: '下次检验日期',
            align: 'center',
            key: 'nextTestDate',
            editable: true
          },
          {
            title: '单位内编号',
            align: 'center',
            key: 'eqComCode',
            editable: true
          },
          {
            title: '变更或者停用情况',
            align: 'center',
            key: 'eqStatus',
            editable: true
          },
          {
            title: '信息化管理情况',
            align: 'center',
            key: 'infoMessage',
            editable: true
          },
          {
            title: '操作',
            align: 'center',
            key: 'handle',
            handle: ['edit', 'delete']
          }

        ],
        editPipeColumns:[
          {
            title: '序号',
            type: 'index',
            align: 'center',
          },
          {
            title: '管道名称(登记单元)',
            align: 'center',
            key: 'pipeName',
            editable: true,
          },
          {
            title: '管道编号',
            align: 'center',
            key: 'eqCode',
            editable: true,
          },
          {
            title: '管道级别',
            align: 'center',
            key: 'eqLevel',
            editable: true,
          },
          {
            title: '设计单位名称',
            align: 'center',
            key: 'designComName',
            editable: true,
          },
          {
            title: '安装单位名称',
            align: 'center',
            key: 'constructComName',
            editable: true
          },
          {
            title: '安装年月',
            align: 'center',
            key: 'eqCreateDate',
            editable: true
          },
          {
            title: '投用年月',
            align: 'center',
            key: 'eqUseDate',
            editable: true
          },
          {
            title: '公称直径(mm)',
            align: 'center',
            key: 'diameter',
            editable: true
          },
          {
            title: '公称壁厚(mm)',
            align: 'center',
            key: 'thickness',
            editable: true
          },
          {
            title: '管道长度(m)',
            align: 'center',
            key: 'length',
            editable: true
          },
          {
            title: '压力(MPa)',
            align: 'center',
            key: 'workPressure',
            editable: true
          },
          {
            title: '温度(℃)',
            align: 'center',
            key: 'temperature',
            editable: true
          },
          {
            title: '介质',
            align: 'center',
            key: 'fillMedia',
            editable: true
          },
          {
            title: '检验结论',
            align: 'center',
            key: 'testResult',
            editable: true
          },
          {
            title: '检验机构名称',
            align: 'center',
            key: 'testComName',
            editable: true
          },
          {
            title: '下次检验日期',
            align: 'center',
            key: 'nextTestDate',
            editable: true
          },
          {
            title: '备注',
            align: 'center',
            key: 'remark',
            editable: true
          },
          {
            title: '操作',
            align: 'center',
            key: 'handle',
            handle: ['edit', 'delete']
          }
        ],


      };
    },
    components: {
//      'v-regist-two': regist_two,
//      'v-cylinders-form': cylinders_form,
//      'v-pressure-form': pressure_form,
      //'v-detailPdf': detailPdf,
      'canEditTable':canEditTable,

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
        "getterUserData",
      ]),
    },
    mounted(){
      this.initData();
      this.author_key = localStorage.getItem('author_key');
    },
    methods: {
      ...mapActions({}),

      printTrigger(elementId) {
        var getMyFrame = document.getElementById(elementId);
        getMyFrame.focus();
        getMyFrame.contentWindow.print();
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


      //初始化数据
      setUserDetailData(){
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        this.ruleForm.zipcode = localStorage.getItem('zipcode');
        this.ruleForm.staticPhone = localStorage.getItem('staticPhone');
//        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.email = localStorage.getItem('email');

        if (localStorage.getItem('company') == 'true') {
//          this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
          this.ruleForm.useComCode = localStorage.getItem('useComCode');
        } else {
//          this.ruleForm.safeAdministrator = localStorage.getItem('name');
          this.ruleForm.useComCode = localStorage.getItem('verifyId');

        }
        this.addressCode = localStorage.getItem('addressCode');

      },
      initData(){
        this.active = 1;
        this.current = 0;
        this.resetForm('ruleForm');
        this.uploadList = [
          {"url": ''}
        ];
        this.gasfirstUploadList=[
          {"url": ''}
        ]
        this.creatOrUpdate = false;
        this.file1NameNum = 1;
        this.file2NameNum = 1;
        this.file3NameNum = 1;
        this.file4NameNum = 1;
        this.file5NameNum = 1;
        this.fileList=[1,1,1];
        this.device_type = this.$route.query.device_type;
        this.ifold = this.$route.query.ifold;
        this.defaultPdfList1 = [];
        this.defaultPdfList2 = [];
        this.defaultPdfList3=[];
        this.applyId='';

        //如果是第一次填写
        if (!(this.$route.query.ifold)) {
          this.clearRuleForm();

          this.deviceTypeList = [];
          this.setUserDetailData();


          if (this.$route.query.device_type == 9) {
            this.ruleForm.deviceClassCode = "2300";
          } else if (this.$route.query.device_type == 10) {
            this.ruleForm.deviceClassCode = "8300";
          }
          let params = 'code=' + this.ruleForm.deviceClassCode;
          if (this.deviceTypeList !== '' && this.ruleForm.deviceClassCode) {
            setAppService.getDeviceType(params).then(res => {
              this.deviceTypeList = [];
              for (let i = 0, len = res.length; i < len; i++) {
                this.deviceTypeList.push({value: res[i].code, label: res[i].name});
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
          //this.acceptCom = res.data.acceptorAgencyId;
          this.clearRuleForm();
          this.ruleForm = res.data.formList[0];
          this.acceptCom = res.data.acceptorAgencyId;
          this.setUserDetailData();
          this.gasDownloadPdf="/admin/file/download?fileId="+res.data.forms["气瓶基本信息汇总表"];
          this.pipeDownloadPdf="/admin/file/download?fileId="+res.data.forms["压力管道基本信息汇总表"];
          for(let valueName  in  res.data.files){
            if(valueName.replace(/\d+/g,'')=="社会信用代码证明"){
              this.defaultPdfList1=[{
                'name':'社会信用代码证明',
                'url':'/admin/file/upload?applyId='+res.data.files[valueName]
              }];
              this.fileList[0]++;
              this.uploadList[0].url = "/admin/file/thumbnail?fileId="+res.data.files[valueName];
              this.pdfList.push("/admin/file/preview?fileId="+res.data.files[valueName])
            }

            if(valueName.replace(/\d+/g,'')=="监督检验证明"){
              this.defaultPdfList2.push({
                'name':'监督检验证明',
                'url':'/admin/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[1]++;
              this.uploadList.push({"url": "/admin/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/admin/file/preview?fileId=" + res.data.files[valueName])
            }
            if(valueName.replace(/\d+/g,'')=="定期检验证明"){
              this.defaultPdfList3.push({
                'name':'定期检验证明',
                'url':'/admin/file/upload?applyId='+res.data.files[valueName]
              });
              this.fileList[2]++;
              this.uploadList.push({"url": "/admin/file/thumbnail?fileId=" + res.data.files[valueName]});
              this.pdfList.push("/admin/file/preview?fileId=" + res.data.files[valueName])
            }

          }
          //alert(this.gasDownloadPdf)
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
      clearRuleForm(){
        this.ruleForm = {
          registKind: '新设备首次启用',
          deviceClass: '',
          deviceClassCode: '',
          deviceKind: '',
          deviceKindCode: '',
          deviceName: '',
          deviceNum: '',
          useComName: '',
          useComAddr: '',
          eqUseAddr: '',
          staticPhone: '',
          zipcode: '',
          useComCode: '',
          safeAdministrator: '',
          mobilePhone: '',
          comTablePerson: '',
          superviseComName:'',
          deviceName:'',
          email:'',

          //comPersonDate:'',
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
      //选择受理机关
      chosenAccept(value){
        this.acceptorAgencyId = value.value;
        this.acceptorAgencyName = value.label;
      },


      //提交表格信息
      submit(submitParam){
        setAppService.submitSetInfo(submitParam).then(res => {
          if (res.status == 200) {
            this.applyId = res.data.applyId;
            this.fileId = res.data.forms.split("=")[1].split("}")[0];
            this.pdfUrl = '/admin/file/preview?fileId=' + this.fileId;
//            this.pdfUrl = '/admin/file/preview?fileId='+ res.data.forms['特种设备使用登记表三'];

            this.$Message.info('您已提交信息，请预览结果');
            this.modalCertain = false;
          }

        }).catch(error => {
          console.log(error);

        })
      },
      makeParams(){
        let submitParam = {};
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
        submitParam.eqCode = '';
        //提交设备类别等
        if (submitParam.deviceType === 9) {
          submitParam.deviceCategory = "压力容器";
          submitParam.deviceClass = "气瓶";
          submitParam.deviceKind = this.deviceClassTypeId;
          this.ruleForm.deviceClass = "气瓶";
          this.ruleForm.deviceKind = this.deviceClassTypeId;
        } else if (submitParam.deviceType === 10) {
          submitParam.deviceCategory = "压力管道";
          submitParam.deviceClass = "工业管道";
          submitParam.deviceKind = this.deviceClassTypeId;
          this.ruleForm.deviceClass = "工业管道";
          this.ruleForm.deviceKind = this.deviceClassTypeId;
        }
        submitParam.formList = [];
        submitParam.formList.push(this.ruleForm);
        submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
        submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
        submitParam.formList[0].formType = 3;

        return submitParam;

      },
      submitContent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.current++;
            this.active++;
            // console.log(valid);
            // console.log(this.active);
            let formList = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam = this.makeParams();

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
            let formList = Object.assign({}, this.ruleForm);
            //把选择的哪一项带进去
            let submitParam = {};
            if (submitParam.deviceType === 9) {
//              submitParam.deviceKind = this.deviceClassTypeId;
              this.ruleForm.deviceClass = "气瓶";
              if(this.deviceClassTypeId!==''){
                this.ruleForm.deviceKind = this.deviceClassTypeId;
              }
            } else if (submitParam.deviceType === 10) {
//              submitParam.deviceKind = this.deviceClassTypeId;
              this.ruleForm.deviceClass = "工业管道";
              if(this.deviceClassTypeId!==''){
                this.ruleForm.deviceKind = this.deviceClassTypeId;
              }
            }
            submitParam.formList = [];
            submitParam.formList.push(this.ruleForm);
            submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
            submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
            submitParam.formList[0].formType = 3;
            submitParam.id = parseInt(this.applyId)||parseInt(this.$route.query.applyId);
            setAppService.updateSetInfo(submitParam).then(res => {
              if (res.status == 200) {
                this.current++;
                this.active++;
                this.applyId = res.data.applyId;
//                this.fileId = res.data.forms;
//                this.pdfUrl = this.fileId;
                this.pdfUrl = '/admin/file/preview?fileId='+ res.data.forms['特种设备使用登记表三'];
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
      handleGasFirstSuccess (res, file) {
          this.gasfirstUploadList[0].url = "/admin" + res.data.thumbnail;
          this.gasFirstPdfList.push("/admin" + res.data.preview);
        this.gasDownloadPdf= "/admin" + res.data.download;

      },
      handleGasFirstView(index){
        this.gasFirstvisible = true;
        this.gasFirstPdf = this.gasFirstPdfList[index];
      },
      handleGasAddSuccess (res, file) {
        this.gasAddUploadList[0].url = "/admin" + res.data.thumbnail;
        this.gasAddPdfList.push("/admin" + res.data.preview);
        this.gasDownloadPdf= "/admin" + res.data.download;
      },
      handleGasAddView(index){
        this.gasAddvisible = true;
        this.gasAddPdf = this.gasAddPdfList[index];

      },
      handlePipeFirstSuccess (res, file) {
        this.pipeFirstUploadList[0].url = "/admin" + res.data.thumbnail;
        this.pipeFirstPdfList.push("/admin" + res.data.preview);
        this.pipeDownloadPdf= "/admin" + res.data.download;

      },
      handlePipeFirstView(index){
        this.pipeFirstvisible = true;
        this.pipeFirstPdf = this.pipeFirstPdfList[index];
      },
      handlePipeAddSuccess (res, file) {
        this.pipeAddUploadList[0].url = "/admin" + res.data.thumbnail;
        this.pipeAddPdfList.push("/admin" + res.data.preview);
        this.pipeDownloadPdf= "/admin" + res.data.download;

      },
      handlePipeAddView(index){
        this.pipeAddvisible = true;
        this.pipeAddPdf = this.pipeAddPdfList[index];
      },



      //保存
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
              if (submitParam.deviceType === 9) {
//              submitParam.deviceKind = this.deviceClassTypeId;
                this.ruleForm.deviceClass = "气瓶";
                this.ruleForm.deviceKind = this.deviceClassTypeId;
              } else if (submitParam.deviceType === 10) {
//              submitParam.deviceKind = this.deviceClassTypeId;
                this.ruleForm.deviceClass = "工业管道";
                this.ruleForm.deviceKind = this.deviceClassTypeId;
              }
              submitParam.formList = [];
              submitParam.formList.push(this.ruleForm);
              submitParam.formList[0].acceptorAgencyId = this.acceptorAgencyId;
              submitParam.formList[0].acceptorAgencyName = this.acceptorAgencyName;
              submitParam.formList[0].formType = 3;
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
        this.creatOrUpdate = true;
      },

      confirmForm () {
        if(this.acceptCom==='' ){
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
          waitAccparams.states = [this.applyState, this.applyState];

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
        for (let i = 0; i < this.uploadList.length; i++) {
          if(res.response){
            if (this.uploadList[i].url == "/admin" + res.response.data.thumbnail) {
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
      handleBeforeUpload () {

      },
      handleBeforeUpload1 () {
     //   this.file1NameNum++;
        this.fileList[0]++;
      },
      handleBeforeUpload2 () {
      //  this.file2NameNum++;
        this.fileList[1]++;
      },
      handleBeforeUpload3 () {
       // this.file3NameNum++;
        this.fileList[2]++;
      },
//      handleBeforeUpload4 () {
//        this.file4NameNum++;
//      },
//      handleBeforeUpload5 () {
//        this.file5NameNum++;
//      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc: '请上传pdf格式文件'
        });
      },
      handleFormatError1(file) {
        this.$Notice.warning({
          title: '文件格式不对',
          desc: '请上传xlsx格式文件'
        });
      },
      handleView(index){
        console.log(index);
        this.visible = true;
        this.pdf = this.pdfList[index];
      },
      //存入档案
      save(type){
        const title = '通知';
        const content = '<p>您已经成功将信息存入档案</p>';
        this.$Modal.success({
          title: title,
          content: content

        });
        this.$router.push('applyerList');

      },
      exactSearch(){
        if (this.cylinderEqCode) {
          let params = 'eqCode=' + this.cylinderEqCode+'';
          setAppService.getCylinder(params).then(res => {
              if (res.status === 200) {
                  if(res.data){
                    this.editCylinderData=[];
                    this.editCylinderData.push(res.data);
                  }else {
                    this.editCylinderData=[];
                    this.$Message.success('暂无该数据');
                  }
               // this.num=res.data.totalElements;
              }else if(res.status=== 401){
                this.$Notice.error({
                  title: '这是通知标题',
                  desc: res.msg
                });
              }
            }
          ).catch(error => {
            console.log(error);
          })
        }
      },
      exactSearchPipe(){
        if (this.pipeEqCode) {
          let params = 'eqCode=' + this.pipeEqCode+'';
          setAppService.getPipe(params).then(res => {
              if (res.status === 200) {
                if(res.data){
                  this.editPipeData=[];
                  this.editPipeData.push(res.data);
                }else {
                  this.editPipeData=[];
                  this.$Message.success('暂无该数据');
                }
              }else if(res.status=== 401){
                this.$Notice.error({
                  title: '这是通知标题',
                  desc: res.msg
                });
              }
            }
          ).catch(error => {
            console.log(error);
          })
        }
      },
      saveCylinderInline (index, success, fail) {
          console.log(this.editCylinderData[index]);
        let params = {};
        params=this.editCylinderData[index];
        setAppService.changeCylinder(params).then(res => {
            if (res.status === 200) {
              success(() => {
                this.$Message.success('保存成功');
              });
            }else{
              fail(() => {
                this.$Message.error('保存失败,请重试');
              });
            }
          }
        ).catch(error => {
          console.log(error);
        })

      },
      savePipeInline (index, success, fail) {
        console.log(this.editPipeData[index]);
//        if (this.editPipeData[index].testDate >this.editPipeData[index].nextTestDate ) {
//          this.$Notice.error({
//            title: '这是通知标题',
//            desc: '下次检验日期需在检验日期之后'
//          });
//          return
//        }
        let params = {};
        params=this.editPipeData[index];
        setAppService.changePipe(params).then(res => {
            if (res.status === 200) {
              success(() => {
                this.$Message.success('保存成功');
              });
            }else{
              fail(() => {
                this.$Message.error('保存失败,请重试');
              });
            }
          }
        ).catch(error => {
          console.log(error);
        })
      },

      //确认全部
      instance (type) {
        for(let i=0;i<this.fileList.length;i++){
          if(this.fileList[i]<=1){
            this.$Notice.warning({
              title: '通知',
              desc: '请上传全部pdf文件'
            });
            return
          }
        }
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>点击确认提交年检申请</p><p>如您还未到年检日期，请点击取消，并存入档案</p>',
          onOk: () => {
            let params = 'applyId=' + 1;
            setAppService.confrimApp(params).then(res => {
              if (res) {
                this.$router.push('applyerList');
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

  .base-box,
  .chooseAccept {
    /*margin-left: 140px;*/
  //  margin:0;
    display: block;
    border: 1px solid #dddee1;
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
    margin-left:10%;

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
    width:100%;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    margin-left: 0;
    box-sizing: border-box;
    padding: 10px;
    //background-color: red;
    // margin-left:300px;
  }


  .firstHead {
    margin: 10px;
    margin-left: 50%;
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

  .changeGas {

    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-color: #dddee1;
    margin-top: 10px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    margin-left: 0;

  }
  .edittable-table-height-con{
    height: 190px;
    wditH:100%;
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
