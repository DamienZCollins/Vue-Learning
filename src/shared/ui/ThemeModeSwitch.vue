<script setup lang="ts">
import { computed } from 'vue'

import AppIcon from './AppIcon.vue'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()

const modeMeta = {
  light: {
    label: '浅色',
    icon: 'Sunny',
  },
  dark: {
    label: '深色',
    icon: 'Moon',
  },
  system: {
    label: '跟随系统',
    icon: 'Monitor',
  },
} as const

const currentMode = computed(() => modeMeta[settingsStore.themeMode])

function cycleMode() {
  if (settingsStore.themeMode === 'light')
    settingsStore.setThemeMode('dark')
  else if (settingsStore.themeMode === 'dark')
    settingsStore.setThemeMode('system')
  else
    settingsStore.setThemeMode('light')
}
</script>

<template>
  <button
    class="inline-flex whitespace-nowrap items-center gap-2 rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-3 py-2 text-sm font-medium text-[var(--app-text)] transition hover:-translate-y-0.5 hover:shadow-lg"
    type="button"
    @click="cycleMode"
  >
    <AppIcon :name="currentMode.icon" class="text-base" />
    <span>{{ currentMode.label }}</span>
    <span class="text-xs text-[var(--app-muted)]">点击切换</span>
  </button>
</template>
