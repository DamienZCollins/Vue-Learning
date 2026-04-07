<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import SectionCard from '@/shared/ui/SectionCard.vue'

const route = useRoute()
const router = useRouter()

const reason = computed(() => route.query.reason)
const message = computed(() => reason.value === 'permission' ? '当前角色没有访问权限，路由守卫已帮你拦下。' : '你访问的页面不存在，或者已经被重新组织。')
</script>

<template>
  <div class="flex min-h-screen items-center justify-center px-4 py-10">
    <div class="w-full max-w-2xl">
      <SectionCard>
        <div class="space-y-6 text-center">
          <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-[color:var(--app-primary-weak)] text-3xl font-semibold text-[var(--app-primary)]">
            404
          </div>
          <div class="space-y-2">
            <h1 class="text-3xl font-semibold tracking-tight text-[var(--app-text)]">
              页面异常
            </h1>
            <p class="text-sm leading-6 text-[var(--app-text-soft)]">
              {{ message }}
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-3">
            <el-button type="primary" @click="router.push({ name: 'dashboard' })">
              返回仪表盘
            </el-button>
            <el-button plain @click="router.push({ name: 'login' })">
              返回登录页
            </el-button>
          </div>
        </div>
      </SectionCard>
    </div>
  </div>
</template>
