import Vue from 'vue';
// import  { LoadingPlugin } from 'vux';
import App from './App.vue';
import ajax from './util/ajax';
import router from './router';
import store from './store';
import actionRouter from './router/index';
import vueWechatTitle from 'vue-wechat-title';
import scroll from 'vue-seamless-scroll'
import './util/rem.js';
import './global.less';
Vue.config.productionTip = false
Vue.prototype.$http = ajax; // 注入vue中使用数据请求（ 在本身store中进行进行数据的请求）
Vue.use(vueWechatTitle);
Vue.use(scroll);
// Vue.use(LoadingPlugin);

router.addRoutes(actionRouter.favoritePerson); //动态的添加各个活动模块的路由（只添加在活动时间范围内的（添加寻找有缘人活动的路由））
router.beforeEach((to, from, next) => { //前置的路由守卫
  var isStart = 1;
  /**
   *  调用一个接口并从中获取到的信息
   *  1，需要加载活动路由模块名称(动态添加路由,或者所有目前在线活动的路由)(如果说获取到目前所有在线的活动，则不需要获取到活动的开始与结束的时间)
   *  2，当前活动的开始时间与结束时间 
   *  3，将当前时间与活动的开始时间和结束时间对比获取到结束与开始
   */
  
  if (isStart == 1) { //进行中
    next(); 
  }else{
    if(to.path=='/404'){
      next();
    }else{
      next("/404");
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
