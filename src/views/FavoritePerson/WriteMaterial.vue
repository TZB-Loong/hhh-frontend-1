<template>
   <div class="favorite" ref="favorite">
      <div class="questionTwo show" ref="fruit">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text04.png"/></div>
          <div class="form">
            <div class="first">
              <textarea placeholder="请输入我的祝福语"></textarea>
            </div>
            <div class="second">
              <input placeholder="请输入姓名" />
            </div>
            <div  class="second">
              <input placeholder="请输入手机号" />
            </div>
          </div>
          <div class="big_btn">有缘人，我来啦</div>
          <div class="tips">
            请正确填写以便抽取祝福礼品；<br/>
            2张网票网2/3D电影兑换券，支持全国9000余家合作影院一票通兑。
          </div>
        </div>
      <div class="popup" v-show="isShowPopup">
        <div class="black"></div>
        <img src="./images/top04.png" class="qcode"/>
      </div>
      </div>
     
     <toast v-model="showtip" type="text" :time="2000" width="90%" :text="text" :position="position"></toast>   
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { Toast, PopupPicker,Group,TransferDomDirective as TransferDom } from 'vux';
  import ControlStyle from '../../assets/js/controlStyle.js';

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
        isShowPopup: false
      }
    },
    computed: mapState({
    }),
    mounted (){
      this.getScreenHeight();
    
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
    },
    methods:{
      ...mapActions([

      ]),
    
      getScreenHeight:function () {
        ControlStyle.setAppBgColor(false,'#app','app');
        let h=$(window).height();
        console.log(h)
        this.$refs.favorite.style.height = h + 'px';
      },
      selectSex(type){
        this.sex = type;
      },
      checkSheng(){
        this.isCheckSheng = !this.isCheckSheng;
      },
      goQuestionTwo(){
        //判断性别是否已选择
        if(this.sex !== 'boy' && this.sex !== 'girl'){
          this.showtip = true;
          this.text = '请先选择性别！'
          return;
        }
        if(!this.isCheckSheng) {
          this.showtip = true;
          this.text = '请先勾选隐私声明！'
          return;
        }
        this.$router.push({path: "/FavoritePerson/QuestionTwo"})
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

 
</style>

