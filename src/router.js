import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//放置公共的路由地址


const router = new Router({
    mode: "history",
    routes: [
        {
            path: '/404',
            name: '404',
            component: () => import('./views/404'),
            meta: {
                title: "该活动尚未上线或者已下线"
            }
        },
        {
            path: "*",
            redirect: "/404"
        }
    ]
})

export default router