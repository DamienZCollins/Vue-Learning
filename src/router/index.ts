import { createRouter, createWebHistory } from 'vue-router'

import { appRoutes } from './routes'

export const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes,
  scrollBehavior() {
    return { top: 0 }
  },
})
