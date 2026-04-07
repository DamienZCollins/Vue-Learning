import type { AppUserRole } from '@/shared/types/vue-router'

export interface LoginCredentials {
  username: string
  password: string
  role: AppUserRole
  remember: boolean
}
