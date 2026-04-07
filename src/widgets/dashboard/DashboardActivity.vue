<script setup lang="ts">
import type { DashboardActivityItem } from '@/entities/dashboard/model/types'
import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import StatusPill from '@/shared/ui/StatusPill.vue'

defineProps<{
  items: DashboardActivityItem[]
}>()

const toneMap = {
  success: { label: '已完成', tone: 'success' as const, icon: 'CircleCheckFilled' },
  warning: { label: '待确认', tone: 'warning' as const, icon: 'WarningFilled' },
  info: { label: '信息流', tone: 'info' as const, icon: 'Timer' },
}
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          最近动态
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          这些事件全部来自本地 Mock 仓库
        </p>
      </div>
    </template>

    <div class="space-y-3">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex items-start justify-between gap-4 rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] p-4"
      >
        <div class="flex items-start gap-3">
          <div class="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--app-primary-weak)] text-[var(--app-primary)]">
            <AppIcon :name="toneMap[item.tone].icon" class="text-lg" />
          </div>
          <div class="space-y-1">
            <p class="font-medium text-[var(--app-text)]">
              {{ item.title }}
            </p>
            <p class="text-sm text-[var(--app-text-soft)]">
              {{ item.description }}
            </p>
          </div>
        </div>
        <div class="flex shrink-0 flex-col items-end gap-2">
          <StatusPill :tone="toneMap[item.tone].tone" :label="toneMap[item.tone].label" />
          <span class="text-xs text-[var(--app-text-soft)]">{{ item.timeLabel }}</span>
        </div>
      </div>
    </div>
  </SectionCard>
</template>
