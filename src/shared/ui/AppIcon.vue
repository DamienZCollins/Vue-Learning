<script setup lang="ts">
import { computed } from 'vue'
import type { Component } from 'vue'
import {
  ArrowRight,
  CaretBottom,
  CircleCheckFilled,
  Close,
  DataLine,
  EditPen,
  Finished,
  House,
  Lock,
  Menu,
  Monitor,
  Moon,
  Operation,
  Plus,
  Refresh,
  Search,
  Setting,
  Sunny,
  SwitchButton,
  Timer,
  Tools,
  User,
  WarningFilled,
} from '@element-plus/icons-vue'

const iconMap: Record<string, Component> = {
  ArrowRight,
  CaretBottom,
  CircleCheckFilled,
  Close,
  DataLine,
  EditPen,
  Finished,
  House,
  Lock,
  Menu,
  Monitor,
  Moon,
  Operation,
  Plus,
  Refresh,
  Search,
  Setting,
  Sunny,
  SwitchButton,
  Timer,
  Tools,
  User,
  WarningFilled,
}

const props = defineProps<{
  name: string
}>()

const icon = computed(() => iconMap[props.name] ?? House)
</script>

<template>
  <component :is="icon" />
</template>
