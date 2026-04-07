import { faker } from '@faker-js/faker'

import { delay } from '@/shared/lib/async'
import { createLocalCollection, paginate } from '@/shared/lib/localDb'
import { MOCK_SEED } from '@/shared/mock/seed'
import type { PaginatedResult, UserFormInput, UserQuery, UserRecord, UserStatus } from '../model/types'

const STORAGE_KEY = 'vue3-mastery-users'

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map(segment => segment[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2)
}

function buildPhoneNumber() {
  const digits = Array.from({ length: 10 }, () => faker.number.int({ min: 0, max: 9 })).join('')
  return `1${digits}`
}

function seedUsers() {
  faker.seed(MOCK_SEED)
  const departments = ['产品中心', '技术平台', '增长运营', '数据分析', '设计体验', '客户成功']
  const cities = ['北京', '上海', '深圳', '杭州', '成都', '武汉']
  const roles = ['admin', 'editor'] as const
  const statuses: UserStatus[] = ['active', 'inactive', 'pending']

  return Array.from({ length: 48 }, (_, index) => {
    const fullName = faker.person.fullName()
    const createdAt = faker.date.recent({ days: 365 }).toISOString()

    return {
      id: faker.string.uuid(),
      name: fullName,
      email: faker.internet.email({ firstName: fullName.split(' ')[0] ?? 'user' }),
      role: faker.helpers.arrayElement(roles),
      department: faker.helpers.arrayElement(departments),
      city: faker.helpers.arrayElement(cities),
      status: faker.helpers.arrayElement(statuses),
      phone: buildPhoneNumber(),
      avatarText: initials(fullName),
      tags: faker.helpers.arrayElements(['Vue', 'TypeScript', 'Mock', 'UI', 'Query', 'Workflow'], { min: 1, max: 3 }),
      createdAt,
      updatedAt: createdAt,
    } satisfies UserRecord
  })
}

const userCollection = createLocalCollection<UserRecord>(STORAGE_KEY, seedUsers)

function matchesKeyword(record: UserRecord, keyword: string) {
  if (!keyword.trim())
    return true

  const haystack = [
    record.name,
    record.email,
    record.department,
    record.city,
    record.phone,
    record.tags.join(' '),
  ].join(' ').toLowerCase()

  return haystack.includes(keyword.trim().toLowerCase())
}

export function readAllUsers() {
  return userCollection.read().slice().sort((left, right) => right.createdAt.localeCompare(left.createdAt))
}

export async function fetchUsers(query: UserQuery): Promise<PaginatedResult<UserRecord>> {
  await delay(220)

  const filtered = readAllUsers().filter((record) => {
    const statusMatch = query.status === 'all' || record.status === query.status
    const roleMatch = query.role === 'all' || record.role === query.role
    return statusMatch && roleMatch && matchesKeyword(record, query.keyword)
  })

  return paginate(filtered, query.page, query.pageSize)
}

export async function fetchUserById(id: string) {
  await delay(140)
  return userCollection.byId(id) ?? null
}

export async function createUser(input: UserFormInput) {
  await delay(180)

  const now = new Date().toISOString()
  const record: UserRecord = {
    id: faker.string.uuid(),
    name: input.name,
    email: input.email,
    role: input.role,
    department: input.department,
    city: input.city,
    status: input.status,
    phone: input.phone,
    tags: input.tags,
    avatarText: initials(input.name),
    createdAt: now,
    updatedAt: now,
  }

  userCollection.insert(record)
  return record
}

export async function updateUser(id: string, input: UserFormInput) {
  await delay(180)

  const next: UserRecord = {
    ...(userCollection.byId(id) as UserRecord),
    ...input,
    id,
    avatarText: initials(input.name),
    updatedAt: new Date().toISOString(),
  }

  userCollection.upsert(next)
  return next
}

export async function deleteUser(id: string) {
  await delay(160)
  userCollection.remove(id)
}

export async function resetUserSeed() {
  await delay(80)
  return userCollection.reset()
}
