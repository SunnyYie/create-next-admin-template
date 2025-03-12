import { Breadcrumb, type BreadcrumbProps, type GetProp } from "antd";
import { Link, useMatches } from "react-router";
import { useMemo } from "react";

import { usePermissionRoutes } from "@/router/hooks/use-permission-routes";
import { useFlattenedRoutes } from "@/router/hooks/use-flattened-routes";
import { menuFilter } from "@/router/utils";

type MenuItem = GetProp<BreadcrumbProps, "items">[number];

export default function BreadCrumb() {
	const permissionRoutes = usePermissionRoutes();
	const flattenedRoutes = useFlattenedRoutes();
	const matches = useMatches();

	const breadCrumbs = useMemo(() => {
		const menuRoutes = menuFilter(permissionRoutes);
		const paths = matches.filter((item) => item.pathname !== "/").map((item) => item.pathname);
		// 获取当前路径的路由数组
		const pathRouteMetas = flattenedRoutes.filter((item) => paths.includes(item.key));

		let currentMenuItems = [...menuRoutes];

		return pathRouteMetas.map((routeMeta): MenuItem => {
			const { key, label } = routeMeta;

			// 获取当前路径的子菜单
			const currentRoute = currentMenuItems.find((item) => item.meta?.key === key);
			currentMenuItems = currentRoute?.children?.filter((item) => !item.meta?.hideMenu) ?? [];

			return {
				key,
				title: label,
				...(currentMenuItems.length > 0 && {
					menu: {
						items: currentMenuItems.map((item) => ({
							key: item.meta?.key,
							label: item.meta?.key ? <Link to={item.meta.key}>{item.meta.label}</Link> : null,
						})),
					},
				}),
			};
		});
	}, [matches, flattenedRoutes, permissionRoutes]);

	return <Breadcrumb items={breadCrumbs} className="!text-sm" separator='/' />;
}
