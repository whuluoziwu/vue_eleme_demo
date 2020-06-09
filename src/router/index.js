import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import AdminHome from '../components/admin/AdminHome'
import AdminWelcome from '../components/admin/Welcome'
import Stores from '../components/admin/stores/Stores'
import AdminOrders from '../components/admin/orders/Orders'
import Users from '../components/admin/users/Users'
import Report from '../components/admin/report/Report'
// 商家后台
import StoreHome from '../components/store/StoreHome'
import StoreWelcome from '../components/store/Welcome'
import Goods from '../components/store/goods/Goods'
import Add from '../components/store/goods/Add'
import StoreOrders from '../components/store/orders/Orders'
// import Edit from '../components/store/goods/Edit'
// import StoreUser from '../components/store/user/User'
// 配送员后台
import DeliveryHome from '../components/delivery/DeliveryHome'
import DeliveryWelcome from '../components/delivery/Welcome'
import DeliveryOrers from '../components/delivery/orders/Orders'

// 顾客后台
import CustomerHome from '../components/customer/CustomerHome'
import CustomerWelcome from '../components/customer/Welcome'
import info from '../components/customer/info/info'
import editInfo from '../components/customer/info/Edit'

import CustomerOrders from '../components/customer/orders/Orders'
Vue.use(VueRouter)

// const routes = []

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' }, // 根路径跳转到login
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
      path: '/admin/home',
      component: AdminHome,
      redirect: '/admin/welcome',
      children: [
        { path: '/admin/welcome', component: AdminWelcome },
        { path: '/admin/users', component: Users },
        { path: '/admin/stores', component: Stores },
        { path: '/admin/orders', component: AdminOrders },
        { path: '/admin/reports', component: Report }
      ]
    },
    {
      path: '/customer/home',
      component: CustomerHome,
      redirect: '/customer/welcome',
      children: [
        { path: '/customer/welcome', component: CustomerWelcome },
        { path: '/customer/info', component: info },
        { path: '/customer/info', component: editInfo },
        { path: '/customer/orders', component: CustomerOrders }

      ]
    },
    {
      path: '/store/home',
      component: StoreHome,
      redirect: '/store/welcome',
      children: [
        { path: '/store/welcome', component: StoreWelcome },
        // { path: '/store/users', component: StoreUser },
        { path: '/store/goods', component: Goods },
        { path: '/store/goods/add', component: Add },
        { path: '/store/orders', component: StoreOrders }
        // { path: '/store/goods/edit', component: Edit }
      ]
    },
    {
      path: '/delivery/home',
      component: DeliveryHome,
      redirect: '/delivery/welcome',
      children: [
        { path: '/delivery/welcome', component: DeliveryWelcome },
        { path: '/delivery/orders', component: DeliveryOrers }
      ]
    }
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数，表示放行
//   //     next()  放行    next('/login')  强制跳转
//
//   if (to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router
