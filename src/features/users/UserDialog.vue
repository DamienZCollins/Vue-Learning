<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import type { UserFormInput, UserStatus } from '@/entities/user/model/types'
import type { AppUserRole } from '@/shared/types/vue-router'

const props = defineProps<{
  visible: boolean
  loading?: boolean
  mode: 'create' | 'edit'
  modelValue?: Partial<UserFormInput> | null
}>()

const emit = defineEmits<{
  (event: 'update:visible', value: boolean): void
  (event: 'submit', value: UserFormInput): void
}>()

const formRef = ref<FormInstance>()

const baseForm = (): UserFormInput => ({
  name: '',
  email: '',
  role: 'editor',
  department: '技术平台',
  city: '杭州',
  status: 'active',
  phone: '',
  tags: ['Vue'],
})

const form = reactive<UserFormInput>(baseForm())

const rules = computed<FormRules<UserFormInput>>(() => ({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' },
  ],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
}))

function resetForm() {
  Object.assign(form, baseForm(), props.modelValue ?? {})
}

watch(
  () => props.visible,
  (visible) => {
    if (visible)
      resetForm()
  },
  { immediate: true },
)

async function submitForm() {
  await formRef.value?.validate()
  emit('submit', { ...form })
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="mode === 'create' ? '新增用户' : '编辑用户'"
    width="720px"
    align-center
    destroy-on-close
    @update:model-value="emit('update:visible', $event)"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="grid gap-4 sm:grid-cols-2">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="form.role" class="w-full">
          <el-option label="管理员" value="admin" />
          <el-option label="编辑者" value="editor" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-input v-model="form.department" />
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <el-input v-model="form.city" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" class="w-full">
          <el-option label="启用" value="active" />
          <el-option label="停用" value="inactive" />
          <el-option label="待审批" value="pending" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tags" class="sm:col-span-2">
        <el-select
          v-model="form.tags"
          class="w-full"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option label="Vue" value="Vue" />
          <el-option label="TypeScript" value="TypeScript" />
          <el-option label="Mock" value="Mock" />
          <el-option label="Workflow" value="Workflow" />
          <el-option label="UI" value="UI" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex items-center justify-end gap-3">
        <el-button @click="emit('update:visible', false)">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="submitForm">
          {{ mode === 'create' ? '创建用户' : '保存修改' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
