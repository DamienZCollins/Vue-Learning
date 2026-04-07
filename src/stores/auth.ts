import { defineStore } from 'pinia'
import { faker } from '@faker-js/faker'

import type { LoginCredentials } from '@/entities/auth/model/types'
import type { SessionUser } from '@/entities/session/model/types'
import { delay } from '@/shared/lib/async'

function createAvatarText(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(segment => segment[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

function createMockSession(credentials: LoginCredentials): SessionUser {
  const roleTitle = credentials.role === 'admin' ? '平台负责人' : '业务协作者'
  const department = credentials.role === 'admin' ? '技术平台' : '增长运营'
  const name = credentials.username.trim() || (credentials.role === 'admin' ? '管理员' : '协作者')
  const id = faker.string.uuid()

  return {
    id,
    username: credentials.username.trim() || credentials.role,
    name,
    role: credentials.role,
    roles: [credentials.role],
    department,
    title: roleTitle,
    avatarText: createAvatarText(name),
    lastLoginAt: new Date().toISOString(),
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as SessionUser | null,
    isSubmitting: false,
  }),
  getters: {
    isAuthenticated: state => Boolean(state.token && state.user),
    roles: state => state.user?.roles ?? [],
  },
  actions: {
    async login(credentials: LoginCredentials) {
      this.isSubmitting = true

      try {
        await delay(420)
        const session = createMockSession(credentials)
        this.token = `mock-jwt.${session.role}.${session.id}`
        this.user = session
        return session
      } finally {
        this.isSubmitting = false
      }
    },
    logout() {
      this.token = null
      this.user = null
      this.isSubmitting = false
    },
  },
  persist: {
    key: 'vue3-mastery-auth',
  },
})
