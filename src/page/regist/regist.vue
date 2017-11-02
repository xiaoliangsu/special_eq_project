<template>
  <div class="regist">
    <div class="head">使用单位注册使用账号</div>
    <div class="body">
      <Form :model="registInfo" ref="registInfo" :rules="rules" :label-width="120">

        <Row>

          <FormItem prop="username" label="用户名">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>登录账号，至少5个字符，要求大小写字母和数字</p>
              </div>
              <Input v-model="registInfo.username" placeholder="用户名"></Input>
            </Poptip>

          </FormItem>

        </Row>
        <!--<label class="label">本人姓名：</label>-->

        <!--<label class="label">密码：</label>-->
        <Row>

          <FormItem prop="password" label="密码">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>登录密码，至少5个字符，要求大小写字母和数字</p>
              </div>
              <Input type="password" v-model="registInfo.password" placeholder="密码"></Input>
            </Poptip>

          </FormItem>

        </Row>
        <!--<label class="label" style="fint-size:16px;">确认密码:</label>-->
        <Row>

          <FormItem prop="password2" label="确认密码">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>确认两次密码填写相等</p>
              </div>
              <Input type="password" v-model="registInfo.password2" placeholder="确认密码"></Input>
            </Poptip>

          </FormItem>

        </Row>


        <h2>基本信息</h2></br>
        <Row>
          <FormItem prop="useComName" label="使用单位名称" >
            <Input v-model="registInfo.useComName" placeholder="应当与工商营业执照或者其他法人证书的名称完全一致"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="address" label="选择所在城市"  style="margin-bottom:10px;">
            <Col span="6" style="padding-right:10px;" >
            <Select  v-model="registInfo.province" filterable @on-change="chosenPro">
              <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="6" style="padding-right:10px;">
            <Select v-model="registInfo.city" filterable @on-change="chosenCity">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
            <Col span="6">
            <Select v-model="registInfo.area" filterable @on-change="chosenArea">
              <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </FormItem>
        </Row>


        <Row>
          <FormItem prop="street" label="" >
            <Input v-model="registInfo.street" placeholder="填写乡、镇、街道、村、路、社区、楼层、号等"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="useComCode" label="使用单位统一社会信用代码">
            <Input v-model="registInfo.useComCode" placeholder="应当与工商营业执照或者其他法人证书上的一致"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="securityAdministrator" label="安全管理员">
            <Input v-model="registInfo.securityAdministrator" placeholder="请填写负责该设备专职持证的或者兼职安全管理员姓名"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="verifyId" label="身份证号">
            <Input v-model="registInfo.verifyId" placeholder="请填入安全管理员的公民身份证号码"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="email" label="电子信箱">
            <Input v-model="registInfo.email" placeholder="请填入安全管理员的电子邮箱"></Input>
          </FormItem>
        </Row>

        <Row>
          <FormItem prop="comMobilePhone" label="移动电话号码">
            <Input v-model="registInfo.comMobilePhone" placeholder="请填入安全管理员的移动电话号码"></Input>
          </FormItem>
        </Row>
        <Row>
        <FormItem label="邮政编码" prop="zipCode">
          <Input v-model="registInfo.zipCode" placeholder="请输入"></Input>
        </FormItem>
        </Row>

        <FormItem label="单位固定电话" prop="comPhone">
          <Input v-model="registInfo.comPhone" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="产权单位名称" prop="propertyComName">
          <Input v-model="registInfo.propertyComName" placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="产权单位统一社会信用代码" prop="propertyComCode">
          <Input v-model="registInfo.propertyComCode" placeholder="请输入"></Input>
        </FormItem>


        <Button type="primary" @click="regist" long style="font-size:16px;font-weight:bold;">立即注册</Button>


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
      return {
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
          securityAdministrator: '',
          verifyId: '',
          email: '',
          comMobilePhone: '',
          address: '',
          zipCode:'',
          comPhone:'',
          propertyComName:'',
          propertyComCode:'',
        },
        password2: '',
        province: '',
        provinceId:'',
        city: '',
        provinceList: [],
        cityList: [],
        cityId:'',
        area: '',
        areaList: [],
        areaId:'',
        acceptCom: '',
        acceptComList: [],
        verifyId: '',
        propertyComCode:'',

//        rules: {
//          username: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          password: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          password2: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          useComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          street: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          useComCode: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          securityAdministrator: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          verifyId: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          email: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          comMobilePhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          address: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          zipCode: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          comPhone: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComName: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//          propertyComCode: [
//            {required: true, message: '不能为空', trigger: 'blur'}
//          ],
//
//        },

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
      initData(){
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

        this.provinceId=value;
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
        let params2='code=' + value;
        this.cityId=value;
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
        this.areaId=value;
        let params = 'code=' + value;

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
            let params = {};
            params.username = this.registInfo.username;
            params.password = this.registInfo.password;
            let temp = {
              "name": this.registInfo.name,
              // "address": '',
              "comMobilePhone": this.registInfo.comMobilePhone,
              "verifyId": this.registInfo.verifyId,

              "isCompany": this.registInfo.isCompany,

              "useComAddr": this.registInfo.useComAddr,

              "useComName": this.registInfo.useComName,
              "useComCode": this.registInfo.useComCode,
              "zipcode": this.registInfo.zipcode,
              "propertyComName": this.registInfo.propertyComName,
              "propertyComCode": this.registInfo.propertyComCode,
            }
            params.userData = temp;



//        params=qs.stringify(params);
            loginService.Regist(params).then(res => {
              if(res.status===200){
                this.$Message.info('注册成功，请登录');
                this.$router.push('login');
              }else if(res.status===500){
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


      }
    }
  }


</script>
<style lang="scss" scoped>
  .regist{
    width:60%;
    margin:0 auto;
    padding-bottom:10px;
    height:auto;
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
    margin:10px;
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


</style>
