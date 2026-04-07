import type { RouteRecordRaw } from 'vue-router'

export const adminChildren: RouteRecordRaw[] = [
  {
    path: '',
    redirect: { name: 'dashboard' },
  },
  {
    path: 'dashboard',
    name: 'dashboard',
    component: () => import('@/pages/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'DataLine',
      requiresAuth: true,
      affix: true,
      keepAlive: true,
    },
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('@/pages/users/index.vue'),
    meta: {
      title: '用户管理',
      icon: 'User',
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    path: 'forms',
    name: 'forms',
    component: () => import('@/pages/forms/index.vue'),
    meta: {
      title: '表单示例',
      icon: 'EditPen',
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    path: 'settings',
    name: 'settings',
    component: () => import('@/pages/settings/index.vue'),
    meta: {
      title: '设置页',
      icon: 'Tools',
      requiresAuth: true,
      keepAlive: true,
    },
  },
  {
    path: 'permission-demo',
    name: 'permission-demo',
    component: () => import('@/pages/permission-demo/index.vue'),
    meta: {
      title: '权限演示',
      icon: 'Lock',
      requiresAuth: true,
      roles: ['admin'],
      keepAlive: true,
    },
  },
]

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/layouts/auth/AuthLayout.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/pages/login/index.vue'),
        meta: {
          title: '登录',
          hidden: true,
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    meta: {
      title: '后台',
      requiresAuth: true,
    },
    children: adminChildren,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/not-found/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
]
