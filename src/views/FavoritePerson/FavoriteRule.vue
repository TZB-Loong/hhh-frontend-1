<template>
   <div>
     <div >
       <img src="./images/rule01.jpg" />
       <img src="./images/rule02.jpg" />
       <img src="./images/rule03.jpg" />
     </div>
     <div v-wechat-title="$route.meta.title"></div>
   </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import {TransferDomDirective as TransferDom } from 'vux';


  export default {
    name: 'app',
    directives: {
      TransferDom
    },
    components: {
      
    },
    data(){
      return{
       
      }
    },
    computed: mapState({
      userInfo: state=> state.Products.userInfo
    }),
    mounted (){
       scrollTo(0,0)
    },
    beforeDestroy(){
    
    },
    methods:{
      ...mapActions([
      ]),
    }
  }
</script>


<style lang="less" scoped>
   img{
     display: block;
     max-width: 100%;
   }
 
</style>

