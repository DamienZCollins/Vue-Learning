import { describe, expect, it, beforeEach } from 'vitest'

import { createUser, fetchUsers, resetUserSeed } from './userRepository'

describe('user repository', () => {
  beforeEach(async () => {
    await resetUserSeed()
  })

  it('seeds a paginated user collection', async () => {
    const result = await fetchUsers({
      keyword: '',
      status: 'all',
      role: 'all',
      page: 1,
      pageSize: 8,
    })

    expect(result.list).toHaveLength(8)
    expect(result.total).toBeGreaterThan(40)
  })

  it('creates a new user in local storage', async () => {
    const created = await createUser({
      name: '测试用户',
      email: 'test@example.com',
      role: 'editor',
      department: '技术平台',
      city: '杭州',
      status: 'active',
      phone: '13800138000',
      tags: ['Vue', 'TypeScript'],
    })

    const result = await fetchUsers({
      keyword: '测试用户',
      status: 'all',
      role: 'all',
      page: 1,
      pageSize: 10,
    })

    expect(created.name).toBe('测试用户')
    expect(result.list.some(user => user.id === created.id)).toBe(true)
  })
})
