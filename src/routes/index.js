import { lazy } from 'react'
import Home from "@/pages/home"

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: lazy(() => import('@/pages/detail')),
    meta: {
      title: '详情页面'
    }
  },
  {
    path: '/personal',
    name: 'personal',
    component: lazy(() => import('@/pages/personal')),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/collect',
    name: 'collect',
    component: lazy(() => import('@/pages/collect')),
    meta: {
      title: '收藏页面'
    }
  },
  {
    path: '/update',
    name: 'update',
    component: lazy(() => import('@/pages/update')),
    meta: {
      title: '资料更新'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: lazy(() => import('@/pages/login')),
    meta: {
      title: '登录页面'
    }
  },
  {
    path: '*',
    name: '404',
    component: lazy(() => import('@/pages/404')),
    meta: {
      title: '404'
    }
  },
]

export default routes