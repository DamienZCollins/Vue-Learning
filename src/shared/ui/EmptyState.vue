<script setup lang="ts">
import AppIcon from './AppIcon.vue'

defineProps<{
  title: string
  description?: string
  icon?: string
}>()
</script>

<template>
  <div class="rounded-[24px] border border-dashed border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-8 text-center">
    <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:var(--app-primary-weak)] text-[var(--app-primary)]">
      <AppIcon v-if="icon" :name="icon" class="text-2xl" />
    </div>
    <h3 class="text-lg font-semibold text-[var(--app-text)]">
      {{ title }}
    </h3>
    <p v-if="description" class="mt-2 text-sm leading-6 text-[var(--app-text-soft)]">
      {{ description }}
    </p>
    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
