<template>
  <div class="changeReq">
    <h2>变更申请</h2>
    <div class="content-box">
      <Form :model="form" :label-width="100">
        <Form-item label="变更设备">
          <p>{{this.dev_name}}</p>
        </Form-item>
        <Form-item label="变更申请种类">
          <Select v-model="form.selectedOptions" style="width:200px" @on-change="handleChange">
            <Option v-for="item in form.options" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Button type="primary" @click="next" :disabled="ifNext">下一步</Button>
      </Form>
    </div>
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from 'vuex'
  export default {
    data() {
      return {
        form: {
          options: [
            {
              value: 'transChange',
              label: '改造变更',
            }, {
              value: 'inChange',
              label: '登记机关行政区域内移装变更'
            }, {
              value: 'acrossChange',
              label: '跨登记机关行政区域移装变更'
            }, {
              value: 'compChange',
              label: '单位变更'
            }, {
              value: 'namChange',
              label: '更名变更'
            }, {
              value: 'yearChange',
              label: '达到设计年限变更'
            },]
          ,
          selectedOptions: [],
          num1: 1,
        },
        active: 1,
        ifNext: true,
        dev_id: '',
        dev_name: '',

        // selected: "",


      }
    },
    methods: {
      ...mapActions({selectedChange: 'selectedChange'}),
      onSubmit() {
        console.log('submit!');
      },
      handleChange(value) {
        console.log(value);
        this.selectedChange(value);
        console.log(this.getSelectedChangeOption);
        if (value) {
          this.ifNext = false;
        }
      },
      next() {
        // if (this.active++ > 2) this.active = 0;
        if(this.getSelectedChangeOption=='transChange')
        {
          this.$router.push('transformChange');
        } else if (this.getSelectedChangeOption=='inChange')
        {
          this.$router.push('areaInChange');
        }else if (this.getSelectedChangeOption=='acrossChange')
        {
          this.$router.push('areaAcrossChange');
        } else if (this.getSelectedChangeOption=='compChange')
        {
          this.$router.push('companyChange');
        } else if (this.getSelectedChangeOption=='namChange')
        {
          this.$router.push('nameChange');
        } else if (this.getSelectedChangeOption=='yearChange')
        {
          this.$router.push('yearsChange');
        }



      },
      //取得参数
      transparam(){
        if (this.$route.query.dev_id) {
          this.dev_id = this.$route.query.dev_id;
        }
        if (this.$route.query.dev_name) {
          this.dev_name = this.$route.query.dev_name;
          console.log(this.dev_name);
        }
      },


    },
    mounted(){
      this.transparam();
    },

    computed: {
      ...mapState(['selectedChangeOption']),
      ...mapGetters([
        "getSelectedChangeOption",
      ]),
    },
    watch: {
      '$route': 'transparam'
    }

  }

</script>
<style lang="scss" scoped>

</style>
