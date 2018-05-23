<template>
  <div class="regist">
    <div class="head">使用单位注册使用账号</div>
    <div class="body">
      <RadioGroup v-model="choose" @on-change="chooseComOrPer" style="margin-left:100px;margin-bottom:10px;">
        <Radio label="company">单位注册</Radio>
        <Radio label="person">个人注册</Radio>
      </RadioGroup>
      <div>
        <Form :model="registInfo" ref="registInfo" :rules="rules" :label-width="120">

          <Row>

            <FormItem prop="username" label="用户名">
              <Poptip trigger="focus" placement="right" >
                <div slot="content" style="white-space: normal;" >
                  <p>登录账号，至少5个字符，要求大小写字母和数字</p>
                </div>
                <Input v-model="registInfo.username" placeholder="用户名" class="ivu-input-special"></Input>
              </Poptip>

            </FormItem>

          </Row>
          <!--<label class="label">本人姓名：</label>-->

          <!--<label class="label">密码：</label>-->
          <Row>

            <FormItem prop="password" label="密码">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>登录密码，至少5个字符，要求大小写字母和数字</p>
                </div>
                <Input type="password" v-model="registInfo.password" placeholder="密码"  class="ivu-input-special"></Input>
              </Poptip>

            </FormItem>

          </Row>
          <!--<label class="label" style="fint-size:16px;">确认密码:</label>-->
          <Row>

            <FormItem prop="password2" label="确认密码">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>确认两次密码填写相等</p>
                </div>
                <Input type="password" v-model="registInfo.password2" placeholder="确认密码"  class="ivu-input-special"></Input>
              </Poptip>

            </FormItem>

          </Row>


          <h2>基本信息</h2></br>
          <Row>
            <FormItem prop="useComName" label="使用单位名称" v-if="this.companyVisiable">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>应当与工商营业执照或者其他法人证书的名称完全一致</p>
                </div>
                <Input v-model="registInfo.useComName"  class="ivu-input-special"></Input>

              </Poptip>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="useComAddr" label="使用单位地址" style="margin-bottom:10px;" v-if="this.companyVisiable"
            class="ivu-form-item-required ivu-form-item-label">
              <Col span="7" style="margin-right:20px;">
              <Select v-model="registInfo.province" filterable @on-change="chosenPro" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="7" style="margin-right:20px;">
              <Select v-model="registInfo.city" filterable @on-change="chosenCity" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="7">
              <Select v-model="registInfo.area" filterable @on-change="chosenArea" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
            </FormItem>
          </Row>


          <Row>
            <FormItem prop="street" label="" v-if="this.companyVisiable">
              <Input v-model="registInfo.street" placeholder="填写乡、镇、街道、村、路、社区、楼层、号等"></Input>
            </FormItem>
          </Row>
          <Row>
            <FormItem prop="useComAddr" label="个人地址" style="margin-bottom:10px;" v-if="this.personVisiable"
                      class="ivu-form-item-required ivu-form-item-label">
              <Col span="7" style="margin-right:20px;" >
              <Select v-model="registInfo.province" filterable @on-change="chosenPro" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="7" style="margin-right:20px;">
              <Select v-model="registInfo.city" filterable @on-change="chosenCity" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
              <Col span="7">
              <Select v-model="registInfo.area" filterable @on-change="chosenArea" :label-in-value="true"
                      style="width:120%;">
                <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              </Col>
            </FormItem>
          </Row>


          <Row>
            <FormItem prop="street" label="" v-if="this.personVisiable">
              <Input v-model="registInfo.street" placeholder="填写乡、镇、街道、村、路、社区、楼层、号等"></Input>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="useComCode" label="使用单位统一社会信用代码" v-if="this.companyVisiable">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>应当与工商营业执照或者其他法人证书上的一致</p>
                </div>
                <Input v-model="registInfo.useComCode" class="ivu-input-special" ></Input>
              </Poptip>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="safeAdministrator" label="使用单位安全管理负责人" v-if="this.companyVisiable">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请填写负责该设备专职持证的或者兼职安全管理负责人姓名</p>
                </div>
                <Input v-model="registInfo.safeAdministrator"  class="ivu-input-special"></Input>
              </Poptip>
            </FormItem>
          </Row>
          <Row>
            <FormItem prop="name" label="个人姓名" v-if="this.personVisiable">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请填写负责该设备专职持证的或者兼职安全管理负责人姓名</p>
                </div>
                <Input v-model="registInfo.name"  class="ivu-input-special"></Input>
              </Poptip>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="verifyId" label="身份证号">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请填入安全管理负责人的公民身份证号码</p>
                </div>
                <Input v-model="registInfo.verifyId" class="ivu-input-special" ></Input>

              </Poptip>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="email" label="电子信箱">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请填入安全管理负责人的电子邮箱</p>
                </div>
                <Input v-model="registInfo.email" class="ivu-input-special" ></Input>
              </Poptip>
            </FormItem>
          </Row>

          <Row>
            <FormItem prop="mobilePhone" label="移动电话号码">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请填入安全管理负责人的移动电话号码</p>
                </div>
                <Input v-model="registInfo.mobilePhone"  class="ivu-input-special"></Input>
              </Poptip>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="邮政编码" prop="zipcode">
              <Poptip trigger="focus" placement="right">
                <div slot="content" style="white-space: normal;">
                  <p>请输入邮政编码</p>
                </div>
                <Input v-model="registInfo.zipcode"  class="ivu-input-special"></Input>

              </Poptip>
            </FormItem>
          </Row>

          <FormItem label="单位固定电话" prop="staticPhone" v-if="this.companyVisiable">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>请输入单位固定电话</p>
              </div>
              <Input v-model="registInfo.staticPhone"  class="ivu-input-special"></Input>

            </Poptip>
          </FormItem>
          <FormItem label="产权单位名称" prop="propertyComName" v-if="this.companyVisiable">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>请输入产权单位名称</p>
              </div>
              <Input v-model="registInfo.propertyComName"  class="ivu-input-special"></Input>
            </Poptip>
          </FormItem>
          <FormItem label="产权单位统一社会信用代码" prop="propertyComCode" v-if="this.companyVisiable">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>请输入产权单位统一社会信用代码</p>
              </div>
              <Input v-model="registInfo.propertyComCode"  class="ivu-input-special"></Input>

            </Poptip>
          </FormItem>
          <Button type="primary" @click="regist" long style="font-size:16px;font-weight:bold;">立即注册</Button>
          <!--<Button type="ghost" @click="handleReset('registInfo')" style="margin-left: 8px">Reset</Button>-->

        </Form>
      </div>
    </div>
  </div>
