<template>
   <div ref="favorite">
      <img src="./images/sign.jpg" class="main_image" v-show="isShow"/> 
      <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import {  mapActions } from 'vuex'
  import {TransferDomDirective as TransferDom } from 'vux';
  // import ControlStyle from '../../assets/js/controlStyle.js';
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {

    },
    data(){
      return{
        isShow: false
      }
    },
    computed: {
     
    },
    mounted (){
      this.getScreenHeight();
      this.sign();
    },
    beforeDestroy(){
    },
    methods:{
      ...mapActions([

      ]),
    
      getScreenHeight:function () {
        // ControlStyle.setAppBgColor(false,'#app','app');
        let h= document.documentElement.clientHeight;
        console.log(h)
        this.$refs.favorite.style.height = h + 'px';
      },
      sign(){
        let that = this;
        let url = '/ce/zshd/custSign';
        that.$http.post(url,{}).then(function (res) {
          if(res.resultCode === '00'){
              that.isShow = true;
          }
        }).catch(function (res) {
          console.log(res)
        })
      } 
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";
  .main_image {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
 
</style>

