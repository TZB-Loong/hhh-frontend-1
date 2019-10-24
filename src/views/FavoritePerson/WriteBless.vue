<template>
   <div class="favorite" ref="favorite">
     <div class="bless">
        <img src="./images/bless01.png" class="bless01"/>
        <div class="bless02">
            <img src="./images/bless02.png"/>
            <textarea placeholder="点击填写最想对有缘人说的话，让他感受到你的真心祝福，你的祝福将会寄存在缘分星球，送给您的有缘人。" 
              v-model="zfy" :disabled="originZfy.length > 0" @blur="()=>{
                
              }">
            </textarea>
        </div>
        <img src="./images/bless03.png" class="bless03" @click="sendBless"/>
     </div>
     <div class="popup" v-show="isShowPopup" @click="closeBless">
       <div class="black"></div>
       <img src="./images/top03.png" class="success"/>
     </div>
     <toast v-model="showtip" type="text" :time="2000" width="90%" :text="text" :position="position"></toast>   
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { Toast,TransferDomDirective as TransferDom } from 'vux';
  // import ControlStyle from '../../assets/js/controlStyle.js';

  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      Toast
    },
    data(){
      return{
        showtip: false,
        position:"middle",
        text:"",
        showLoadFlag: false,
        loadText:"数据加载中……",
        sex: "",
        zfy: "",
        isShowPopup: false,
        agentCode: '',
        originZfy:""
      }
    },
    computed: mapState({
    }),
    mounted (){
      this.getScreenHeight();
      this.agentCode = this.$route.query.agentCode;
      // $('input,textarea').on('blur', function () {
      //   window.scroll(0, 0);
      // });
      this.getCustomerInfo();
    },
    beforeDestroy(){
      
    },
    methods:{
      ...mapActions([

      ]),
      getCustomerInfo(){
        let that = this;
        let url = '/ce/zshd/searchCust';
        that.$http.post(url, {}).then(function (res) {
            if(res.resultCode === '00'){
               if(res.zfy.length > 0) {
                   that.zfy = res.zfy;
                   that.originZfy = JSON.parse(JSON.stringify(res.zfy));
               }
            }else{
              that.showtip=true;
              that.text=res.resultMsg;
            }
        }).catch(function (response) {
          that.showtip=true;
          that.text= response;
        })
      },
      getScreenHeight:function () {
        // ControlStyle.setAppBgColor(false,'#app','app');
        let h=document.documentElement.clientHeight;
        this.$refs.favorite.style.height = h + 'px';
      },
      sendBless(){
        if(this.zfy.length > 30 || this.zfy.length === 0) {
          this.showtip = true;
          this.text = '祝福语最多可填写30字';
          return;
        }
        if(this.originZfy.length > 0) {
          this.isShowPopup = true;
          return;
        }
        let that = this;
        let url = '/ce/zshd/saveBlessing';
        that.$http.post(url,{zfy: that.zfy,agentCode: that.agentCode}).then(function (res) {
          if(res.resultCode === '00'){
            that.isShowPopup = true;
          }else {
            that.showtip = true;
            that.text = res.resultMsg;
          }
        }).catch(function (res) {
          that.showtip = true;
          that.text = res.resultMsg;
        })
        
      },
      closeBless(){
        this.isShowPopup = false;
        history.go(-1);
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

</style>

