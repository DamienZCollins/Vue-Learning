<script setup lang="ts">
import { computed } from 'vue'

import { createMenuTree, type MenuItem } from '@/shared/lib/route'
import { adminChildren } from '@/router/routes'
import AppIcon from '@/shared/ui/AppIcon.vue'

const props = defineProps<{
  menuItems?: MenuItem[]
  activePath: string
  collapsed: boolean
}>()

const menuTree = computed(() => props.menuItems ?? createMenuTree(adminChildren))
</script>

<template>
  <div class="flex h-full flex-col gap-5 p-4">
    <div class="flex items-center gap-3 px-2">
      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--app-primary-weak)] text-[var(--app-primary)]">
        <AppIcon name="DataLine" class="text-xl" />
      </div>
      <div v-if="!collapsed" class="space-y-0.5">
        <p class="text-sm font-semibold tracking-wide text-[var(--app-text)]">
          Frontend Mastery
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          Vue 3 Architecture Lab
        </p>
      </div>
    </div>

    <el-menu
      router
      :default-active="activePath"
      :collapse="collapsed"
      class="flex-1 !border-0 !bg-transparent"
      text-color="var(--app-text-soft)"
      active-text-color="var(--app-primary)"
      background-color="transparent"
    >
      <el-menu-item
        v-for="item in menuTree"
        :key="item.path"
        :index="item.path"
        class="!h-12 !rounded-2xl !px-4 !text-sm !font-medium"
      >
        <AppIcon v-if="item.icon" :name="item.icon" class="mr-2 text-base" />
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>

    <div v-if="!collapsed" class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] p-4">
      <p class="text-xs font-medium uppercase tracking-[0.24em] text-[var(--app-muted)]">
        学习提示
      </p>
      <p class="mt-2 text-sm leading-6 text-[var(--app-text-soft)]">
        这个模板把数据流、路由和布局拆成独立层，适合先看结构，再看交互。
      </p>
    </div>
  </div>
</template>
