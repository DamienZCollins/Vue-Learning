import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { useAuthStore } from '@/stores/auth'
import { installRouterGuards } from './guards'
import { appRoutes } from './routes'

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: appRoutes,
  })
}

describe('router guards', () => {
  it('redirects anonymous users to login', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const router = createTestRouter()
    installRouterGuards(router, pinia)

    await router.push('/dashboard')

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/dashboard')
  })

  it('redirects unauthorized roles to 404', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const router = createTestRouter()
    installRouterGuards(router, pinia)
    const authStore = useAuthStore()

    await authStore.login({
      username: 'editor',
      password: '123456',
      role: 'editor',
      remember: true,
    })

    await router.push('/permission-demo')

    expect(router.currentRoute.value.name).toBe('not-found')
    expect(router.currentRoute.value.query.reason).toBe('permission')
  })
})
