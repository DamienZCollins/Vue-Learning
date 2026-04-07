<template>
  <el-card class="!border-[color:var(--app-border)] !bg-[color:var(--app-surface)] !shadow-[var(--app-shadow)]">
    <template v-if="$slots.header" #header>
      <div class="flex items-center justify-between gap-4">
        <slot name="header" />
      </div>
    </template>
    <slot />
  </el-card>
</template>
