<script setup lang="ts">
import AppIcon from '@/shared/ui/AppIcon.vue'
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[color:var(--app-bg)]">
    <div class="noise-overlay min-h-screen lg:grid lg:grid-cols-[1.1fr_0.9fr]">
      <aside class="relative hidden overflow-hidden px-8 py-10 text-[color:var(--app-text)] lg:flex lg:flex-col lg:justify-between">
        <div class="absolute inset-0 bg-[linear-gradient(135deg,rgba(45,212,191,0.12),transparent_35%),linear-gradient(315deg,rgba(245,158,11,0.08),transparent_30%)]" />
        <div class="relative z-10 max-w-2xl space-y-8">
          <div class="inline-flex items-center gap-3 rounded-full border border-[color:var(--app-border)] bg-[color:var(--app-surface)] px-4 py-2 shadow-[var(--app-shadow)]">
            <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--app-primary-weak)] text-[var(--app-primary)]">
              <AppIcon name="DataLine" class="text-lg" />
            </div>
            <div>
              <p class="text-sm font-semibold">
                Vue3-Frontend-Architecture-Mastery-Dashboard
              </p>
              <p class="text-xs text-[var(--app-text-soft)]">
                纯前端中后台架构学习模板
              </p>
            </div>
          </div>

          <div class="space-y-5">
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--app-muted)]">
              Learning System
            </p>
            <h1 class="max-w-xl text-5xl font-semibold leading-tight tracking-tight">
              用一套真正可维护的 Vue 架构，理解现代中后台是如何拆分的。
            </h1>
            <p class="max-w-2xl text-base leading-8 text-[var(--app-text-soft)]">
              这个模板不依赖后端，不调用真实 API，也不引入 AI 功能。你会看到路由、状态管理、布局系统、数据流和权限守卫如何在一个纯前端项目里协同工作。
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-3">
            <div class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-4">
              <p class="text-xs uppercase tracking-[0.24em] text-[var(--app-muted)]">Route</p>
              <p class="mt-2 text-lg font-semibold">App Router 风格</p>
            </div>
            <div class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-4">
              <p class="text-xs uppercase tracking-[0.24em] text-[var(--app-muted)]">State</p>
              <p class="mt-2 text-lg font-semibold">Pinia + 持久化</p>
            </div>
            <div class="rounded-3xl border border-[color:var(--app-border)] bg-[color:var(--app-surface)] p-4">
              <p class="text-xs uppercase tracking-[0.24em] text-[var(--app-muted)]">Data</p>
              <p class="mt-2 text-lg font-semibold">Vue Query + Mock</p>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-10 grid gap-3 text-sm text-[var(--app-text-soft)]">
          <p>• 目录结构按 app / pages / layouts / widgets / features / entities / shared 分层</p>
          <p>• 支持暗黑模式、标签页、面包屑、响应式侧边栏</p>
          <p>• README 会把每个文件夹的职责讲清楚</p>
        </div>
      </aside>

      <main class="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div class="w-full max-w-xl">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
