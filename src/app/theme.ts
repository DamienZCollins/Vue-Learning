import { usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'

import type { SettingsStore } from '@/stores/settings'
import type { ThemeMode } from '@/entities/settings/model/types'

function resolveTheme(mode: ThemeMode, preferredDark: boolean) {
  if (mode === 'system')
    return preferredDark ? 'dark' : 'light'
  return mode
}

export function useThemeRuntime(settingsStore: SettingsStore) {
  const preferredDark = usePreferredDark()
  const resolvedTheme = computed(() => resolveTheme(settingsStore.themeMode, preferredDark.value))

  watch(
    resolvedTheme,
    (value) => {
      const root = document.documentElement
      root.dataset.theme = value
      root.classList.toggle('dark', value === 'dark')
      document.body.classList.add('app-shell-frame')
    },
    { immediate: true },
  )

  return {
    resolvedTheme,
  }
}