</template>
<script>


  import {mapGetters, mapState, mapActions} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as loginService from '../../services/login'
  import qs from 'qs'


  export default {
    data() {
      const verifyIdConfirm = (rule, val, callback) => {
        let city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
        if (!/^\d{17}(\d|x)$/i.test(val)) {
          callback(new Error('请输入正确身份证'));
        } else if(city[val.substr(0,2)] === undefined){
          callback(new Error('非法地区'));
        }else{
          callback();
        }
      };
      const telephoneConfirm = (rule, val, callback) => {
        if (!/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val)) {
          callback(new Error('请输入正确电话号'));
        }else{
          callback();
        }
      };
      const usernameConfirm = (rule, val, callback) => {
        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/.test(val)) {
          callback(new Error('请输入正确格式的用户名'));
        }else{
          callback();
        }
      };
      const passwordConfirm = (rule, val, callback) => {
        if (!/^(?=.*\d)(?=.*[a-zA-Z]).{5,}$/.test(val)) {
          callback(new Error('请输入正确格式的密码'));
        }else{
          callback();
        }
      };
      const password2Confirm = (rule, val, callback) => {
        if (val!=this.registInfo.password) {
          callback(new Error('两次密码输入不同'));
        }else{
          callback();
        }
      };
      return {
        choose: 'company',

//        registPerInfo:{
//          username:'',
//          password:'',
//          password2:'',
//          province:'',
//          city:'',
//          area:'',
//          street:'',
//          name:'',
//          verifyId:'',
//          email:'',
//          mobilePhone:'',
//          zipcode:'',
//
//        },
        registInfo: {
          username: '',
          //name: '',
          password: '',
          password2: '',
          useComName: '',
          province: '',
          city: '',
          area: '',
          street: '',
          useComCode: '',
          safeAdministrator: '',
          verifyId: '',
          email: '',
          mobilePhone: '',
          useComAddr: '',
          staticPhone: '',
          propertyComName: '',
          propertyComCode: '',
          zipcode: '',
        },
        province: '',
        provinceId: '',
        city: '',
        provinceList: [],
        cityList: [],
        cityId: '',
        area: '',
        areaList: [],
        areaId: '',

        verifyId: '',
        propertyComCode: '',

        rulesPre: {},
        companyVisiable: true,
        personVisiable: false,
        regexp:new RegExp("[bc]at","g"),


        rules: {
          username: [
           // {required: true, message: '不能为空', trigger: 'blur'}
            {validator:usernameConfirm,required: true,  trigger: 'blur'}
          ],
          password: [
            //{required: true, message: '不能为空', trigger: 'blur'}
            {validator:passwordConfirm,required: true,  trigger: 'blur'}
          ],
          password2: [
            //{required: true, message: '不能为空', trigger: 'blur'}
            {validator:password2Confirm,required: true,  trigger: 'blur'}
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
            {validator:verifyIdConfirm,required: true,  trigger: 'blur'}
          ],
          email: [
            {required: true, message: '不能为空', trigger: 'blur'},
            {type:"email",message: '请输入正确的邮箱', trigger: 'blur'}
          ],
          mobilePhone: [
            {validator:telephoneConfirm,required: true, trigger: 'blur'},
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
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          street: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],

        },
//        rulesPre:{
//          username: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          password: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          password2: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          street: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          name: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          verifyId: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          email: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          mobilePhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//        zipcode: [
//          {required: true, message: '不能为空', trigger: 'blur'}
//        ],
//
//        }

      }
    },


    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      },

      ...mapGetters([
        "headShow",


      ])
    },

    mounted() {
      this.author_key = localStorage.getItem('author_key');
      this.initData();

    },
