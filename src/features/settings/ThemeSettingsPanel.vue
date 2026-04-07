<script setup lang="ts">
import ThemeModeSwitch from '@/shared/ui/ThemeModeSwitch.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          主题配置
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          切换浅色、深色或跟随系统，同时预览暗黑视觉
        </p>
      </div>
    </template>

    <div class="flex flex-wrap items-center gap-4">
      <ThemeModeSwitch />
      <el-switch v-model="settingsStore.sidebarCollapsed" active-text="侧边栏收起" inactive-text="侧边栏展开" />
      <el-switch v-model="settingsStore.showTabs" active-text="显示标签页" inactive-text="隐藏标签页" />
      <el-switch v-model="settingsStore.stickyHeader" active-text="固定顶部栏" inactive-text="普通顶部栏" />
    </div>
  </SectionCard>
</template>
