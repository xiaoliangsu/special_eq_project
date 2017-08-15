<template>
    <!--从后端去数据，然后填到相应的位置，还需要改一下页面的格式-->
    <div class="appDetail">
        <div class="comp_name">
            <h2 class="detailHeadTop">一、单位名称：</h2>
            <!--<span class="content"> {{this.dev_id}}</span>-->
            <span class="content">申请单位的名字</span>
        </div>

        <div class="setTable">
            <h2 class="detailHead">二、特种设备使用登记表：</h2>
            <Collapse v-model="value1">
                <Panel name="1">
                    <span class="panel_content">特种设备使用登记表</span>
                    <div slot="content">
                        <v_regist_one :ruleForm="ruleForm"></v_regist_one>
                        <Button type="primary" @click="toblanck">打印预览</Button>
                    </div>
                </Panel>
            </Collapse>


        </div>
        <div class="pdfdownload">
            <h2 class="detailHead">三、提交的资料：</h2>
            <v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>
        </div>
        <div class="accpeterControl">


            <div class="reject_content" v-if="orderState=='accepted'">
                <h2 class="detailHead">驳回理由：</h2>
                <span class="panel_content"> {{ rejvalue }}</span>
                <span class="panel_content"> 后端传来的驳回理由 </span>
            </div>
            <Button type="primary" @click="accPass" v-if="orderState=='waitAccept'">通过</Button>
            <Button @click="accRej"  v-if="orderState=='waitAccept'">驳回</Button>

        </div>

    </div>
</template>
<script>
    import {mapActions, mapState, mapGetters} from 'vuex'
    import regist_one from '../../../components/register/registerOne.vue'
    import detailPdf from '../../../components/detailpdf/detailPdf.vue'

    import * as avaiableService from '../../../services/avaiableDev.js'
    import * as registService from '../../../services/registService'
    import * as acceptService from '../../../services/accept.js'
    export default {
        data() {
            return {
                ruleForm: '',
                dev_id: '',
                dev_name: '',
                value1: '',
                pdfUrl: {
                    锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                },
                accStatus: '',
                rejvalue: '',
                orderState:'',


            }
        },
        mounted(){
            //获取表格信息
            this.ruleForm = this.getRegistOne;
            this.getRegistOneForm(this.dev_id);
            this.ruleForm = this.getRegistOne;
            //获取路由上的信息
            this.transparam();
            //获取状态  还需要改
            this.rejvalue='';
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'initData'
        },
        methods: {
            ...mapActions({getRegistOneForm: 'getRegistOneForm'}),
            initData(){
                this.getRegistOneForm(this.dev_id);
                this.ruleForm = this.getRegistOne;
                this.rejvalue='';
                this.transparam();
            },
            transparam(){
                if (this.$route.query.dev_id) {
                    this.dev_id = this.$route.query.dev_id;
                }
                if (this.$route.query.dev_name) {
                    this.dev_name = this.$route.query.dev_name;
                    console.log(this.dev_name);
                }
                if(this.$route.query.orderState){
                    this.orderState = this.$route.query.orderState;
                     console.log(this.orderState);
                }
            },
            toblanck(){
                this.$router.push('regist_one');
            },
            accPass(){
                this.accStatus = true;
                this.$Modal.confirm({
                    title: '确认信息',
                    content: '<p>确认通过该申请订单？</p>',
                    onOk: () => {
                        this.$Message.info('点击了确定');
                        acceptService.AccPass(this.accStatus).then(res => {
                            this.$router.push('waitAccept');

                        }).catch(error => {
                            console.log(error);
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                });

            },
            accRej () {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: '请输入驳回理由',
                                type: 'textarea',
                                rows: 5,
                            },
                            on: {
                                input: (val) => {
                                    this.rejvalue = val;
                                }
                            },
                        })
                    },
                    onOk: () => {
                        this.$Message.info('点击了确定');
                        this.$router.push('waitAccept');
                    },
                    onCancel: () => {
                        this.$Message.info('点击了取消');
                    }
                })
            }
        },

        computed: {
            ...mapState(['registOne']),
            ...mapGetters([
                "getRegistOne",
            ]),
        },
        components: {
            'v_regist_one': regist_one,
            'v-detailPdf': detailPdf,

        },

    }

</script>
<style lang="scss" scoped>
    @media print {
        .print {
            display: block;
        }

        .nprint {
            display: none;
        }
    }

    .comp_name {
        margin-bottom: 30px;
    }

    .setTable {
        margin-bottom: 30px;
    }

    .pdfdownload {
        margin-bottom: 30px;
    }

    .detailHeadTop {
        margin-bottom: 15px;
        color: #1c2438;
    }

    .detailHead {
        margin: 20px 0;
        color: #1c2438;

    }

    .content {
        color: #495060;
        font-size: small;
    }

    .panel_content {
        font-size: small;
        color: #495060;
    }


</style>
