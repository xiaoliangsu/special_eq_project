<template>
    <!--按套申请的使用登记表-->
    <div class="companyApp">
        <Form ref="ruleForm" :model="ruleForm" :rules="rules" :label-width="100" inline>
            <h2>按单位申请</h2>
            <div class="statusInfo" v-if="this.active==1">

                <h2>设备基本情况</h2>
                <Form-item label="设备种类" prop="kind1">
                    <Input v-model="ruleForm.kind1" placeholder="请输入设备种类"></Input>
                </Form-item>

            </div>

            <!--让用户确认信息的表格-->
            <div class="setTable" v-if="this.active==2">
                <Alert closable>请确认表格信息是否全部正确</Alert>

                <v-regist_one :ruleForm="ruleForm"></v-regist_one>


            </div>

            <!--提交pdf 可能需要调一下格式，以后再说吧-->
            <div class="pdfInfo" v-if="this.active==3">
                <h2>相关证明</h2>
                <Form-item label="社会信用代码证明" :label-width="300">
                    <Upload
                            ref="upload"
                            :before-upload="handleBeforeUpload"
                            :on-success="handleSuccess"
                            action="//jsonplaceholder.typicode.com/posts/"
                            with-credentials>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>

                </Form-item>
                <Form-item label="产品合格证" :label-width="300">
                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                            :on-success="handleSuccess"
                            with-credentials>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </Form-item>
                <Form-item label="监督检验证明" :label-width="300">
                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                            :on-success="handleSuccess"
                            with-credentials>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </Form-item>
                <Form-item label="锅炉能效证明" :label-width="300" v-if="this.selected[1]=='boiler'">
                    <Upload action="//jsonplaceholder.typicode.com/posts/"
                            :on-success="handleSuccess"
                            with-credentials>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </Form-item>
                <!--<a href="https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar" download="1.txt">锅炉能效证明.pdf</a>-->
                <!--<v-detailPdf :pdfUrl="pdfUrl"></v-detailPdf>-->
            </div>

            <Button type="primary" @click="before()" v-if="this.active<6">上一步</Button>
            <Button type="primary" @click="next('ruleForm')" v-if="this.active<2">下一步</Button>
            <Button type="primary" @click="beSure" v-if="this.active==2">确定</Button>
            <!--<Button type="primary" @click="success(false)" v-if="this.active==5">确认提交</Button>-->
            <Button @click="instance('success')" v-if="this.active==3">确认提交</Button>
            <Button type="ghost" @click="resetForm('ruleForm')" style="margin-left: 8px" v-if="this.active<2">重置</Button>

        </Form>

    </div>
</template>
<script>
    import regist_one from '../../components/register/registerOne.vue'
    import detailPdf from '../../components/detailpdf/detailPdf.vue'
    import {mapActions, mapState, mapGetters} from 'vuex'
    import * as setAppService from '../../services/setApp'
    export default {
        data() {
            return {
                ruleForm: {},


                rules: {
//                    kind1: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
//                    use_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
//                    check_com_name: [
//                        {required: true, message: '不能为空', trigger: 'blur'}
//                    ],
                },
                ifNext: true,
                active: 1,
                selected: '',
                imgName: '',
                visible: false,
                uploadList: [],
                modal1: false,
                author_key:'',
                pdfUrl: {
                    锅炉能效证明: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶2: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶3: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                    水壶4: 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar',
                }


            };
        },
        components: {
            'v-regist_one': regist_one,
            'v-detailPdf': detailPdf,

        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'initData'
        },
        computed: {
            //...mapState(['selectedOption']),
            ...mapGetters([
                "getSelectedOption",
                "getRegistOne",
            ]),
        },
        mounted(){
            this.selected = this.getSelectedOption;
            this.clearRegistOneForm();
            this.ruleForm = this.getRegistOne;
            this.active = 1;
            this.author_key=localStorage.getItem('author_key');

        },
        methods: {
            ...mapActions({clearRegistOneForm: 'clearRegistOneForm'}),
            initData(){
                this.active = 1;
                this.selected = this.getSelectedOption;
                this.active = 1;
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = Object.assign({}, this.ruleForm);
                        // console.log(param);
                        this.ifNext = false;
                        setAppService.submitSetInfo(param).then(res => {
                            //console.log(res);
                            if (res) {
                                console.log(res.success);
                            }
                        })
                            .catch(error => {
                                console.log(error)
                            })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            next(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.active++;
                        console.log(this.active);
                    }
                })
                if (this.active == 2) {
                    this.submitForm('ruleForm');
                }

            },
            before() {
                if (this.active == 1) {
                    this.$router.push('firstApp');
                } else {
                    this.active--;
                }
            },
            beSure() {
                this.active++;
            },
//      createPdf() {
////                let newWindow = window.open("_blank");   //打开新窗口
////                let codestr = document.getElementById("pdf-wrap").innerHTML;   //获取需要生成pdf页面的div代码
////                newWindow.document.write(codestr);   //向文档写入HTML表达式或者JavaScript代码
////                newWindow.document.close();     //关闭document的输出流, 显示选定的数据
////                newWindow.print();   //打印当前窗口
////                return true;
//
//        window.print();
//      },

            handleBeforeUpload () {
                this.uploadList = this.$refs.upload.fileList;
                const check = this.uploadList.length < 1;

                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传 1 张图片。'
                    });
                }
                return check;
            },
            handleSuccess (res, file) {
                //需要沟通一下，成功给我返回什么然后判断
                console.log(res);
                console.log(file);

            },

            instance (type) {
                const title = '通知';
                const content = '<p>您已经成功提交申请</p><p>请耐心等待受理结果</p>';
                switch (type) {
                    case 'success':
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                }
                this.$router.push('home');

            }
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
    .setApp{
        color:#495060;
    }



</style>
