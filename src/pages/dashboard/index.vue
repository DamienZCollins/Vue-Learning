<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'

import { fetchDashboardSnapshot } from '@/entities/dashboard/api/dashboardRepository'
import DashboardActivity from '@/widgets/dashboard/DashboardActivity.vue'
import DashboardSummary from '@/widgets/dashboard/DashboardSummary.vue'
import DashboardTrend from '@/widgets/dashboard/DashboardTrend.vue'
import PageShell from '@/shared/ui/PageShell.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const router = useRouter()
const snapshotQuery = useQuery({
  queryKey: ['dashboard-snapshot'],
  queryFn: fetchDashboardSnapshot,
})

const snapshot = computed(() => snapshotQuery.data.value)
</script>

<template>
  <PageShell
    eyebrow="Dashboard"
    title="仪表盘首页"
    description="用统计卡片、轻量图表和最近动态展示真实中后台常见的数据组织方式。"
  >
    <template #actions>
      <el-button plain @click="router.push({ name: 'users' })">
        用户管理
      </el-button>
      <el-button plain @click="router.push({ name: 'forms' })">
        表单示例
      </el-button>
      <el-button type="primary" @click="router.push({ name: 'settings' })">
        配置中心
      </el-button>
    </template>

    <template v-if="snapshot">
      <DashboardSummary :cards="snapshot.summary" />

      <DashboardTrend :series="snapshot.trend" />

      <div class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <DashboardActivity :items="snapshot.activities" />

        <SectionCard>
          <template #header>
            <div>
              <p class="text-base font-semibold text-[var(--app-text)]">
                架构提示
              </p>
              <p class="text-xs text-[var(--app-text-soft)]">
                这部分是给初学者看的“为什么这样拆”
              </p>
            </div>
          </template>

          <div class="space-y-4 text-sm leading-6 text-[var(--app-text-soft)]">
            <p>• 仪表盘页面不直接处理数据源，而是通过 Vue Query 调用 mock repository。</p>
            <p>• 总览卡片、趋势图、最近动态都被拆成独立 widget，便于复用与替换。</p>
            <p>• 你以后要接真实 API 时，只需要替换 repository 层，而不必重写整个页面。</p>
          </div>
        </SectionCard>
      </div>
    </template>

    <template v-else>
      <SectionCard>
        <div class="space-y-3">
          <el-skeleton :rows="4" animated />
          <p class="text-sm text-[var(--app-text-soft)]">正在从本地 Mock 仓库读取仪表盘数据...</p>
        </div>
      </SectionCard>
    </template>
  </PageShell>
</template>
