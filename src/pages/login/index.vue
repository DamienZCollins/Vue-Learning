<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import type { LoginCredentials } from '@/entities/auth/model/types'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/features/auth/LoginForm.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleLogin(payload: LoginCredentials) {
  await authStore.login(payload)
  ElMessage.success(`欢迎回来，${authStore.user?.name}`)
  const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
  await router.replace(redirect)
}
</script>

<template>
  <div class="space-y-6">
    <LoginForm :loading="authStore.isSubmitting" @submit="handleLogin" />

    <SectionCard>
      <template #header>
        <div>
          <p class="text-base font-semibold text-[var(--app-text)]">
            登录说明
          </p>
          <p class="text-xs text-[var(--app-text-soft)]">
            这个页面专门演示“模拟 JWT token 存入 Pinia”的完整流程
          </p>
        </div>
      </template>

      <div class="grid gap-3 text-sm leading-6 text-[var(--app-text-soft)]">
        <p>1. 输入任意用户名和密码即可登录，密码不会发给后端，因为整个项目是纯前端 Mock。</p>
        <p>2. 角色决定菜单权限，管理员可以访问“权限演示”页面，编辑者会被守卫拦截。</p>
        <p>3. 登录后 token 和用户信息会自动持久化，刷新页面不会丢失。</p>
      </div>
    </SectionCard>
  </div>
</template>
