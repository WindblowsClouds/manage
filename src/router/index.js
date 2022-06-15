import store from "@/store";
import login from "@/store/login";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
//重写push（）方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
let originReplace = VueRouter.prototype.originReplace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

const routes = [
    {
        name: 'main',
        path: '/',
        redirect:'/home',
        component: () => import('@/veiws/Main'),
        children: [
            {
                name: 'home',
                path: 'home',
                component: () => import('@/veiws/Home'),
                meta:{name:'首页'}
            },
            {
                name: 'user',
                path: 'user/:keyword?',
                component: () => import('@/veiws/User'),
                meta:{name:'用户管理'}
            },
            {
                name: 'mall',
                path: 'mall',
                component: () => import('@/veiws/Mall'),
                meta:{name:'商品管理'}
            },

            {
                name: 'page1',
                path: 'page1',
                component: () => import('@/veiws/Other/pageOne'),
                meta:{name:'页面1'}
            },
            {
                name: 'page2',
                path: 'page2',
                component: () => import('@/veiws/Other/pageTwo'),
                meta:{name:'页面2'}
            }

        ]
    },{
        path:'/login',
        name:'login',
        component: () => import('@/veiws/Login'),
    }

    //路由重定向
    /*    {
           path:'*',
           redirect:'/'
       } */
]



const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to,form,next)=>{
    const token=store.state.login.token
    if(!token && to.name !== 'login'){
        next({name:'login'})
    }else if(token && to.name==='login'){
        next({name:'home'})
    } 
    else{
        next()
    }
})

export default router