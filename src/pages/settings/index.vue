<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { useSettingsStore } from '@/stores/settings'
import ThemeSettingsPanel from '@/features/settings/ThemeSettingsPanel.vue'
import LayoutSettingsPanel from '@/features/settings/LayoutSettingsPanel.vue'
import PageShell from '@/shared/ui/PageShell.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const router = useRouter()
const settingsStore = useSettingsStore()

function resetSettings() {
  settingsStore.resetSettings()
  ElMessage.success('已恢复默认配置')
}
</script>

<template>
  <PageShell
    eyebrow="Settings"
    title="设置页"
    description="主题、布局和标签页开关都集中在这一层，方便以后扩展成完整的系统配置中心。"
  >
    <template #actions>
      <el-button plain @click="resetSettings">
        恢复默认
      </el-button>
      <el-button type="primary" @click="router.push({ name: 'permission-demo' })">
        权限演示
      </el-button>
    </template>

    <div class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <ThemeSettingsPanel />
      <LayoutSettingsPanel />
    </div>

    <SectionCard>
      <template #header>
        <div>
          <p class="text-base font-semibold text-[var(--app-text)]">
            设置页的学习重点
          </p>
          <p class="text-xs text-[var(--app-text-soft)]">
            你可以把这里当成“全局状态中枢”的示意图
          </p>
        </div>
      </template>

      <div class="grid gap-3 text-sm leading-6 text-[var(--app-text-soft)] md:grid-cols-3">
        <p>• 主题和布局状态存入 Pinia，并通过持久化插件跨刷新保留。</p>
        <p>• 页面密度、侧边栏收起、标签页显示，都是实际后台系统里常见的偏好设置。</p>
        <p>• 权限演示按钮会把你送到路由守卫示例页，帮助理解 meta + guard 的配合。</p>
      </div>
    </SectionCard>
  </PageShell>
</template>
