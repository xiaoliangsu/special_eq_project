<template>
    <div class="footer">
      <div class="footer-content center justify"> Ant Design Admin 版权所有 @ 2017</div>
    </div>
</template>
<script>
    export default {

    }

</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .footer{
    background-color: rgb(251,251,251);
    position: fixed;
    z-index: 100;
    left: 180px;
    right: 0;
    bottom: 0;
    @include wh(100%, 3rem);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
  }
  .footer-content{
    flex: 1;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .icon_style{
      @include wh(.8rem, .8rem);
      margin-bottom: .2rem;
      margin-top: .3rem;
      fill: #ccc;
    }
    span{
      @include sc(.45rem, #666);
    }
  }

</style>
