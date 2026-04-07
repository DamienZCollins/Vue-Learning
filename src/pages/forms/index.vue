<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import type { ComplexProfileFormModel } from '@/features/forms/ComplexProfileForm.vue'
import ComplexProfileForm from '@/features/forms/ComplexProfileForm.vue'
import PageShell from '@/shared/ui/PageShell.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

const savedProfile = ref<ComplexProfileFormModel | null>(null)

function handleSubmit(form: ComplexProfileFormModel) {
  savedProfile.value = form
  ElMessage.success('表单已保存到页面状态')
}
</script>

<template>
  <PageShell
    eyebrow="Forms"
    title="表单示例页"
    description="复杂表单、表单验证、局部状态和页面级说明，都是后面做真实业务时最常见的事情。"
  >
    <template #actions>
      <el-tag type="success" effect="dark">
        仅本地状态，无真实提交
      </el-tag>
    </template>

    <div class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <ComplexProfileForm @submit="handleSubmit" />

      <div class="space-y-4">
        <SectionCard>
          <template #header>
            <div>
              <p class="text-base font-semibold text-[var(--app-text)]">
                表单设计说明
              </p>
              <p class="text-xs text-[var(--app-text-soft)]">
                这一页用来练习“复杂模型应该怎么拆”
              </p>
            </div>
          </template>

          <div class="space-y-3 text-sm leading-6 text-[var(--app-text-soft)]">
            <p>• 表单组件只负责收集和校验数据，页面只负责接收结果并展示。</p>
            <p>• 你后面做 CRUD、配置面板或弹窗编辑时，都可以复用这种拆法。</p>
            <p>• 如果需要持久化草稿，可以直接把这里的模型接到 localStorage 或 Pinia。</p>
          </div>
        </SectionCard>

        <SectionCard>
          <template #header>
            <div>
              <p class="text-base font-semibold text-[var(--app-text)]">
                最近一次保存
              </p>
              <p class="text-xs text-[var(--app-text-soft)]">
                让你能看到表单提交后的数据形状
              </p>
            </div>
          </template>

          <pre v-if="savedProfile" class="overflow-auto rounded-3xl bg-[color:var(--app-bg-soft)] p-4 text-xs leading-6 text-[var(--app-text-soft)]">{{ JSON.stringify(savedProfile, null, 2) }}</pre>
          <p v-else class="text-sm text-[var(--app-text-soft)]">
            还没有保存过表单，提交一次后这里会显示 JSON 预览。
          </p>
        </SectionCard>
      </div>
    </div>
  </PageShell>
</template>
