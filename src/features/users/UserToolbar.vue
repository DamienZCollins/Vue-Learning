<script setup lang="ts">
import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import type { AppUserRole } from '@/shared/types/vue-router'
import type { UserStatus } from '@/entities/user/model/types'

defineProps<{
  keyword: string
  status: UserStatus | 'all'
  role: AppUserRole | 'all'
}>()

const emit = defineEmits<{
  (event: 'update:keyword', value: string): void
  (event: 'update:status', value: UserStatus | 'all'): void
  (event: 'update:role', value: AppUserRole | 'all'): void
  (event: 'create'): void
  (event: 'reset'): void
}>()
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          用户筛选
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          搜索、过滤和新增都在本地 Mock 数据中完成
        </p>
      </div>
      <div class="flex items-center gap-2">
        <el-button plain @click="emit('reset')">
          <AppIcon name="Refresh" class="mr-2 text-base" />
          重置
        </el-button>
        <el-button type="primary" @click="emit('create')">
          <AppIcon name="Plus" class="mr-2 text-base" />
          新增用户
        </el-button>
      </div>
    </template>

    <div class="grid gap-4 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto]">
      <el-input
        :model-value="keyword"
        size="large"
        placeholder="搜索姓名、邮箱、部门、城市..."
        clearable
        @update:model-value="emit('update:keyword', $event)"
      >
        <template #prefix>
          <AppIcon name="Search" />
        </template>
      </el-input>

      <el-select
        :model-value="status"
        size="large"
        placeholder="状态"
        @update:model-value="emit('update:status', $event)"
      >
        <el-option label="全部状态" value="all" />
        <el-option label="启用" value="active" />
        <el-option label="停用" value="inactive" />
        <el-option label="待审批" value="pending" />
      </el-select>

      <el-select
        :model-value="role"
        size="large"
        placeholder="角色"
        @update:model-value="emit('update:role', $event)"
      >
        <el-option label="全部角色" value="all" />
        <el-option label="管理员" value="admin" />
        <el-option label="编辑者" value="editor" />
      </el-select>

      <div class="flex items-center justify-end">
        <el-button plain @click="emit('reset')">
          重新加载
        </el-button>
      </div>
    </div>
  </SectionCard>
</template>
