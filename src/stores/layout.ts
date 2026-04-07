import { defineStore } from 'pinia'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface AppTab {
  name: string
  path: string
  title: string
  affix?: boolean
}

function resolveNextActivePath(tabs: AppTab[], removedPath: string) {
  const remaining = tabs.filter(tab => tab.path !== removedPath)
  const fallback = remaining[remaining.length - 1]
  return fallback?.path ?? '/dashboard'
}

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    mobileDrawerOpen: false,
    activePath: '/dashboard',
    tabs: [] as AppTab[],
  }),
  actions: {
    syncTab(route: RouteLocationNormalizedLoaded) {
      const title = String(route.meta.title ?? route.name ?? '页面')
      const tab: AppTab = {
        name: String(route.name ?? route.path),
        path: route.path,
        title,
        affix: Boolean(route.meta.affix),
      }

      const exists = this.tabs.some(item => item.path === tab.path)
      if (!exists)
        this.tabs.push(tab)

      this.activePath = tab.path
      if (!this.tabs.some(item => item.affix))
        this.tabs.unshift({ name: 'dashboard', path: '/dashboard', title: '仪表盘', affix: true })
    },
    setActivePath(path: string) {
      this.activePath = path
    },
    openMobileDrawer() {
      this.mobileDrawerOpen = true
    },
    closeMobileDrawer() {
      this.mobileDrawerOpen = false
    },
    toggleMobileDrawer() {
      this.mobileDrawerOpen = !this.mobileDrawerOpen
    },
    closeTab(path: string) {
      const target = this.tabs.find(tab => tab.path === path)
      if (target?.affix)
        return this.activePath

      const nextPath = resolveNextActivePath(this.tabs, path)
      this.tabs = this.tabs.filter(tab => tab.path !== path)
      this.activePath = nextPath
      return nextPath
    },
    closeOthers(path: string) {
      const current = this.tabs.find(tab => tab.path === path)
      this.tabs = current ? this.tabs.filter(tab => tab.path === path || tab.affix) : this.tabs
      this.activePath = current?.path ?? '/dashboard'
    },
    clearTabs() {
      this.tabs = this.tabs.filter(tab => tab.affix)
      this.activePath = '/dashboard'
    },
  },
  persist: {
    key: 'vue3-mastery-layout',
  },
})
