import { useUserFlattenPermissions, useUserPermission } from '@/store/user-setting'
import CircleLoading from '@/components/circle-loading'
import { Navigate, Outlet } from 'react-router'
import { Suspense, lazy, useMemo } from 'react'
import { isEmpty } from 'ramda'

import { Permission, PermissionType } from '@/types/permission'
import { AppRouteObject } from '@/types/router/type'

// 获取路由
export function usePermissionRoutes() {
  const permissions = useUserPermission()
  const flattenedPermissions = useUserFlattenPermissions()

  return useMemo(() => {
    if (!permissions || !flattenedPermissions) return []
    return transformPermissionsToRoutes(permissions, flattenedPermissions)
  }, [permissions])
}

// 将权限数组转换为路由数组
function transformPermissionsToRoutes(permissions: Permission[], flattenedPermissions: Permission[]): AppRouteObject[] {
  return permissions.map(permission => {
    if (permission.type === PermissionType.catalogue) {
      return createCatalogueRoute(permission, flattenedPermissions)
    }
    return createMenuRoute(permission, flattenedPermissions)
  })
}

// 处理CATALOGUE类型的权限路由对象
const createCatalogueRoute = (permission: Permission, flattenedPermissions: Permission[]): AppRouteObject => {
  const baseRoute = createBaseRoute(permission, buildCompleteRoute(permission, flattenedPermissions))

  if (baseRoute.meta) {
    baseRoute.meta.hideTab = true
  }

  const { parentId, children = [] } = permission
  if (!parentId) {
    baseRoute.element = (
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    )
  }

  baseRoute.children = transformPermissionsToRoutes(children, flattenedPermissions)

  if (!isEmpty(children)) {
    baseRoute.children.unshift({
      index: true,
      element: <Navigate to={children[0].route} replace />,
    })
  }

  return baseRoute
}


// 处理MENU类型的权限路由对象
const createMenuRoute = (permission: Permission, flattenedPermissions: Permission[]): AppRouteObject => {
	const baseRoute = createBaseRoute(permission, buildCompleteRoute(permission, flattenedPermissions))
	// 获取所有页面，做懒加载
	const ENTRY_PATH = '/src/pages'
	const PAGES = import.meta.glob('/src/pages/**/*.tsx')
	const loadComponentFromPath = (path: string) => PAGES[`${ENTRY_PATH}${path}`]

  if (permission.component) {
    // 懒加载
    const Element = lazy(loadComponentFromPath(permission.component) as any)

    baseRoute.element = (
      <Suspense fallback={<CircleLoading />}>
        <Element />
      </Suspense>
    )
  }

  return baseRoute
}

/**
 * 构建基础路由对象
 * @param permission - 权限对象
 * @param completeRoute - 完整路由路径
 * @example
 * createBaseRoute({ route: 'user', label: '用户管理', icon: 'UserOutlined' }, '/system/user') => { path: '/system/user', meta: { label: '用户管理', key: '/system/user', icon: 'UserOutlined' } }
 */
const createBaseRoute = (permission: Permission, completeRoute: string): AppRouteObject => {
  const { route, label, icon, order, hide, hideTab } = permission

  const baseRoute: AppRouteObject = {
    path: route,
    meta: {
      label,
      key: completeRoute,
      hideMenu: !!hide,
      hideTab,
    },
  }

  if (order) baseRoute.order = order
  if (baseRoute.meta) {
    if (icon) baseRoute.meta.icon = icon
  }

  return baseRoute
}

/**
 * 获取完整路由
 * @param permission - 权限对象
 * @param flattenedPermissions - 扁平化权限列表
 * @param segments - 路由片段路径
 * @example
 * buildCompleteRoute({ route: 'user', parentId: '1' }, [{ id: '1', route: 'system' }]) => '/system/user'
 */
function buildCompleteRoute(
  permission: Permission,
  flattenedPermissions: Permission[],
  segments: string[] = [],
): string {
  segments.unshift(permission.route)

  if (!permission.parentId) {
    return `/${segments.join('/')}`
  }

  const parent = flattenedPermissions.find(p => p.id === permission.parentId)
  if (!parent) {
    console.warn(`Parent permission not found for ID: ${permission.parentId}`)
    return `/${segments.join('/')}`
  }

  return buildCompleteRoute(parent, flattenedPermissions, segments)
}