//    activated() {
//      const _this = this;
//      _this.initData();
//    },


    components: {},
    methods: {
        checkIdenty(ID){
          if(typeof ID !== 'string') return '非法字符串';
          let city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
          let birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
          let d = new Date(birthday);
          let newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
          let currentTime = new Date().getTime();
          let time = d.getTime();
          let arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          let arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
          let sum = 0, i, residue;

          if(!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证';
          if(city[ID.substr(0,2)] === undefined) return "非法地区";
          if(time >= currentTime || birthday !== newBirthday) return '非法生日';
          for(i=0; i<17; i++) {
            sum += ID.substr(i, 1) * arrInt[i];
          }
          residue = arrCh[sum % 11];
          if (residue !== ID.substr(17, 1)) return '非法身份证哦';

          return city[ID.substr(0,2)]+","+birthday+","+(ID.substr(16,1)%2?" 男":"女")

        },
      initData(){
        this.personVisiable = false;
        this.companyVisiable = true;
        setAppService.getProvinces().then(res => {
          for (let i = 0, len = res.length; i < len; i++) {
            this.provinceList.push({value: res[i].code, label: res[i].name});
          }
        }).catch(error => {
          console.log(error);
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      chooseComOrPer(value){
        if (value == 'company') {
          this.companyVisiable = true;
          this.personVisiable = false;

        } else {
          this.companyVisiable = false;
          this.personVisiable = true;

        }

      },
      chosenPro(value){
        let params = 'provinceCode=' + value.value;
        this.province = value.label;
        this.provinceId = value.value;
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
        this.city = value.label;
        this.cityId = value.value;
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
        this.areaId = value.value;
        this.area = value.label;
        let params = 'code=' + value.value;
        console.log(this.province + this.city + this.area + this.street);

//        loginService.getAccpeter(params).then(res => {
//          this.acceptComList=[];
//          for (let i = 0, len = res.length; i < len; i++) {
//            this.acceptComList.push({value: res[i].districtCode, label: res[i].name});
//          }
//        }).catch(error => {
//          console.log(error);
//        })


      },
//      chosenAccept(value){
//        this.propertyComCode=value;
//        this.propertyComName=this.acceptCom;
//      },
      registPer(){
        this.$refs['registPerInfo'].validate((valid) => {
          if (valid) {
            if (this.registPerInfo.password !== this.registPerInfo.password2) {
              this.$Notice.error({
                title: '这是通知标题',
                desc: '两次密码填写不相同'
              });
              return
            }
            let addressDetail = '';
            if (this.area !== '') {
              addressDetail = this.province + this.city + this.area + this.registPerInfo.street;

            } else if (this.area == '') {
              addressDetail = this.province + this.city + this.registPerInfo.street;
            }
            let addressCode = '';
            if (this.areaId !== '') {
              addressCode = this.areaId;
            } else {
              addressCode = this.cityId;
            }

            let params = {};
            params.username = this.registPerInfo.username;
            params.password = this.registPerInfo.password;
            let temp = {
              "name": this.registPerInfo.name,
              // "address": '',
              "mobilePhone": this.registPerInfo.mobilePhone,
              "verifyId": this.registPerInfo.verifyId,
              "company": false,
              "zipcode": this.registPerInfo.zipcode,
              "email": this.registPerInfo.email,
              "useComAddr": addressDetail,
              "addressCode": addressCode,
            }
            params.userData = temp;


//        params=qs.stringify(params);
            loginService.Regist(params).then(res => {
              if (res.status === 200) {
                this.$Message.info('注册成功，请登录');
                this.$router.push('login');
              } else if (res.status === 500) {
                this.$Message.info(res.msg);
              }

            }).catch(error => {
              // console.log(2);
              console.log(error)
            })

          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });


      },
      regist(){
        this.$refs['registInfo'].validate((valid) => {
          if (valid) {
            if (this.registInfo.password !== this.registInfo.password2) {
              this.$Notice.error({
                title: '这是通知标题',
                desc: '两次密码填写不相同'
              });
              return
            }

            if (this.companyVisiable == true) {
              let addressDetail = '';
              if (this.area !== '') {
                addressDetail = this.province + this.city + this.area + this.registInfo.street;

              } else if (this.area == '') {
                addressDetail = this.province + this.city + this.registInfo.street;
              }
              let addressCode = '';
              if (this.areaId !== '') {
                addressCode = this.areaId;
              } else {
                addressCode = this.cityId;
              }
              let params = {};
              params.username = this.registInfo.username;
              params.password = this.registInfo.password;
              let temp = {
                "company": true,
                "mobilePhone": this.registInfo.mobilePhone,
                "verifyId": this.registInfo.verifyId,
                "useComName": this.registInfo.useComName,
                "useComCode": this.registInfo.useComCode,
                "zipcode": this.registInfo.zipcode,
                "propertyComName": this.registInfo.propertyComName,
                "propertyComCode": this.registInfo.propertyComCode,
                "email": this.registInfo.email,
                "useComAddr": addressDetail,
                "addressCode": addressCode,
                "safeAdministrator": this.registInfo.safeAdministrator,
                "staticPhone": this.registInfo.staticPhone,
              }

              params.userData = temp;

//        params=qs.stringify(params);
              loginService.Regist(params).then(res => {
                if (res.status === 200) {
                  this.$Message.info('注册成功，请登录');
                  this.$router.push('login');
                } else if (res.status === 500) {
                  this.$Message.info(res.msg);
                }

              }).catch(error => {
                // console.log(2);
                console.log(error)
              })

            } else if (this.personVisiable == true) {
              let addressDetail = '';
              if (this.area !== '') {
                addressDetail = this.province + this.city + this.area + this.registInfo.street;

              } else if (this.area == '') {
                addressDetail = this.province + this.city + this.registInfo.street;
              }
              let addressCode = '';
              if (this.areaId !== '') {
                addressCode = this.areaId;
              } else {
                addressCode = this.cityId;
              }

              let params = {};
              params.username = this.registInfo.username;
              params.password = this.registInfo.password;
              let temp = {
                "name": this.registInfo.name,
                // "address": '',
                "mobilePhone": this.registInfo.mobilePhone,
                "verifyId": this.registInfo.verifyId,
                "company": false,
                "zipcode": this.registInfo.zipcode,
                "email": this.registInfo.email,
                "useComAddr": addressDetail,
                "addressCode": addressCode,
              }
              params.userData = temp;


//        params=qs.stringify(params);
              loginService.Regist(params).then(res => {
                if (res.status === 200) {
                  this.$Message.info('注册成功，请登录');
                  this.$router.push('login');
                } else if (res.status === 500) {
                  this.$Message.info(res.msg);
                }

              }).catch(error => {
                // console.log(2);
                console.log(error)
              })

            }


          } else {
            console.log('error submit!!');
            this.$Message.info('尚有信息不符合要求，请检查');
            return false;
          }
        });


      }
    }
  }


</script>
<style lang="scss" scoped>
  .regist {
    width: 60%;
    margin: 0 auto;
    padding-bottom: 10px;
    height: auto;
    border: 2px solid #dddee1;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .head {
    height: 60px;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
    font-weight: bold;
    font: #464c5b;
    font-size: 30px;
    margin: 10px;
  }

  .body {
    width: 50%;
    margin: 0 auto;
  }

  .label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 16px;

    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
  }
  .ivu-input-special{
    width:300px !important;
  }



</style>
