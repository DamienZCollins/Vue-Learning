<script setup lang="ts">
import { computed } from 'vue'

import { useSettingsStore } from '@/stores/settings'
import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const settingsStore = useSettingsStore()

const densityLabel = computed(() => settingsStore.compactMode ? '紧凑模式' : '舒展模式')
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          布局配置
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          控制页面密度、侧边栏状态和标签页显示
        </p>
      </div>
    </template>

    <div class="grid gap-4 md:grid-cols-2">
      <div class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] p-4">
        <p class="text-sm font-medium text-[var(--app-text)]">当前密度</p>
        <p class="mt-2 text-2xl font-semibold text-[var(--app-text)]">{{ densityLabel }}</p>
        <p class="mt-1 text-xs text-[var(--app-text-soft)]">影响卡片间距和内容留白</p>
      </div>

      <div class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] p-4">
        <p class="text-sm font-medium text-[var(--app-text)]">快速切换</p>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <el-button plain @click="settingsStore.toggleCompactMode()">
            <AppIcon name="Operation" class="mr-2 text-base" />
            {{ settingsStore.compactMode ? '关闭紧凑模式' : '开启紧凑模式' }}
          </el-button>
          <el-button plain @click="settingsStore.toggleSidebarCollapsed()">
            <AppIcon name="Menu" class="mr-2 text-base" />
            {{ settingsStore.sidebarCollapsed ? '展开侧边栏' : '收起侧边栏' }}
          </el-button>
        </div>
      </div>
    </div>
  </SectionCard>
</template>
