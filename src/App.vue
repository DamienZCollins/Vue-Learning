<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings'
import { useThemeRuntime } from '@/app/theme'

const settingsStore = useSettingsStore()

useThemeRuntime(settingsStore)
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page-fade" mode="out-in">
      <component :is="Component" :key="route.fullPath" />
    </Transition>
  </RouterView>
</template>
