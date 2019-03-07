import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
var index=()=>import("@/pages/index")
var detail=()=>import("@/pages/detail")
var login=()=>import("@/pages/login")
var shopcar=()=>import("@/pages/shopcar")

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/detail',
      component: detail
    },
    {
      path: '/shopcar',
      component: shopcar
    },
  ]
})
