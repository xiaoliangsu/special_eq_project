exports.install = function (Vue, options) {
  //首次申请，保存后再次填写和受理前修改
  Vue.prototype.modifyApp = function (value,device_type) {
    console.log("baseFunc");
    console.log(this.data5[value].deviceTypeId);
    console.log(device_type)
    switch (this.data5[value].applyType) {
      case "首次申请":
        //按套首次申请
        if(device_type<8){
          this.$router.push({
            path: 'setApp',
            query: {
              applyId: this.data5[value].id,
             // dev_name: this.data5[value].device,
              //是保存之后的
              ifold: 1,
              //selectedNum:2
            }
          });
        }else if(device_type>8){
          this.$router.push({
            path: 'companyApp',
            query: {
              applyId: this.data5[value].id,
              device_type:device_type,
            //  dev_name: this.data5[value].device,
              //是保存之后的
              ifold: 1,
              //changeDeviceNum: this.data5[value].changeDeviceNum,

            }
          });
        }else{
          this.$router.push({
            path: 'carboxApp',
            query: {
              applyId: this.data5[value].id,
            //  dev_name: this.data5[value].device,
              //是保存之后的
              ifold: 1,
            }
          });
        }

        //let temp = this.data5[value].changeDeviceNum;
        break;

      case "变更申请":
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
        //修改
      case "停用申请":
        //车瓶首次申请
        this.$router.push({
          path: 'stopUseApp',
          query: {
            applyId: this.data5[value].id,
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
