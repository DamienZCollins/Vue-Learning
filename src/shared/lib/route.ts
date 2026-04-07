import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'

import type { AppUserRole } from '@/shared/types/vue-router'
import { hasPermission } from './permissions'

export interface MenuItem {
  path: string
  title: string
  name?: string | symbol
  icon?: string
  roles?: AppUserRole[]
  hidden?: boolean
  affix?: boolean
  children?: MenuItem[]
}

export interface BreadcrumbItem {
  title: string
  path: string
}

export function joinPath(parent: string, child: string) {
  if (child.startsWith('/'))
    return child

  const normalizedParent = parent.endsWith('/') ? parent.slice(0, -1) : parent
  const normalizedChild = child.startsWith('/') ? child.slice(1) : child
  const joined = `${normalizedParent}/${normalizedChild}`.replace(/\/+/g, '/')
  return joined.startsWith('/') ? joined : `/${joined}`
}

export function createMenuTree(routes: RouteRecordRaw[], parentPath = ''): MenuItem[] {
  return routes
    .filter(route => route.meta?.hidden !== true && route.name !== 'not-found' && !route.redirect)
    .map((route) => {
      const path = route.path.startsWith('/') ? route.path : joinPath(parentPath || '/', route.path)
      const children = route.children ? createMenuTree(route.children, path) : []
      const item: MenuItem = {
        path,
        title: String(route.meta?.title ?? route.name ?? '页面'),
        children,
      }

      if (route.name != null)
        item.name = route.name as string | symbol

      if (route.meta?.icon)
        item.icon = route.meta.icon

      if (route.meta?.roles)
        item.roles = route.meta.roles

      if (route.meta?.hidden !== undefined)
        item.hidden = route.meta.hidden

      if (route.meta?.affix !== undefined)
        item.affix = route.meta.affix

      return item
    })
}

export function filterMenuByRole(menu: MenuItem[], roles: AppUserRole[]): MenuItem[] {
  return menu
    .filter(item => hasPermission(item.roles, roles))
    .map((item) => {
      const next: MenuItem = {
        path: item.path,
        title: item.title,
      }

      if (item.name != null)
        next.name = item.name
      if (item.icon)
        next.icon = item.icon
      if (item.roles)
        next.roles = item.roles
      if (item.hidden !== undefined)
        next.hidden = item.hidden
      if (item.affix !== undefined)
        next.affix = item.affix

      const filteredChildren = item.children ? filterMenuByRole(item.children, roles) : []
      if (filteredChildren.length > 0)
        next.children = filteredChildren

      return next
    })
}

export function createBreadcrumbs(route: RouteLocationNormalizedLoaded): BreadcrumbItem[] {
  return route.matched
    .filter(record => Boolean(record.meta?.title))
    .map(record => ({
      title: String(record.meta?.title ?? record.name ?? '页面'),
      path: record.path,
    }))
}

export function createTabFromRoute(route: RouteLocationNormalizedLoaded) {
  return {
    name: String(route.name ?? route.path),
    path: route.path,
    title: String(route.meta.title ?? route.name ?? '页面'),
    affix: Boolean(route.meta.affix),
  }
}
