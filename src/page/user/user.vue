<template>
  <div class="user">
    <header class="admin_title">基本信息</header>
    <!--<span>{{userName}}</span>-->
    <!--申请用户-->
    <div class="admin_set" v-if="this.author_key=='1'">
      <ul>
        <li>
          <span>用户名：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="userName" ></Input>
          </div>
        </li>
        <li>
          <span>登陆密码：</span>
          <Button>修改密码</Button>
        </li>
        <li>
          <span>受理机关：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>本人姓名：</span><span>{{ruleForm.name}}</span>
        </li>
        <li>
          <span>身份证号：</span><span>{{ruleForm.verifyId}}</span>
        </li>
        <!--<li>-->
          <!--<span>权限：</span><span>{{userInfo.username}}</span>-->
        <!--</li>-->
        <li>
          <span>使用单位名称：</span><span>{{ruleForm.useComName}}</span>
        </li>
        <li>
          <span>使用单位地址：</span><span>{{ruleForm.useComAddr}}</span>
        </li>
        <li>
          <span>使用单位统一社会信用代码：</span><span>{{ruleForm.useComCode}}</span>
        </li>
        <li>
          <span>邮政编码：</span><span>{{ruleForm.zipCode}}</span>
        </li>
        <li>
          <span>单位固定电话：</span><span>{{ruleForm.comPhone}}</span>
        </li>
        <li>
          <span>移动电话：</span><span>{{ruleForm.comMobilePhone}}</span>
        </li>
        <li>
          <span>产权单位名称：</span><span>{{ruleForm.propertyComName}}</span>
        </li>
        <li>
          <span>产权单位统一社会信用代码：</span><span>{{ruleForm.propertyComCode}}</span>
        </li>
      </ul>
    </div>
    <!--受理审批-->
    <div class="admin_set" v-if="this.author_key=='2'||'3'">
      <ul>
        <li>
          <span>用户名2：</span>
          <div style="display:inline-block;width:300px;">
            <Input v-model="userName" ></Input>
          </div>
        </li>
        <li>
          <span>登陆密码：</span>
          <Button>修改密码</Button>
        </li>
        <li>
          <span>受理机关：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>本人姓名：</span><span>{{ruleForm.name}}</span>
        </li>
        <li>
          <span>身份证号：</span><span>{{ruleForm.verifyId}}</span>
        </li>
        <!--<li>-->
        <!--<span>权限：</span><span>{{userInfo.username}}</span>-->
        <!--</li>-->
        <li>
          <span>使用单位名称：</span><span>{{ruleForm.useComName}}</span>
        </li>
        <li>
          <span>使用单位地址：</span><span>{{ruleForm.useComAddr}}</span>
        </li>
        <li>
          <span>使用单位统一社会信用代码：</span><span>{{ruleForm.useComCode}}</span>
        </li>
        <li>
          <span>邮政编码：</span><span>{{ruleForm.zipCode}}</span>
        </li>
        <li>
          <span>单位固定电话：</span><span>{{ruleForm.comPhone}}</span>
        </li>
        <li>
          <span>移动电话：</span><span>{{ruleForm.comMobilePhone}}</span>
        </li>
        <li>
          <span>产权单位名称：</span><span>{{ruleForm.propertyComName}}</span>
        </li>
        <li>
          <span>产权单位统一社会信用代码：</span><span>{{ruleForm.propertyComCode}}</span>
        </li>
      </ul>
    </div>


  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: '',
          option: ''
        },
        userName: '',
        ruleForm:{
          useComName:'',
          useComAddr:'',
          useComCode:'',
          zipCode:'',
          comPhone:'',
          mobilePhone:'',
          propertyComName:'',
          propertyComCode:'',
          name:'',
          verifyId:'',

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
//      sighOut() {
//        this.setSignOut();
////        this.clearUserData();
//        localStorage.removeItem('useComName');
//        localStorage.removeItem('useComAddr');
//        localStorage.removeItem('useComCode');
//        localStorage.removeItem('zipCode');
//        localStorage.removeItem('comPhone');
//        localStorage.removeItem('mobilePhone');
//        localStorage.removeItem('propertyComName');
//        localStorage.removeItem('propertyComCode');
//        this.$router.push('login');
//      },
      initData(){
        this.userName = localStorage.getItem('userInfo');
        this.setUserDetailData();
        this.author_key = localStorage.getItem('author_key');
      },
      setUserDetailData(){
        this.ruleForm.useComName = localStorage.getItem('useComName');
        this.ruleForm.useComAddr = localStorage.getItem('useComAddr');
        this.ruleForm.zipCode = localStorage.getItem('zipCode');
        this.ruleForm.comPhone = localStorage.getItem('comPhone');
        this.ruleForm.mobilePhone = localStorage.getItem('mobilePhone');
        this.ruleForm.propertyComName = localStorage.getItem('propertyComName');
        this.ruleForm.propertyComCode = localStorage.getItem('propertyComCode');

        if(localStorage.getItem('company')=='true'){
          this.ruleForm.safeAdmin = localStorage.getItem('safeAdministrator');
          this.ruleForm.useComCode = localStorage.getItem('useComCode');
        }else {
          this.ruleForm.safeAdmin = localStorage.getItem('name');
          this.ruleForm.useComCode = localStorage.getItem('verifyId');

        }

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
