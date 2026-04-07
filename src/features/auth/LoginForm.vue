<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import type { LoginCredentials } from '@/entities/auth/model/types'
import AppIcon from '@/shared/ui/AppIcon.vue'

const props = defineProps<{
  loading?: boolean
}>()

const emit = defineEmits<{
  (event: 'submit', payload: LoginCredentials): void
}>()

const formRef = ref<FormInstance>()
const form = reactive<LoginCredentials>({
  username: 'admin',
  password: '123456',
  role: 'admin',
  remember: true,
})

const rules: FormRules<LoginCredentials> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择模拟角色', trigger: 'change' }],
}

async function submitForm() {
  await formRef.value?.validate()
  emit('submit', { ...form })
}
</script>

<template>
  <el-card class="rounded-[28px] border border-[color:var(--app-border)] bg-[color:var(--app-surface)] shadow-[var(--app-shadow)]">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-sm font-semibold text-[var(--app-text)]">
            登录到学习模板
          </p>
          <p class="text-xs text-[var(--app-text-soft)]">
            使用模拟 JWT token 存入 Pinia
          </p>
        </div>
        <div class="flex items-center gap-2 rounded-full bg-[color:var(--app-primary-weak)] px-3 py-1.5 text-xs font-medium text-[var(--app-primary)]">
          <AppIcon name="Lock" class="text-sm" />
          纯前端 Mock 登录
        </div>
      </div>
    </template>

    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-position="top"
      class="space-y-4"
      @submit.prevent="submitForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" size="large" placeholder="例如：admin" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" size="large" type="password" show-password placeholder="任意字符串即可" />
      </el-form-item>

      <el-form-item label="模拟角色" prop="role">
        <el-select v-model="form.role" size="large" class="w-full">
          <el-option label="管理员 Admin" value="admin" />
          <el-option label="编辑 Editor" value="editor" />
        </el-select>
      </el-form-item>

      <div class="flex items-center justify-between gap-4">
        <el-checkbox v-model="form.remember">
          记住登录状态
        </el-checkbox>
        <span class="text-xs text-[var(--app-text-soft)]">
          退出后仍会保留布局设置
        </span>
      </div>

      <el-button
        type="primary"
        size="large"
        class="!mt-2 !w-full !rounded-2xl !bg-[var(--app-primary)] !border-0"
        :loading="props.loading"
        native-type="submit"
      >
        进入后台
      </el-button>
    </el-form>
  </el-card>
</template>
