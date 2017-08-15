<template>
    <div class="firstApp">
        <h2>选择设备</h2>
        <div class="content-box">
            <Form :model="form" :label-width="100">
                <Form-item label="申请设备种类">
                    <Cascader :data="form.options" trigger="hover" style="width:250px"
                              @on-change="handleChange"></Cascader>
                </Form-item>
                <Form-item label="申请数量">
                    <Input-number :max="10" :min="1" v-model="form.num1"></Input-number>
                </Form-item>
                <Button type="primary" @click="next" :disabled="ifNext">下一步</Button>
            </Form>
        </div>
    </div>
</template>
<script>
    import {mapActions, mapState,mapGetters} from 'vuex'
    export default {
        data() {
            return {
                form: {
                    options: [{
                        value: 'one',
                        label: '按台（套）申请',
                        children: [{
                            value: 'boiler',
                            label: '锅炉',
                        }, {
                            value: 'pressure',
                            label: '压力容器（气瓶除外）'
                        }, {
                            value: 'elevator',
                            label: '电梯'
                        }, {
                            value: 'hoisting',
                            label: '起重机械'
                        }, {
                            value: 'cableway',
                            label: '客运索道'
                        }, {
                            value: 'play',
                            label: '大型游乐设施'
                        }, {
                            value: 'factorycar',
                            label: '场 (厂)内专用机动车辆'
                        }, {
                            value: 'carbox',
                            label: '车用气瓶'
                        },]

                    }, {
                        value: 'two',
                        label: '按单位申请',
                        children: [{
                            value: 'cylinders',
                            label: '气瓶(车用气瓶除外)',
                        }, {
                            value: 'pipeline',
                            label: '工业管道'
                        },]
                    }
                    ],
                    selectedOptions: [],
                    num1: 1,
                },
                active: 1,
                ifNext: true,
               // selected: "",


            }
        },
        methods: {
            ...mapActions({ selectedDeviceOption: 'selectedDeviceOption' }),
            onSubmit() {
                console.log('submit!');
            },
            handleChange(value) {
                console.log(value);
                this.selectedDeviceOption(value);
                console.log(this.getSelectedOption[0]);
                if (value) {
                    this.ifNext = false;
                }
            },
            next() {
                if (this.active++ > 2) {this.active = 0;}
                if(this.getSelectedOption[0]=='one' && this.getSelectedOption[1]!=='carbox'){
                    this.$router.push('setApp');
                }else if(this.getSelectedOption[0]=='two' ){
                    this.$router.push('companyApp');
                }else if(this.getSelectedOption[1]=='carbox'){
                    this.$router.push('carboxApp');
                }





            },


        },
        computed: {
            ...mapState(['selectedOption']),
            ...mapGetters([
                "getSelectedOption",
            ]),
        },

    }

</script>
<style lang="scss" scoped>

</style>
