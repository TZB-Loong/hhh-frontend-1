<template>
   <div class="favorite" ref="favorite">
     <div class="questionTwo show" ref="fruit">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text01.png"/></div>
          <div class="tit">
            你最喜欢什么水果(单选)
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="1"  @click="fruitCheck($event)"/>
                  <div class="nomal">苹果</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="2"  @click="fruitCheck($event)"/>
                  <div class="nomal">草莓</div>
              </div>   
              <div>
                  <img src="./images/no_check.png" id="3"  @click="fruitCheck($event)"/>
                  <div class="nomal">西瓜</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="4"  @click="fruitCheck($event)"/>
                  <div class="nomal">桃子</div>
              </div>
                    
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png" id="5"  @click="fruitCheck($event)"/>
                  <div class="nomal">香蕉</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="6"  @click="fruitCheck($event)"/>
                  <div class="nomal">雪梨</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="7"  @click="fruitCheck($event)"/>
                  <div class="nomal">榴莲</div>
              </div>
            </div>
          </div>
        </div>
     </div>
     <div class="questionTwo hide" ref="activity" >
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text02.png"/></div>
          <div class="tit">
              你喜欢的休闲活动(必选两项)
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="8"  @click="activityCheck($event)"/>
                  <div class="nomal">吃鸭脖</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="9"  @click="activityCheck($event)"/>
                  <div class="nomal">逛街</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="10"  @click="activityCheck($event)"/>
                  <div class="nomal">喝啤酒</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="11"  @click="activityCheck($event)"/>
                  <div class="nomal">睡觉</div>
              </div>         
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png" id="12"  @click="activityCheck($event)"/>
                  <div class="nomal">听音乐</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="13"  @click="activityCheck($event)"/>
                  <div class="nomal">体育运动</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="14"  @click="activityCheck($event)"/>
                  <div class="nomal">敷面膜</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="15"  @click="activityCheck($event)"/>
                  <div class="nomal">吃麻辣烫</div>
              </div>
            </div>
          </div>
        </div>
     </div>
     <div class="questionTwo hide" ref="tour" >
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text03.png"/></div>
          <div class="tit">
              最想和朋友去哪里旅游(必选两项)
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="16"  @click="tourCheck($event)"/>
                  <div class="nomal">新疆</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="17"  @click="tourCheck($event)"/>
                  <div class="nomal">西藏</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="18"  @click="tourCheck($event)"/>
                  <div class="nomal">张家界</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="19"  @click="tourCheck($event)"/>
                  <div class="nomal">九寨沟</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="20"  @click="tourCheck($event)"/>
                  <div class="nomal">凤凰古城</div>
              </div>         
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png" id="21"  @click="tourCheck($event)"/>
                  <div class="nomal">龙门石窟</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="22"  @click="tourCheck($event)"/>
                  <div class="nomal">丽江</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="23"  @click="tourCheck($event)"/>
                  <div class="nomal">三亚</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="24"  @click="tourCheck($event)"/>
                  <div class="nomal">内蒙古</div>
              </div>
            </div>
          </div>
        </div>
     </div>    
     <div class="questionTwo hide" ref="teleplay">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text01.png"/></div>
          <div class="tit">
            你喜欢哪些电视剧(必选两项)
          </div>
          <div class="check chang">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="25"  @click="teleplayCheck($event)"/>
                  <div class="nomal">射雕英雄传</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="26"  @click="teleplayCheck($event)"/>
                  <div class="nomal">权力的游戏</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="27"  @click="teleplayCheck($event)"/>
                  <div class="nomal">亮剑</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="28"  @click="teleplayCheck($event)"/>
                  <div class="nomal">长安十二时辰</div>
              </div>         
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png" id="29"  @click="teleplayCheck($event)"/>
                  <div class="nomal">琅琊榜</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="30"  @click="teleplayCheck($event)"/>
                  <div class="nomal">延禧宫略</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="31"  @click="teleplayCheck($event)"/>
                  <div class="nomal">伪装者</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="32"  @click="teleplayCheck($event)"/>
                  <div class="nomal">三生三世十里桃花</div>
              </div>
            </div>
          </div>
        </div>
     </div>
     <div class="questionTwo hide" ref="club">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text02.png"/></div>
          <div class="tit">
              最想加入什么俱乐部(必选两项)
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="33"  @click="clubCheck($event)"/>
                  <div class="nomal">登山</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="24"  @click="clubCheck($event)"/>
                  <div class="nomal">跑步</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="35"  @click="clubCheck($event)"/>
                  <div class="nomal">打高尔夫</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="36"  @click="clubCheck($event)"/>
                  <div class="nomal">打网球</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="37"  @click="clubCheck($event)"/>
                  <div class="nomal">踢足球</div>
              </div>            
            </div>
            <div class="right">
              <div>
                  <img src="./images/no_check.png" id="38"  @click="clubCheck($event)"/>
                  <div class="nomal">瑜伽</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="39"  @click="clubCheck($event)"/>
                  <div class="nomal">练舞蹈</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="40"  @click="clubCheck($event)"/>
                  <div class="nomal">打麻将</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="41"  @click="clubCheck($event)"/>
                  <div class="nomal">插花艺术</div>
              </div>
            </div>
          </div>
        </div>
     </div>
     <div class="questionTwo hide" ref="color">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text03.png"/></div>
          <div class="tit">
              最喜欢的颜色(单选题)
          </div>
          <div class="check">
            <div class="left">
              <div>
                  <img src="./images/no_check.png" id="42"  @click="colorCheck($event)"/>
                  <div class="nomal">玫瑰红</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="43"  @click="colorCheck($event)"/>
                  <div class="nomal">天空蓝</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="44"  @click="colorCheck($event)"/>
                  <div class="nomal">柠檬黄</div>
              </div> 
              <div>
                  <img src="./images/no_check.png" id="45"  @click="colorCheck($event)"/>
                  <div class="nomal">翡翠绿</div>
              </div>        
            </div>
            <div class="right">
               <div>
                  <img src="./images/no_check.png" id="46"  @click="colorCheck($event)"/>
                  <div class="nomal">粉嫩粉</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="47"  @click="colorCheck($event)"/>
                  <div class="nomal">富贵紫</div>
              </div>
              <div>
                  <img src="./images/no_check.png" id="48"  @click="colorCheck($event)"/>
                  <div class="nomal">土豪金</div>
              </div> 
            </div>
          </div>
        </div>
     </div>
     <div class="questionTwo hide" ref="material">
        <img src="./images/index03.png"/>
        <div class="cnt">
          <div><img src="./images/text04.png"/></div>
          <div class="form">
            <div class="first">
              <textarea placeholder="请输入我的祝福语,最多不超过30字" v-model="zfy" :disabled="originZfy.length > 0"></textarea>
            </div>
            <div class="second">
              <input placeholder="请输入姓名" v-model="name"/>
            </div>
            <div  class="second">
              <input placeholder="请输入手机号" v-model="mobile"/>
            </div>
          </div>
          <div class="big_btn" @click="goNext">有缘人，我来啦</div>
          <div class="tips">
            请正确填写以便抽取祝福礼品：<br/>
            2张网票网2/3D电影兑换券，支持全国9000余家合作影院一票通兑。
          </div>
        </div>
     </div>
     <!-- <div class="popup" v-show="isShowPopup" @click="closePopup">
        <div class="black"></div>
        <img src="./images/top04.png" class="qcode"/>
     </div> -->
     <toast v-model="showtip" type="text" :time="2000" width="90%" :text="text" :position="position"></toast>
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { Toast,TransferDomDirective as TransferDom } from 'vux';
  // import {setAppBgColor} from '../../util/util';
  import Validate from '../../util/validateInsurItem';
  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {Toast},
    data(){
      return{
        showtip:false,
        position:"middle",
        text:"",
        showLoadFlag: false,
        loadText:"数据加载中……",
        sex: "",
        isCheckSheng: false,
        checkedImg: require('./images/checked.png'),
        fruitList:[],
        activityList: [],
        tourList: [],
        teleplayList: [],
        clubList: [],
        colorList: [],
        agentCode: '',
        zfy: '',
        name: '',
        mobile: '',
        originZfy: ''
      }
    },
    computed: mapState({
        userInfo: state=> state.Products.userInfo
    }),
    mounted (){
      this.getScreenHeight();
      this.sex = this.$route.query.sex;
      this.agentCode = this.$route.query.agentCode;
      this.getCustomerInfo();
        
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
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
        }, function (response) {
          that.showtip=true;
          that.text= response;
        })
      },
      getScreenHeight:function () {
      //  setAppBgColor(false,'#app','app');
        //判断是否是IOS,安卓
        var u = navigator.userAgent;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let h = document.documentElement.clientHeight;
        if(isiOS) {
          h =  h<600 ? h + 45 : h;
        }
        this.$refs.favorite.style.height = h + 'px';
      },
      goNext(){
        if(this.zfy.length > 30 || this.zfy.length === 0 ){
           this.showtip = true;
           this.text = "祝福语最多30字，请重新填写！";
           return
        }
        if(!Validate.nameAvolid(this.name) || this.name.length === 0 ) {
           this.showtip = true;
           this.text = "姓名填写错误，请重新填写！";
           return
        }
        if((!Validate.mobileNo(this.mobile) || this.mobile.length === 0 )) {
          this.showtip = true;
          this.text = "手机号填写错误，请重新填写！";
          return
        }
        let that = this;
        let url = '/ce/zshd/saveQuestion';
        let answers = [];
        answers[0] = this.sex;
        answers = answers.concat(this.fruitList,this.activityList,this.tourList,this.teleplayList,this.clubList,this.colorList);
        let param = {
            zfy: this.zfy,
            name: this.name,
            mobile: this.mobile,
            agentCode: this.agentCode,
            answers: answers
        }
        that.$http.post(url, param).then(function (res) {
            if(res.resultCode === '00'){
                that.$router.push({path:"/FavoritePerson/FavoriteBall",query:{agentCode: that.agentCode}});
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
      fruitCheck(e){
          if(this.fruitList.length >= 1){
              return;
          }
          let tag = e.target;
          let id = tag.id;
          this.fruitList.push(id);
          tag.src = this.checkedImg;
          let timer = setTimeout(()=>{
            this.$refs.fruit.classList.remove("show");
            this.$refs.fruit.classList.add("hide");
            this.$refs.activity.classList.remove("hide");
            this.$refs.activity.classList.add("show");
            clearTimeout(timer);
         },500);
         
      },
      activityCheck(e){
         if(this.activityList.length >= 2){
              return;
          }
          let tag = e.target;
          let id = tag.id;
          //如果同个选项不能重复选
          if(this.activityList.length === 1 && this.activityList[0] === id){
              return;
          }
          this.activityList.push(id);
          tag.src = this.checkedImg;
          if(this.activityList.length === 2) {
            let timer = setTimeout(()=>{
                this.$refs.activity.classList.remove("show");
                this.$refs.activity.classList.add("hide");
                this.$refs.tour.classList.remove("hide");
                this.$refs.tour.classList.add("show");
                clearTimeout(timer);
            },500);
          }
      },
      tourCheck(e){
        if(this.tourList.length >= 2){
              return;
          }
          let tag = e.target;
          let id = tag.id;
          //如果同个选项不能重复选
          if(this.tourList.length === 1 && this.tourList[0] === id){
              return;
          }
          this.tourList.push(id);
          tag.src = this.checkedImg;
          if(this.tourList.length === 2) {
            let timer = setTimeout(()=>{
                this.$refs.tour.classList.remove("show");
                this.$refs.tour.classList.add("hide");
                this.$refs.teleplay.classList.remove("hide");
                this.$refs.teleplay.classList.add("show");
                clearTimeout(timer);
            },500);
          }
      },
      teleplayCheck(e){
        if(this.teleplayList.length >= 2){
              return;
        }
        let tag = e.target;
        let id = tag.id;
        //如果同个选项不能重复选
        if(this.teleplayList.length === 1 && this.teleplayList[0] === id){
            return;
        }
        this.teleplayList.push(id);
        tag.src = this.checkedImg;
        if(this.teleplayList.length === 2) {
            let timer = setTimeout(()=>{
                this.$refs.teleplay.classList.remove("show");
                this.$refs.teleplay.classList.add("hide");
                this.$refs.club.classList.remove("hide");
                this.$refs.club.classList.add("show");
                clearTimeout(timer);
            },500);
        }
      },
      clubCheck(e){
        if(this.clubList.length >= 2){
              return;
          }
          let tag = e.target;
          let id = tag.id;
          //如果同个选项不能重复选
          if(this.clubList.length === 1 && this.clubList[0] === id){
             return;
          }
          this.clubList.push(id);
          tag.src = this.checkedImg;
          if(this.clubList.length === 2) {
            let timer = setTimeout(()=>{
                this.$refs.club.classList.remove("show");
                this.$refs.club.classList.add("hide");
                this.$refs.color.classList.remove("hide");
                this.$refs.color.classList.add("show");
                clearTimeout(timer);
            },500);
          }
      },
      colorCheck(e){
        if(this.colorList.length >= 1){
            return;
        }
        let tag = e.target;
        let id = tag.id;
        this.colorList.push(id);
        tag.src = this.checkedImg;
        if(this.colorList.length === 1) {
            let timer = setTimeout(()=>{
                this.$refs.color.classList.remove("show");
                this.$refs.color.classList.add("hide");
                this.$refs.material.classList.remove("hide");
                this.$refs.material.classList.add("show");
                clearTimeout(timer);
            },500);
          }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

 
</style>

