<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

import AppIcon from '@/shared/ui/AppIcon.vue'
import SectionCard from '@/shared/ui/SectionCard.vue'

export interface ComplexProfileFormModel {
  name: string
  title: string
  email: string
  dateRange: [string, string]
  skills: string[]
  newsletter: boolean
  notes: string
}

const emit = defineEmits<{
  (event: 'submit', value: ComplexProfileFormModel): void
  (event: 'reset'): void
}>()

const formRef = ref<FormInstance>()

const form = reactive<ComplexProfileFormModel>({
  name: '前端学习者',
  title: '架构练习项目',
  email: 'learner@example.com',
  dateRange: ['2026-04-07', '2026-05-07'],
  skills: ['Vue 3', 'TypeScript', 'Pinia'],
  newsletter: true,
  notes: '这个表单用来练习复杂数据结构、双向绑定和本地校验。',
})

const rules: FormRules<ComplexProfileFormModel> = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  title: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确邮箱格式', trigger: 'blur' },
  ],
  dateRange: [{ type: 'array', required: true, message: '请选择时间范围', trigger: 'change' }],
  skills: [{ type: 'array', required: true, message: '请选择至少一个技能', trigger: 'change' }],
}

async function submitForm() {
  await formRef.value?.validate()
  emit('submit', { ...form, dateRange: [...form.dateRange] as [string, string] })
}

function resetForm() {
  Object.assign(form, {
    name: '前端学习者',
    title: '架构练习项目',
    email: 'learner@example.com',
    dateRange: ['2026-04-07', '2026-05-07'],
    skills: ['Vue 3', 'TypeScript', 'Pinia'],
    newsletter: true,
    notes: '这个表单用来练习复杂数据结构、双向绑定和本地校验。',
  } satisfies ComplexProfileFormModel)
  emit('reset')
}

defineExpose({
  submitForm,
  resetForm,
  form,
})
</script>

<template>
  <SectionCard>
    <template #header>
      <div>
        <p class="text-base font-semibold text-[var(--app-text)]">
          复杂表单示例
        </p>
        <p class="text-xs text-[var(--app-text-soft)]">
          练习嵌套模型、校验规则和本地保存
        </p>
      </div>
      <div class="flex items-center gap-2">
        <el-button plain @click="resetForm">
          <AppIcon name="Refresh" class="mr-2 text-base" />
          重置
        </el-button>
        <el-button type="primary" @click="submitForm">
          <AppIcon name="Finished" class="mr-2 text-base" />
          保存草稿
        </el-button>
      </div>
    </template>

    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="grid gap-4 md:grid-cols-2">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="项目名称" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="时间范围" prop="dateRange">
        <el-date-picker v-model="form.dateRange" value-format="YYYY-MM-DD" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" class="w-full" />
      </el-form-item>
      <el-form-item label="技能标签" prop="skills" class="md:col-span-2">
        <el-select v-model="form.skills" multiple filterable allow-create default-first-option class="w-full">
          <el-option label="Vue 3" value="Vue 3" />
          <el-option label="TypeScript" value="TypeScript" />
          <el-option label="Pinia" value="Pinia" />
          <el-option label="Vue Query" value="Vue Query" />
          <el-option label="UnoCSS" value="UnoCSS" />
        </el-select>
      </el-form-item>
      <el-form-item label="订阅更新" prop="newsletter">
        <el-switch v-model="form.newsletter" />
      </el-form-item>
      <el-form-item label="备注" prop="notes" class="md:col-span-2">
        <el-input v-model="form.notes" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
  </SectionCard>
</template>
