<template>
   <div class="favorite" ref="favorite">
      <img src="./images/index02.png" class="main_shape"/> 
      <div class="lookwish">
        <div class="tip">
          <div>
              偶然的相遇，暮然的回首，<br/>注定彼此的情分，只为心动的刹那。
          </div>
        </div>
        <vue-seamless-scroll :data="listData" :class-option="optionSingleHeightTime" class="list">
            <ul>
                <li v-for="(item,index) in listData"  class="item" v-bind:key="index">
                    <div class="headImg">
                      <img :src="item.headImgUrl" />
                    </div>
                    <div class="ju">
                        {{item.zfy}}
                    </div>
                </li>
            </ul>
        </vue-seamless-scroll>

        <!-- <div class="list" v-show="false" >
          <ul>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                 朋友，惟愿你天天开心1
              </div>
            </li>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                  朋友，惟愿你天天开2
              </div>
            </li>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                  朋友，惟愿你天天开3
              </div>
            </li>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                  朋友，惟愿你天天开4
              </div>
            </li>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                  朋友，惟愿你天天开心5
              </div>
            </li>
            <li class="item">
              <div class="headImg">
                <img src="./images/temp.jpg" />
              </div>
              <div class="ju">
                  朋友，惟愿你天天开心6
              </div>
            </li>
            <li class="item">
                <div class="headImg">
                  <img src="./images/temp.jpg" />
                </div>
                <div class="ju">
                    朋友，惟愿你天天开心6
                </div>
            </li>
          </ul>
        </div> -->

        <div class="bottomBox">
          <div class="refresh" @click="refreshWishList">
                刷新祝福
          </div>
          <div class="btns">
            <div @click="goBack">返回</div>
            <div @click="goLookWish">送祝福</div>
          </div>
        </div>
      </div>
      <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import {  mapActions } from 'vuex'
  import { TransferDomDirective as TransferDom } from 'vux';



  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: { },
    data(){
      return{
        showtip:false,
        position:"top",
        text:"",
        showLoadFlag: false,
        loadText:"数据加载中……",
        frameImg: '',
        listData: [],
        agentCode: ''
      }
    },
    computed: {
      optionSingleHeightTime () {
         //算出根据屏幕长度，最多能放几个列表
         let h = document.documentElement.clientHeight*0.65;
         let num = Math.ceil(h/65);
         console.log(999,num)
         return {
              singleHeight: 65,
              limitMoveNum: num,
              waitTime: 1500
         }
      }
    },
    mounted (){
      this.getScreenHeight();
      this.getWishList();
      this.agentCode = this.$route.query.agentCode;
       
    },
    beforeDestroy(){
      localStorage.removeItem('SHOWPOSTER');
    },
    methods:{
      ...mapActions([

      ]),
    
      getScreenHeight:function () {
        let h = document.documentElement.clientHeight;
        this.$refs.favorite.style.height = h + 'px';
      },
      getWishList(){
        let that = this;
        let url = '/ce/zshd/searchBlessing';
        that.$http.post(url,{}).then(function (res) {
          if(res.data.length > 0){
            that.listData = res.data;
          }
        }).catch(function (res) {
          that.showtip = true;
          that.text = res.resultMsg;
        })
      },
      refreshWishList(){
        this.getWishList()
      },
      goLookWish(){
        this.$router.push({path:"/FavoritePerson/WriteBless",query: {agentCode: this.agentCode}});
      },
      goBack(){
        this.$router.push({path:"/FavoritePerson/FavoritePersonIndex"});
      }
    }
  }
</script>


<style lang="less" scoped>
  @import "./index.less";

 
</style>

