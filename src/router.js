import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router= new Router({
    mode:"history",
    routes:[
        {
            path:"/FavoritePerson/FavoritePersonIndex",
            name:"FavoritePersonIndex",
            meta:{
                title:'寻找有缘人'
            },
            component:()=> import('./views/FavoritePerson/FavoritePersonIndex'),
            //路由守卫(触发路由跳转到页面之前)
            // beforeEnter:(to,from,next)=>{
            //     console.log()
            // }
        },{
            path:"/FavoritePerson/QuestionOne",
            name:"QuestionOne",
            component:()=> import('./views/FavoritePerson/QuestionOne'),
            meta:{
                title:"寻找有缘人"
            }
        },{
            path:'/FavoritePerson/QuestionTwo',
            name:"QuestionTwo",
            component:()=>import('./views/FavoritePerson/QuestionTwo'),
            meta:{
                title:"寻找有缘人"
            }
        },{
            path:"/FavoritePerson/LookWish",
            name:"LookWish",
            component:()=>import('./views/FavoritePerson/LookWish'),
            meta:{
                title:"星语星愿"
            }
        },{
            path:"/FavoritePerson/WriteBless",
            name:"WriteBless",
            component:()=>import('./views/FavoritePerson/WriteBless'),
            meta:{
                title:"我的祝福"
            }
        },{
            path:"/FavoritePerson/FavoriteRule",
            name:'FavoriteRule',
            component:()=>import('./views/FavoritePerson/FavoriteRule'),
            meta:{
                title:'活动规则'
            }
        },{
            path:"/FavoritePerson/FavoriteBall",
            name:"FavoriteBall",
            component:()=>import('./views/FavoritePerson/FavoriteBall'),
            meta:{
                title:"我的有缘人"
            }
        },{
            path:"/FavoritePerson/OfflineSign",
            name:"OfflineSign",
            component:()=>import('./views/FavoritePerson/OfflineSign'),
            meta:{
                title:'签到'
            }
        },{
            path:"/FavoritePerson/ReceivePrize",
            name:"ReceivePrize",
            component:()=>import('./views/FavoritePerson/ReceivePrize'),
            meta:{
                title:'来自星星的祝福'
            }
        }
    ]
})

export default router