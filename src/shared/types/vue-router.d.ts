import 'vue-router'

export type AppUserRole = 'admin' | 'editor'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    icon?: string
    requiresAuth?: boolean
    roles?: AppUserRole[]
    hidden?: boolean
    affix?: boolean
    keepAlive?: boolean
  }
}
