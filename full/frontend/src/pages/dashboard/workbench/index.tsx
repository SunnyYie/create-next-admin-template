import { Button } from "antd";
import AuthGuard from "../../../components/auth/authGuard";
import { useUserPermissionKeys } from "../../../store/user-setting";

export default function Workbench() {
	const permissionKeys = useUserPermissionKeys();

	return <div>Workbench</div>;
}
