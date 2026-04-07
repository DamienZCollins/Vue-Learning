<script setup lang="ts">
import type { SessionUser } from '@/entities/session/model/types'
import AppIcon from '@/shared/ui/AppIcon.vue'
import ThemeModeSwitch from '@/shared/ui/ThemeModeSwitch.vue'

defineProps<{
  mobile: boolean
  sidebarCollapsed: boolean
  user: SessionUser | null
}>()

const emit = defineEmits<{
  (event: 'toggle-sidebar'): void
  (event: 'toggle-drawer'): void
  (event: 'logout'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4 rounded-[28px] border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-4 py-4 shadow-[var(--app-shadow)] md:flex-row md:items-center md:justify-between">
    <div class="flex items-center gap-3">
      <el-button
        circle
        plain
        class="!border-[color:var(--app-border)] !bg-transparent !text-[var(--app-text)]"
        @click="mobile ? emit('toggle-drawer') : emit('toggle-sidebar')"
      >
        <AppIcon name="Menu" class="text-base" />
      </el-button>

      <div class="space-y-0.5">
        <p class="text-sm font-semibold text-[var(--app-text)]">
          Vue3 Frontend Architecture Mastery
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          {{ user?.name ?? '未登录用户' }} · {{ user?.title ?? '学习者' }}
        </p>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <ThemeModeSwitch />
      <el-button
        plain
        class="!border-[color:var(--app-border)] !bg-transparent"
        @click="emit('logout')"
      >
        <AppIcon name="SwitchButton" class="mr-2 text-base" />
        退出登录
      </el-button>
      <div class="flex items-center gap-3 rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] px-3 py-2">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--app-primary-weak)] font-semibold text-[var(--app-primary)]">
          {{ user?.avatarText ?? 'U' }}
        </div>
        <div class="hidden min-w-0 md:block">
          <p class="truncate text-sm font-medium text-[var(--app-text)]">
            {{ user?.name ?? 'Guest' }}
          </p>
          <p class="truncate text-xs text-[var(--app-text-soft)]">
            {{ user?.department ?? '等待登录' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
