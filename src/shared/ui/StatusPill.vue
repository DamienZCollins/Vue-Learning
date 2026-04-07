<script setup lang="ts">
const props = defineProps<{
  tone: 'success' | 'warning' | 'info' | 'neutral'
  label: string
}>()

const toneClasses = {
  success: 'bg-emerald-500/14 text-emerald-600 dark:text-emerald-300',
  warning: 'bg-amber-500/14 text-amber-600 dark:text-amber-300',
  info: 'bg-cyan-500/14 text-cyan-600 dark:text-cyan-300',
  neutral: 'bg-slate-500/14 text-slate-600 dark:text-slate-300',
} as const

const currentTone = props.tone
</script>

<template>
  <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium" :class="toneClasses[currentTone]">
    {{ label }}
  </span>
</template>
