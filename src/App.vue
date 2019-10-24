<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import '@/util/rem.js'
export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  data(){
    return{
     
    }
  },
  created:function () {
    // let _this = this;
    console.log(process.env)
  }
}

</script>

<style>
/* @import '~vux/src/styles/reset.less'; */
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
