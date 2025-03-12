import { Permission } from "./permission";

export enum RoleEnum {
	AMDIN = 1,
	USER = 2,
	admin = "ADMIN",
	user = "USER",
}

export interface PermissionRole {
	id: string;
	roleId: string;
	permissionId: string;
}

export interface Role {
	id: string
	name: string
	label: string
	order?: number
	description?: string
	permission?: Permission[]
}