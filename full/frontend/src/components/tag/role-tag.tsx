import { Tag } from "antd";
import type { RolePermissionKey } from "../../store/type";
import type { PermissionRole } from "../../types/router/type";

interface RoleTagProps {
	role: PermissionRole | RolePermissionKey;
}

export default function RoleTag({ role }: RoleTagProps) {
	return (
		<Tag color={role.roleId === "1" ? "green" : "blue"} key={role.id}>
			{role.roleId === "1" ? "管理员" : "用户"}
		</Tag>
	);
}
