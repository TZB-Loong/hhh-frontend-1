<template>
   <div class="favorite" ref="favorite">
     <div class="questionOne">
        <img src="./images/index04.png"/>
        <div class="cnt">
          <div class="tit">
            我是：
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" v-show="sex !=='M'" @click="selectSex('M')"/>
                  <img src="./images/checked.png" v-show="sex ==='M'" @click="selectSex('M')"/>
                  <div class="boy">男生</div>
              </div>    
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png"  v-show="sex !=='F'" @click="selectSex('F')"/>
                  <img src="./images/checked.png"  v-show="sex ==='F'" @click="selectSex('F')"/>
                  <div class="girl">女生</div>
              </div>
              
            </div>
          </div>

          <div class="big_btn" @click="goQuestionTwo">开始结缘</div>
          <div class="sheng">
            <img src="./images/no_check.png" v-show="!isCheckSheng" @click="checkSheng"/>
            <img src="./images/checked.png" v-show="isCheckSheng"  @click="checkSheng"/>
            <div>本人授权恒大人寿使用本次活动填写信息，以便更好的完成活动所需的操作及服务流程。</div>
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
  // import {setAppBgColor} from '../../util/util';

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
        agentCode: ''
      }
    },
    computed: mapState({
    }),
    mounted (){
      this.getScreenHeight();
      this.agentCode = this.$route.query.agentCode;
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
    },
    methods:{
      ...mapActions([

      ]),
    
      getScreenHeight:function () {
        // setAppBgColor(false,'#app','app');
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let h = document.documentElement.clientHeight;
        if(isiOS) {
          h =  h<600 ? h + 45 : h;
        }
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
        if(this.sex !== 'M' && this.sex !== 'F'){
          this.showtip = true;
          this.text = '请先选择性别！'
          return;
        }
        if(!this.isCheckSheng) {
          this.showtip = true;
          this.text = '请先勾选隐私声明！'
          return;
        }
        this.$router.push({path: "/FavoritePerson/QuestionTwo",query: {sex: this.sex,agentCode: this.agentCode}})
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

 
</style>

