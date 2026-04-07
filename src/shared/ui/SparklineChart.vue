<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  values: number[]
  tone?: string
  height?: number
}>()

const height = computed(() => props.height ?? 120)

const metrics = computed(() => {
  const values = props.values.length ? props.values : [0]
  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const width = 240
  const padding = 12
  const innerWidth = width - padding * 2
  const innerHeight = height.value - padding * 2
  const step = values.length > 1 ? innerWidth / (values.length - 1) : innerWidth

  const points = values.map((value, index) => {
    const normalized = max === min ? 0.5 : (value - min) / (max - min)
    const x = padding + index * step
    const y = padding + innerHeight - normalized * innerHeight
    return { x, y }
  })

  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')

  const area = `${path} L ${padding + innerWidth} ${height.value - padding} L ${padding} ${height.value - padding} Z`

  return {
    width,
    height: height.value,
    path,
    area,
    points,
  }
})
</script>

<template>
  <svg
    class="block h-[140px] w-full"
    :viewBox="`0 0 ${metrics.width} ${metrics.height}`"
    preserveAspectRatio="none"
    role="img"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="sparkline-gradient" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="var(--app-primary)" stop-opacity="0.32" />
        <stop offset="100%" stop-color="var(--app-primary)" stop-opacity="0.04" />
      </linearGradient>
    </defs>
    <path :d="metrics.area" fill="url(#sparkline-gradient)" />
    <path :d="metrics.path" fill="none" :stroke="tone ?? 'var(--app-primary)'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    <circle
      v-for="point in metrics.points"
      :key="`${point.x}-${point.y}`"
      :cx="point.x"
      :cy="point.y"
      r="2.8"
      :fill="tone ?? 'var(--app-primary)'"
      class="drop-shadow-sm"
    />
  </svg>
</template>
