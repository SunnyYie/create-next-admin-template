export enum PermissionType {
	CATALOGUE = 0,
	MENU = 1,
	BUTTON = 2,
	catalogue = "CATALOGUE",
	menu = "MENU",
	button = "BUTTON",
}

export interface PermissionRole {
	id: string;
	roleId: string;
	permissionId: string;
}

export interface Permission {
	id: string;
	parentId: string;
	name: string;
	label: string;
	type: PermissionType;
	route: string;
	order?: number;
	icon?: string;
	component?: string;
	hide?: boolean;
	hideTab?: boolean;
	frameSrc?: URL;
	newFeature?: boolean;
	children?: Permission[];

	roleId?: string;
	roles?: PermissionRole[];
}
