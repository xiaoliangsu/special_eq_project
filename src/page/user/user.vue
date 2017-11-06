<template>
  <div class="user">
    <header class="admin_title">基本信息</header>
    <!--<span>{{userName}}</span>-->
    <!--申请用户-->
    <div class="admin_set" v-if="this.author_key==1">
      <ul>
        <li>
          <span>用户名：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.userName" ></Input>
          </div>
        </li>
        <li>
          <span>登陆密码：</span>
          <div style="display:inline-block;width:300px;" v-if="this.codeBox">
            <Input v-model="ruleForm.useComAddr" ></Input>
          </div>
          <Button  @click="saveCode()" v-if="this.codeBox">保存密码</Button>

          <Button  @click="changeCode()" v-if="!this.codeBox">修改密码</Button>
        </li>
        <li>
          <span>安全管理员：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.safeAdministrator" ></Input>
          </div>

        </li>
        <li v-if="this.role==='0'">
          <!--<span >身份证号：</span><span>{{ruleForm.verifyId}}</span>-->
          <span>身份证号：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.useComCode" ></Input>
          </div>
        </li>
        <!--<li>-->
          <!--<span>权限：</span><span>{{userInfo.username}}</span>-->
        <!--</li>-->
        <li v-if="this.role==='1'">
          <span>使用单位名称：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.useComName" ></Input>
          </div>
        </li>
        <li >
          <span v-if="this.role==='0'">个人地址：</span>
          <div style="display:inline-block;width:300px;" v-if="this.role==='0'">
            <Input v-model="ruleForm.useComAddr" ></Input>
          </div>
          <span v-if="this.role==='1'">使用单位地址：</span>
          <div style="display:inline-block;width:300px;" v-if="this.role==='1'">
            <Input v-model="ruleForm.useComAddr" ></Input>
          </div>

        </li>
        <li v-if="this.role==='1'">

          <span>使用单位统一社会信用代码：</span>
          <div style="display:inline-block;width:300px;" v-if="this.role==='1'">
            <Input v-model="ruleForm.useComCode" ></Input>
          </div>

        </li>
        <li>
          <span>邮政编码：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.zipcode" ></Input>
          </div>
        </li>
        <li>
          <span>电子信箱：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.email" ></Input>
          </div>
        </li>
        <li v-if="this.role==='1'">
          <span>单位固定电话：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.staticPhone" ></Input>
          </div>
        </li>
        <li>
          <span>移动电话：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.mobilePhone" ></Input>
          </div>
        </li>
        <li v-if="this.role==='1'">
          <span>产权单位名称：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.propertyComName" ></Input>
          </div>
        </li>
        <li v-if="this.role==='1'">
          <span>产权单位统一社会信用代码：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.propertyComCode" ></Input>
          </div>
        </li>
      </ul>
    </div>
    <!--受理审批-->
    <div class="admin_set" v-if="this.author_key==2||this.author_key==3">
      <ul>
        <li>
          <span>用户名：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.userName" ></Input>
          </div>
        </li>
        <li>
          <span>登陆密码：</span>
          <Button>修改密码</Button>
        </li>
        <li>
          <span>登记机关名称：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.approveAgencyId" ></Input>
          </div>
        </li>
        <li>
          <span>登记人员：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.name" ></Input>
          </div>
        </li>
        <li>
          <span>身份证号：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.verifyId" ></Input>
          </div>
        </li>

        <li>
          <span>移动电话号码：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="ruleForm.mobilePhone" ></Input>
          </div>
        </li>

      </ul>
    </div>
    <Button type="primary" @click="saveRuleForm()" style="font-size:16px;font-weight:bold;margin-left:600px;">保存</Button>


  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
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
        codeBox:false,
        userName: '',
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
          approveAgencyId:'',
        }
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
        ['setSignOut', 'getUserInfo','clearUserData'],
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
              this.ruleForm.useComCode = localStorage.getItem('verifyId');
              console.log( this.ruleForm.useComCode )
              //个人
              this.role='0';

            }

          }
        if(this.author_key==2||this.author_key==3){
          this.ruleForm.approveAgencyId = localStorage.getItem('approveAgencyId');
          this.ruleForm.name = localStorage.getItem('name');
          this.ruleForm.verifyId = localStorage.getItem('verifyId');
          this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        }



      },
      saveRuleForm(){
          console.log(1);
      },
      changeCode(){
          this.codeBox=true;
      },
      saveCode(){
        this.codeBox=false;
      }

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
