<template>
  <!--表头不能显示用户名-->
  <div class=" manage_page fillcontain sidebar">
    <Row>
      <Col span="8">
      <Menu theme="dark" class="sideMenu" style="width:240px;min-height:100%;font-size:16px" :open-names="['1']"
            accordion
            @on-select="routeTo" accordion>
        <!--<Submenu name="1">-->
        <!--<template slot="title">-->
        <!--<Icon type="ios-paper"></Icon>-->
        <!--申请设备-->
        <!--</template>-->
        <!--<Submenu name="1">-->
        <!--<template slot="title">-->
        <!--<Icon type="stats-bars"></Icon>-->
        <!--申请-->
        <!--</template>-->


        <!--</Submenu>-->
        <!--<Menu-group title="申请" v-if="this.author_key==1">-->
        <!--<Menu-item name="firstApp">首次申请</Menu-item>-->

        <!--<Menu-item name="unSubmitOrder">未提交申请</Menu-item>-->
        <!--<Menu-item name="orderList">全部已提交申请</Menu-item>-->
        <!--<Menu-item name="devList">已有设备列表</Menu-item>-->
        <!--<Menu-item name="disabled_form">停用报废表</Menu-item>-->
        <!--<Menu-item name="disabled_form2">停用报废表2</Menu-item>-->
        <!--<Menu-item name="changeReq_form">变更申请</Menu-item>-->
        <div v-if="this.author_key==1">
          <label class="menu-label">申请</label>
          <Submenu name="1-1">
            <template slot="title">
              首次申请
            </template>
            <MenuGroup title="按台(套)申请">
              <MenuItem name="setApp-one-boiler">锅炉</MenuItem>
              <MenuItem name="setApp-one-pressure">压力容器（气瓶除外）</MenuItem>
              <MenuItem name="setApp-one-elevator">电梯</MenuItem>
              <MenuItem name="setApp-one-hoisting">起重机械</MenuItem>
              <MenuItem name="setApp-one-cableway">客运索道</MenuItem>
              <MenuItem name="setApp-one-play">大型游乐设施</MenuItem>
              <MenuItem name="setApp-one-factorycar">场 (厂)内专用机动车辆</MenuItem>
            </MenuGroup>
            <MenuGroup title="按单位申请">
              <MenuItem name="companyApp-two-cylinders">气瓶(车用气瓶除外)</MenuItem>
              <MenuItem name="companyApp-two-pipeline">工业管道</MenuItem>
            </MenuGroup>
            <MenuGroup title="车用气瓶">
              <MenuItem name="carboxApp-one-carbox">车用气瓶</MenuItem>
            </MenuGroup>
          </Submenu>
          <Submenu name="2-1">
            <template slot="title">
              变更申请
            </template>
            <MenuItem name="changeReq">改造变更</MenuItem>
            <MenuItem name="2-1-2">移装变更</MenuItem>
            <MenuItem name="2-1-3">单位变更</MenuItem>
            <MenuItem name="2-1-4">更名变更</MenuItem>
            <MenuItem name="2-1-5">达到设计使用年限变更</MenuItem>
          </Submenu>
          <Menu-item name="changeReq_form">停用申请</Menu-item>

          <Menu-item name="disabled_form2">报废申请</Menu-item>
          <Menu-item name="disabled_form">停用后启用申请</Menu-item>

          <!--</Menu-group>-->

          <!--<Menu-group title="申请列表" v-if="this.author_key==1" >-->
          <label class="menu-label">申请列表</label>

          <Menu-item name="orderList">待受理申请</Menu-item>
          <Menu-item name="orderList2">待审批申请</Menu-item>
          <Menu-item name="orderList3">已完成申请</Menu-item>
          <label class="menu-label">已有设备</label>

          <Menu-item name="devList">已有设备列表</Menu-item>
        </div>


        <!--</Menu-group>-->


        <Menu-group title="受理机关" v-if="this.author_key==2">
          <Menu-item name="waitAccept">未受理申请</Menu-item>
          <Menu-item name="accepted">已受理申请</Menu-item>
        </Menu-group>

        <Menu-group title="审批机关" v-if="this.author_key==3">
          <Menu-item name="waitApproval">未审批申请</Menu-item>
          <Menu-item name="approvaled">已审批申请</Menu-item>
        </Menu-group>

        <Menu-group title="监管机关" v-if="this.author_key==4">
          <Menu-item name="supervision">已审批申请</Menu-item>
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
        //this.$router.push(e);
        let params = e.split("-");
        let routerPath = params[0];
        let device_type = params[1];
        let device_detail = params[2];
        this.$router.push({
          path: routerPath,
          query: {
            device_type: device_type,
            device_detail: device_detail
          }
        });

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
    width: 240px;
    left: 0;
    top: 66px;
    bottom: 0;
    background: rgb(72, 79, 95);
    overflow: scroll;
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

  .menu-label {
    color: rgba(255, 255, 255, .36);
    display: inline-block;
    margin-top: 10px;
    margin-left: 10px;
    font-size: 18px;
  }

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title {
    font-size: 16px;
  }

</style>
