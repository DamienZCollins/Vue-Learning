<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import PageShell from '@/shared/ui/PageShell.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const authStore = useAuthStore()
const router = useRouter()
</script>

<template>
  <PageShell
    eyebrow="Permission"
    title="权限演示页"
    description="这个页面只有 admin 角色可以访问，用来演示路由守卫和菜单过滤是如何一起工作的。"
  >
    <template #actions>
      <el-button plain @click="router.push({ name: 'dashboard' })">
        回到首页
      </el-button>
      <el-button type="primary" @click="router.push({ name: 'users' })">
        用户管理
      </el-button>
    </template>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <SectionCard>
        <template #header>
          <div>
            <p class="text-base font-semibold text-[var(--app-text)]">
              路由守卫说明
            </p>
            <p class="text-xs text-[var(--app-text-soft)]">
              当前登录角色：{{ authStore.user?.role ?? '未登录' }}
            </p>
          </div>
        </template>

        <div class="space-y-4 text-sm leading-6 text-[var(--app-text-soft)]">
          <p>• 路由 meta 里写了 `roles: ['admin']`，所以编辑者访问时会被拦截。</p>
          <p>• 守卫没有返回 403，而是转到 404 页面，方便你看到“权限不足”和“路径不存在”的统一异常处理方式。</p>
          <p>• 这类逻辑通常应该写在路由层，而不是散落在各个页面里。</p>
        </div>
      </SectionCard>

      <SectionCard>
        <template #header>
          <div>
            <p class="text-base font-semibold text-[var(--app-text)]">
              你能学到什么
            </p>
          </div>
        </template>

        <div class="space-y-3 text-sm leading-6 text-[var(--app-text-soft)]">
          <p>• 角色控制菜单可见性</p>
          <p>• 路由守卫控制直接输入地址的访问</p>
          <p>• 统一的 404 页面承接异常状态</p>
        </div>
      </SectionCard>
    </div>
  </PageShell>
</template>
