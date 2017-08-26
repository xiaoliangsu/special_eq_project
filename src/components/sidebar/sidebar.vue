<template>
  <!--表头不能显示用户名-->
  <div class=" manage_page fillcontain sidebar">

    <!--<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>-->
    <!--<el-menu-item index="home"><i class="el-icon-menu"></i>首页</el-menu-item>-->
    <!--<el-submenu index="2">-->
    <!--<template slot="title"><i class="el-icon-document"></i>首次申请</template>-->
    <!--<el-menu-item index="firstApp">按台(套)申请</el-menu-item>-->
    <!--<el-menu-item index="test">按单位申请</el-menu-item>-->
    <!--<el-menu-item index="home">已完成申请</el-menu-item>-->
    <!--<el-menu-item index="home">被驳回申请</el-menu-item>-->
    <!--&lt;!&ndash;<el-menu-item index="home">注销申请</el-menu-item>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-menu-item index="home">申请反馈</el-menu-item>&ndash;&gt;-->
    <!--</el-submenu>-->
    <!--<el-submenu index="3">-->
    <!--<template slot="title"><i class="el-icon-plus"></i>审批</template>-->
    <!--<el-menu-item index="login">待审批申请</el-menu-item>-->
    <!--<el-menu-item index="header">已审批申请</el-menu-item>-->

    <!--</el-submenu>-->
    <!--<el-submenu index="4">-->
    <!--<template slot="title"><i class="el-icon-star-on"></i>监管</template>-->
    <!--<el-menu-item index="footer">已通过申请</el-menu-item>-->
    <!--<el-menu-item index="login">已驳回申请</el-menu-item>-->

    <!--</el-submenu>-->
    <!--<el-submenu index="5">-->
    <!--<template slot="title"><i class="el-icon-star-on"></i>超级管理员</template>-->
    <!--<el-menu-item index="footer">审批用户管理</el-menu-item>-->
    <!--<el-menu-item index="login">申请用户管理</el-menu-item>-->

    <!--</el-submenu>-->

    <!--</el-menu>-->
    <Row>
      <Col span="8">
      <Menu theme="dark" class="sideMenu" style="width:180px;min-height:100%" :open-names="['1']" accordion
            @on-select="routeTo">
        <!--<Submenu name="1">-->
        <!--<template slot="title">-->
        <!--<Icon type="ios-paper"></Icon>-->
        <!--申请设备-->
        <!--</template>-->
        <Menu-group title="申请单位" v-if="this.author_key==1">
        <Menu-item name="firstApp">首次申请</Menu-item>
          <Menu-item name="unSubmitOrder">未提交订单</Menu-item>
        <Menu-item name="orderList">全部已提交订单</Menu-item>
        <Menu-item name="devList">已有设备列表</Menu-item>
        </Menu-group>

        <Menu-group title="受理机关" v-if="this.author_key==2">
          <Menu-item name="waitAccept">未受理订单</Menu-item>
          <Menu-item name="accepted">已受理订单</Menu-item>
        </Menu-group>

        <Menu-group title="审批机关" v-if="this.author_key==3">
          <Menu-item name="waitApproval">未审批订单</Menu-item>
          <Menu-item name="approvaled">已审批订单</Menu-item>
        </Menu-group>

        <Menu-group title="监管机关" v-if="this.author_key==4">
          <Menu-item name="supervision">已完成订单</Menu-item>
        </Menu-group>
        <!--<Submenu name="2">-->
          <!--<template slot="title">-->
            <!--<Icon type="ios-people"></Icon>-->
            <!--订单状态-->
          <!--</template>-->
          <!--<Menu-item name="orderList">全部订单</Menu-item>-->
          <!--<Menu-item name="2-2">已受理订单</Menu-item>-->
          <!--<Menu-item name="2-2">已审批订单</Menu-item>-->
          <!--<Menu-item name="2-2">已完成订单</Menu-item>-->
        <!--</Submenu>-->
        <!--<Submenu name="3">-->
          <!--<template slot="title">-->
            <!--<Icon type="stats-bars"></Icon>-->
            <!--已有设备列表-->
          <!--</template>-->
          <!--<Menu-group title="使用">-->
            <!--<Menu-item name="devList">已有设备列表</Menu-item>-->
            <!--<Menu-item name="3-2">活跃分析</Menu-item>-->
            <!--<Menu-item name="3-3">时段分析</Menu-item>-->
          <!--</Menu-group>-->
          <!--<Menu-group title="留存">-->
            <!--<Menu-item name="3-4">用户留存</Menu-item>-->
            <!--<Menu-item name="3-5">流失用户</Menu-item>-->
          <!--</Menu-group>-->
        <!--</Submenu>-->

      </Menu>
      </Col>
    </Row>

  </div>
</template>

<script>
  import footer from "../footer/footer.vue"
  import {mapGetters, mapState, mapActions} from 'vuex'
  export default {
    data() {
      return {
        author_key: ''
      }
    },
    computed: {
      defaultActive: function () {
        return this.$route.path.replace('/', '');
      }
    },
    components: {
      'v-footer': footer
    },
    mounted() {
      this.author_key = localStorage.getItem('author_key');

    },
    methods: {
      routeTo(e) {
        //console.log(e);
        this.$router.push(e);
      },
      ...mapActions([
        'getUserInfo'
      ]),


    }
  }
</script>


<style lang="less" scoped>
  .fillcontain {
    /*height: 100%;*/
    /*width: 100%;*/
    /*overflow:auto;*/
    display: block;
    position: absolute;
    width: 180px;
    left: 0;
    top: 66px;
    bottom: 0;
    background: rgb(72, 79, 95);
  }

  .fillcontain .sideMenu {
    width: 200px;
  }

  .sidebar > ul {
    height: 100%;
  }

  .el-menu-item, .el-submenu__title {
    font-size: 14px;

  }

</style>
