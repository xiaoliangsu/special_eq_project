<template>
  <div class="AcceptRegist">
    <div class="head">登记机关注册使用账号</div>
    <div class="body">
     <!-- <RadioGroup v-model="choose" @on-change="chooseRole" style="margin-left:100px;margin-bottom:10px;">
        <Radio label="acceptor">受理人</Radio>
        <Radio label="approver">审批人</Radio>

      </RadioGroup>-->
      <Form :model="registInfo" :label-width="120" :rules="rules" ref="registInfo">
        <Row>

          <FormItem prop="username" label="用户名">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
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
              <Input type="password" v-model="registInfo.password" placeholder="密码" class="ivu-input-special"></Input>
            </Poptip>

          </FormItem>

        </Row>
        <Row>

          <FormItem prop="password2" label="确认密码">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>确认两次密码填写相等</p>
              </div>
              <Input type="password" v-model="registInfo.password2" placeholder="确认密码" class="ivu-input-special"></Input>
            </Poptip>

          </FormItem>

        </Row>




          <Row>
            <FormItem prop="useComAddr" label="登记机关名称"  style="margin-bottom:10px;"
                      class="ivu-form-item-required ivu-form-item-label">
            <Col span="7" style="margin-right:20px;">
            <Select v-model="province" filterable @on-change="chosenPro"
                    style="width:120%;">
              <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="7" style="margin-right:20px;">
            <Select v-model="city" filterable @on-change="chosenCity" style="width:120%;">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>

            <Col span="7">
            <Select v-model="area" filterable @on-change="chosenArea" style="width:120%;">
              <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            </FormItem>

          </Row>

        <FormItem prop="acceptCom" label="">
          <Row>
            <Select v-model="registInfo.acceptCom" filterable @on-change="chosenAccept" :label-in-value="true">
              <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Row>
        </FormItem>

        <RadioGroup v-model="choose" @on-change="chooseRole" style="margin-left:100px;margin-bottom:10px;">
          <Radio label="acceptor">受理人</Radio>
          <Radio label="approver">审批人</Radio>

        </RadioGroup>
        <Row>
          <FormItem prop="name" label="登记人员" v-if="this.approverVisiable">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>填写负责登记工作的人员姓名</p>
              </div>
              <Input v-model="registInfo.name"class="ivu-input-special" ></Input>
            </Poptip>


          </FormItem>
        </Row>


        <Row>
          <FormItem prop="verifyId" label="身份证号" v-if="this.approverVisiable">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>请填入登记人员的公民身份证号码</p>
              </div>
              <Input v-model="registInfo.verifyId" class="ivu-input-special"></Input>
            </Poptip>

          </FormItem>
        </Row>


        <FormItem prop="mobilePhone" label="移动电话号码" v-if="this.approverVisiable">
          <Row>
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;">
                <p>请填入登记人员的移动电话号码</p>
              </div>
              <Input v-model="registInfo.mobilePhone" class="ivu-input-special"></Input>

            </Poptip>
          </Row>
        </FormItem>


        <Row>

          <Button type="primary" @click="regist()" long style="font-size:16px;font-weight:bold;">立即注册</Button>


        </Row>

      </Form>
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
        choose: "acceptor",
        role: 'acceptor',
        registInfo: {
          username: '',
          province: '',
          city: '',
          area: '',
          acceptCom: '',
          name: '',
          verifyId: '',
          password: '',
          password2: '',
          useComName: '',
          mobilePhone: '',
        },
        acceptComList: [],
        acceptorVisiable: true,
        approverVisiable: false,


        province: '',
        provinceId: '',
        city: '',
        provinceList: [],
        cityList: [],
        cityId: '',
        area: '',
        areaList: [],
        areaId: '',
        acceptCom: '',
        verifyId: '',


        rules: {
          useComName: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
//          acceptCom: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          verifyId: [
            {validator:verifyIdConfirm,required: true, trigger: 'blur'}
          ],
          mobilePhone: [
            {validator:telephoneConfirm,required: true,  trigger: 'blur'}
          ],
          password: [
//            {required: true, message: '不能为空', trigger: 'blur'}
            {validator:passwordConfirm,required: true,  trigger: 'blur'}
          ],
          password2: [
//            {required: true, message: '不能为空', trigger: 'blur'}
            {validator:password2Confirm,required: true,  trigger: 'blur'}
          ],
          username: [
//            {required: true, message: '不能为空', trigger: 'blur'}
            {validator:usernameConfirm,required: true,  trigger: 'blur'}
          ],

        },


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
      chooseRole(value){
        console.log(value)
        if (value == 'acceptor') {
          this.role = 'acceptor        ';
          this.acceptorVisiable=true;
          this.approverVisiable=false;
        } else {
          this.role = 'approver        ';
          this.acceptorVisiable=false;
          this.approverVisiable=true;

        }

      },
      initData(){
        this.acceptorVisiable=true;
        this.approverVisiable=false;
        setAppService.getProvinces().then(res => {
          for (let i = 0, len = res.length; i < len; i++) {
            this.provinceList.push({value: res[i].code, label: res[i].name});
          }
          console.log(this.provinceList);
        }).catch(error => {
          console.log(error);
        })
      },
      chosenPro(value){
        let params = 'provinceCode=' + value;

        this.provinceId = value;
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
        let params = 'cityCode=' + value;
        let params2 = 'code=' + value;
        this.cityId = value;
        if (value !== "") {
          setAppService.getArea(params).then(res => {
            this.areaList = [];
            for (let i = 0, len = res.length; i < len; i++) {
              this.areaList.push({value: res[i].code, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })

          loginService.getAccpeter(params2).then(res => {
            for (let i = 0, len = res.length; i < len; i++) {
              this.acceptComList.push({value: res[i].id, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })
        }
      },
      chosenArea(value){
        this.areaId = value;
        let params = 'addressCode=' + value;

        loginService.getAccpeter(params).then(res => {
          this.acceptComList = [];
          for (let i = 0, len = res.length; i < len; i++) {
            this.acceptComList.push({value: res[i].id, label: res[i].name});
          }
        }).catch(error => {
          console.log(error);
        })


      },
      chosenAccept(value){
        console.log(value);
        this.propertyComCode = value.value;

        this.propertyComName =value.label;
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
            if(this.registInfo.acceptCom==''){
              this.$Notice.error({
                title: '这是通知标题',
                desc: '请选择登记机关'
              });
              return
            }
            let params = {};
            params.username = this.registInfo.username;
            params.password = this.registInfo.password;
            let temp = {
              "name": this.registInfo.name,
              "acceptorAgencyId": parseInt(this.propertyComCode),
              "acceptorAgencyName": this.propertyComName,
              "verifyId": this.registInfo.verifyId,
              "mobilePhone": this.registInfo.mobilePhone,
            }
            params.userData = temp;
            console.log(this.role);

//        params=qs.stringify(params);
            if (this.role == 'acceptor') {
              params.userData.role = 2;

              loginService.RegistAcceptor(params).then(res => {
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
              params.userData.role = 3;
              loginService.RegistApprover(params).then(res => {
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
  .AcceptRegist {
    width: 60%;
    margin: 0 auto;
    margin-top: 50px;
    padding-bottom: 10px;
    height: 80%;
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
  }

  .body {
    width: 50%;
    margin: 0 auto;
    padding: 20px 20px 20px 20px;
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
