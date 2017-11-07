<template>
  <div class="container">
    <h2 class="head">添加登记机关用户</h2>
    <Form ref="ruleForm" :rules="formRules" label-position="right" :label-width="120" :model="ruleForm">
      <FormItem label="用户名" prop="username">
        <Input v-model="ruleForm.username" placeholder="请输入" style="width: 200px;"></Input>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="ruleForm.password" placeholder="请输入" style="width: 200px;"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="confirmPassword">
        <Input v-model="ruleForm.confirmPassword" placeholder="请输入" style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="useComName" label="登记机关名称" >

        <Row>
          <Col span="6" style="padding-right:10px;" >
          <Select v-model="province" filterable @on-change="chosenPro" >
            <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
          <Col span="6" style="padding-right:10px;">
          <Select v-model="city" filterable @on-change="chosenCity" style="margin-bottom:25px;">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>

          <Col span="6">
          <Select v-model="area" filterable @on-change="chosenArea" style="margin-bottom:25px;">
            <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>

        </Row>


        <Row>
          <Select v-model="acceptCom" filterable @on-change="chosenAccept" :label-in-value="true">
            <Option v-for="item in acceptComList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Row>
      </FormItem>
      <FormItem label="权限">
        <Select v-model="ruleForm.role" style="width:26%;">
          <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}
          </Option>
        </Select>
      </FormItem>

      <FormItem label="">
        <Button type="primary"@click="submit">添加</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import * as setAppService from '../../services/setApp'
  import * as loginService from '../../services/login'

  export default {
    data () {
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          acceptorAgencyName:'',
          password:'',
          confirmPassword:'',
          role:'',
          acceptCom: '',
          province: '',
          city: '',
          area: '',
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
        acceptCom: '',

        acceptComList:[],

        roleList: [
          {
            value: '1',
            label: '使用单位'
          },
          {
            value: '2',
            label: '受理机关'
          },
          {
            value: '3',
            label: '审批机关'
          },
          {
            value: '4',
            label: '监管机关'
          },

        ],
        formRules:{
          username: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码不能少于6位数', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validatePassCheck, trigger: 'blur' }
          ],
        }
      }
    },
    mounted() {
      this.initData();

    },
    methods:{
      submit(){
        this.$router.go(-1)
      },
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
        let params = 'addressCode=' + value;

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
        this.propertyComCode=value.value;

        this.propertyComName=this.acceptCom.label;
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container{
    padding:15px;
  }
  .head{
    margin-bottom:10px;
  }
</style>
