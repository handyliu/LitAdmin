import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Dashboard from '@/views/dashboard/index'
import Mapboard from '@/views/mapboard/index'

import BookList from '@/views/book/list'
import BookCategoryList from '@/views/bookcategory/list'

import UserList from '@/views/user/list'
import UserChangePwd from '@/views/user/changepwd'
import UserProfile from '@/views/user/profile'

import Page404 from '@/views/errorPage/404'
import Page401 from '@/views/errorPage/401'

import CompanyList from '@/views/company/index'
import CustomerList from '@/views/customer/index'
import DeviceList from '@/views/device/index' 
import CameraList from '@/views/camera/index' 
import AlarmList from '@/views/alarm/index'
import PatrolList from '@/views/patrol/index'
import PushMsgList from '@/views/pushMsg/index'
import DemoList from '@/views/demo/index'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/views/Login'], resolve)

Vue.use(Router)

let router = new Router({
  // mode: 'history',
  routes: [{
      path: '/login',
      name: '登录',
      component: Login
    },
    { path: '/404', component: Page404, hidden: true },
    { path: '/401', component: Page401, hidden: true },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/mapboard/index',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [{
        path: '/mapboard/index',
        component: Mapboard,
        name: '首页',
        menuShow: true,
        children: [{
            path: '/mapboard/energy',
            component: resolve => require(['../views/mapboard/echats/energy.vue'], resolve)
          },
          {
            path: '/mapboard/aqi',
            component: resolve => require(['../views/mapboard/echats/aqi.vue'], resolve)
          },
          {
            path: '/mapboard/tranmap',
            component: resolve => require(['../views/mapboard/bmap/tranmap.vue'], resolve)
          },
          {
            path: '/mapboard/hostmap',
            component: resolve => require(['../views/mapboard/echats/hostmap.vue'], resolve)
          },
          {
            path: '/mapboard/map',
            component: resolve => require(['../views/mapboard/bmap/map.vue'], resolve)
          }
        ]
      }]
    },
    {
      path: '/',
      component: Home,
      redirect: '/company/index',
      name: '企业管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-books',
      children: [{ path: '/company/index', component: CompanyList, name: '企业列表', menuShow: true, meta: { title: '企业列表', icon: 'component', noCache: true }}]
    },
    {
      path: '/',
      component: Home,
      redirect: '/customer/index', // noredirect
      name: '客户管理',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-users',
      children: [{ path: '/customer/index', component: CustomerList, name: '客户列表', menuShow: true, meta: { title: '客户列表', icon: 'peoples', noCache: true }}]
    },
    {
      path: '/device',
      component: Home,
      redirect: '/device/index',
      name: '主机管理',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/device/index', component: DeviceList, name: '主机列表', menuShow: true, meta: { title: '主机列表', icon: 'international', noCache: true }}]
    },
    {
      path: '/camera',
      component: Home,
      redirect: '/camera/index',
      name: '监控管理',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/camera/index', component: CameraList, name: '摄像头列表', menuShow: true, meta: { title: '摄像头列表', icon: 'eye', noCache: true }}]
    },
    {
      path: '/alarm',
      component: Home,
      redirect: '/alarm/index',
      name: '报警记录',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/alarm/index', component: AlarmList, name: '报警记录列表', menuShow: true, meta: { title: '报警记录列表', icon: 'bug', noCache: true }}]
    },
    {
      path: '/patrol',
      component: Home,
      redirect: '/patrol/index',
      name: '巡更报告',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/patrol/index', component: PatrolList, name: '巡更报告列表', menuShow: true, meta: { title: '巡更报告列表', icon: 'excel', noCache: true }}]
    },
    {
      path: '/pushmsg',
      component: Home,
      redirect: '/pushmsg/index',
      name: '推送消息',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/pushmsg/index', component: PushMsgList, name: '消息推送列表', menuShow: true, meta: { title: '消息推送列表', icon: 'message', noCache: true }}]
    },
    {
      path: '/demo',
      component: Home,
      redirect: '/demo/index',
      name: '组件测试',
      menuShow: true,
      leaf: true,
      iconCls: 'iconfont icon-books',
      children: [{ path: '/demo/index', component: DemoList, name: 'demo', menuShow: true, meta: { title: 'demo', icon: 'message', noCache: true }}]
    },
    {
      path: '/',
      component: Home,
      name: '设置',
      menuShow: true,
      iconCls: 'iconfont icon-setting1',
      children: [
        { path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true },
        { path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true }
      ]
    },
    { path: '*', redirect: '/404', hidden: true }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

export default router
