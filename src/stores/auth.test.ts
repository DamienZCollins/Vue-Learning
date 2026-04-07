import { setActivePinia, createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'

import { useAuthStore } from './auth'

describe('auth store', () => {
  it('logs in and out with mock session data', async () => {
    setActivePinia(createPinia())
    const authStore = useAuthStore()

    await authStore.login({
      username: 'admin',
      password: '123456',
      role: 'admin',
      remember: true,
    })

    expect(authStore.isAuthenticated).toBe(true)
    expect(authStore.token).toContain('mock-jwt.admin')
    expect(authStore.user?.roles).toEqual(['admin'])

    authStore.logout()

    expect(authStore.isAuthenticated).toBe(false)
    expect(authStore.token).toBeNull()
    expect(authStore.user).toBeNull()
  })
})
