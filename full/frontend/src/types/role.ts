export enum Role {
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
