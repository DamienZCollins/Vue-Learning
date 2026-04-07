import { faker } from '@faker-js/faker'

import { delay } from '@/shared/lib/async'
import { formatPercent } from '@/shared/lib/format'
import { MOCK_SEED } from '@/shared/mock/seed'
import { readAllUsers } from '@/entities/user/api/userRepository'
import type { DashboardSnapshot } from '../model/types'

function buildTrendSeries() {
  faker.seed(MOCK_SEED + 7)

  return [
    {
      label: '访问量',
      values: Array.from({ length: 7 }, (_, index) => 80 + index * 6 + faker.number.int({ min: 0, max: 18 })),
      tone: '#14b8a6',
    },
    {
      label: '转化率',
      values: Array.from({ length: 7 }, (_, index) => 42 + index * 4 + faker.number.int({ min: 0, max: 16 })),
      tone: '#f59e0b',
    },
    {
      label: '活跃度',
      values: Array.from({ length: 7 }, (_, index) => 68 + index * 5 + faker.number.int({ min: 0, max: 14 })),
      tone: '#0f172a',
    },
  ]
}

function buildActivities() {
  const users = readAllUsers()
  const selected = users.slice(0, 5)

  return selected.map((user, index) => ({
    id: user.id,
    title: index === 0 ? '新增成员' : index === 1 ? '角色调整' : index === 2 ? '表单提交' : index === 3 ? '团队同步' : '流程发布',
    description: `${user.name} · ${user.department} · ${user.city}`,
    timeLabel: `${index + 1}小时前`,
    tone: ['success', 'warning', 'info'][index % 3] as 'success' | 'warning' | 'info',
  }))
}

export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  await delay(220)

  const users = readAllUsers()
  const activeUsers = users.filter(user => user.status === 'active').length
  const pendingUsers = users.filter(user => user.status === 'pending').length
  const editorUsers = users.filter(user => user.role === 'editor').length
  const adminUsers = users.filter(user => user.role === 'admin').length
  const totalUsers = users.length

  return {
    summary: [
      {
        key: 'total-users',
        label: '总用户数',
        value: totalUsers,
        delta: 12.4,
        hint: '全部来自本地 Mock 数据',
        tone: 'teal',
      },
      {
        key: 'active-users',
        label: '活跃用户',
        value: activeUsers,
        delta: 8.3,
        hint: `${formatPercent((activeUsers / Math.max(totalUsers, 1)) * 100)} 占比`,
        tone: 'amber',
      },
      {
        key: 'role-distribution',
        label: '管理员 / 编辑',
        value: adminUsers,
        delta: editorUsers - adminUsers,
        hint: `${adminUsers} / ${editorUsers}`,
        tone: 'rose',
      },
      {
        key: 'pending-users',
        label: '待处理用户',
        value: pendingUsers,
        delta: -3.1,
        hint: '模拟审批流状态',
        tone: 'slate',
      },
    ],
    trend: buildTrendSeries(),
    activities: buildActivities(),
  }
}
