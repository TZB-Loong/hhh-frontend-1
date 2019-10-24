<template>
   <div class="favorite" ref="favorite">
     <div class="prize">
       <img src="./images/index06.png"/>
       <div class="info" v-show="!redeemCode">
          <ul>
            <li>
              <div class="border"></div>
              <input placeholder="请输入您的姓名" v-model="name"/>
            </li>
    
            <li>
                <div class="border"></div>
                <input placeholder="请输入您的身份证号" v-model="idNo"/>
            </li>
    
            <li>
                <div class="border"></div>
                <input placeholder="请输入您的电话号码" v-model="mobile"/>
            </li>
            <li>
                <div class="border"></div>
                <input placeholder="请输入验证码" v-model="validateCode"/>
                <span class="code" @click="getCode">{{codeText}}</span>
            </li>
          </ul>
          <div class="big_btn" @click="getAward">立即领取</div>
       </div>

       <div class="info" v-show="redeemCode">
         <div class="quan" v-for="(item,key) in redeemCodeList" v-bind:key="key">
           <p>电影票兑换码{{key+1}}：</p>
           <div>{{item}}</div>
         </div>
        <div class="tips">
          <div>长按复制兑换码</div>
          <h6>关于兑换券使用：</h6>
          <p>
            本次活动电影兑换券供应商为网票网，每个兑换码可兑换一张电影票，支持全国9000余家合作影院50元以内2/3D一票通兑。请登录网票网 https://e.wangpiao.com/?k=aa进行兑换，并于2020年8月31日前使用，详询网票网客服热线4006782005。
          </p>
        </div>
       </div>
     </div>
     
     <toast v-model="showtip" type="text" :time="2000" width="90%" :text="text" :position="position"></toast>   
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { Toast,TransferDomDirective as TransferDom } from 'vux';
  // import ControlStyle from '../../assets/js/controlStyle.js';
  import Validate from '../../util/validateInsurItem';

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
        isCheckSheng: false,
        idNo: '',
        name:'',
        mobile: '',
        validateCode: '',
        timer: null,
        codeText: "获取验证码",
        count: 120,
        redeemCode: '',     //电影票兑换码
        redeemCodeList: []
      }
    },
    computed: mapState({
    }),
    mounted (){
      this.getScreenHeight();
      this.getPiaoCode();
      // $('input,textarea').on('blur', function () {
      //   window.scroll(0, 0);
      // });
    
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
    },
    methods:{
      ...mapActions([

      ]),
    
      getScreenHeight:function () {
        // ControlStyle.setAppBgColor(false,'#app','app');
        //判断是否是IOS,安卓
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let h= document.documentElement.clientHeight;
        if(isiOS) {
          h =  h<600 ? h + 45 : h;
        }
        this.$refs.favorite.style.height = h + 'px';
      },
      getAward(){
        this.showtip = true;
        this.text = "领奖时间已截止，不能再领取！";
        // return  //疑似人工阻断
        if(!Validate.nameAvolid(this.name) || this.name.length === 0 ) {
           this.showtip = true;
           this.text = "姓名填写错误，请重新填写！";
           return
        }
        if((!Validate.insurantCertNum(this.idNo) || this.idNo.length === 0 )) {
          this.showtip = true;
          this.text = "身份证填写错误，请重新填写！";
          return
        }

        if((!Validate.mobileNo(this.mobile) || this.mobile.length === 0 )) {
          this.showtip = true;
          this.text = "手机号填写错误，请重新填写！";
          return
        }
        let paramJson = {
          "validateType":"prizeValidateType",
          "mobile":this.mobile.replace(/\s/g, ''),
          "validateCode":this.validateCode
        };
        //验证短信验证码是否正确
        let that = this;
        that.$http.post(that.$API.CONTEXT+that.$API.VALIDATECODE.VALIDATEPHONE,paramJson).then(function (response) {
            if(response.body.resultCode =="success"){
               //短信验证通过
               that.next();
            }else{
                that.showtip = true;
                that.text = response.body.resultMsg;
            }
        });

      },
      getPiaoCode(){
        let that = this;
        let url = '/ce/zshd/searchCust';
        that.$http.post(url,{}).then(function (res) {
          if(res.resultCode === '00'){
             that.redeemCode = res.hjData ? res.hjData.redeemCode : '';
             that.redeemCodeList = that.redeemCode.split(',');
             if(res.mobile) {
               that.mobile = res.mobile;
             }
             if(res.name) {
               that.name = res.name;
             }

          }
        }).catch(function (res) {
          that.showtip = true;
          that.text = res.resultMsg;
        })
      },
      next(){
        let that = this;
        let url = '/ce/zshd/saveHj';
        let param = {
          idNo: this.idNo,
          mobile: this.mobile,
          name: this.name
        }
        that.$http.post(url,param).then(function (res) {
          if(res.resultCode=="00"){
            that.redeemCode = res.data.redeemCode;
            that.redeemCodeList = that.redeemCode.split(',');
          }
        }).catch(function (res) {
          console.log('error:' + res);
        })
      },
      getCode(){
        let that = this;
        if(this.count < 120) {
          return;
        }
        if((!Validate.mobileNo(this.mobile) || this.mobile.length === 0 )) {
          this.showtip = true;
          this.text = "手机号填写错误，请重新填写！";
          return
        }
        
        var url = that.$API.CONTEXT+that.$API.VALIDATECODE.GET_PHONECODE;
        that.$http.post(url, {mobile:that.mobile,"validateType":"prizeValidateType"}).then(function (res) {
          if(res.resultCode=="00"){
            if (!that.timer) {
              that.timer = setInterval(() => {
               
                if(that.count <= 0){
                  that.codeText = "获取验证码";
                  that.count = 120;
                  clearInterval(this.timer);
                  that.timer = null;
                  return
                }
                that.count--;
                that.codeText = '(' + that.count + 'S)获取'
              }, 1000)
            }
          }else{
            that.showtip=true;
            that.text=res.resultMsg;
          }
        }).catch(function (res) {
          console.log('error:' + res);
        })
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

 
</style>

