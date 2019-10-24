<template>
   <div>
     <div ref="favorite"  class="favorite" >
        <img src="./images/index01.png" class="main_shape"/>
        <div class="index">
          <div>成功找到有缘人将有机会获得电影兑换券2张，活动期间将随机送出300张。<span class="rule" @click="openRule">详情查看活动规则</span></div>
          <div class="btns">
            <div @click="goQuestionPage" v-show="!isJoinActivity">看缘分</div>
            <div @click="goFavoriteBall" v-show="isJoinActivity">我的缘分</div>
            <div @click="goLookWish">看祝福</div>
          </div>
          <img src="./images/arrow.gif" class="arrow" />
        </div>
     </div>
     <img src="./images/product.png"/>
     <toast v-model="showtip" type="text" :time="2000" width="90%" :text="text" :position="position"></toast>
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { Toast,TransferDomDirective as TransferDom } from 'vux';
  import {setAppBgColor} from '../../util/util';
  import Wechat from '../../util/wechat';

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
        showtip:false,
        position:"top",
        text:"",
        showLoadFlag: false,
        loadText:"数据加载中……",
        isJoinActivity: false,
        urlAccountId: '',
        accountId: ''
      }
    },
    computed: mapState({
      userInfo: state=> state.Products.userInfo
    }),
    mounted (){
      this.getScreenHeight();
      this.urlAccountId = Wechat.QueryString("accountId");
      let sharePage = Wechat.QueryString("sharePage");
      if(sharePage){ // 如果是分享进来的,调用授权接口
        this.autoUserToWx(sharePage);
      }else {
        this.getCustomerInfo();
      }
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
    },
    methods:{
      ...mapActions([
      ]),
      getScreenHeight:function () {
        setAppBgColor(false,'app','app');
        //判断是否是IOS,安卓
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let h = document.documentElement.clientHeight;
        if(isiOS) {

          h =  h<600 ? h + 45 : h;
        }
        this.$refs.favorite.style.height = h + 'px';
      },
      openRule(){
        this.$router.push({path:"/FavoritePerson/FavoriteRule"});
      },
      //调用授权接口
      autoUserToWx(sharePage){
        
        let that = this;
        that.$http.post(that.$API.CONTEXT+that.$API.WX.AUTHORIZE, {accountId: that.urlAccountId,sharePage:sharePage}).then(function (res) {
          if(res.resultCode == "02"){   // 用户没有授权信息，跳转授权
            let url=res.url;
            window.location.href=url;
          }else{
            this.getCustomerInfo();
          }
        }).catch(function (res) {
            console.log( res);
        })
      },
      setShareInfo(){
        let that = this;
        Wechat.showOptionMenu();
        Wechat.setShareInfo({
          title : '寻找钻石有缘人，赢电影兑换券！',
          imgUrl : Wechat.imgRoot+"/static/images/shareIcon/yuanfen.png",
          desc : '所有的遇见，皆是缘分。既然相遇了，就用心珍藏。',
          link : Wechat.assetsRoot+ "?accountId="+that.accountId + "&sharePage=shareZSHd&hash=/#/FavoritePerson/FavoritePersonIndex",
          succCallbackFn: function(){
            that.statisShareInfo('31')
          }     
        });

        Wechat.setShareTimeline({
          title : '寻找钻石有缘人，赢电影兑换券！',
          imgUrl :Wechat.imgRoot+"/static/images/shareIcon/yuanfen.png",
          link : Wechat.assetsRoot+ "?accountId="+that.accountId + "&sharePage=shareZSHd&hash=/#/FavoritePerson/FavoritePersonIndex",
          succCallbackFn: function(){
            that.statisShareInfo('31')
          }
        })
      },
      getCustomerInfo(){
        let that = this;
        let url = 'ce/zshd/searchCust';
        that.$http.post(url, {}).then(function (res) {
            if(res.resultCode === '00'){
              if(res.accountId){
                that.accountId = res.accountId
              }else if(that.urlAccountId) {
                that.accountId = that.urlAccountId
              }
              that.statisShareInfo('32');
              that.setShareInfo();
              that.addActivityData();

              if(res.mobile && res.mobile.length > 1){
                that.isJoinActivity = true;
              }else {
                that.isJoinActivity = false;
              }

            }else{
              that.showtip=true;
              that.text=res.resultMsg;
            }
        }).catch(function (response) {
          // 这里是处理错误的回调
          that.showtip=true;
          that.text= response;
        })
      },

      goLookWish(){
        this.$router.push({path:"/FavoritePerson/LookWish",query: {agentCode: this.accountId}});
      },
      goQuestionPage(){
        this.$router.push({path:"/FavoritePerson/QuestionOne",query: {agentCode: this.accountId}});
      },
      goFavoriteBall(){
        this.$router.push({path:"/FavoritePerson/FavoriteBall"});
      },
      addActivityData(){
        let that = this;
        let url = '/ce/zshd/addHdCust';
        let params = {
          productName: '寻找钻石有缘人',
          agentCode: this.accountId
        }
        that.$http.post(url,params).then(function (res) {
          console.log(res)        
        }, function (response) {
          console.log(response)
        })
      },
      statisShareInfo(userOperateType){
        let that = this;
        let paramJson = {
            "operateType": userOperateType,
            "operateContent":"zshd", 
            "agentCode": this.accountId
          };
          that.$http.post(that.$API.CONTEXT + that.$API.SHARE.STATISDATA, paramJson).then(function (res){
            console.log(res)
          }, function (res) {
            console.log(res)
          });
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";
  .arrow {
    width: 0.32rem;
    margin:  0.2rem auto 0 auto;
  }
  .rule {
    text-decoration: underline;
  }
 
</style>

