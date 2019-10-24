import Vue from 'vue';
// import  { LoadingPlugin } from 'vux';
import App from './App.vue';
import ajax from './util/ajax';
import router from './router';
import store from './store';
import vueWechatTitle from 'vue-wechat-title';
import scroll from 'vue-seamless-scroll'

Vue.config.productionTip = false
Vue.prototype.$http = ajax; // 注入vue中使用数据请求（ 在本身store中进行进行数据的请求）
Vue.use(vueWechatTitle);
Vue.use(scroll);
// Vue.use(LoadingPlugin);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
