<template>
   <div class="favorite" ref="favorite" style="overflow: hidden;">
     <img src="./images/index05.png" class="main_shape"/>
     <div  class="myYuanFen">
        <ul class="circle" ref="circle">
          <li class="headImg" v-for="(item,index) in dataList" v-bind:key="index">
            <div class="shade"></div>
            <div class="img_box">
              <img :src="item.headImgUrl"  @click="lookWish(item)" v-show="item.headImgUrl"/>
              <img src="./images/temp.png"  v-show="!item.headImgUrl" />
            </div>
          </li>
          
        </ul>
        <div class="big_btn" @click="goAward" v-show="isHj === 'Y'">
          我的奖品
        </div>
     </div>
     
     <div class="popup" v-show="isShowPopup" @click="closePopup">
       <div class="black"></div>
       <div class="zhufu">
         <div class="top">
           <div>
              <img :src="peopleObj.headImgUrl"/>
              <P>来自{{peopleObj.nickName}}的祝福</P>
           </div>
         </div>
         <div class="text">
           <p>我们都喜欢{{peopleObj.sameItem}}</p>
           <p>祝有缘的你：</p>
           <p>{{peopleObj.zfy}}</p>
         </div>
         <div class="btm"></div>
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
        timer: null,
        dataList: [
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""},
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""},
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""},
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""},
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""},
          {headImgUrl: "",zfy: "",sameItem: "",userId: "",yyrId: ""}
        ],
        isHj: 'N',
        isShowPopup: false,
        peopleObj: {}
      }
    },
    computed: mapState({
    }),
    mounted (){
      this.getScreenHeight();
      this.getMyFavoriteList();
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    methods:{
      ...mapActions([
      ]),
    
      getScreenHeight:function () {
        // ControlStyle.setAppBgColor(false,'#app','app');
        // let h= $(window).height();
        let h = document.documentElement.clientHeight;
        this.$refs.favorite.style.height = h + 'px';
      },
      getMyFavoriteList(){
        let that = this;
        let url = '/ce/zshd/myFatePeople';
        that.$http.post(url,{}).then(function (res) {
          if(res.resultCode === '00'){
            that.isHj = res.isHj;
            let list = res.data;
            for(var i=0;i<6;i++){
               if(!list[i]) {
                  list[i] = that.dataList[i]; 
               }
            }
            that.dataList = list;
            let circle = this.$refs.circle;
            let clist = circle.children;
            that.timer = setInterval(function(){
              //获取0-5的随机数
              let num = Math.floor(Math.random()*6);
              for(var i=0;i< clist.length;i++){
                clist[i].classList.remove('active')
              }
              clist[num].classList.add('active');
            },2000) 
            
          }else {
            that.showtip = true;
            that.text = res.resultMsg;
          }
        }).catch(function (res) {
          that.showtip = true;
          that.text = res.resultMsg;
        })
      },
      closeMask(){

      },
      goLookWish(){
        this.$router.push({path:"/FavoritePerson/LookWish"});
      },
      goQuestionPage(){
        this.$router.push({path:"/FavoritePerson/QuestionOne"});
      },
      lookWish(item){
        this.isShowPopup = true;
        this.peopleObj =  item;
      },
      closePopup(){
        this.isShowPopup = false;
      },
      goAward(){
        this.$router.push({path:"/FavoritePerson/ReceivePrize"});
      },
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";
</style>

