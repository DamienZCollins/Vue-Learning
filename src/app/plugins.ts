import type { App } from 'vue'
import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'

import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 5 * 60_000,
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  })
}

export function installAppPlugins(app: App, options: {
  pinia: Pinia
  router: Router
  queryClient: QueryClient
}) {
  app.use(options.pinia)
  app.use(options.router)
  app.use(VueQueryPlugin, { queryClient: options.queryClient })
  app.use(ElementPlus as any, {
    locale: zhCn,
    size: 'default',
  } as any)
}
