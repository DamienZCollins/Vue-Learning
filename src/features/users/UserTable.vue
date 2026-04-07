<script setup lang="ts">
import type { UserRecord } from '@/entities/user/model/types'
import { formatShortDate } from '@/shared/lib/format'
import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import StatusPill from '@/shared/ui/StatusPill.vue'

defineProps<{
  rows: UserRecord[]
  loading: boolean
  total: number
  page: number
  pageSize: number
}>()

const emit = defineEmits<{
  (event: 'edit', value: UserRecord): void
  (event: 'delete', value: UserRecord): void
  (event: 'page-change', value: number): void
  (event: 'page-size-change', value: number): void
}>()
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          用户列表
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          表格、分页和 CRUD 都只作用于本地数据
        </p>
      </div>
      <div class="text-sm text-[var(--app-text-soft)]">
        共 {{ total }} 条
      </div>
    </template>

    <el-table
      :data="rows"
      :loading="loading"
      border
      table-layout="fixed"
      class="!w-full"
      empty-text="暂无用户数据"
    >
      <el-table-column label="用户" min-width="220">
        <template #default="{ row }">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--app-primary-weak)] font-semibold text-[var(--app-primary)]">
              {{ row.avatarText }}
            </div>
            <div class="min-w-0">
              <p class="truncate font-medium text-[var(--app-text)]">
                {{ row.name }}
              </p>
              <p class="truncate text-xs text-[var(--app-text-soft)]">
                {{ row.email }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" min-width="140" />
      <el-table-column prop="role" label="角色" min-width="110">
        <template #default="{ row }">
          <StatusPill :tone="row.role === 'admin' ? 'warning' : 'info'" :label="row.role === 'admin' ? '管理员' : '编辑者'" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="110">
        <template #default="{ row }">
          <StatusPill
            :tone="row.status === 'active' ? 'success' : row.status === 'pending' ? 'warning' : 'neutral'"
            :label="row.status === 'active' ? '启用' : row.status === 'pending' ? '待审批' : '停用'"
          />
        </template>
      </el-table-column>
      <el-table-column prop="city" label="城市" min-width="100" />
      <el-table-column prop="phone" label="手机" min-width="150" />
      <el-table-column prop="createdAt" label="创建时间" min-width="160">
        <template #default="{ row }">
          <span class="text-sm text-[var(--app-text-soft)]">{{ formatShortDate(row.createdAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="150" fixed="right">
        <template #default="{ row }">
          <div class="flex items-center gap-2">
            <el-button size="small" text @click="emit('edit', row)">
              <AppIcon name="EditPen" class="mr-1 text-sm" />
              编辑
            </el-button>
            <el-button size="small" text type="danger" @click="emit('delete', row)">
              <AppIcon name="Close" class="mr-1 text-sm" />
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="mt-5 flex justify-end">
      <el-pagination
        background
        layout="prev, pager, next, total, sizes"
        :page-size="pageSize"
        :current-page="page"
        :page-sizes="[8, 12, 16, 24]"
        :total="total"
        @current-change="emit('page-change', $event)"
        @size-change="emit('page-size-change', $event)"
      />
    </div>
  </SectionCard>
</template>
