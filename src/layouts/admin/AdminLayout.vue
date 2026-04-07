<script setup lang="ts">
import { computed, watch } from 'vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useLayoutStore } from '@/stores/layout'
import { useSettingsStore } from '@/stores/settings'
import { adminChildren } from '@/router/routes'
import { createBreadcrumbs, createMenuTree, createTabFromRoute, filterMenuByRole } from '@/shared/lib/route'
import AdminBreadcrumb from '@/widgets/layout/AdminBreadcrumb.vue'
import AdminHeader from '@/widgets/layout/AdminHeader.vue'
import AdminSidebar from '@/widgets/layout/AdminSidebar.vue'
import AdminTabs from '@/widgets/layout/AdminTabs.vue'

const route = useRoute()
const router = useRouter()
const layoutStore = useLayoutStore()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('lg')

const menuItems = computed(() => filterMenuByRole(createMenuTree(adminChildren), authStore.roles))
const breadcrumbs = computed(() => createBreadcrumbs(route))

watch(
  () => route.fullPath,
  () => {
    layoutStore.syncTab(route)
  },
  { immediate: true },
)

function handleTabSelect(path: string) {
  router.push(path)
}

function handleTabClose(path: string) {
  const nextPath = layoutStore.closeTab(path)
  if (nextPath !== path)
    router.push(nextPath)
}

function handleLogout() {
  authStore.logout()
  layoutStore.clearTabs()
  router.push({ name: 'login' })
}

const contentPadding = computed(() => settingsStore.compactMode ? 'p-4 md:p-5' : 'p-4 md:p-6')
</script>

<template>
  <div class="min-h-screen bg-[color:var(--app-bg)] text-[var(--app-text)]">
    <el-container class="min-h-screen">
      <el-aside
        v-if="!isMobile"
        :width="settingsStore.sidebarCollapsed ? '92px' : '280px'"
        class="border-r border-[color:var(--app-border)] bg-[color:var(--app-surface)] transition-[width] duration-300"
      >
        <AdminSidebar
          :menu-items="menuItems"
          :active-path="layoutStore.activePath"
          :collapsed="settingsStore.sidebarCollapsed"
        />
      </el-aside>

      <el-drawer
        v-else
        v-model="layoutStore.mobileDrawerOpen"
        direction="ltr"
        size="280px"
        :with-header="false"
        class="!bg-[color:var(--app-surface)]"
      >
        <AdminSidebar
          :menu-items="menuItems"
          :active-path="layoutStore.activePath"
          :collapsed="false"
        />
      </el-drawer>

      <el-container>
        <el-header class="h-auto p-4">
          <div :class="['space-y-4', settingsStore.stickyHeader ? 'sticky top-3 z-20' : '']">
            <AdminHeader
              :mobile="isMobile"
              :sidebar-collapsed="settingsStore.sidebarCollapsed"
              :user="authStore.user"
              @toggle-sidebar="settingsStore.toggleSidebarCollapsed()"
              @toggle-drawer="layoutStore.toggleMobileDrawer()"
              @logout="handleLogout"
            />

            <AdminBreadcrumb :items="breadcrumbs" />

            <AdminTabs
              v-if="settingsStore.showTabs"
              :tabs="layoutStore.tabs"
              :active-path="layoutStore.activePath"
              @select="handleTabSelect"
              @close="handleTabClose"
              @close-others="layoutStore.closeOthers"
            />
          </div>
        </el-header>

        <el-main :class="contentPadding">
          <RouterView v-slot="{ Component, route: currentRoute }">
            <Transition name="page-fade" mode="out-in">
              <component :is="Component" :key="currentRoute.path" />
            </Transition>
          </RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
