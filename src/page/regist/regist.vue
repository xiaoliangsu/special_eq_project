<template>
  <div class="regist">
    <div class="head">注册使用账号</div>
    <div class="body">
      <Form :model="registInfo" :label-width="120">
        <div style="margin-left:180px;">
          <FormItem prop="username" label="用户名">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>登录账号，至少5个字符，要求大小写字母和数字</p>
              </div>
              <Input v-model="registInfo.username" placeholder="用户名"></Input>
            </Poptip>

          </FormItem>
          <!--<label class="label">本人姓名：</label>-->

          <!--<label class="label">密码：</label>-->
          <FormItem prop="password" label="密码">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>登录密码，至少5个字符，要求大小写字母和数字</p>
              </div>
              <Input type="password" v-model="registInfo.password" placeholder="密码"></Input>
            </Poptip>

          </FormItem>
          <!--<label class="label" style="fint-size:16px;">确认密码:</label>-->
          <FormItem prop="password2" label="确认密码">
            <Poptip trigger="focus" placement="right">
              <div slot="content" style="white-space: normal;font-size:2px;">
                <p>确认两次密码填写相等</p>
              </div>
              <Input type="password" v-model="password2" placeholder="确认密码"></Input>
            </Poptip>

          </FormItem>

        </div>

        <h2>基本信息</h2>
        <label class="label" style="margin-bottom:10px;padding-left:10px;">选择所在城市：</label>
        <Row>
          <Col span="6" style="padding-right:10px;">
          <Select v-model="province" filterable @on-change="chosenPro">
            <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="6" style="padding-right:10px;">
          <Select v-model="city" filterable @on-change="chosenCity">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="6">
          <Select v-model="area" filterable @on-change="chosenArea">
            <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>

        <FormItem label="选择受理机关">
          <Select v-model="acceptCom" filterable @on-change="chosenAccept">
            <Option v-for="item in acceptComList" :value="item.label" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <Row>
          <Col span="11">
          <FormItem prop="name" label="本人姓名">
            <Input v-model="registInfo.name" placeholder="本人姓名"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem prop="name" label="身份证号">
            <Input v-model="registInfo.verifyId" placeholder="本人姓名"></Input>
          </FormItem>

          </Col>
        </Row>

        <Row>
          <Col span="11">
          <FormItem label="使用单位名称">
            <Input v-model="registInfo.useComName" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem label="使用单位地址">
            <Input v-model="registInfo.useComAddr" placeholder="请输入"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="使用单位统一社会信用代码">
            <Input v-model="registInfo.useComCode" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem label="邮政编码">
            <Input v-model="registInfo.zipCode" placeholder="请输入"></Input>
          </FormItem>

          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="单位固定电话">
            <Input v-model="registInfo.comPhone" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem label="移动电话">
            <Input v-model="registInfo.comMobilePhone" placeholder="请输入"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
          <FormItem label="产权单位名称">
            <Input v-model="registInfo.propertyComName" placeholder="请输入"></Input>
          </FormItem>
          </Col>
          <Col span="11" offset="2">
          <FormItem label="产权单位统一社会信用代码">
            <Input v-model="registInfo.propertyComCode" placeholder="请输入"></Input>
          </FormItem>
          </Col>
        </Row>

        <Button type="primary" @click="regist()" long style="font-size:16px;font-weight:bold;">立即注册</Button>


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
          name: '',
          password: '',
          address: '',
          useComName: '',
          useComAddr: '',
          useComCode: '',
          zipCode: '',
          comPhone: '',
          comMobilePhone: '',
          propertyComName: '',
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

          loginService.getAccpeter(params2).then(res => {
            for (let i = 0, len = res.length; i < len; i++) {
              this.acceptComList.push({value: res[i].districtCode, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })
        }
      },
      chosenArea(value){
        this.areaId=value;
        let params = 'code=' + value;

          loginService.getAccpeter(params).then(res => {
              this.acceptComList=[];
            for (let i = 0, len = res.length; i < len; i++) {
              this.acceptComList.push({value: res[i].districtCode, label: res[i].name});
            }
          }).catch(error => {
            console.log(error);
          })


      },
      chosenAccept(value){
        this.propertyComCode=value;
        this.propertyComName=this.acceptCom;
      },
      regist(){
        if (this.registInfo.password !== this.password2) {
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
          "approveAgency": this.propertyComName,
          "approveAgencyId": this.propertyComCode,
          "registInfo": this.registInfo.registInfo,
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
      }
    }
  }


</script>
<style lang="scss" scoped>
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
    font-size: 20px;
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
