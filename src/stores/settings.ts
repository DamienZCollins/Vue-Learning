import { defineStore } from 'pinia'

import { defaultSettingsState } from '@/entities/settings/model/defaults'
import type { SettingsState, ThemeMode } from '@/entities/settings/model/types'

export type { ThemeMode }

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({ ...defaultSettingsState }),
  actions: {
    setThemeMode(mode: ThemeMode) {
      this.themeMode = mode
    },
    toggleSidebarCollapsed() {
      this.sidebarCollapsed = !this.sidebarCollapsed
    },
    toggleShowTabs() {
      this.showTabs = !this.showTabs
    },
    toggleCompactMode() {
      this.compactMode = !this.compactMode
    },
    toggleStickyHeader() {
      this.stickyHeader = !this.stickyHeader
    },
    resetSettings() {
      Object.assign(this, defaultSettingsState)
    },
  },
  persist: {
    key: 'vue3-mastery-settings',
  },
})

export type SettingsStore = ReturnType<typeof useSettingsStore>
