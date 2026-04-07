import type { AppUserRole } from '@/shared/types/vue-router'

export type UserStatus = 'active' | 'inactive' | 'pending'

export interface UserRecord {
  id: string
  name: string
  email: string
  role: AppUserRole
  department: string
  city: string
  status: UserStatus
  phone: string
  avatarText: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface UserQuery {
  keyword: string
  status: UserStatus | 'all'
  role: AppUserRole | 'all'
  page: number
  pageSize: number
}

export interface PaginatedResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

export interface UserFormInput {
  id?: string
  name: string
  email: string
  role: AppUserRole
  department: string
  city: string
  status: UserStatus
  phone: string
  tags: string[]
}
