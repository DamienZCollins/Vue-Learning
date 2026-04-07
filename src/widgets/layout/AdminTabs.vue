<script setup lang="ts">
import type { AppTab } from '@/stores/layout'

const props = defineProps<{
  tabs: AppTab[]
  activePath: string
}>()

const emit = defineEmits<{
  (event: 'select', path: string): void
  (event: 'close', path: string): void
  (event: 'close-others', path: string): void
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2 rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-2 shadow-[var(--app-shadow)]">
    <el-tag
      v-for="tab in tabs"
      :key="tab.path"
      :type="tab.path === activePath ? 'success' : 'info'"
      :effect="tab.path === activePath ? 'dark' : 'plain'"
      class="cursor-pointer select-none !rounded-full !border-0 !px-4 !py-5"
      @click="emit('select', tab.path)"
      @close="tab.affix ? undefined : emit('close', tab.path)"
    >
      <span class="flex items-center gap-2">
        <span>{{ tab.title }}</span>
        <button
          v-if="!tab.affix"
          type="button"
          class="inline-flex items-center rounded-full border-0 bg-transparent p-0 text-xs opacity-70 transition hover:opacity-100"
          @click.stop="emit('close', tab.path)"
        >
          ×
        </button>
      </span>
    </el-tag>

    <div class="ml-auto flex items-center gap-2 pr-1">
      <el-button size="small" text @click="emit('close-others', activePath)">
        关闭其他
      </el-button>
    </div>
  </div>
</template>
