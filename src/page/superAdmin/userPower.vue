<template>
  <div class="container">
    <Form ref="formInline" label-position="left" :label-width="70" :model="formInline" inline>
      <FormItem label="用户名" prop="username">
        <Input v-model="formInline.username" placeholder="请输入"></Input>
      </FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">查询</Button>
    </Form>
    <div class="">
      <Button type="primary" icon="plus" @click="addAccount">添加用户</Button>
    </div>
    <div class="table-wrap">
      <Table @on-select="tableSelect" :columns="columns1" :data="data1"></Table>
    </div>
    <div class="">
      <Page class="page" ref="pages" :total="this.num" size="small" show-elevator @on-change="initSize"
            :page-size="10"></Page>
    </div>

    <!--修改密码弹窗-->
    <!--<Modal-->
      <!--v-model="changePassword.modal"-->
      <!--title="修改密码"-->
      <!--@on-cancel="modalCancel">-->
      <!--<Form ref="changePassword" label-position="right" :rules="changePasswordRules" :label-width="90" :model="changePassword">-->
        <!--<FormItem label="账号">-->
          <!--<Input v-model="changePassword.account" disabled></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="新密码" prop="password">-->
          <!--<Input v-model="changePassword.password" placeholder="请输入"></Input>-->
        <!--</FormItem>-->
        <!--<FormItem label="确认新密码" prop="confirmPassword">-->
          <!--<Input v-model="changePassword.confirmPassword" placeholder="请输入"></Input>-->
        <!--</FormItem>-->
      <!--</Form>-->
      <!--<div slot="footer">-->
        <!--<Button @click="modalCancel">取消</Button>-->
        <!--<Button type="primary" icon="checkmark" :loading="changePassword.loading" @click="changePwdSubmit">修改</Button>-->
      <!--</div>-->
    <!--</Modal>-->
  </div>
</template>

<script>
  export default {
    data () {
//      const validatePassCheck = (rule, value, callback) => {
//        if (value === '') {
//          callback(new Error('请再次输入密码'));
//        } else if (value !== this.form.password) {
//          callback(new Error('两次输入密码不一致!'));
//        } else {
//          callback();
//        }
//      };
      return {
        formInline: {
          username: '',
        },
//        changePassword: {
//          modal:false,
//          loading:false,
//          account: '',
//          password:'',
//          confirmPassword:'',
//        },
        //订单总数
        num: 0,
//        changePasswordRules:{
//          password: [
//            { required: true, message: '密码不能为空', trigger: 'blur' },
//            { type: 'string', min: 6, message: '密码不能少于6位数', trigger: 'blur' }
//          ],
//          confirmPassword: [
//            { required: true, message: '确认密码不能为空', trigger: 'blur' },
//            { validator: validatePassCheck, trigger: 'blur' }
//          ],
//        },
        columns1: [
          {
            title: '序号',
            align: 'center',
            width: 80,
            render: (h, params) => {
              return h('span',params.index+1)
            }
          },
          {
            title: '用户名',
            key: 'username',
            width: 120,
          },
          {
            title: '登记机关名称',
            key: 'acceptorAgencyName'
          },
          {
            title: '用户权限',
            key: 'role',

          },
          {
            title: '登记人员',
            key: 'name',

          },
          {
            title: '身份证号',
            key: 'verifyId',

          },
          {
            title: '移动电话号码',
            key: 'mobilePhone',

          },
//          {
//            title: '状态',
//            key: 'status',
//            width: 80,
//            render: (h, params) => {
//              return h('span',params.row.status?'已启用':'未启用')
//            }
//          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style:{
                    marginRight:'10px'
                  },
                  on: {
                    click: () => {
                      this.changePwdModal(params.row)
                    }
                  }
                }, '删除'),
//                h('Button', {
//                  props: {
//                    type: 'success',
//                    size: 'small'
//                  }
//                },'启用')
              ]);
            }
          }
        ],
        data1: [
          {
            name: 'customer1',
            desc: '系统账号1',
            status: false,
            menu:'客户管理，模拟数据，账号管理',
          },
          {
            name: 'customer2',
            desc: '系统账号2',
            status: false,
            menu:'客户管理，模拟数据，账号管理',
          },
          {
            name: 'customer3',
            desc: '系统账号3',
            status: false,
            menu:'客户管理，模拟数据，账号管理',
          },{
            name: 'customer4',
            desc: '系统账号4',
            status: false,
            menu:'客户管理，模拟数据，账号管理',
          },{
            name: 'customer5',
            desc: '系统账号5',
            status: false,
            menu:'客户管理，模拟数据，账号管理',
          },
        ]
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      initSize(value){


      },

      tableSelect(data,data2){
        console.log(data)
        console.log(data2)
      },
      addAccount(){
        this.$router.push('/newUser')
      },
      changePwdModal(row){
        console.log(row)
        this.changePassword.modal=true
      },
//      changePwdSubmit(row){
//        this.changePassword.loading=true
//        setTimeout(()=>{
//          this.$Notice.success({
//            title: '密码修改成功',
//            desc:'请牢记新密码！'
//          });
//          this.changePassword.loading=false
//          this.modalCancel()
//        },2000)
//      },
//      modalCancel(){
//        this.changePassword.modal=false
//        this.$refs['changePassword'].resetFields()
//      }
    }
  }
</script>

<style lang="scss">
  .table-wrap{
    margin: 15px 0;
  }
  .container{
    padding:15px;
  }
  .page {
    float: right;
    margin: 10px;
  }
</style>
