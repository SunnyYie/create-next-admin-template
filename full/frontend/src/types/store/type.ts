import { Permission, PermissionKey } from "../permission"
import { Role } from "../role"

export enum StorageEnum {
  UserInfo = 'userInfo',
  UserToken = 'userToken',
  Settings = 'settings',
  I18N = 'i18nextLng',
}

export interface UserToken {
  accessToken?: string
  refreshToken?: string
}

export interface UserInfo {
  id: string
  email: string
  name: string
  password?: string
  avatar?: string
  role?: Role
  permissions?: Permission[]
  permissionKeys?: PermissionKey[]
  flattenPermissions?: Permission[]
}
