<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

import type { AppUserRole } from '@/shared/types/vue-router'
import { createUser, deleteUser, fetchUsers, resetUserSeed, updateUser } from '@/entities/user/api/userRepository'
import type { UserFormInput, UserRecord, UserStatus } from '@/entities/user/model/types'
import PageShell from '@/shared/ui/PageShell.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import UserDialog from '@/features/users/UserDialog.vue'
import UserTable from '@/features/users/UserTable.vue'
import UserToolbar from '@/features/users/UserToolbar.vue'

const queryClient = useQueryClient()

const keyword = ref('')
const debouncedKeyword = ref('')
const status = ref<UserStatus | 'all'>('all')
const role = ref<AppUserRole | 'all'>('all')
const page = ref(1)
const pageSize = ref(8)
const dialogVisible = ref(false)
const selectedUser = ref<UserRecord | null>(null)

watchDebounced(
  keyword,
  (value) => {
    debouncedKeyword.value = value
    page.value = 1
  },
  { debounce: 250, maxWait: 600 },
)

const queryArgs = computed(() => ({
  keyword: debouncedKeyword.value,
  status: status.value,
  role: role.value,
  page: page.value,
  pageSize: pageSize.value,
}))

const usersQuery = useQuery({
  queryKey: computed(() => ['users', queryArgs.value.keyword, queryArgs.value.status, queryArgs.value.role, queryArgs.value.page, queryArgs.value.pageSize]),
  queryFn: () => fetchUsers(queryArgs.value),
})

const isBusy = computed(() =>
  usersQuery.isLoading.value
  || deleteMutation.isPending.value
  || createMutation.isPending.value
  || updateMutation.isPending.value,
)

const createMutation = useMutation({
  mutationFn: createUser,
  onSuccess: async () => {
    ElMessage.success('用户已创建')
    dialogVisible.value = false
    await queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const updateMutation = useMutation({
  mutationFn: ({ id, input }: { id: string; input: UserFormInput }) => updateUser(id, input),
  onSuccess: async () => {
    ElMessage.success('用户已更新')
    dialogVisible.value = false
    selectedUser.value = null
    await queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const deleteMutation = useMutation({
  mutationFn: deleteUser,
  onSuccess: async () => {
    ElMessage.success('用户已删除')
    await queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const resetSeedMutation = useMutation({
  mutationFn: resetUserSeed,
  onSuccess: async () => {
    ElMessage.success('已恢复初始 Mock 数据')
    await queryClient.invalidateQueries({ queryKey: ['users'] })
  },
})

const rows = computed(() => usersQuery.data.value?.list ?? [])
const total = computed(() => usersQuery.data.value?.total ?? 0)

function openCreateDialog() {
  selectedUser.value = null
  dialogVisible.value = true
}

function openEditDialog(user: UserRecord) {
  selectedUser.value = user
  dialogVisible.value = true
}

async function confirmDelete(user: UserRecord) {
  await ElMessageBox.confirm(`确定删除「${user.name}」吗？这个操作只会修改本地 Mock 数据。`, '删除确认', {
    type: 'warning',
    confirmButtonText: '删除',
    cancelButtonText: '取消',
  })
  await deleteMutation.mutateAsync(user.id)
}

async function submitUser(form: UserFormInput) {
  if (selectedUser.value) {
    await updateMutation.mutateAsync({ id: selectedUser.value.id, input: form })
    return
  }

  await createMutation.mutateAsync(form)
}

function resetFilters() {
  keyword.value = ''
  debouncedKeyword.value = ''
  status.value = 'all'
  role.value = 'all'
  page.value = 1
  pageSize.value = 8
}
</script>

<template>
  <PageShell
    eyebrow="Management"
    title="用户管理页"
    description="这个页面演示表格、分页、搜索、增删改查和本地 Mock 仓库如何协作。"
  >
    <template #actions>
      <el-button plain @click="resetSeedMutation.mutate()">
        恢复初始数据
      </el-button>
      <el-button type="primary" @click="openCreateDialog">
        新增用户
      </el-button>
    </template>

    <UserToolbar
      :keyword="keyword"
      :status="status"
      :role="role"
      @update:keyword="keyword = $event"
      @update:status="status = $event"
      @update:role="role = $event"
      @create="openCreateDialog"
      @reset="resetFilters"
    />

    <UserTable
      :rows="rows"
      :loading="isBusy"
      :total="total"
      :page="page"
      :page-size="pageSize"
      @edit="openEditDialog"
      @delete="confirmDelete"
      @page-change="page = $event"
      @page-size-change="(value) => { pageSize = value; page = 1 }"
    />

    <UserDialog
      v-model:visible="dialogVisible"
      :loading="createMutation.isPending.value || updateMutation.isPending.value"
      :mode="selectedUser ? 'edit' : 'create'"
      :model-value="selectedUser"
      @submit="submitUser"
    />
  </PageShell>
</template>
