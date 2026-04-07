import type { AppUserRole } from '@/shared/types/vue-router'

export interface SessionUser {
  id: string
  username: string
  name: string
  roles: AppUserRole[]
  role: AppUserRole
  department: string
  title: string
  avatarText: string
  lastLoginAt: string
}
