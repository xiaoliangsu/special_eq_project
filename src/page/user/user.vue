<template>
  <div class="user">
    <header class="admin_title">基本信息</header>
    <!--申请用户-->
    <div class="admin_set" v-if="this.author_key==1">
        <Form :model="ruleForm" ref="ruleForm" :rules="rules" :label-width="120">

          <Row>

            <FormItem prop="userName" label="用户名">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;font-size:2px;">
                  <p>登录账号，至少5个字符，要求大小写字母和数字</p>
                </div>
                <Input v-model="ruleForm.userName" placeholder="用户名" disabled></Input>
              </Poptip>

            </FormItem>

          </Row>
          <Row>

            <FormItem prop="password" label="登陆密码">
              <div style="display:inline-block;width:300px;" v-if="this.codeBox">
              <Input v-model="password" ></Input>
              </div>
              <Button  @click="saveCode()" v-if="this.codeBox" type="warning">保存密码</Button>

              <Button  @click="changeCode()" v-if="!this.codeBox">修改密码</Button>

            </FormItem>

          </Row>

          <h2>基本信息</h2></br>
          <Row>
            <FormItem prop="useComName" label="使用单位名称"  v-if="this.role==='1'">
              <Input v-model="ruleForm.useComName" placeholder="应当与工商营业执照或者其他法人证书的名称完全一致"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="useComAddr" label="使用单位地址"  v-if="!this.changeAdd">
              <Input v-model="ruleForm.useComAddr" disabled></Input>
            </FormItem>

            <FormItem prop="useComAddr" label="使用单位地址"  style="margin-bottom:10px;" v-if="this.changeAdd">
              <Col span="6" style="padding-right:10px;" >
              <Select  v-model="ruleForm.province" filterable @on-change="chosenPro" :label-in-value="true">
                <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="6" style="padding-right:10px;">
              <Select v-model="ruleForm.city" filterable @on-change="chosenCity" :label-in-value="true">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="6">
              <Select v-model="ruleForm.area" filterable @on-change="chosenArea" :label-in-value="true">
                <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
            </FormItem>
          </Row>


          <Row>
            <FormItem prop="street" label=""  v-if="this.changeAdd">
              <Input v-model="ruleForm.street" placeholder="填写乡、镇、街道、村、路、社区、楼层、号等"></Input>
            </FormItem>

          </Row>
          <Button  @click="changeAddress()" v-if="!this.changeAdd">修改地址</Button>

          <Row v-if="this.role==='1'">
            <FormItem prop="useComCode" label="使用单位统一社会信用代码" >
              <Input v-model="ruleForm.useComCode" placeholder="应当与工商营业执照或者其他法人证书上的一致"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="safeAdministrator" label="安全管理员">
              <Input v-model="ruleForm.safeAdministrator" placeholder="请填写负责该设备专职持证的或者兼职安全管理员姓名"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="verifyId" label="身份证号"  v-if="this.role==='0'">
              <Input v-model="ruleForm.verifyId" placeholder="请填入安全管理员的公民身份证号码"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="email" label="电子信箱">
              <Input v-model="ruleForm.email" placeholder="请填入安全管理员的电子邮箱"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="mobilePhone" label="移动电话号码">
              <Input v-model="ruleForm.mobilePhone" placeholder="请填入安全管理员的移动电话号码"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="邮政编码" prop="zipcode">
              <Input v-model="ruleForm.zipcode" placeholder="请输入邮政编码"></Input>
            </FormItem>
          </Row>

          <FormItem label="单位固定电话" prop="staticPhone"  v-if="this.role==='1'">
            <Input v-model="ruleForm.staticPhone" placeholder="请输入单位固定电话"></Input>
          </FormItem>
          <FormItem label="产权单位名称" prop="propertyComName"  v-if="this.role==='1'">
            <Input v-model="ruleForm.propertyComName" placeholder="请输入产权单位名称"></Input>
          </FormItem>
          <FormItem label="产权单位统一社会信用代码" prop="propertyComCode"  v-if="this.role==='1'">
            <Input v-model="ruleForm.propertyComCode" placeholder="请输入产权单位统一社会信用代码"></Input>
          </FormItem>


        </Form>
    </div>
    <!--受理审批-->
    <div class="admin_set" v-if="this.author_key==2||this.author_key==3">
      <Form :model="ruleForm" :label-width="120" :rules="registRules" ref="registInfo">
        <Row>

          <FormItem prop="userName" label="用户名">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>登录账号，至少5个字符，要求大小写字母和数字</p>
              </div>
              <Input v-model="ruleForm.userName" placeholder="用户名" disabled></Input>
            </Poptip>

          </FormItem>

        </Row>
        <Row>

          <FormItem prop="password" label="登陆密码">
            <div style="display:inline-block;width:300px;" v-if="this.codeBox">
              <Input v-model="password" ></Input>
            </div>
            <Button  @click="saveCode()" v-if="this.codeBox" type="warning">保存密码</Button>

            <Button  @click="changeCode()" v-if="!this.codeBox">修改密码</Button>

          </FormItem>


        </Row>
        <Row>
          <FormItem prop="useComAddr" label="登记机关名称"  style="margin-bottom:10px;" v-if="! this.changeRegistName">
          <Input v-model="ruleForm.acceptorAgencyName" disabled></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="name" label="登记人员" >

            <Input v-model="ruleForm.name" placeholder="填写负责登记工作的人员姓名"></Input>

          </FormItem>
        </Row>
        <Row>
          <FormItem prop="verifyId" label="身份证号">

            <Input v-model="ruleForm.verifyId" placeholder="请填入登记人员的公民身份证号码"></Input>

          </FormItem>
        </Row>
        <FormItem prop="mobilePhone" label="移动电话号码">
          <Row>
            <Input v-model="ruleForm.mobilePhone" placeholder="请填入安全管理员的移动电话号码"></Input>
          </Row>
        </FormItem>

      </Form>
    </div>
    <Button type="primary" @click="saveRuleForm()" style="font-size:16px;font-weight:bold;margin-left:600px;">保存</Button>


  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as loginService from '../../services/login'

  export default {
    data() {
      return {
        author_key:localStorage.getItem('author_key'),
        role:'',
        formInline: {
          user: '',
          region: '',
          option: ''
        },
        rules: {
          username: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          password2: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          useComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          street: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          useComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          safeAdministrator: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          verifyId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          email: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          useComAddr: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          zipcode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          staticPhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          propertyComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          propertyComCode: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],

        },
        registRules: {
          useComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          verifyId: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],

        },
        province: '',
        provinceId:'',
        city: '',
        provinceList: [],
        cityList: [],
        cityId:'',
        area: '',
        areaList: [],
        areaId:'',
        codeBox:false,
        changeAdd:false,
        changeRegistName:false,
        userName: '',
        password:'',
        ruleForm:{
          userName:'',
          useComName:'',
          useComAddr:'',
          useComCode:'',
          zipcode:'',
          staticPhone:'',
          mobilePhone:'',
          propertyComName:'',
          propertyComCode:'',
          name:'',
          verifyId:'',
          acceptorAgencyId:'',

        },

      }
    },
    computed: {
      ...mapState([

        //"userInfo"
        "loginStatus",
        "userInfo"

      ]),
      ...mapGetters([
        "userInfo",
        "loginStatus"

      ])
    },
    methods: {
      ...mapActions(
        ['setSignOut', 'getUserInfo','clearUserData','getUserData'],
      ),

      initData(){
        this.ruleForm.userName = localStorage.getItem('userInfo');
        this.setUserDetailData();
        this.author_key = localStorage.getItem('author_key');
        this.codeBox=false;
      },
      setUserDetailData(){

          if(this.author_key==1){

            this.ruleForm.useComName = localStorage.getItem('useComName');
            this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
            this.ruleForm.zipcode = localStorage.getItem('zipcode');

            this.ruleForm.staticPhone = localStorage.getItem('staticPhone');
            this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
            this.ruleForm.propertyComName = localStorage.getItem('propertyComName');
            this.ruleForm.propertyComCode = localStorage.getItem('propertyComCode');
            this.ruleForm.email = localStorage.getItem('email');

            if(localStorage.getItem('company')=='true'){
              this.ruleForm.safeAdministrator = localStorage.getItem('safeAdministrator');
              this.ruleForm.useComCode = localStorage.getItem('useComCode');
              //公司
              this.role="1"
            }else {
              this.ruleForm.safeAdministrator = localStorage.getItem('name');
              this.ruleForm.verifyId = localStorage.getItem('verifyId');
              console.log( this.ruleForm.useComCode )
              //个人
              this.role='0';

            }

          }
        if(this.author_key==2||this.author_key==3){
          this.ruleForm.acceptorAgencyId = localStorage.getItem('acceptorAgencyId');
          this.ruleForm.name = localStorage.getItem('name');
          this.ruleForm.verifyId = localStorage.getItem('verifyId');
          this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        }



      },
      saveRuleForm(){
          console.log(1);
          if(this.author_key==1&&this.role==='1'){
            let addressDetail='';
            if(this.area!==''){
              addressDetail=this.province+this.city+this.area+this.ruleForm.street;

            }else if(this.area==''){
              addressDetail=this.province+this.city+this.ruleForm.street;
            }
            this.ruleForm.useComAddr=addressDetail;

            let addressCode='';
            if(this.areaId!==''){
              addressCode=this.areaId;
            }else{
              addressCode=this.cityId;
            }
            let params = {};
            let temp = {
              "company": true,
              "mobilePhone": this.ruleForm.mobilePhone,
              "useComName": this.ruleForm.useComName,
              "useComCode": this.ruleForm.useComCode,
              "zipcode": this.ruleForm.zipcode,
              "propertyComName": this.ruleForm.propertyComName,
              "propertyComCode": this.ruleForm.propertyComCode,
              "email":this.ruleForm.email,
              "useComAddr":this.ruleForm.useComAddr||addressDetail,
              "addressCode":addressCode,
              "safeAdministrator":this.ruleForm.safeAdministrator,
              "staticPhone":this.ruleForm.staticPhone,
            }
            params.userData = temp;
            setAppService.updateUser(params).then(res => {
              if(res.status===200){
                this.$Message.info('基本信息修改成功');
                this.getUserData();
                this.changeAdd=false;
               // this.$router.push('login');
              }else if(res.status===500){
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              // console.log(2);
              console.log(error)
            })
            //个人
          }else if(this.author_key==1&&this.role==='0'){
            let addressDetail='';
            if(this.area!==''){
              addressDetail=this.province+this.city+this.area+this.ruleForm.street;

            }else if(this.area==''){
              addressDetail=this.province+this.city+this.ruleForm.street;
            }
            this.ruleForm.useComAddr=addressDetail
            let addressCode='';
            if(this.areaId!==''){
              addressCode=this.areaId;
            }else{
              addressCode=this.cityId;
            }
            let params = {};
            let temp = {
              "name": this.ruleForm.name,
              "mobilePhone": this.ruleForm.mobilePhone,
              "verifyId": this.ruleForm.verifyId,
              "company": false,
              "zipcode": this.ruleForm.zipcode,
              "email":this.ruleForm.email,
              "useComAddr":addressDetail,
              "addressCode":addressCode,
            }
            params.userData = temp;
            setAppService.updateUser(params).then(res => {
              if(res.status===200){
                this.$Message.info('基本信息修改成功');
                this.getUserData();
                this.changeAdd=false;
              }else if(res.status===500){
                this.$Message.info(res.msg);
              }
            }).catch(error => {
              // console.log(2);
              console.log(error)
            })

          } else if(this.author_key==2) {
            let params = {};
            let temp = {
              "name": this.ruleForm.name,
              "verifyId": this.ruleForm.verifyId,
              "mobilePhone": this.ruleForm.mobilePhone,
            }
            params.userData = temp;
            params.userData.role = 2;
            setAppService.updateUser(params).then(res => {
              if (res.status === 200) {
                this.$Message.info('基本信息修改成功');
                this.getUserData();
              } else if (res.status === 500) {
                this.$Message.info(res.msg);
              }

            }).catch(error => {
              // console.log(2);
              console.log(error)
            })
          }else if(this.author_key==3){
            let params = {};
            let temp = {
              "name": this.ruleForm.name,
              "verifyId": this.ruleForm.verifyId,
              "mobilePhone": this.ruleForm.mobilePhone,
            }
            params.userData = temp;
            params.userData.role = 3;
            setAppService.updateUser(params).then(res => {
              if (res.status === 200) {
                this.$Message.info('基本信息修改成功');
                this.getUserData();
              } else if (res.status === 500) {
                this.$Message.info(res.msg);
              }

            }).catch(error => {
              // console.log(2);
              console.log(error)
            })
          }


      },
      changeCode(){
          this.codeBox=true;
      },
      saveCode(){
        this.codeBox=false;
        this.$Modal.confirm({
          title: 'Title',
          content: '<p>点击确认提交新密码，并重新登录</p>',
          onOk: () => {
            let params={
              password:this.password
            }
            setAppService.updateUser(params).then(res => {
              this.$Message.info('修改密码成功，请重新登陆');
              localStorage.removeItem('loginStatus');
              localStorage.removeItem('userInfo');
              localStorage.removeItem('author_key');
              localStorage.removeItem('useComName');
              localStorage.removeItem('useComAddr');
              localStorage.removeItem('useComCode');
              localStorage.removeItem('zipcode');
              localStorage.removeItem('staticPhone');
              localStorage.removeItem('mobilePhone');
              localStorage.removeItem('propertyComName');
              localStorage.removeItem('propertyComCode');
              localStorage.removeItem('name');
              localStorage.removeItem('verifyId');
              localStorage.removeItem('safeAdministrator');
              localStorage.removeItem('approveAgencyId');
              this.setSignOut();
              this.$router.push('login');


            }).catch(error => {
              console.log(error);
            })



          },
          onCancel: () => {
            this.$Message.info('点击了取消');
          }
        });


      },

      changeRegist(){
        this.changeRegistName=true;
      },


      changeAddress(){
        setAppService.getProvinces().then(res => {
          for (let i = 0, len = res.length; i < len; i++) {
            this.provinceList.push({value: res[i].code, label: res[i].name});
          }
          this.changeAdd=true;
        }).catch(error => {
          console.log(error);
        })

      },
      chosenPro(value){
        let params = 'provinceCode=' + value.value;
        this.province=value.label;
        this.provinceId=value.value;
        if (value !== '') {
          setAppService.getCities(params).then(res => {
            this.cityList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.cityList.push({value: res[i].code, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })
        }


      },
      chosenCity(value){
        let params = 'cityCode=' + value.value;
        this.city=value.label;
        this.cityId=value.value;
        if (value !== "") {
          setAppService.getArea(params).then(res => {
            this.areaList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.areaList.push({value: res[i].code, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })

//          loginService.getAccpeter(params2).then(res => {
//            for (let i = 0, len = res.length; i < len; i++) {
//              this.acceptComList.push({value: res[i].districtCode, label: res[i].name});
//            }
//          }).catch(error => {
//            console.log(error);
//          })
        }
      },
      chosenArea(value){
        this.areaId=value.value;
        this.area=value.label;
        let params = 'code=' + value.value;
        console.log(this.province+this.city+this.area+this.street);

//        loginService.getAccpeter(params).then(res => {
//          this.acceptComList=[];
//          for (let i = 0, len = res.length; i < len; i++) {
//            this.acceptComList.push({value: res[i].districtCode, label: res[i].name});
//          }
//        }).catch(error => {
//          console.log(error);
//        })


      },
    },
    mounted(){
      this.initData();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'initData'
    },


  }

</script>
<style lang="scss" scoped>


  .admin_set {
    width: 60%;
    background-color: #F9FAFC;
    min-height: 400px;
    margin: 20px auto 0;
    border-radius: 10px;
    ul > li {
      padding: 10px;
      padding-left:20%;
      span {
        color: #666;
      }
    }
  }


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    margin-top: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .admin_title{
    margin-top: 20px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
</style>
