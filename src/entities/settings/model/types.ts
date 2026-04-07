export type ThemeMode = 'light' | 'dark' | 'system'

export interface SettingsState {
  themeMode: ThemeMode
  sidebarCollapsed: boolean
  showTabs: boolean
  compactMode: boolean
  stickyHeader: boolean
}
