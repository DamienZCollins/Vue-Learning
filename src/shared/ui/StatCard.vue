<script setup lang="ts">
import AppIcon from './AppIcon.vue'

const props = defineProps<{
  label: string
  value: string | number
  delta?: string
  hint?: string
  icon?: string
  tone?: 'teal' | 'amber' | 'rose' | 'slate'
}>()

const toneClasses = {
  teal: 'from-teal-500/18 to-cyan-400/10 text-teal-600 dark:text-teal-300',
  amber: 'from-amber-500/18 to-orange-400/10 text-amber-600 dark:text-amber-300',
  rose: 'from-rose-500/18 to-pink-400/10 text-rose-600 dark:text-rose-300',
  slate: 'from-slate-500/18 to-slate-400/10 text-slate-600 dark:text-slate-300',
} as const

const tone = props.tone ?? 'teal'
</script>

<template>
  <div class="rounded-[24px] border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-5 shadow-[var(--app-shadow)] backdrop-blur">
    <div :class="['mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br', toneClasses[tone]]">
      <AppIcon v-if="icon" :name="icon" class="text-lg" />
    </div>
    <p class="text-sm text-[var(--app-text-soft)]">
      {{ label }}
    </p>
    <div class="mt-2 flex items-end gap-3">
      <p class="text-3xl font-semibold tracking-tight text-[var(--app-text)]">
        {{ value }}
      </p>
      <span v-if="delta" class="pb-1 text-sm font-medium text-[var(--app-primary)]">
        {{ delta }}
      </span>
    </div>
    <p v-if="hint" class="mt-3 text-xs leading-5 text-[var(--app-muted)]">
      {{ hint }}
    </p>
  </div>
</template>
