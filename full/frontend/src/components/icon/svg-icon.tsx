import type { CSSProperties } from "react";
import { cn } from "../../utils";

interface SvgIconProps {
	prefix?: string;
	icon: string;
	color?: string;
	size?: string | number;
	className?: string;
	style?: CSSProperties;
}

export default function SvgIcon({
	icon,
	prefix = "icon",
	color = "#333",
	size = "1em",
	className = "",
	style = {},
}: SvgIconProps) {
	const symbolId = `#${prefix}-${icon}`;
	const svgStyle: CSSProperties = {
		verticalAlign: "middle",
		width: size,
		height: size,
		color,
		...style,
	};
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 100 100"
			className={cn("anticon fill-current inline-block h-[1em] w-[1em] overflow-hidden outline-none", className)}
			style={svgStyle}
			aria-label={icon}
		>
			<title>{icon}</title>
			{/* 通过vite插件将目录下的svg图片与symbolId联系在一起 */}
			<use xlinkHref={symbolId} fill={color} />
		</svg>
	);
}
