<template>
  <div class="user">
    <header class="admin_title">基本信息</header>
    <!--<span>{{userName}}</span>-->
    <div class="admin_set">
      <ul>
        <li>
          <span>用户名：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>受理机关：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>本人姓名：</span><span>{{userInfo}}</span>
        </li>
        <li>
          <span>权限：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>使用单位名称：</span><span>{{userInfo.username}}</span>
        </li>
        <li>
          <span>使用单位地址：</span><span>{{userInfo.username}}</span>
        </li>
      </ul>
    </div>
    <Button type="primary" @click="sighOut" >退出{{loginStatus}}</Button>


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
        ['setSignOut', 'getUserInfo'],
      ),
      sighOut() {
        this.setSignOut();
        this.$router.push('login');


      },
      initData(){
        this.userName = localStorage.getItem('userInfo');
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
      padding: 20px;
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
