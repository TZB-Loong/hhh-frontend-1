import Vue from 'vue';
import Vuex from 'vuex'; //引入 vuex
// import http from '../util/http'; 
// import store from './store' //注册store (全家的数据存储)

// 如果数据还有其他组件复用，建议放在vuex
// 如果需要跨多级组件传递数据，建议放在vuex
// 需要持久化的数据（如登录后用户的信息），建议放在vuex
// 跟当前业务组件强相关的数据,可以放在组件内 

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        userInfo:{
            name:"exxuquanlong036"
        }
    },

})