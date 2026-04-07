import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { hasPermission } from '@/shared/lib/permissions'

function buildDocumentTitle(title?: string) {
  const baseTitle = 'Vue3-Frontend-Architecture-Mastery-Dashboard'
  return title ? `${title} · ${baseTitle}` : baseTitle
}

export function installRouterGuards(router: Router, pinia: Pinia) {
  router.beforeEach((to) => {
    const authStore = useAuthStore(pinia)

    if (to.name === 'login' && authStore.isAuthenticated)
      return { name: 'dashboard' }

    if (to.meta.requiresAuth && !authStore.isAuthenticated)
      return { name: 'login', query: { redirect: to.fullPath } }

    if (to.meta.roles && !hasPermission(to.meta.roles, authStore.roles))
      return {
        name: 'not-found',
        query: {
          reason: 'permission',
          from: to.fullPath,
        },
      }

    return true
  })

  router.afterEach((to) => {
    document.title = buildDocumentTitle(String(to.meta.title ?? ''))
  })
}
