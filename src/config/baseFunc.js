exports.install = function (Vue, options) {
  //首次申请，保存后再次填写和受理前修改
  Vue.prototype.modifyApp = function (value) {
    console.log("baseFunc");
    console.log(this.data5[value].changeApplyNum);
    switch (this.data5[value].changeApplyNum) {
      case 1:
        //按套首次申请
        this.$router.push({
          path: 'setApp',
          query: {
            dev_id: this.data5[value].id,
            dev_name: this.data5[value].device,
            //是保存之后的
            ifold: 1,
            //selectedNum:2
          }
        });
        //let temp = this.data5[value].changeDeviceNum;
        break;

      case 2:
        //单位首次申请
        this.$router.push({
          path: 'companyApp',
          query: {
            dev_id: this.data5[value].id,
            dev_name: this.data5[value].device,
            //是保存之后的
            ifold: 1,
            //changeDeviceNum: this.data5[value].changeDeviceNum,

          }
        });
        break;
      case 3:
        //车瓶首次申请
        this.$router.push({
          path: 'carboxApp',
          query: {
            dev_id: this.data5[value].id,
            dev_name: this.data5[value].device,
            //是保存之后的
            ifold: 1,
          }
        });
        break;
      case 4:
        //单位变更
        this.$router.push({
          path: 'appDetail',
          query: {
            dev_id: this.data5[value].id,
            dev_name: this.data5[value].device,
            orderState: this.orderState
          }
        });
        break;
      ////等等


    }


  };
};
