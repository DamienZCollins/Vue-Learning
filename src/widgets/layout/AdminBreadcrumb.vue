<script setup lang="ts">
import type { BreadcrumbItem } from '@/shared/lib/route'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <el-breadcrumb separator="/" class="text-sm">
    <el-breadcrumb-item v-for="item in items" :key="item.path">
      <span class="text-[var(--app-text-soft)]">{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
