import { PermissionRole, RolePermissionKey } from "@/types/permission";
import { Tag } from "antd";

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
