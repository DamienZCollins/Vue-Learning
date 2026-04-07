<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="space-y-6">
    <header class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div class="space-y-2">
        <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--app-muted)]">
          {{ eyebrow }}
        </p>
        <div class="space-y-1">
          <h1 class="text-2xl font-semibold tracking-tight text-[var(--app-text)] md:text-3xl">
            {{ title }}
          </h1>
          <p v-if="description" class="max-w-3xl text-sm leading-6 text-[var(--app-text-soft)]">
            {{ description }}
          </p>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-3">
        <slot name="actions" />
      </div>
    </header>
    <div class="space-y-6">
      <slot />
    </div>
  </section>
</template>
