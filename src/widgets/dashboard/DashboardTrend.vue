<script setup lang="ts">
import type { DashboardTrendSeries } from '@/entities/dashboard/model/types'
import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'
import SparklineChart from '@/shared/ui/SparklineChart.vue'

defineProps<{
  series: DashboardTrendSeries[]
}>()
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          近 7 日趋势
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          用本地 Mock 数据绘制的轻量图表
        </p>
      </div>
      <div class="flex items-center gap-2 text-xs text-[var(--app-text-soft)]">
        <AppIcon name="DataLine" class="text-base text-[var(--app-primary)]" />
        Vue Query 只是数据外壳，实际数据来自本地仓库
      </div>
    </template>

    <div class="grid gap-4 lg:grid-cols-3">
      <div
        v-for="item in series"
        :key="item.label"
        class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface-strong)] p-4 shadow-[0_12px_40px_rgba(15,23,42,0.04)]"
      >
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-[var(--app-text)]">
              {{ item.label }}
            </p>
            <p class="text-xs text-[var(--app-text-soft)]">
              最近 7 天变化
            </p>
          </div>
          <span class="rounded-full px-2.5 py-1 text-xs font-medium" :style="{ color: item.tone, backgroundColor: `${item.tone}1a` }">
            轻量图表
          </span>
        </div>
        <SparklineChart class="mt-4" :values="item.values" :tone="item.tone" />
      </div>
    </div>
  </SectionCard>
</template>
