<script setup lang="ts">
import type { DashboardStatCard } from '@/entities/dashboard/model/types'
import StatCard from '@/shared/ui/StatCard.vue'

defineProps<{
  cards: DashboardStatCard[]
}>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <StatCard
      v-for="card in cards"
      :key="card.key"
      :label="card.label"
      :value="card.value"
      :delta="card.delta >= 0 ? `+${card.delta.toFixed(1)}%` : `${card.delta.toFixed(1)}%`"
      :hint="card.hint"
      :tone="card.tone"
      icon="DataLine"
    />
  </div>
</template>
