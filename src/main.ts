import { setActivePinia, createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import { createQueryClient, installAppPlugins } from '@/app/plugins'
import { useSettingsStore } from '@/stores/settings'
import { installRouterGuards } from '@/router/guards'
import { router } from '@/router'
import App from './App.vue'
import './styles/index.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(persistedState)
setActivePinia(pinia)

const queryClient = createQueryClient()

installRouterGuards(router, pinia)
installAppPlugins(app, {
  pinia,
  router,
  queryClient,
})

// Prime the settings store once so persisted theme/layout values are available early.
useSettingsStore()

app.mount('#app')
